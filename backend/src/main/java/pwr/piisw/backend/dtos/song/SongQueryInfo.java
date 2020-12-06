package pwr.piisw.backend.dtos.song;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import pwr.piisw.backend.dtos.genius.GeniusSongInfo;

import java.util.Arrays;

@Data
@NoArgsConstructor
public class SongQueryInfo {
    @NonNull String title;
    @NonNull String artist;
    @NonNull String album;
    @NonNull String spotifyUri;
    @NonNull String photoUrl;
    @NonNull int releaseYear;

    public String toString() {
        return joinArguments(" ", title, artist);
    }

    private String joinArguments(String separator, String... arguments) {
        return Arrays.stream(arguments)
                .reduce("", (acc, next) -> acc + separator + next)
                .strip();
    }

    public boolean doesMatchWithGeniusResponse(GeniusSongInfo song) {
        return title.equalsIgnoreCase(song.getTitle())
            && artist.equalsIgnoreCase(song.getArtist());
    }
}
