package edu.wgu.d387_sample_code.rest;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.wgu.d387_sample_code.translation.WelcomeMessageThreadService;

@RestController
public class WelcomeController {

    private final WelcomeMessageThreadService welcomeMessageThreadService = new WelcomeMessageThreadService();

    @GetMapping("/welcome")
    public List<String> getWelcomeMessages() {
        return welcomeMessageThreadService.getAllMessages();
    }
}
