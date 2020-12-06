package pwr.piisw.backend.dtos.genius;

import lombok.NonNull;
import lombok.Value;

@Value
public class GeniusSongInfo {
    @NonNull String title;
    @NonNull String artist;
    @NonNull String photoUrl;
    @NonNull String geniusUrl;
}
