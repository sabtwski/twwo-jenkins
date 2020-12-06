package pwr.piisw.backend.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pwr.piisw.backend.dtos.song.SongBasicInfo;
import pwr.piisw.backend.entities.User;
import pwr.piisw.backend.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @ApiResponse(responseCode = "200", description = "User successfully added to database or already exists")
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody String username) {
        User user = service.registerUser(username);
        return ResponseEntity.ok(user.getUsername());
    }


    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved songs marked as favourites"),
            @ApiResponse(responseCode = "404", description = "User not found"),
    })
    @GetMapping(path = "/{username}/favourites")
    public List<SongBasicInfo> getPaginatedFavourites(
            @PathVariable("username") String username,
            Pageable pageable
    ) {
        return service.getFavouritesPaginated(username, pageable);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved songs checked by user"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping(path = "/{username}/checked")
    public List<SongBasicInfo> getLatestCheckedSongs(
            @PathVariable("username") String username,
            Pageable pageable
    ) {
        return service.getLatestCheckedSongsPaginated(username, pageable);
    }

}
