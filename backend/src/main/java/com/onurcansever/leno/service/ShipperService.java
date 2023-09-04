package com.onurcansever.leno.service;

import com.onurcansever.leno.payload.ShipperDto;

import java.util.Set;

public interface ShipperService {

    Set<ShipperDto> getAllShippers();

    ShipperDto createShipper(ShipperDto shipperDto);

    void deleteShipper(Long shipperId);

}
