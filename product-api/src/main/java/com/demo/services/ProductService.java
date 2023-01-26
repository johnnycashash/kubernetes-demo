package com.demo.services;

import com.demo.entities.Product;

public interface ProductService {

    Iterable<Product> listAllProducts();

    Product getProductById(Integer id);

    Product saveProduct(Product product);

    String deleteProduct(Integer id);

}
