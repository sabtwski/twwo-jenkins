package pwr.piisw.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pwr.piisw.backend.dtos.song.SongBasicInfo;
import pwr.piisw.backend.entities.Checked;
import pwr.piisw.backend.entities.Favourite;
import pwr.piisw.backend.entities.User;
import pwr.piisw.backend.exceptions.UserNotFoundException;
import pwr.piisw.backend.repositories.CheckedRepository;
import pwr.piisw.backend.repositories.FavouritesRepository;
import pwr.piisw.backend.repositories.UserRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CheckedRepository checkedRepository;
    private final FavouritesRepository favouritesRepository;

    public User registerUser(String username) {
        Optional<User> userOptional = userRepository.findById(username);
        return userOptional.orElseGet(() -> userRepository.save(new User(username)));
    }

    @Transactional
    public List<SongBasicInfo> getFavouritesPaginated(String username, Pageable pageable) {
        User user = getUserOrThrow(username);
        return favouritesRepository.findAllByUser(user, pageable).stream()
                .map(Favourite::getFavouriteSong)
                .map(SongBasicInfo::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<SongBasicInfo> getLatestCheckedSongsPaginated(String username, Pageable pageable) {
        User user = getUserOrThrow(username);
        return checkedRepository.findAllByUser(user, pageable).stream()
                .map(Checked::getSong)
                .map(SongBasicInfo::new)
                .collect(Collectors.toList());
    }

    private User getUserOrThrow(String username) {
        Optional<User> userOptional = userRepository.findById(username);
        return userOptional
                .orElseThrow(() -> new UserNotFoundException(String.format("User %s not found in database", username)));
    }

}
