package com.onurcansever.leno.controller;

import com.onurcansever.leno.payload.AddressDto;
import com.onurcansever.leno.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    private final AddressService addressService;

    @Autowired
    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    // Get All Addresses For Customer
    @GetMapping(value = "/{customerId}")
    public ResponseEntity<List<AddressDto>> getAllAddressesForCustomer(@PathVariable Long customerId) {
        return new ResponseEntity<>(this.addressService.getAllAddressesForCustomer(customerId), HttpStatus.OK);
    }

    @PostMapping(value = "/{customerId}")
    public ResponseEntity<AddressDto> createAddressForCustomer(@RequestBody AddressDto addressDto, @PathVariable Long customerId) {
        return new ResponseEntity<>(this.addressService.createAddressForCustomer(addressDto, customerId), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{customerId}")
    public ResponseEntity<AddressDto> updateAddressForCustomer(@RequestBody AddressDto addressDto, @PathVariable Long customerId) {
        return new ResponseEntity<>(this.addressService.updateAddressForCustomer(addressDto, customerId), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{customerId}/{addressId}")
    public ResponseEntity<String> deleteAddressFromCustomer(@PathVariable Long addressId, @PathVariable Long customerId) {
        this.addressService.deleteAddressFromCustomer(addressId, customerId);

        return new ResponseEntity<>("Address deleted successfully", HttpStatus.NO_CONTENT);
    }

}
