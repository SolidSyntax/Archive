package be.solidsynax.tachyonic.backend

import com.mongodb.connection.SslSettings
import com.mongodb.connection.netty.NettyStreamFactoryFactory
import io.netty.channel.nio.NioEventLoopGroup
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.mongo.MongoClientSettingsBuilderCustomizer
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories
import org.springframework.scheduling.annotation.EnableScheduling
import javax.annotation.PreDestroy


@SpringBootApplication
@EnableReactiveMongoRepositories
@EnableScheduling
class Application {
    val eventLoopGroup = NioEventLoopGroup()

    @Bean
    fun mongoSettingsNettyConnectionFactoy() = MongoClientSettingsBuilderCustomizer {
        it.sslSettings(SslSettings.builder()
                .enabled(true)
                .invalidHostNameAllowed(true)
                .build())
                .streamFactoryFactory(NettyStreamFactoryFactory.builder()
                        .eventLoopGroup(eventLoopGroup).build())
    }

    @PreDestroy
    fun shutDownEventLoopGroup() {
        eventLoopGroup.shutdownGracefully()
    }
}

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}



