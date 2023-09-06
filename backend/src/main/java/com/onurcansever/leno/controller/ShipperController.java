package com.onurcansever.leno.controller;

import com.onurcansever.leno.payload.ShipperDto;
import com.onurcansever.leno.service.ShipperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/shipper")
public class ShipperController {

    private final ShipperService shipperService;

    @Autowired
    public ShipperController(ShipperService shipperService) {
        this.shipperService = shipperService;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Set<ShipperDto>> getAllShippers() {
        return new ResponseEntity<>(this.shipperService.getAllShippers(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ShipperDto> createShipper(@RequestBody ShipperDto shipperDto) {
        return new ResponseEntity<>(this.shipperService.createShipper(shipperDto), HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/{shipperId}")
    public ResponseEntity<String> deleteShipper(@PathVariable Long shipperId) {
        this.shipperService.deleteShipper(shipperId);

        return new ResponseEntity<>("Shipper has been deleted successfully!", HttpStatus.NO_CONTENT);
    }

}
