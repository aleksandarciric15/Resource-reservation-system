package dev.notification_service.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;

import dev.notification_service.exceptions.NotFoundException;
import dev.notification_service.models.dtos.MessageRequest;
import dev.notification_service.models.dtos.MessageResponse;
import dev.notification_service.models.entities.Message;
import dev.notification_service.models.enums.MessageType;
import dev.notification_service.repositories.MessageRepository;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ModelMapper modelMapper;

    private final Sinks.Many<Message> messageSink = Sinks.many().multicast().onBackpressureBuffer();

    private void pushNotification(Message newNotification) {
        messageSink.tryEmitNext(newNotification);
    }

    public Flux<ServerSentEvent<Message>> getStreamMessagesForUserId(String userId) {
        return messageSink.asFlux().filter(message -> message.getReceiverId().equals(userId))
                .map(message -> ServerSentEvent.<Message>builder()
                        .event(MessageType.RESOURCE_MESSAGE.getValue())
                        .data(message).build());
    }

    public List<?> getAll() {

        List<Message> messages = messageRepository.findAllByIsReadFalse();

        return messages.stream().map((message) -> modelMapper.map(message, MessageResponse.class))
                .collect(Collectors.toList());
    }

    public List<?> getAllByReceiverId(String receiverId) {
        List<Message> messages = messageRepository.findAllByReceiverIdAndIsReadFalse(receiverId);

        return messages.stream().map((message) -> modelMapper.map(message, MessageResponse.class))
                .collect(Collectors.toList());
    }

    public boolean sendMessage(MessageRequest request) {
        Message message = new Message();

        modelMapper.map(request, message);
        message.setCreatedAt(LocalDateTime.now());
        message.setRead(false);

        message = messageRepository.saveAndFlush(message);

        pushNotification(message);
        return true;
    }

    public boolean markAsRead(Integer messageId) {
        Message message = messageRepository.findById(messageId).orElseThrow(NotFoundException::new);

        message.setRead(true);
        messageRepository.saveAndFlush(message);

        return true;
    }

    public boolean markAllUserMessagesAsRead(String receiverId) {
        List<Message> messages = messageRepository.findAllByReceiverIdAndIsReadFalse(receiverId);

        for (Message message : messages) {
            message.setRead(true);
            messageRepository.save(message);
        }

        return true;
    }
}
