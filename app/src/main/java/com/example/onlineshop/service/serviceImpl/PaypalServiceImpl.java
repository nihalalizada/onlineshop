package com.example.onlineshop.service.serviceImpl;

import com.example.onlineshop.service.PaypalService;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class PaypalServiceImpl implements PaypalService {
	
	@Autowired
	private APIContext apiContext;
	
	@Override
	public Payment createPayment(
			Double total,
			String cancelUrl, 
			String successUrl) throws PayPalRESTException{
		Amount amount = new Amount();
		amount.setCurrency("EUR");
		total = new BigDecimal(total).setScale(2, RoundingMode.HALF_UP).doubleValue();
		amount.setTotal(String.format(Locale.US, "%.2f", total));

		Transaction transaction = new Transaction();
		transaction.setDescription("online-shop payment");
		transaction.setAmount(amount);

		List<Transaction> transactions = new ArrayList<>();
		transactions.add(transaction);

		Payer payer = new Payer();
		payer.setPaymentMethod("paypal");

		Payment payment = new Payment();
		payment.setIntent("order");
		payment.setPayer(payer);
		payment.setTransactions(transactions);
		RedirectUrls redirectUrls = new RedirectUrls();
		redirectUrls.setCancelUrl(cancelUrl);
		redirectUrls.setReturnUrl(successUrl);
		payment.setRedirectUrls(redirectUrls);

		return payment.create(apiContext);
	}

	@Override
	public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException{
		Payment payment = new Payment();
		payment.setId(paymentId);
		PaymentExecution paymentExecute = new PaymentExecution();
		paymentExecute.setPayerId(payerId);
		return payment.execute(apiContext, paymentExecute);
	}

}
