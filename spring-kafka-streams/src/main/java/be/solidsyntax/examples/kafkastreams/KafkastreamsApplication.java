package be.solidsyntax.examples.kafkastreams;

import org.apache.kafka.streams.kstream.KStream;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.function.Consumer;

@SpringBootApplication
public class KafkastreamsApplication {

    @Bean
    public Consumer<KStream<String, String>> process() {

        return input ->
                input.foreach((key, value) -> {
                    System.out.println("Key: " + key + " Value: " + value);
                });
    }
}
