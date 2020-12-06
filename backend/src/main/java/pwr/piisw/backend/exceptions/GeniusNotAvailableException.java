package pwr.piisw.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.SERVICE_UNAVAILABLE, reason = "Genius is not available")
public class GeniusNotAvailableException extends RuntimeException {

    public GeniusNotAvailableException(String message, Throwable cause) {
        super(message, cause);
    }
}
