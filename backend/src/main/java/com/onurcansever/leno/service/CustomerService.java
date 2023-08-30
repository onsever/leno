package com.onurcansever.leno.service;

import com.onurcansever.leno.payload.CustomerDto;

public interface CustomerService {

    CustomerDto getCustomerById(Long customerId);

    CustomerDto getCustomerByUsername(String username);

    CustomerDto getCustomerByEmail(String email);

    CustomerDto updateCustomer(CustomerDto customerDto, Long customerId);

    void deleteCustomer(Long customerId);

}
