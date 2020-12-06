package pwr.piisw.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pwr.piisw.backend.entities.Checked;
import pwr.piisw.backend.entities.Favourite;
import pwr.piisw.backend.entities.Song;
import pwr.piisw.backend.entities.User;
import pwr.piisw.backend.exceptions.SongNotFoundException;
import pwr.piisw.backend.exceptions.UserNotFoundException;
import pwr.piisw.backend.repositories.CheckedRepository;
import pwr.piisw.backend.repositories.FavouritesRepository;
import pwr.piisw.backend.repositories.SongRepository;
import pwr.piisw.backend.repositories.UserRepository;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SongCrudService {

    private final SongRepository songRepository;
    private final UserRepository userRepository;
    private final FavouritesRepository favouritesRepository;
    private final CheckedRepository checkedRepository;

    public Favourite markAsFavourite(Long songId, String username) {
        Song song = getSongOrThrow(songId);
        User user = getUserOrThrow(username);
        Optional<Favourite> favouriteOptional = favouritesRepository.findByFavouriteSongAndUser(song, user);
        return favouriteOptional.orElseGet(() -> favouritesRepository.save(new Favourite(user, song, new Date())));
    }

    public void markAsChecked(Song song, String username) {
        User user = getUserOrThrow(username);
        Optional<Checked> checkedOptional = checkedRepository.findByUserAndSong(user, song);
        checkedOptional.ifPresentOrElse(
            checked -> checkedRepository.save(checked.updateCounterAndDate()),
            () -> checkedRepository.save(new Checked(user, song, new Date(), new Date()))
        );
    }

    private User getUserOrThrow(String username) {
        Optional<User> userOptional = userRepository.findById(username);
        return userOptional
                .orElseThrow(() -> new UserNotFoundException(String.format("User %s not found in database", username)));
    }

    private Song getSongOrThrow(Long songId) {
        Optional<Song> songOptional = songRepository.findById(songId);
        return songOptional
                .orElseThrow(() -> new SongNotFoundException(String.format("Song with id %d not found in database", songId)));
    }


    public void deleteFromFavourite(Long songId, String username) {
        Song song = getSongOrThrow(songId);
        User user = getUserOrThrow(username);
        Optional<Favourite> favouriteOptional = favouritesRepository.findByFavouriteSongAndUser(song, user);
        favouriteOptional.ifPresent(favouritesRepository::delete);
    }
}
