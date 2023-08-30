package com.onurcansever.leno.repository;

import com.onurcansever.leno.entity.Role;
import com.onurcansever.leno.utility.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> getRoleByName(RoleType name);

}
