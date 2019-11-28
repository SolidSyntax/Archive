package be.solidsyntax.examples.stockui;

import be.solidsyntax.examples.stockclient.WebClientStockClient;
import javafx.fxml.FXML;
import javafx.scene.chart.LineChart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ChartController {

    @FXML
    public LineChart<String, Double> chart;

    private  WebClientStockClient webClientStockClient;

    @Autowired
    public ChartController(WebClientStockClient webClientStockClient) {
        this.webClientStockClient = webClientStockClient;
    }
}
