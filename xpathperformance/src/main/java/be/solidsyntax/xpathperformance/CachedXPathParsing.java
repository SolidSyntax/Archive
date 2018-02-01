package be.solidsyntax.xpathperformance;

import org.apache.xpath.CachedXPathAPI;
import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.util.Arrays;
import java.util.stream.IntStream;

public class CachedXPathParsing {


    private InputStream inputStream;

    private CachedXPathParsing(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    public static CachedXPathParsing with(InputStream inputStream) {
        return new CachedXPathParsing(inputStream);
    }


    public void run(int numberOfTimes) throws Exception {
        Document document =  DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(inputStream);


        System.out.println("Starting testrun: CachedXPathParsing");
        long startTime = System.nanoTime();

        int result = IntStream.range(0, numberOfTimes).map(value -> evaluateExpressions(document)).reduce((a, b) -> a + b).orElse(0);

        long runningTimeNanoSeconds = System.nanoTime() - startTime;
        System.out.println("Completed in ms: " + (runningTimeNanoSeconds / 1000000));
        System.out.println("parsed nr of characters: " + result);
    }



    private int evaluateExpressions(Document document) {
        CachedXPathAPI cachedXPathAPI = new CachedXPathAPI();
        return Arrays.stream(XPathExpressions.values())
                .map(path -> {
                    try {
                        String value = cachedXPathAPI.eval(document, path.expression()).str();
                        return value.length();
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }

                }).reduce((a, b) -> a + b).orElse(0);
    }
}
