package pwr.piisw.backend.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pwr.piisw.backend.dtos.inbound.SongDetailsRequest;
import pwr.piisw.backend.dtos.outbound.SongDetailsResponse;
import pwr.piisw.backend.entities.Song;
import pwr.piisw.backend.exceptions.CannotFindSongWithinGeniusResources;
import pwr.piisw.backend.services.SongCrudService;
import pwr.piisw.backend.services.SongRetrievalService;

import javax.transaction.Transactional;
import java.util.Optional;

@RestController
@RequestMapping("/song")
@RequiredArgsConstructor
public class SongController {

    private final SongRetrievalService retrievalService;
    private final SongCrudService crudService;

    @Operation(description = "Gets information about song with its lyrics from database or scrapes it from genius")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved song information"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "404", description = "Couldn't find song within Genius resources"),
            @ApiResponse(responseCode = "503", description = "Genius not available"),
            @ApiResponse(responseCode = "503", description = "Cannot authenticate to Genius"),
            @ApiResponse(responseCode = "500", description = "Exception during Genius scraping")
    })
    @PostMapping
    @Transactional
    public ResponseEntity<SongDetailsResponse> checkSongDetails(@RequestBody SongDetailsRequest songDetailsRequest) throws InterruptedException {
        Optional<Song> song = retrievalService.getSong(songDetailsRequest.getSong());
        song.ifPresent(s -> crudService.markAsChecked(s, songDetailsRequest.getUsername()));
        Optional<SongDetailsResponse> responseBody = song.map(s -> new SongDetailsResponse(s, songDetailsRequest.getUsername()));
        return responseBody.map(ResponseEntity::ok)
                .orElseThrow(CannotFindSongWithinGeniusResources::new);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully marked song as favourite or song was already marked as favourite"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "404", description = "Song not found")
    })
    @PostMapping("/{songId}")
    public ResponseEntity<String> markAsFavourite(@PathVariable Long songId, @RequestBody String username) {
        crudService.markAsFavourite(songId, username);
        return ResponseEntity.ok("succeed");
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully deleted song from favourite or song was not marked as favourite"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "404", description = "Song not found")
    })
    @DeleteMapping("/{songId}")
    public ResponseEntity<String> deleteFromFavourite(@PathVariable Long songId, @RequestBody String username) {
        crudService.deleteFromFavourite(songId, username);
        return ResponseEntity.ok("succeed");
    }
}
