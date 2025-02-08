package dev.reservation_service.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import dev.reservation_service.models.dtos.NotificationRequest;

@FeignClient(name = "notification-service", url = "${notifications-url}")
public interface NotificationClient {
    @PostMapping("create")
    public void makeNotification(@RequestBody NotificationRequest notification);
}
