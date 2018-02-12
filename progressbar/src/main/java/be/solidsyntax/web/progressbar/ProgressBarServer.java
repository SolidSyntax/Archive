package be.solidsyntax.web.progressbar;

import be.solidsyntax.web.progressbar.model.Progress;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.stream.IntStream;

@SpringBootApplication
@RestController
public class ProgressBarServer {


    public static void main(String[] args) {
        SpringApplication.run(ProgressBarServer.class, args);
    }

    @GetMapping(value = "/progress")
    public Flux<Progress> progress(@RequestParam(value = "ticks", defaultValue = "100") int ticks,
                                   @RequestParam(value = "delay", defaultValue = "300") int delay) {
        
        return Flux.fromStream(IntStream.range(0,ticks).boxed())
                .delayElements(Duration.ofMillis(delay))
                .map(currentTick -> Progress.of(currentTick+1,ticks));
    }
    
}