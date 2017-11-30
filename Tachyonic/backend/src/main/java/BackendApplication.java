import com.mongodb.connection.SslSettings;
import com.mongodb.connection.netty.NettyStreamFactoryFactory;
import io.netty.channel.nio.NioEventLoopGroup;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoClientSettingsBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

import javax.annotation.PreDestroy;

@SpringBootApplication
@EnableReactiveMongoRepositories
public class BackendApplication {
    private NioEventLoopGroup eventLoopGroup = new NioEventLoopGroup();

    @Bean
    public MongoClientSettingsBuilderCustomizer sslCustomizer() {
        return clientSettingsBuilder -> clientSettingsBuilder
                .sslSettings(SslSettings.builder()
                        .enabled(true)
                        .invalidHostNameAllowed(true)
                        .build())
                .streamFactoryFactory(NettyStreamFactoryFactory.builder()
                        .eventLoopGroup(eventLoopGroup).build());
    }

    @PreDestroy
    public void shutDownEventLoopGroup() {
        eventLoopGroup.shutdownGracefully();
    }
}
