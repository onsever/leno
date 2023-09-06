package com.onurcansever.leno.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Shipper extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shipperId;

    @Column(length = 100, unique = true, nullable = false)
    private String name;

    @Column(columnDefinition = "DECIMAL(10,2)", nullable = false)
    private Double cost;

}
