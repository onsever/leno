package com.onurcansever.leno.repository;

import com.onurcansever.leno.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByEmail(String email);

    Optional<Customer> findByUsername(String username);

    Boolean existsByEmail(String email);

}
