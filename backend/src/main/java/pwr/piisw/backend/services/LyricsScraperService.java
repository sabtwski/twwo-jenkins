package pwr.piisw.backend.services;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.safety.Whitelist;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import pwr.piisw.backend.exceptions.GeniusScrapingException;

import java.io.IOException;

@Service
public class LyricsScraperService {

    public String scrapeLyrics(String url, int retriesOnError) {
        Connection connection = Jsoup.connect(url);
        Document.OutputSettings outputSettings = new Document.OutputSettings().prettyPrint(false);

        Element element = getLyricsElementFromConnection(retriesOnError, connection, outputSettings);

        return getCleanLyrics(outputSettings, element);
    }

    private Element getLyricsElementFromConnection(int retriesOnError, Connection connection, Document.OutputSettings outputSettings) {
        Element element = null;

        for (int i = 0; i < 1 + retriesOnError && element == null; i++) {
            element = retrieveFirstMatch(connection, "div.lyrics", outputSettings);
        }

        if (element == null) {
            throw new GeniusScrapingException(String.format("Could not retrieve lyrics after %d retries", retriesOnError));
        }

        return element;
    }

    private Element retrieveFirstMatch(Connection connection, String select, Document.OutputSettings outputSettings) {
        Document document;
        try {
            document = connection.get();
        } catch (IOException e) {
            throw new GeniusScrapingException("Could not retrieve document from connection", e);
        }
        document.outputSettings(outputSettings);
        Elements matches = document.select(select);
        return matches.first();
    }


    private String getCleanLyrics(Document.OutputSettings outputSettings, Element element) {
        String cleanLyrics = Jsoup.clean(element.html(), "", Whitelist.none(), outputSettings);
        return cleanLyrics.strip();
    }
}
