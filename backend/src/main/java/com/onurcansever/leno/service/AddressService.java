package com.onurcansever.leno.service;

import com.onurcansever.leno.payload.AddressDto;

import java.util.List;

public interface AddressService {

    AddressDto createAddressForCustomer(AddressDto addressDto, Long customerId);

    List<AddressDto> getAllAddressesForCustomer(Long customerId);

    AddressDto updateAddressForCustomer(AddressDto addressDto, Long customerId);

    void deleteAddressFromCustomer(Long addressId, Long customerId);

}
