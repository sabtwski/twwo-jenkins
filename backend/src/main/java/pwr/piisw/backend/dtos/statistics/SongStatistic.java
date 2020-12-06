package pwr.piisw.backend.dtos.statistics;

import lombok.Data;
import lombok.NoArgsConstructor;
import pwr.piisw.backend.dtos.song.SongBasicInfo;
import pwr.piisw.backend.entities.Song;

@Data
@NoArgsConstructor
public class SongStatistic {
    SongBasicInfo song;
    long count;

    public SongStatistic(Song song, long count) {
        this.song = new SongBasicInfo(song);
        this.count = count;
    }
}
