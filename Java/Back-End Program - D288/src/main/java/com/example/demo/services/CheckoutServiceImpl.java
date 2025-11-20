package com.example.demo.services;

import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.demo.dao.CartRepository;
import com.example.demo.entities.Cart;
import com.example.demo.entities.CartItem;
import com.example.demo.entities.Customer;

import jakarta.transaction.Transactional;

import static com.example.demo.entities.StatusType.ordered;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CartRepository cartRepository;

    public CheckoutServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        Cart order = purchase.getCart();

        Set <CartItem> cartItems = purchase.getCartItems();
        if (order == null || cartItems == null || cartItems.isEmpty()) {
            return new PurchaseResponse("Cart must not be null or empty");
        }

        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        cartItems.forEach(order::add);

        Customer customer = purchase.getCustomer();
        customer.add(order);

        order.setStatus(ordered);

        if (order.getId() != null) order.setId(null);
        
        cartRepository.save(order);

        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {

        return UUID.randomUUID().toString();
    }

}
