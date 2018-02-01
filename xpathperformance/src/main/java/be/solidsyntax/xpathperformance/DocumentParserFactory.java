package be.solidsyntax.xpathperformance;

public class DocumentParserFactory {
    static {
        //System.setProperty("javax.xml.xpath.XPathFactory:http://java.sun.com/jaxp/xpath/dom", "com.sun.org.apache.xpath.internal.jaxp.XPathFactoryImpl");
        //System.setProperty("javax.xml.parsers.DocumentBuilderFactory", "com.sun.org.apache.xerces.internal.jaxp.DocumentBuilderFactoryImpl");
    }

    private DocumentParserFactory() {
    }
//
//    public static <T extends Enum<T> & DocumentParserPathDefinition> Function<T, String> createFor(String xmlDocument, @SuppressWarnings("UnusedParameters") Class<T> pathDefinitions) {
//        return createFor(createDocumentFor(xmlDocument), pathDefinitions);
//    }
//
//    public static Document createDocumentFor(String xmlDocument) {
//        return getOrThrow(() -> 
//            DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new InputSource(new StringReader(xmlDocument)))
//        ).get();
//    }
//
//    public static <T extends Enum<T> & DocumentParserPathDefinition> Function<T, String> createFor(Document document, @SuppressWarnings("UnusedParameters") Class<T> pathDefinitions) {
//        XPath xpath = XPathFactory.newInstance().newXPath();
//
//        return pathDefinition -> 
//            getOrThrow(() -> {
//                    XPathExpression expr = xpath.compile(pathDefinition.pathExpression());
//                return expr.evaluate(document);
//            } ).get();
//    }
//
//    public static <T extends Enum<T> & DocumentParserPathDefinition> Function<T, String> createForNode(Node node, @SuppressWarnings("UnusedParameters") Class<T> pathDefinitions) {
//        XPath xpath = XPathFactory.newInstance().newXPath();
//
//        return pathDefinition ->
//            getOrThrow(() -> {
//                XPathExpression expr = xpath.compile(pathDefinition.pathExpression());
//                return expr.evaluate(node);
//            } ).get();
//    }
//
//
//    public static NodeList createNodeListFor(String xmlDocument, String expr) {
//        return getOrThrow(() -> {
//            DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
//            Document document = builder.parse(new InputSource(new StringReader(xmlDocument)));
//            return createNodeListFor(document, expr);
//        } ).get();
//    }
//
//    public static NodeList createNodeListFor(Document document, String expr) {
//        return getOrThrow(() -> {
//            XPath xpath = XPathFactory.newInstance().newXPath();
//            XPathExpression pathExpr = xpath.compile(expr);
//            return (NodeList) pathExpr.evaluate(document, XPathConstants.NODESET);
//        } ).get();
//    }
//
//    public static NodeList createSubNodeListFor(Node parentNode, String expr) {
//        return getOrThrow(() -> {
//            XPath xpath = XPathFactory.newInstance().newXPath();
//            XPathExpression pathExpr = xpath.compile(expr);
//            return (NodeList) pathExpr.evaluate(parentNode, XPathConstants.NODESET);
//        } ).get();
//    }
//
//    public static Node createNodeFor(String xmlDocument, String expr) {
//        return getOrThrow(() -> {
//            DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
//            Document document = builder.parse(new InputSource(new StringReader(xmlDocument)));
//            return createNodeFor(document, expr);
//        } ).get();
//    }
//
//    public static Node createNodeFor(Document document, String expr) {
//        return getOrThrow(() -> {
//            XPath xpath = XPathFactory.newInstance().newXPath();
//            XPathExpression pathExpr = xpath.compile(expr);
//            return (Node) pathExpr.evaluate(document, XPathConstants.NODE);
//        } ).get();
//    }
//
//    public static Node createSubNodeFor(Node parentNode, String expr) {
//        return getOrThrow(() -> {
//            XPath xpath = XPathFactory.newInstance().newXPath();
//            XPathExpression pathExpr = xpath.compile(expr);
//            return (Node) pathExpr.evaluate(parentNode, XPathConstants.NODE);
//        } ).get();
//    }
//    
//    public static String rootElementNameFor(String xmlDocument){
//        return getOrThrow(() -> {
//            DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
//            Document document = builder.parse(new InputSource(new StringReader(xmlDocument)));
//            return rootElementNameFor(document);
//        } ).get();        
//    }
//    
//    public static String rootElementNameFor(Document xmlDocument){
//        return getOrThrow(() -> {
//            XPath xPath = XPathFactory.newInstance().newXPath();
//            return xPath.evaluate("local-name(/*)", xmlDocument);
//        } ).get();
//    }

}
