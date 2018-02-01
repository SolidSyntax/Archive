package be.solidsyntax.xpathperformance;

import java.io.InputStream;

public class TestRunner {

    public static final int NUMBER_OF_TIMES = 10_000;

    public static void main(String[] args) throws Exception {
        System.setProperty("javax.xml.xpath.XPathFactory:http://java.sun.com/jaxp/xpath/dom", "com.sun.org.apache.xpath.internal.jaxp.XPathFactoryImpl");
        XPathParsing.with(documentStream()).run(NUMBER_OF_TIMES);

        System.setProperty("javax.xml.xpath.XPathFactory:http://java.sun.com/jaxp/xpath/dom", "org.apache.xpath.jaxp.XPathFactoryImpl");
        XPathParsing.with(documentStream()).run(NUMBER_OF_TIMES);

        CachedXPathParsing.with(documentStream()).run(NUMBER_OF_TIMES);

        VtdParsing.with(documentStream()).run(NUMBER_OF_TIMES);
    }

    private static InputStream documentStream()  {
        ClassLoader classLoader = TestRunner.class.getClassLoader();
        return classLoader.getResourceAsStream("inventory.xml");
    }
}
