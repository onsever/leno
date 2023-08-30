package com.onurcansever.leno.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public final class ProductDto {
    private Long productId;
    private String name;
    private String description;
    private String image;
    private Double price;
}
