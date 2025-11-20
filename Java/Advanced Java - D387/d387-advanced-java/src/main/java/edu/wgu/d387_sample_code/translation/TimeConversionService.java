package edu.wgu.d387_sample_code.translation;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

public class TimeConversionService {

    public Map<String, String> getTimeConversions(String hhmmEt) {
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        DateTimeFormatter displayFormatter = DateTimeFormatter.ofPattern("hh:mm a");
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy");
        
        LocalTime eventTime = LocalTime.parse(hhmmEt, formatter);
        LocalDate eventDate = LocalDate.now();
        LocalDateTime eventDateTime = LocalDateTime.of(eventDate, eventTime);

        ZoneId easternZID = ZoneId.of("America/New_York");
        ZoneId mountainZID = ZoneId.of("America/Denver");
        ZoneId utcZID = ZoneId.of("UTC");

        ZonedDateTime zonedDTEastern = eventDateTime.atZone(easternZID);
        ZonedDateTime zonedDTMountain = zonedDTEastern.withZoneSameInstant(mountainZID);
        ZonedDateTime zonedDTUTC = zonedDTEastern.withZoneSameInstant(utcZID);

        String formattedDate = dateFormatter.format(zonedDTEastern);
        String formattedDTEastern = displayFormatter.format(zonedDTEastern);
        String formattedDTMountain = displayFormatter.format(zonedDTMountain);
        String formattedDTUTC = displayFormatter.format(zonedDTUTC);

        return Map.of(
            "date", formattedDate,
            "et", formattedDTEastern + " ET",
            "mt", formattedDTMountain + " MT",
            "utc", formattedDTUTC + " UTC"
        );
    }
}
