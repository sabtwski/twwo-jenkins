package pwr.piisw.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Can not parse Genius response")
public class CannotParseGeniusResponseException extends RuntimeException {

    public CannotParseGeniusResponseException(String message, Throwable cause) {
        super(message, cause);
    }
}
