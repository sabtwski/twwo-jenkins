package pwr.piisw.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Couldn't find song within Genius resources")
public class CannotFindSongWithinGeniusResources extends RuntimeException {

}
