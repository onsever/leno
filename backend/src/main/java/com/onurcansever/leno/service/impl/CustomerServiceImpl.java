package com.onurcansever.leno.service.impl;

import com.onurcansever.leno.entity.Customer;
import com.onurcansever.leno.exception.ResourceNotFoundException;
import com.onurcansever.leno.payload.CustomerDto;
import com.onurcansever.leno.repository.CustomerRepository;
import com.onurcansever.leno.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository, ModelMapper modelMapper) {
        this.customerRepository = customerRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public CustomerDto getCustomerById(Long customerId) {
        Customer existingCustomer = this.customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer", "id", customerId));

        return this.convertToDto(existingCustomer);
    }

    @Override
    public CustomerDto getCustomerByUsername(String username) {
        Customer existingCustomer = this.customerRepository.findByUsername(username).orElseThrow(() -> new ResourceNotFoundException("Customer", "id"));

        return this.convertToDto(existingCustomer);
    }

    @Override
    public CustomerDto getCustomerByEmail(String email) {
        Customer existingCustomer = this.customerRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Customer", "id"));

        return this.convertToDto(existingCustomer);
    }

    @Override
    @PreAuthorize(value = "hasRole('ADMIN') or #customerId == authentication.principal.customerId")
    public CustomerDto updateCustomer(CustomerDto customerDto, Long customerId) {
        Customer existingCustomer = this.customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer", "id", customerId));

        existingCustomer.setFirstName(customerDto.getFirstName());
        existingCustomer.setLastName(customerDto.getLastName());
        existingCustomer.setEmail(customerDto.getEmail());
        existingCustomer.setProfilePicture(customerDto.getProfilePicture());

        this.customerRepository.save(existingCustomer);

        return this.convertToDto(existingCustomer);
    }

    @Override
    @PreAuthorize(value = "hasRole('ADMIN') or #customerId == authentication.principal.customerId")
    public void deleteCustomer(Long customerId) {
        Customer existingCustomer = this.customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer", "id", customerId));

        existingCustomer.setRoles(new HashSet<>());
        this.customerRepository.save(existingCustomer);

        this.customerRepository.delete(existingCustomer);
    }

    private CustomerDto convertToDto(Customer customer) {
        return this.modelMapper.map(customer, CustomerDto.class);
    }

    private Customer convertToEntity(CustomerDto customerDto) {
        return this.modelMapper.map(customerDto, Customer.class);
    }

}
