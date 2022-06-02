package com.example.onlineshop.service;

import com.paypal.api.payments.*;
import com.paypal.base.rest.PayPalRESTException;

public interface PaypalService {

    Payment createPayment(Double total, String cancelUrl, String successUrl) throws PayPalRESTException;

    Payment executePayment(String paymentId, String payerId) throws PayPalRESTException;
}
