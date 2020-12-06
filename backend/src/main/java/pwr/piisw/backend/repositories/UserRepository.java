package pwr.piisw.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pwr.piisw.backend.entities.User;

public interface UserRepository extends JpaRepository<User, String> {
}
