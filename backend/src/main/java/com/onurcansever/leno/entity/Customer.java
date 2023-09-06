package com.onurcansever.leno.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "customer",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"username"}),
                @UniqueConstraint(columnNames = {"email"}),
        }
)
public class Customer extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    @Column(length = 30)
    private String firstName;

    @Column(length = 30)
    private String lastName;

    @Column(length = 30, unique = true, nullable = false)
    private String username;

    @Column(length = 100, unique = true, nullable = false)
    private String email;

    @Column(length = 255)
    private String password;

    @Column(length = 15)
    private String phoneNumber;

    @Column(length = 200)
    private String profilePicture;

    @Column(length = 20)
    private String role;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "customer_roles",
            joinColumns = @JoinColumn(name = "customer_id", referencedColumnName = "customerId"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "roleId")
    )
    private Set<Role> roles;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Address> addresses;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Product> products;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "customer_wishlist",
            joinColumns = @JoinColumn(name = "customer_id", referencedColumnName = "customerId"),
            inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "productId")
    )
    private Set<Product> wishlist;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private Set<CartItem> cartItems;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Order> orders;

}
