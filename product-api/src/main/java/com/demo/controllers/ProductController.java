package com.demo.controllers;

import com.demo.entities.Product;
import com.demo.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


/**
 * Product controller.
 */
@RestController("/products")
public class ProductController {
    @Autowired
    private ProductService productService;


    /**
     * List all products.
     *
     * @return
     */
    @GetMapping("/")
    public Iterable<Product> getAllProducts() {
        return productService.listAllProducts();
    }

    /**
     * View a specific product by its id.
     *
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Integer id) {
        return productService.getProductById(id);
    }

    /**
     * Save product to database.
     *
     * @param product
     * @return
     */
    @PostMapping
    public Product saveProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    /**
     * Delete product by its id.
     *
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id) {
        return productService.deleteProduct(id);
    }

}
