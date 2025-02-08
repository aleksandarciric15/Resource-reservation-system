package dev.notification_service.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;

import dev.notification_service.exceptions.NotFoundException;
import dev.notification_service.models.dtos.NotificationRequest;
import dev.notification_service.models.dtos.NotificationResponse;
import dev.notification_service.models.entities.Notification;
import dev.notification_service.repositories.NotificationRepository;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final ModelMapper modelMapper;

    private final Sinks.Many<Notification> notificationSink = Sinks.many().multicast().onBackpressureBuffer();

    private void pushNotification(Notification newNotification) {
        notificationSink.tryEmitNext(newNotification);
    }

    public Flux<ServerSentEvent<Notification>> getStreamNotificationsForUserId(String userId) {
        return notificationSink.asFlux().filter(notification -> notification.getUserId().equals(userId))
                .map(notification -> ServerSentEvent.<Notification>builder().event(notification.getType())
                        .data(notification).build());
    }

    public void makeNotification(NotificationRequest request) {
        Notification notification = new Notification();
        modelMapper.map(request, notification);

        notification = notificationRepository.saveAndFlush(notification);

        pushNotification(notification);
    }

    public List<NotificationResponse> getUnreadNotificationsForUser(String userId) {
        List<Notification> notifications = notificationRepository.findAllByUserIdAndIsRead(userId, false);

        return notifications.stream().map(elem -> modelMapper.map(elem, NotificationResponse.class))
                .collect(Collectors.toList());
    }

    public void markAllUserNotificationsAsRead(String userId) {
        List<Notification> notifications = notificationRepository.findAllByUserIdAndIsRead(userId, false);
        for (Notification notification : notifications) {
            notification.setRead(true);
            notificationRepository.save(notification);
        }
    }

    public void markNotificationAsRead(Integer notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElseThrow(NotFoundException::new);

        notification.setRead(true);
        notificationRepository.save(notification);
    }
}
