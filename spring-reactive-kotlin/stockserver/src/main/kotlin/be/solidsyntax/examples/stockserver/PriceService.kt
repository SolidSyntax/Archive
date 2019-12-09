package be.solidsyntax.examples.stockserver

import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import java.time.Duration
import java.time.LocalDateTime
import java.util.concurrent.ThreadLocalRandom

@Service
class PriceService {
    fun generatePrices(symbol: String): Flux<StockPrice> {
        return Flux
                .interval(Duration.ofSeconds(1))
                .map { StockPrice(symbol, randomStockPrice(), LocalDateTime.now()) }
    }

    private fun randomStockPrice(): Double {
        return ThreadLocalRandom.current().nextDouble(100.0)
    }

}
