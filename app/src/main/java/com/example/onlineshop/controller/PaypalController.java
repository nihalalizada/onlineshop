package com.example.onlineshop.controller;

import com.example.onlineshop.model.Order;
import com.example.onlineshop.model.ShoppingCart;
import com.example.onlineshop.repository.OrderRepository;
import com.example.onlineshop.repository.ShoppingCartRepository;
import com.example.onlineshop.service.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Controller
@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
public class PaypalController {

	@Autowired
	PaypalService paypalService;
	@Autowired
	ShoppingCartRepository shoppingCartRepository;
	@Autowired
	OrderRepository orderRepository;

	Order newOrder = new Order();

	public static final String SUCCESS_URL = "pay/success";
	public static final String CANCEL_URL = "pay/cancel";

	@GetMapping("/checkout")
	public String home(Model model) {
		Order order = new Order();
		model.addAttribute("order", order);
		return "home";
	}

	@PostMapping("/pay/{id}")
	public String payment(@ModelAttribute("order") Order order, @PathVariable("id") Long id) {
		ShoppingCart shoppingCart = shoppingCartRepository.getById(id);
		newOrder.setName(order.getName());
		newOrder.setEmail(order.getEmail());
		newOrder.setAddress(order.getAddress());
		try {
			Payment payment = paypalService.createPayment(shoppingCart.getTotalPrice(), "http://localhost:8080/" + CANCEL_URL,
					"http://localhost:8080/" + SUCCESS_URL + "?id="+id);
			for(Links link:payment.getLinks()) {
				if(link.getRel().equals("approval_url")) {
					return "redirect:"+link.getHref();
				}
			}
			
		} catch (PayPalRESTException e) {
			e.printStackTrace();
		}
		return "redirect:/";
	}
	
	 @GetMapping(value = CANCEL_URL)
	    public String cancelPay() {
	        return "cancel";
	    }

	    @GetMapping(value = SUCCESS_URL+"/{id}")
	    public String successPay(@PathVariable("id") Long id, @RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
	        try {
	            Payment payment = paypalService.executePayment(paymentId, payerId);
	            System.out.println(payment.toJSON());
	            if (payment.getState().equals("approved")) {
					ShoppingCart shoppingCart = shoppingCartRepository.getById(id);
					newOrder.setCreatedDate(Timestamp.valueOf(LocalDateTime.now()));
					newOrder.setShoppingCart(shoppingCart);
					newOrder.setTotalPrice(shoppingCart.getTotalPrice());
					orderRepository.save(newOrder);
	                return "success";
	            }
	        } catch (PayPalRESTException e) {
	         System.out.println(e.getMessage());
	        }
	        return "redirect:/";
	    }

}
