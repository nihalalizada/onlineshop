package com.example.onlineshop.controller;

import com.example.onlineshop.model.Order;
import com.example.onlineshop.model.ShoppingCart;
import com.example.onlineshop.service.OrderService;
import com.example.onlineshop.service.PaypalService;
import com.example.onlineshop.service.ShoppingCartService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@Controller
@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
public class PaypalController {

	@Autowired
	private PaypalService paypalService;
	@Autowired
	private ShoppingCartService shoppingCartService;
	@Autowired
	private OrderService orderService;

	Order newOrder = new Order();
	ShoppingCart shoppingCart = new ShoppingCart();

	public static final String SUCCESS_URL = "pay/success";
	public static final String CANCEL_URL = "pay/cancel";

	@GetMapping("/checkout/{id}")
	public String home(Model model, @PathVariable("id") Long id) {
		shoppingCart = shoppingCartService.getCartById(id);
		Order order = new Order();
		order.setTotalPrice(shoppingCart.getTotalPrice());
		model.addAttribute("order", order);
		model.addAttribute("cartId", id);
		return "home";
	}

	@PostMapping("/pay")
	public String payment(@ModelAttribute("order") Order order) {
		newOrder.setName(order.getName());
		newOrder.setEmail(order.getEmail());
		newOrder.setAddress(order.getAddress());
		try {
			Payment payment = paypalService.createPayment(shoppingCart.getTotalPrice(), "http://localhost:8080/" + CANCEL_URL,
					"http://localhost:8080/" + SUCCESS_URL);
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

	    @GetMapping(value = SUCCESS_URL)
	    public String successPay(HttpServletRequest request, @RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
	        try {
	            Payment payment = paypalService.executePayment(paymentId, payerId);
	            System.out.println(payment.toJSON());
	            if (payment.getState().equals("approved")) {
					newOrder.setCreatedDate(LocalDateTime.now());
					newOrder.setShoppingCart(shoppingCart);
					newOrder.setTotalPrice(shoppingCart.getTotalPrice());
					orderService.saveNewOrder(newOrder);
					//String sessionToken = (String) request.getSession().getAttribute("sessionToken");
					request.getSession().removeAttribute("sessionToken");
					request.getSession().invalidate();
					shoppingCartService.updateCartStatus(shoppingCart.getCartId());
	                return "success";
	            }
	        } catch (PayPalRESTException e) {
	         System.out.println(e.getMessage());
	        }
	        return "redirect:/";
	    }

}
