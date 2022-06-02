package com.example.onlineshop.exception;

public class NoSuchCartItemException extends RuntimeException{
    public NoSuchCartItemException(String message) {
        super(message);
    }
}
