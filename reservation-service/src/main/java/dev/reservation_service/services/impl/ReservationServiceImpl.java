package dev.reservation_service.services.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import dev.reservation_service.clients.NotificationClient;
import dev.reservation_service.exceptions.NotFoundException;
import dev.reservation_service.exceptions.ReservationException;
import dev.reservation_service.models.dtos.NotificationRequest;
import dev.reservation_service.models.entities.Reservation;
import dev.reservation_service.models.entities.ReservationResource;
import dev.reservation_service.models.enums.NotificationType;
import dev.reservation_service.models.requests.CreateReservation;
import dev.reservation_service.models.requests.DenyReservationRequest;
import dev.reservation_service.models.requests.ReservationDate;
import dev.reservation_service.models.requests.Resource;
import dev.reservation_service.models.requests.ResourceAvailability;
import dev.reservation_service.models.responses.ReservationResponse;
import dev.reservation_service.respositories.ReservationRepository;
import dev.reservation_service.respositories.ReservationResourceRepository;
import dev.reservation_service.services.ReservationService;
import dev.reservation_service.utils.DateTimeUtils;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final ReservationResourceRepository reservationResourceRepository;
    private final NotificationClient notificationClient;
    private final ModelMapper modelMapper;

    @Override
    public boolean isResourceAvailable(ResourceAvailability request) {
        return false;
    }

    @Override
    public List<ReservationResponse> getAll() {
        List<Reservation> reservations = reservationRepository.findAllByDeniedFalse();

        if (reservations.isEmpty()) {
            throw new ReservationException("There is no reservations");
        }

        return reservations.stream()
                .map(this::convertToReservationResponse)
                .collect(Collectors.toList());
    }

    /** Function for fetching all reservations created for same date */
    @Override
    public List<ReservationResponse> getAllByReservationDate(String date) {
        LocalDate localDate = LocalDate.parse(date, DateTimeUtils.dateFormatter);
        List<Reservation> reservations = reservationRepository.findAllByReservationDate(localDate);
        return reservations.stream()
                .map(this::convertToReservationResponse)
                .collect(Collectors.toList());
    }

    @Override
    public boolean denyReservation(DenyReservationRequest request) {
        Reservation reservation = reservationRepository.findById(request.getReservationId())
                .orElseThrow(NotFoundException::new);

        LocalDate date = reservation.getDate();
        LocalTime endTime = reservation.getEndTime();

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime reservationEndDateTime = LocalDateTime.of(date, endTime);

        if (reservationEndDateTime.isBefore(now)) {
            throw new ReservationException("Can't deny reservation that happend in past!");
        }

        reservation.setDenied(true);
        reservationRepository.saveAndFlush(reservation);

        if (request.isAdmin()) {
            NotificationRequest notification = new NotificationRequest();
            notification.setCreatedAt(new Date());
            notification.setMessage("This reservation has been denied by administrator.");
            notification.setRead(false);
            notification.setReservationDate(reservation.getDate());
            notification.setReservationId(reservation.getId());
            notification.setTitle("Reservation denied");
            notification.setUserId(reservation.getEmployeeId());
            notification.setType(NotificationType.ADMIN_MAKE_DENY_RESERVATION.getValue());

            notificationClient.makeNotification(notification);
        }

        return true;
    }

    private ReservationResponse convertToReservationResponse(Reservation reservation) {
        return new ReservationResponse(
                reservation.getId(),
                reservation.getCreatedAt(),
                reservation.getEmployeeId(),
                reservation.getReason(),
                reservation.getDate(),
                reservation.getStartTime(),
                reservation.getEndTime(),
                reservation.isDenied(),
                reservation.getReservationResources()
                        .stream()
                        .map(ReservationResource::getResourceId)
                        .collect(Collectors.toList()));
    }

    /**
     * Making reservation adhering to the following requirements:
     * 1. reservation should be made at least 12h before start time of reservation
     * 2. reservation shouldn't be retroactive
     * 3. no double/duplicate reservation
     */
    @Override
    public void makeReservation(CreateReservation request) {
        LocalDate date = LocalDate.parse(request.getDate(), DateTimeUtils.dateFormatter);
        LocalTime startTime = LocalTime.parse(request.getStartTime(), DateTimeUtils.timeFormatter);
        LocalTime endTime = LocalTime.parse(request.getEndTime(), DateTimeUtils.timeFormatter);

        // 1.
        if (ChronoUnit.HOURS.between(LocalDateTime.now(), LocalDateTime.of(date, startTime)) < 12) {
            throw new ReservationException("Reservation must be made at least 12 hours before the start time.");
        }

        // 2.
        if (LocalDateTime.now().isAfter(LocalDateTime.of(date, startTime))) {
            throw new ReservationException("Reservation cannot be retroactive.");
        }

        // 3.
        List<Integer> reservedResourceIds = reservationResourceRepository.findReservedResourcesByDateAndTimeRange(date,
                startTime, endTime);
        boolean isDuplicated = request.getResources().stream()
                .anyMatch(res -> reservedResourceIds.contains(res.getId()));

        if (isDuplicated) {
            throw new ReservationException("Duplicate reservation!");
        }

        Reservation reservation = new Reservation();
        reservation.setCreatedAt(new Date());
        reservation.setDate(date);
        reservation.setStartTime(startTime);
        reservation.setEndTime(endTime);
        reservation.setEmployeeId(request.getEmployeeId());
        reservation.setReason(request.getReason());
        reservation.setDenied(false);

        List<ReservationResource> reservationResources = new ArrayList<>();
        for (Resource resource : request.getResources()) {
            ReservationResource reservationResource = new ReservationResource();
            reservationResource.setReservation(reservation);
            reservationResource.setResourceId(resource.getId());
            reservationResources.add(reservationResource);
        }

        reservation.setReservationResources(reservationResources);
        reservation = reservationRepository.saveAndFlush(reservation);

        if (request.isAdmin()) {
            NotificationRequest notification = new NotificationRequest();
            notification.setCreatedAt(new Date());
            notification.setMessage("Reservation has been created by administrator");
            notification.setRead(false);
            notification.setReservationDate(reservation.getDate());
            notification.setReservationId(reservation.getId());
            notification.setTitle("New reservation");
            notification.setUserId(request.getEmployeeId());
            notification.setType(NotificationType.ADMIN_MAKE_DENY_RESERVATION.getValue());

            notificationClient.makeNotification(notification);
        }
    }

    /** Get ids of reserved resources */
    @Override
    public List<Integer> getReservedResourceIds(ReservationDate request) {
        LocalDate date = LocalDate.parse(request.getDate(), DateTimeUtils.dateFormatter);
        LocalTime startTime = LocalTime.parse(request.getStartTime(), DateTimeUtils.timeFormatter);
        LocalTime endTime = LocalTime.parse(request.getEndTime(), DateTimeUtils.timeFormatter);

        return reservationResourceRepository
                .findReservedResourcesByDateAndTimeRange(date, startTime,
                        endTime);

    }

}
