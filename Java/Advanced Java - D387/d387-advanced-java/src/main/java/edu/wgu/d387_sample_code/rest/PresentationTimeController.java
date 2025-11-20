package edu.wgu.d387_sample_code.rest;

import org.springframework.web.bind.annotation.RestController;

import edu.wgu.d387_sample_code.translation.TimeConversionService;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class PresentationTimeController {

    private final TimeConversionService timeConversionService = new TimeConversionService();

    @GetMapping("/presentation-times")
    public Map<String, String> getPresentationTimes(@RequestParam String et) {
        return timeConversionService.getTimeConversions(et);
    }
}
