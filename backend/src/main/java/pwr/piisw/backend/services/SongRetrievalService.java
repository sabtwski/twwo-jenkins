package pwr.piisw.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pwr.piisw.backend.dtos.song.SongQueryInfo;
import pwr.piisw.backend.dtos.genius.GeniusSongInfo;
import pwr.piisw.backend.entities.Song;
import pwr.piisw.backend.repositories.SongRepository;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SongRetrievalService {

    private final GeniusProxyService proxy;
    private final LyricsScraperService scraper;
    private final SongRepository songRepository;
    private final Supervisor supervisor;

    @Transactional // lyrics are stored as lob in db
    public Optional<Song> getSong(SongQueryInfo songQueryInfo) {
        return supervisor.performSupervised(() -> {
            Optional<Song> storedSong = songRepository.findByTitleAndArtist(songQueryInfo.getTitle(), songQueryInfo.getArtist());
            return storedSong.isPresent()
                    ? storedSong
                    : scrapeAndStore(songQueryInfo);
        });
    }

    private Optional<Song> scrapeAndStore(SongQueryInfo songQueryInfo) {
        Optional<Song> song = retrieveSongFromGenius(songQueryInfo);
        song.ifPresent(songRepository::save);
        return song;
    }

    private Optional<Song> retrieveSongFromGenius(SongQueryInfo songQueryInfo) {
        Optional<GeniusSongInfo> songInfoOptional = proxy.searchForSong(songQueryInfo.toString());
        
        songInfoOptional = songInfoOptional
                .flatMap(geniusResponse -> emptyOnInconsistency(songQueryInfo, geniusResponse));

        if (songInfoOptional.isPresent()) {
            GeniusSongInfo songInfo = songInfoOptional.get();
            String lyrics = scraper.scrapeLyrics(songInfo.getGeniusUrl(), 5);

            Song song = Song.builder()
                    .title(songQueryInfo.getTitle())
                    .artist(songQueryInfo.getArtist())
                    .album(songQueryInfo.getAlbum())
                    .photoUrl(songQueryInfo.getPhotoUrl())
                    .spotifyUri(songQueryInfo.getSpotifyUri())
                    .releaseYear(songQueryInfo.getReleaseYear())
                    .geniusLyrics(lyrics).build();

            return Optional.of(song);
        }

        return Optional.empty();
    }

    private Optional<GeniusSongInfo> emptyOnInconsistency(SongQueryInfo request, GeniusSongInfo retrieved) {
        if (request.doesMatchWithGeniusResponse(retrieved)) {
            return Optional.of(retrieved);
        }
        return Optional.empty();
    }

}
