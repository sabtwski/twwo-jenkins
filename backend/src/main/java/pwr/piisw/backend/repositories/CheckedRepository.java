package pwr.piisw.backend.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import pwr.piisw.backend.dtos.statistics.SongStatistic;
import pwr.piisw.backend.entities.Checked;
import pwr.piisw.backend.entities.Song;
import pwr.piisw.backend.entities.User;

import java.util.List;
import java.util.Optional;

public interface CheckedRepository extends PagingAndSortingRepository<Checked, Long> {
    List<Checked> findAllByUser(User user, Pageable pageable);

    Optional<Checked> findByUserAndSong(User user, Song song);

    @Query("select new pwr.piisw.backend.dtos.statistics.SongStatistic(c.song, sum(c.counter)) from Checked c group by c.song")
    List<SongStatistic> findCheckedCount();
}
