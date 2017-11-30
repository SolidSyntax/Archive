package be.solidsynax.tachyonic.backend.repositories

import be.aclvb.wkltrackandtrace.domain.model.AuditTrackDocument
import be.solidsynax.tachyonic.backend.model.ListItem
import org.bson.types.ObjectId
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.time.LocalDateTime


interface AuditTrackDocumentRepository: ReactiveCrudRepository<AuditTrackDocument,ObjectId>{
    fun findByAuditTrack_laatsteWijzigingGreaterThan(laatsteWijziging: Mono<LocalDateTime>): Flux<AuditTrackDocument>
}

interface ListViewRepository: ReactiveCrudRepository<ListItem, ObjectId>{
    fun findFirstByOrderByLaatsteWijzigingDesc(): Mono<ListItem>
}