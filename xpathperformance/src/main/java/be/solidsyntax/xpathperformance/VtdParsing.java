package be.solidsyntax.xpathperformance;

import com.ximpleware.AutoPilot;
import com.ximpleware.VTDGen;
import com.ximpleware.VTDNav;

import java.io.InputStream;
import java.util.Arrays;
import java.util.stream.IntStream;

public class VtdParsing {

    private InputStream documentStream;

    private VtdParsing(InputStream documentStream) {
        this.documentStream = documentStream;
    }

    public static VtdParsing with(InputStream documentStream) {
        return new VtdParsing(documentStream);
    }


    public void run(int numberOfTimes) throws Exception {

        byte[] bytes = documentStream.readAllBytes();

        System.out.println("Starting VTD testrun");
        long startTime = System.nanoTime();

        VTDGen vtd = new VTDGen();
        vtd.setDoc(bytes);
        vtd.parse(true);

        VTDNav vtdNav = vtd.getNav();

        int result = IntStream.range(0, numberOfTimes).map(value -> evaluateExpressions(vtdNav)).reduce((a, b) -> a + b).orElse(0);

        long runningTimeNanoSeconds = System.nanoTime() - startTime;
        System.out.println("Completed in ms: " + (runningTimeNanoSeconds / 1000000));
        System.out.println("parsed nr of characters: " + result);
    }


    private int evaluateExpressions(VTDNav vtdNav) {
        AutoPilot autoPilot = new AutoPilot(vtdNav);
        return Arrays.stream(XPathExpressions.values())
                .map(path -> {
                    try {
                        autoPilot.selectXPath(path.expression());
                        String xPathToString = autoPilot.evalXPathToString();
                        return xPathToString.length();
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }

                }).reduce((a, b) -> a + b).orElse(0);
    }
}
