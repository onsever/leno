package com.onurcansever.leno.controller;

import com.onurcansever.leno.payload.CustomerDto;
import com.onurcansever.leno.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping(value = "/{customerId}")
    public ResponseEntity<CustomerDto> getCustomerById(@PathVariable Long customerId) {
        return new ResponseEntity<>(this.customerService.getCustomerById(customerId), HttpStatus.OK);
    }

    @PutMapping(value = "/{customerId}")
    public ResponseEntity<CustomerDto> updateCustomer(@RequestBody CustomerDto customerDto, @PathVariable Long customerId) {
        return new ResponseEntity<>(this.customerService.updateCustomer(customerDto, customerId), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{customerId}")
    public ResponseEntity<String> deleteCustomerById(@PathVariable Long customerId) {
        this.customerService.deleteCustomer(customerId);

        return new ResponseEntity<>(String.format("Customer with id %d has been deleted successfully!", customerId), HttpStatus.NO_CONTENT);
    }

}
