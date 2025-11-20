package edu.wgu.d387_sample_code.translation;

import java.util.Locale;
import java.util.ResourceBundle;

public class DisplayWelcomeMessage {

    public static String getWelcomeMessage(Locale locale) {
        ResourceBundle bundle = ResourceBundle.getBundle("translation", locale);
        return bundle.getString("welcome");
    }

}
