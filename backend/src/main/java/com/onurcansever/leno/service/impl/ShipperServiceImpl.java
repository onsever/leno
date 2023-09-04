package com.onurcansever.leno.service.impl;

import com.onurcansever.leno.entity.Shipper;
import com.onurcansever.leno.exception.ResourceNotFoundException;
import com.onurcansever.leno.payload.ShipperDto;
import com.onurcansever.leno.repository.ShipperRepository;
import com.onurcansever.leno.service.ShipperService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ShipperServiceImpl implements ShipperService {

    private final ShipperRepository shipperRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ShipperServiceImpl(ShipperRepository shipperRepository, ModelMapper modelMapper) {
        this.shipperRepository = shipperRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Set<ShipperDto> getAllShippers() {
        List<Shipper> shippers = this.shipperRepository.findAll();

        Set<ShipperDto> shipperDtos = shippers.stream()
                .map(this::convertToDto)
                .collect(Collectors.toSet());

        return shipperDtos;
    }

    @Override
    @PreAuthorize(value = "hasRole('ADMIN')")
    public ShipperDto createShipper(ShipperDto shipperDto) {
        Shipper shipper = this.convertToEntity(shipperDto);
        Shipper savedShipper = this.shipperRepository.save(shipper);

        return this.convertToDto(savedShipper);
    }

    @Override
    @PreAuthorize(value = "hasRole('ADMIN')")
    public void deleteShipper(Long shipperId) {
        Shipper shipper = this.shipperRepository.findById(shipperId)
                .orElseThrow(() -> new ResourceNotFoundException("Shipper", "shipperId", shipperId));

        this.shipperRepository.delete(shipper);
    }

    private ShipperDto convertToDto(Object object) {
        return modelMapper.map(object, ShipperDto.class);
    }

    private Shipper convertToEntity(Object object) {
        return modelMapper.map(object, Shipper.class);
    }

}
