package pwr.piisw.backend.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import pwr.piisw.backend.entities.Song;

import java.util.Optional;

public interface SongRepository extends PagingAndSortingRepository<Song, Long> {
    Optional<Song> findByTitleAndArtist(String title, String artist);
}
