package pwr.piisw.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.SERVICE_UNAVAILABLE, reason = "Cannot authenticate to Genius")
public class GeniusAuthorizationException extends RuntimeException {

    public GeniusAuthorizationException(String message, Throwable cause) {
        super(message, cause);
    }
}
