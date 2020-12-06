package pwr.piisw.backend.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Getter
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
public class Favourite {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    @NonNull User user;
    @ManyToOne
    @JoinColumn
    @NonNull Song favouriteSong;
    @NonNull Date createdAt;
}
