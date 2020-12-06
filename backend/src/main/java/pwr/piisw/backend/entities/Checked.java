package pwr.piisw.backend.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
public class Checked {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    long id;
    @ManyToOne
    @NonNull User user;
    @ManyToOne
    @NonNull Song song;
    long counter;
    @NonNull Date createdAt;
    @NonNull Date updatedAt;

    public Checked updateCounterAndDate() {
        this.setCounter(this.counter + 1);
        this.setUpdatedAt(new Date());
        return this;
    }
}
