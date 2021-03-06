package be.solidsyntax.examples.stockui;


import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class StageInitializer implements ApplicationListener<ChartApplication.StageReadyEvent> {
    private String applicationTitle;
    private Resource chartSceneDefinition;
    private ApplicationContext applicationContext;

    public StageInitializer(@Value("${spring.application.ui.title}") String applicationTitle,
                            @Value("classpath:/chart.fxml") Resource chartSceneDefinition,
                            ApplicationContext applicationContext) {
        this.applicationTitle = applicationTitle;
        this.chartSceneDefinition = chartSceneDefinition;
        this.applicationContext = applicationContext;
    }

    @Override
    public void onApplicationEvent(ChartApplication.StageReadyEvent event) {
        try {
            FXMLLoader fxmlLoader = new FXMLLoader(chartSceneDefinition.getURL());
            fxmlLoader.setControllerFactory(aClass -> applicationContext.getBean(aClass));
            Parent parent = fxmlLoader.load();
            Stage stage = event.getStage();
            stage.setScene(new Scene(parent, 1280, 1024));
            stage.setTitle(applicationTitle);
            stage.show();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
