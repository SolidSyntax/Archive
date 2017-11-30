package be.solidsynax.tachyonic.backend.processors

import be.solidsynax.tachyonic.backend.repositories.AuditTrackDocumentRepository
import be.solidsynax.tachyonic.backend.repositories.ListViewRepository
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import java.time.LocalDateTime

@Service
class ViewProcessor(private val auditTrackDocumentRepository: AuditTrackDocumentRepository,
                    private val listViewRepository: ListViewRepository) {

    @Scheduled(fixedRate = 1000)
    fun actualizeView() {
        // Meest recente update opvragen
        val listItem = listViewRepository.findFirstByOrderByLaatsteWijzigingDesc().block()

        //Audit tracks opvragen die gewijzigs zijn sinds de laatste update
        val gewijzigdeTracks = auditTrackDocumentRepository
                .findByAuditTrack_laatsteWijzigingGreaterThan(Mono.just(LocalDateTime.of(2017,10,10,1,1))).blockFirst()

        //Audit tracks omvormen naar een ListViewItem


        //List view item upsert

        println(gewijzigdeTracks?.auditTrack()?.laatsteWijziging())
    }
}
