package com.onurcansever.leno.service.impl;

import com.onurcansever.leno.payload.CustomerDto;
import com.onurcansever.leno.service.CustomerService;
import org.springframework.stereotype.Service;

@Service
public final class CustomerServiceImpl implements CustomerService {

    @Override
    public CustomerDto getCustomerById(Long customerId) {
        return null;
    }

    @Override
    public CustomerDto getCustomerByUsername(String username) {
        return null;
    }

    @Override
    public CustomerDto getCustomerByEmail(String email) {
        return null;
    }

    @Override
    public CustomerDto createCustomer(CustomerDto customerDto) {
        return null;
    }

    @Override
    public CustomerDto updateCustomer(CustomerDto customerDto, Long customerId) {
        return null;
    }

    @Override
    public void deleteCustomer(Long customerId) {

    }

}
