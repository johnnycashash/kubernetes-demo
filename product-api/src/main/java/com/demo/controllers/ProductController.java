package com.demo.controllers;

import com.demo.entities.Product;
import com.demo.services.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


/**
 * Product controller.
 */
@RestController
@RequestMapping(path = "/products")
@Slf4j
public class ProductController {
    @Autowired
    private ProductService productService;


    /**
     * List all products.
     *
     * @return
     */
    @GetMapping
    public Iterable<Product> getAllProducts() {
        log.info("getAllProducts");
        return productService.listAllProducts();
    }

    /**
     * View a specific product by its id.
     *
     * @param id
     * @return
     */
    @GetMapping(path = "/{id}")
    public Product getProduct(@PathVariable Integer id) {
        log.info("getProduct");
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
        log.info("saveProduct");
        return productService.saveProduct(product);
    }

    /**
     * Delete product by its id.
     *
     * @param id
     * @return
     */
    @DeleteMapping(path = "/{id}")
    public String delete(@PathVariable("id") Integer id) {
        log.info("delete");
        return productService.deleteProduct(id);
    }

}
