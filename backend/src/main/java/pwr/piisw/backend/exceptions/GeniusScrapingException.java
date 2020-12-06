package pwr.piisw.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Exception during Genius scraping")
public class GeniusScrapingException extends RuntimeException {

    public GeniusScrapingException(String message) {
        super(message);
    }

    public GeniusScrapingException(String message, Throwable cause) {
        super(message, cause);
    }
}
