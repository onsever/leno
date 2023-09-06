package com.onurcansever.leno.payload;

import com.onurcansever.leno.entity.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class ProductDetailDto {
    private Long productId;
    private String name;
    private String description;
    private String image;
    private Double price;

    private CustomerDto customer;

    private Set<CategoryDto> categories;
    private Set<ReviewResponse> reviews;

    public ProductDetailDto(Product product, CustomerDto customer, Set<CategoryDto> categories, Set<ReviewResponse> reviews) {
        this.productId = product.getProductId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.image = product.getImage();
        this.price = product.getPrice();

        if (customer != null) {
            this.customer = customer;
        }

        this.categories = categories;
        this.reviews = reviews;
    }

}
