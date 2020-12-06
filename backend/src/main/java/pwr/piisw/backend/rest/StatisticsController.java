package pwr.piisw.backend.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pwr.piisw.backend.dtos.statistics.SongStatistic;
import pwr.piisw.backend.services.StatisticsService;

import java.util.List;

@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService service;

    @GetMapping("/checked")
    public List<SongStatistic> getCheckedStatistics() {
        return service.getNumberOfChecks();
    }

    @GetMapping("/favourites")
    public List<SongStatistic> getFavouritesStatistics() {
        return service.getNumberOfLikes();
    }
}
