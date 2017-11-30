package be.solidsynax.tachyonic.backend.rest

import be.aclvb.wkltrackandtrace.domain.model.AuditTrackDocument
import be.solidsynax.tachyonic.backend.repositories.AuditTrackDocumentRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux


@RestController
@RequestMapping("/")
class SampleController(private val auditTrackDocumentRepository: AuditTrackDocumentRepository) {

    @GetMapping("audittracks")
    fun audittracks(): Flux<AuditTrackDocument> {
        return auditTrackDocumentRepository.findAll()
    }
}
