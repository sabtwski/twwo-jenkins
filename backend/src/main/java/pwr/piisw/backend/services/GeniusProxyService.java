package pwr.piisw.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;
import pwr.piisw.backend.dtos.genius.GeniusSongInfo;
import pwr.piisw.backend.exceptions.CannotParseGeniusResponseException;
import pwr.piisw.backend.exceptions.GeniusAuthorizationException;
import pwr.piisw.backend.exceptions.GeniusNotAvailableException;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

@Service
public class GeniusProxyService {

    private RestTemplate template;
    private String searchEndpoint;
    private String bearerToken;

    public GeniusProxyService(
            RestTemplate template,
            @Value("${genius.api.endpoints.search}") String searchEndpoint,
            @Value("${genius.api.token}") String bearerToken
    ) {
        this.template = template;
        this.searchEndpoint = searchEndpoint;
        this.bearerToken = bearerToken;
    }

    public Optional<GeniusSongInfo> searchForSong(String query) {
        try {
            ResponseEntity<Map> response = queryForSongs(query);
            return mapToGeniusSongInfo(response);
        } catch (ResourceAccessException e) {
            throw new GeniusNotAvailableException(e.getMessage(), e.getCause());
        } catch (HttpClientErrorException.Unauthorized e) {
            throw new GeniusAuthorizationException(e.getMessage(), e.getCause());
        }
    }

    private ResponseEntity<Map> queryForSongs(String query) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", String.format("Bearer %s", bearerToken));
        HttpEntity<?> entity = new HttpEntity<>(headers);
        String url = searchEndpoint + "?q=" + query;
        return template.exchange(url, HttpMethod.GET, entity, Map.class);
    }

    private Optional<GeniusSongInfo> mapToGeniusSongInfo(ResponseEntity<Map> jsonElement) {
        try {
            Optional<Map> result = getFirstResultFromResponse(jsonElement.getBody());
            return result.map(r -> new GeniusSongInfo(
                            (String) r.get("title"),
                            (String) ((Map) r.get("primary_artist")).get("name"),
                            (String) r.get("song_art_image_url"),
                            (String) r.get("url")
                    )
            );
        } catch (NullPointerException e) {
            throw new CannotParseGeniusResponseException(e.getMessage(), e.getCause());
        }
    }

    private Optional<Map> getFirstResultFromResponse(Map responseBody) {
        Map response = (Map) responseBody.get("response");
        ArrayList hits = (ArrayList) response.get("hits");
        return hits.isEmpty()
                ? Optional.empty()
                : Optional.of((Map) ((Map) hits.get(0)).get("result"));
    }

}
