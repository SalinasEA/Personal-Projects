package edu.wgu.d387_sample_code.translation;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;

public class WelcomeMessageThreadService {

    public List<String> getAllMessages() {
        List<String> messages = Collections.synchronizedList(new ArrayList<>());

        Runnable enTranslation = () -> messages.add(DisplayWelcomeMessage.getWelcomeMessage(Locale.US));
        Runnable frTranslation = () -> messages.add(DisplayWelcomeMessage.getWelcomeMessage(Locale.CANADA_FRENCH));

        Thread enThread = new Thread(enTranslation);
        Thread frThread = new Thread(frTranslation);

        enThread.start();
        frThread.start();
        
        try {
            enThread.join();
            frThread.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        return messages;
    }
}
