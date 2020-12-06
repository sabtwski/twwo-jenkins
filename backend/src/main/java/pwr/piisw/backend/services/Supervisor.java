package pwr.piisw.backend.services;

import org.springframework.stereotype.Service;

import java.util.function.Supplier;

@Service
public class Supervisor {

    private final Object lock = new Object();

    public <T> T performSupervised(Supplier<T> supplier) {
        T result;
        synchronized (lock) {
            result = supplier.get();
        }
        return result;
    }

}
