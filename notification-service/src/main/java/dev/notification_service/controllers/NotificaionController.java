package dev.notification_service.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.notification_service.models.dtos.NotificationRequest;
import dev.notification_service.models.entities.Notification;
import dev.notification_service.services.NotificationService;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("${notification_service.base-url}/notifications")
@RequiredArgsConstructor
public class NotificaionController {

    private final NotificationService notificationService;

    @GetMapping("{userId}/unread")
    public ResponseEntity<?> getUnreadNotifications(@PathVariable String userId) {
        return ResponseEntity.ok().body(notificationService.getUnreadNotificationsForUser(userId));
    }

    @PostMapping("user/{userId}/read")
    public ResponseEntity<?> markAllUserNotificationsAsRead(@PathVariable String userId) {
        notificationService.markAllUserNotificationsAsRead(userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("{notificationId}/read")
    public ResponseEntity<?> markNotificationAsRead(@PathVariable Integer notificationId) {
        notificationService.markNotificationAsRead(notificationId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("create")
    public ResponseEntity<?> makeNotification(@RequestBody NotificationRequest request) {
        notificationService.makeNotification(request);

        return ResponseEntity.ok().body(null);
    }

    @GetMapping("/stream/{userId}")
    public Flux<ServerSentEvent<Notification>> streamReservationApproval(@PathVariable String userId) {
        return notificationService.getStreamNotificationsForUserId(userId);
    }

}
