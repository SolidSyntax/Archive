package be.solidsynax.tachyonic.backend.model

import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDateTime

@Document(collection="ListItem")
data class ListItem(val laatsteWijziging: LocalDateTime,
                    val type: String,
                    val omschrijving: String)
