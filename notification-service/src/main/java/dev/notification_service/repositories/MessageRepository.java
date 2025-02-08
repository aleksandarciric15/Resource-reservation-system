package dev.notification_service.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.notification_service.models.entities.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {

    List<Message> findAllByIsReadFalse();

    List<Message> findAllByReceiverIdAndIsReadFalse(String receiverId);
}
