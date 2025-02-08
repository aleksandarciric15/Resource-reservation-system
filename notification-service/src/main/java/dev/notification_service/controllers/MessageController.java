package dev.notification_service.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.notification_service.models.dtos.MessageRequest;
import dev.notification_service.models.entities.Message;
import dev.notification_service.services.MessageService;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("${notification_service.base-url}/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok().body(messageService.getAll());
    }

    @GetMapping("received")
    public ResponseEntity<?> getMethodName(@RequestParam String receiverId) {
        return ResponseEntity.ok().body(messageService.getAllByReceiverId(receiverId));
    }

    @PostMapping("send")
    public ResponseEntity<?> sendMessage(@RequestBody MessageRequest request) {
        return ResponseEntity.ok().body(messageService.sendMessage(request));
    }

    @PutMapping("read")
    public ResponseEntity<?> markAsRead(@RequestParam Integer messageId) {
        return ResponseEntity.ok().body(messageService.markAsRead(messageId));
    }

    @PutMapping("receiver/read")
    public ResponseEntity<?> markAllReceiverMessagesAsRead(@RequestParam String receiverId) {
        return ResponseEntity.ok().body(messageService.markAllUserMessagesAsRead(receiverId));
    }

    @GetMapping("/stream/{userId}")
    public Flux<ServerSentEvent<Message>> streamReservationApproval(@PathVariable String userId) {
        return messageService.getStreamMessagesForUserId(userId);
    }
}
