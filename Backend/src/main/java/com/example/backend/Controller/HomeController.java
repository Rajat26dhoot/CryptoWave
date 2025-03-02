package com.example.backend.Controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping
    public String home(){
        return "Wellcome to trading";
    }

    @GetMapping("/api")
    public String secure(){
        return "Wellcome to trading secure";
    }
}
