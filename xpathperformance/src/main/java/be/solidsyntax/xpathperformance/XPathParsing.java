package be.solidsyntax.xpathperformance;

import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathFactory;
import java.io.InputStream;
import java.util.Arrays;
import java.util.stream.IntStream;

public class XPathParsing {


    private InputStream inputStream;

    private XPathParsing(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    public static XPathParsing with(InputStream inputStream) {
        return new XPathParsing(inputStream);
    }


    public void run(int numberOfTimes) throws Exception {
        Document document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(inputStream);


        XPathFactory xPathFactory = XPathFactory.newInstance();
        System.out.println("Starting testrun: " + xPathFactory.getClass().toString());
        long startTime = System.nanoTime();

        int result = IntStream.range(0, numberOfTimes).map(value -> evaluateExpressions(document,xPathFactory)).reduce((a, b) -> a + b).orElse(0);

        long runningTimeNanoSeconds = System.nanoTime() - startTime;
        System.out.println("Completed in ms: " + (runningTimeNanoSeconds / 1000000));
        System.out.println("parsed nr of characters: " + result);
    }



    private int evaluateExpressions(Document document, XPathFactory xPathFactory) {
        XPath xpath = xPathFactory.newXPath();
        return Arrays.stream(XPathExpressions.values())
                .map(path -> {
                    try {
                        String value = xpath.compile(path.expression()).evaluate(document);
                        return value.length();
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }

                }).reduce((a, b) -> a + b).orElse(0);
    }
}
