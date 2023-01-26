package com.demo.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Product entity.
 */
@Getter
@Setter
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "productId")
    private String productId;
    @Column(name = "name")
    private String name;
    @Column(name = "price")
    private BigDecimal price;

}
