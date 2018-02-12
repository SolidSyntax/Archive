package be.solidsyntax.web.progressbar.model;

import lombok.Value;

@Value(staticConstructor = "of")
public class Progress {
    private int current;
    private int total;
}
