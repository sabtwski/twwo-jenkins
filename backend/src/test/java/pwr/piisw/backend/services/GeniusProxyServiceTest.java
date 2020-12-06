package pwr.piisw.backend.services;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.core.Options;
import com.github.tomakehurst.wiremock.http.Fault;
import org.assertj.core.api.ThrowableAssert;
import org.junit.jupiter.api.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;
import pwr.piisw.backend.dtos.genius.GeniusSongInfo;
import pwr.piisw.backend.exceptions.CannotParseGeniusResponseException;
import pwr.piisw.backend.exceptions.GeniusAuthorizationException;
import pwr.piisw.backend.exceptions.GeniusNotAvailableException;

import java.util.Optional;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class GeniusProxyServiceTest {

    private final int PORT = 8888;
    private final String TOKEN = "TEST TOKEN";
    private String searchEndpoint = "/search";

    private WireMockServer geniusMock;

    private GeniusProxyService service;

    @BeforeEach
    public void setup() {
        Options options = wireMockConfig().port(PORT);
        geniusMock = new WireMockServer(options);
        geniusMock.start();

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setUriTemplateHandler(new DefaultUriBuilderFactory("http://localhost:" + PORT));
        service = new GeniusProxyService(restTemplate, searchEndpoint, TOKEN);
    }

    @AfterEach
    public void teardown() {
        geniusMock.stop();
    }

    @Test
    public void givenMultipleGeniusResults_whenQuerySearch_thenReturnFirstSongParsedOptional() {
        // given
        geniusMock.stubFor(
            get(urlPathEqualTo(searchEndpoint))
                .withHeader("Authorization", equalTo(String.format("Bearer %s", TOKEN)))
                .withQueryParam("q", equalTo("Kendrick Lamar"))
            .willReturn(aResponse()
                .withBodyFile("genius-multiple.json")
                .withHeader("Content-Type", "application/json")
            )
        );

        // when
        GeniusSongInfo response = service.searchForSong("Kendrick Lamar").get();

        // then
        assertThat(response.getArtist()).isEqualTo("Kendrick Lamar");
        assertThat(response.getTitle()).isEqualTo("HUMBLE.");
        assertThat(response.getGeniusUrl()).isEqualTo("https://genius.com/Kendrick-lamar-humble-lyrics");
        assertThat(response.getPhotoUrl()).isEqualTo("https://images.genius.com/4387b0bcc88e07676997ba73793cc73c.1000x1000x1.jpg");
    }

    @Test
    public void givenParsingException_whenProcessGeniusResponse_thenThrowCannotParseException() {
        // given
        geniusMock.stubFor(
            get(urlPathEqualTo(searchEndpoint))
                .withHeader("Authorization", equalTo(String.format("Bearer %s", TOKEN)))
                .withQueryParam("q", equalTo("Simulate API strange behaviour"))
            .willReturn(aResponse()
                .withBodyFile("genius-broken.json")
                .withHeader("Content-Type", "application/json")
        )
        );

        // when
        ThrowableAssert.ThrowingCallable exceptionCause = () -> service.searchForSong("Simulate API strange behaviour");

        // then
        assertThatThrownBy(exceptionCause)
            .isInstanceOf(CannotParseGeniusResponseException.class);
    }

    @Test
    public void givenGeniusEmptyResponse_whenQuerySearch_thenReturnEmptyOptional() {
        // given
        geniusMock.stubFor(
            get(urlPathEqualTo(searchEndpoint))
                .withHeader("Authorization", equalTo(String.format("Bearer %s", TOKEN)))
                .withQueryParam("q", equalTo("Song that does not exist"))
            .willReturn(aResponse()
                .withBodyFile("genius-empty.json")
                .withHeader("Content-Type", "application/json")
            )
        );

        // when
        Optional<GeniusSongInfo> result = service.searchForSong("Song that does not exist");

        // then
        assertThat(result.isEmpty()).isTrue();
    }

    @Test
    public void givenGeniusConnectionIssue_whenQuerySearch_thenThrowExternalResourceNotAvailableException() {
        // given
        geniusMock.stubFor(
            get(urlPathEqualTo(searchEndpoint))
                .withHeader("Authorization", equalTo(String.format("Bearer %s", TOKEN)))
                .withQueryParam("q", equalTo(""))
            .willReturn(aResponse()
                    .withFault(Fault.RANDOM_DATA_THEN_CLOSE)
            )
        );

        // when
        ThrowableAssert.ThrowingCallable exceptionCause = () -> service.searchForSong("");

        // then
        assertThatThrownBy(exceptionCause)
                .isInstanceOf(GeniusNotAvailableException.class);
    }

    @Test
    public void givenAuthenticationException_whenQuerySearch_thenThrowResourceNotAvailableException() {
        // given
        geniusMock.stubFor(
            get(urlPathEqualTo(searchEndpoint))
            .willReturn(unauthorized())
        );

        // when
        ThrowableAssert.ThrowingCallable exceptionCause = () -> service.searchForSong("");

        // then
        assertThatThrownBy(exceptionCause)
                .isInstanceOf(GeniusAuthorizationException.class);
    }
}
