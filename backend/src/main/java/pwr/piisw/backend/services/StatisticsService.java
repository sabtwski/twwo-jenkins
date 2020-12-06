package pwr.piisw.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pwr.piisw.backend.dtos.statistics.SongStatistic;
import pwr.piisw.backend.repositories.CheckedRepository;
import pwr.piisw.backend.repositories.FavouritesRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final FavouritesRepository favouritesRepository;
    private final CheckedRepository checkedRepository;

    @Transactional
    public List<SongStatistic> getNumberOfChecks() {
        return checkedRepository.findCheckedCount();
    }

    @Transactional
    public List<SongStatistic> getNumberOfLikes() {
        return favouritesRepository.findFavouritesCount();
    }

}
