package pwr.piisw.backend.dtos.outbound;

import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.piisw.backend.dtos.song.SongDetailedInfo;
import pwr.piisw.backend.entities.Favourite;
import pwr.piisw.backend.entities.Song;

import java.util.Set;

@Data
@NoArgsConstructor
public class SongDetailsResponse {
    boolean isFavourite;
    SongDetailedInfo song;
    String errorMessage;

    public SongDetailsResponse(Song song, String username) {
        Set<Favourite> likedBy = song.getLikedBy();
        this.isFavourite = likedBy != null && likedBy.stream()
                .anyMatch(fav -> fav.getUser().getUsername().equals(username));
        this.song = new SongDetailedInfo(song);
    }

}
