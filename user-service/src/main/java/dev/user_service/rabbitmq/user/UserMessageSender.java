package dev.user_service.rabbitmq.user;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.amqp.core.Queue;
import org.springframework.stereotype.Service;

@Service
public class UserMessageSender {

    // @Autowired
    // private RabbitTemplate rabbitTemplate;

    // @Autowired
    // private Queue userQueue;

    // public void sendMessage(String message) {
    // rabbitTemplate.convertAndSend(userQueue.getName(), message);

    // System.out.println(" [x] Sent: " + message);
    // }
}
