package pwr.piisw.backend.dtos.inbound;

import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.piisw.backend.dtos.song.SongQueryInfo;

@Data
@NoArgsConstructor
public class SongDetailsRequest {
    String username;
    SongQueryInfo song;
}
