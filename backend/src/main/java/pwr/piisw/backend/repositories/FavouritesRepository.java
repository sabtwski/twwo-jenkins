package pwr.piisw.backend.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import pwr.piisw.backend.dtos.statistics.SongStatistic;
import pwr.piisw.backend.entities.Favourite;
import pwr.piisw.backend.entities.Song;
import pwr.piisw.backend.entities.User;

import java.util.List;
import java.util.Optional;

public interface FavouritesRepository extends PagingAndSortingRepository<Favourite, Long> {
    List<Favourite> findAllByUser(User user, Pageable pageable);

    Optional<Favourite> findByFavouriteSongAndUser(Song song, User user);

    @Query("select new pwr.piisw.backend.dtos.statistics.SongStatistic(f.favouriteSong, count(f)) from Favourite f group by f.favouriteSong")
    List<SongStatistic> findFavouritesCount();
}
