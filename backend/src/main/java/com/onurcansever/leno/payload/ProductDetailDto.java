package com.onurcansever.leno.payload;

import com.onurcansever.leno.entity.Customer;
import com.onurcansever.leno.entity.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductDetailDto {
    private Long productId;
    private String name;
    private String description;
    private String image;
    private Double price;

    private Long customerId;
    private String username;
    private String profilePicture;

    public ProductDetailDto(Product product, Customer customer) {
        this.productId = product.getProductId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.image = product.getImage();
        this.price = product.getPrice();

        if (customer != null) {
            this.customerId = customer.getCustomerId();
            this.username = customer.getUsername();
            this.profilePicture = customer.getProfilePicture();
        }
    }

}
