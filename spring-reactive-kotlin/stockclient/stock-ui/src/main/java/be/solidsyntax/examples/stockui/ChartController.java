package be.solidsyntax.examples.stockui;

import be.solidsyntax.examples.stockclient.StockClient;
import be.solidsyntax.examples.stockclient.StockPrice;
import javafx.application.Platform;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.chart.LineChart;
import javafx.scene.chart.XYChart.Data;
import javafx.scene.chart.XYChart.Series;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

import static java.lang.String.valueOf;
import static javafx.collections.FXCollections.observableArrayList;

@Component
public class ChartController {

    @FXML
    private LineChart<String, Double> chart;
    private ObservableList<Data<String, Double>> seriesData = observableArrayList();

    private StockClient stockClient;

    @Autowired
    public ChartController(StockClient stockClient) {
        this.stockClient = stockClient;
    }

    @FXML
    public void initialize() {
        ObservableList<Series<String, Double>> data = observableArrayList();
        chart.setData(data);

        subscribeForPricesWith("AMD", data);
        subscribeForPricesWith("NVIDIA", data);
        subscribeForPricesWith("INTEL", data);
        subscribeForPricesWith("CYRIX", data);
    }

    private void subscribeForPricesWith(String symbol, ObservableList<Series<String, Double>> data) {
        PriceSubscriber priceSubscriber = new PriceSubscriber(symbol);
        data.add(priceSubscriber.getSeries());
        stockClient.pricesFor(symbol).subscribe(priceSubscriber);
    }

    private static class PriceSubscriber implements Consumer<StockPrice> {
        private Series<String, Double> series;
        private ObservableList<Data<String, Double>> seriesData = observableArrayList();

        private PriceSubscriber(String symbol) {
            series = new Series<>(symbol, seriesData);
        }

        @Override
        public void accept(StockPrice stockPrice) {
            Platform.runLater(() ->
                    seriesData.add(new Data<>(valueOf(stockPrice.getTime().getSecond()),
                            stockPrice.getPrice()))
            );
        }

        public Series<String, Double> getSeries() {
            return series;
        }
    }
}
