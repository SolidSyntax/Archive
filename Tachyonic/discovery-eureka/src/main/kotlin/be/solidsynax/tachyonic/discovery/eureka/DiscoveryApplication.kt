package be.solidsynax.tachyonic.discovery.eureka

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer

@SpringBootApplication
@EnableEurekaServer
open class DiscoveryApplication

fun main(args: Array<String>) {
    runApplication<DiscoveryApplication>(*args)
}
