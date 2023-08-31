package com.onurcansever.leno.service.impl;

import com.onurcansever.leno.entity.Address;
import com.onurcansever.leno.entity.Customer;
import com.onurcansever.leno.exception.ResourceNotFoundException;
import com.onurcansever.leno.payload.AddressDto;
import com.onurcansever.leno.repository.AddressRepository;
import com.onurcansever.leno.repository.CustomerRepository;
import com.onurcansever.leno.service.AddressService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final CustomerRepository customerRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public AddressServiceImpl(AddressRepository addressRepository, CustomerRepository customerRepository, ModelMapper modelMapper) {
        this.addressRepository = addressRepository;
        this.customerRepository = customerRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    @PreAuthorize(value = "hasRole('ADMIN') or #customerId == authentication.principal.customerId")
    public AddressDto createAddressForCustomer(AddressDto addressDto, Long customerId) {
        Customer customer = this.customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer", "id", customerId));

        Address address = this.convertToEntity(addressDto);

        address.setCustomer(customer);

        this.addressRepository.save(address);

        return this.convertToDto(address);
    }

    @Override
    public List<AddressDto> getAllAddressesForCustomer(Long customerId) {
        Customer customer = this.customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer", "id", customerId));

        List<Address> addresses = customer.getAddresses();

        return addresses.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    @PreAuthorize(value = "hasRole('ADMIN') or #customerId == authentication.principal.customerId")
    public AddressDto updateAddressForCustomer(AddressDto addressDto, Long customerId) {
        Customer customer = this.customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer", "id", customerId));

        Address address = this.addressRepository.findById(addressDto.getAddressId()).orElseThrow(() -> new ResourceNotFoundException("Address", "id", addressDto.getAddressId()));

        address.setStreet(addressDto.getStreet());
        address.setCity(addressDto.getCity());
        address.setState(addressDto.getState());
        address.setPostalCode(addressDto.getPostalCode());
        address.setCountry(addressDto.getCountry());

        address.setCustomer(customer);

        this.addressRepository.save(address);

        return this.convertToDto(address);
    }

    @Override
    @PreAuthorize(value = "hasRole('ADMIN') or #customerId == authentication.principal.customerId")
    public void deleteAddressFromCustomer(Long addressId, Long customerId) {
        Customer customer = this.customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer", "id", customerId));

        // Delete address from customer
        customer.getAddresses().removeIf(address -> address.getAddressId().equals(addressId));

        // Delete address from database
        this.addressRepository.deleteById(addressId);

        // Update customer
        this.customerRepository.save(customer);
    }

    private AddressDto convertToDto(Address address) {
        return modelMapper.map(address, AddressDto.class);
    }

    private Address convertToEntity(AddressDto addressDto) {
        return modelMapper.map(addressDto, Address.class);
    }
}
