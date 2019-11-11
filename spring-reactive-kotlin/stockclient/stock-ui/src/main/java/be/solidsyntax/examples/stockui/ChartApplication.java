package be.solidsyntax.examples.stockui;

import javafx.application.Platform;
import javafx.stage.Stage;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ConfigurableApplicationContext;

public class ChartApplication extends javafx.application.Application {
    private ConfigurableApplicationContext applicationContext;

    @Override
    public void start(Stage stage) throws Exception {
        applicationContext.publishEvent(new StageReadyEvent(stage));
    }

    @Override
    public void init() throws Exception {
        applicationContext = new SpringApplicationBuilder((StockUiApplication.class)).run();
    }

    @Override
    public void stop() throws Exception {
        applicationContext.close();;
        Platform.exit();
    }

    public static class StageReadyEvent extends ApplicationEvent {
        private final Stage stage;
        public StageReadyEvent(Stage stage) {
            super(stage);
            this.stage = stage;
        }

        public Stage getStage() {
            return stage;
        }
    }
}
