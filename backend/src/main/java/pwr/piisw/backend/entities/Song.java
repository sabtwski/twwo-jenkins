package pwr.piisw.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Song {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    String title;
    String artist;
    String album;
    String photoUrl;
    @Lob
    String geniusLyrics;
    String spotifyUri;
    int releaseYear;
    @OneToMany(mappedBy = "favouriteSong")
    Set<Favourite> likedBy;
}
