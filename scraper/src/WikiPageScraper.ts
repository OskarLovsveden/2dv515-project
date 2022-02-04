import * as cheerio from "cheerio";
import fetch from "node-fetch";

class WikiPageScraper {
  private _url: string;
  private _links: Set<string>;
  private _words: string[];

  /**
   * Creates an instance of WikiPageScraper.
   *
   * @param {string} url the url to be scraped.
   */
  constructor(url: string) {
    this._url = url;
    this._links = new Set();
    this._words = [];
  }

  /**
   * All outgoing links of the wiki page.
   *
   * @readonly
   * @type {string[]}
   */
  get links(): string[] {
    return Array.from(this._links);
  }

  /**
   * All words contained in the wiki page article.
   *
   * @readonly
   * @type {string[]}
   */
  get words(): string[] {
    return this._words;
  }

  /** Runs the scraper. Saves all words and outgoing links. */
  run = async () => {
    // Fetch the html of the url set in the constructor.
    const res = await fetch(this._url);
    const body = await res.text();
    const $ = cheerio.load(body);

    // Get all html a tags in the bodyContent div.
    const links = $("#bodyContent a");
    // Get all html p tags in the bodyContent div.
    const words = $("#bodyContent p");

    // Loop all links and save the hrefs.
    links.each((i: number, link: cheerio.Element) => {
      const href = $(link).attr("href");
      if (href && this.isValid(href)) {
        this._links.add(href);
      }
    });

    // Loop all paragraphs and save all the words.
    words.each((i: number, word: cheerio.Element) => {
      let text = $(word).text();
      if (text) {
        // Remove all commas and periods.
        text = text.replace(/[,|.]/g, "");
        // Remove all references, example: [123]
        text = text.replace(/(\[[0-9]+\])/g, "");
        // Remove all non-digits, non-letters and non-white-spaces
        text = text.replace(/[^\d|\w|\s]/g, " ");
        text = text.toLowerCase();
        text = text.trim();

        if (text.length) {
          // Add text as single words, separated by white-space
          this._words = [...this._words, ...text.split(/\s+/g)];
        }
      }
    });
  };

  /**
   * Checks whether a href is valid or not.
   *
   * @param {string} href the href to be validated.
   */
  private isValid = (href: string): boolean => {
    return (
      href.startsWith("/wiki") &&
      !href.includes("Category:") &&
      !href.includes("Portal:") &&
      !href.includes("Help:") &&
      !href.includes("File:") &&
      !href.includes("Wikipedia:") &&
      !href.includes("Template:") &&
      !href.includes("Template_talk:") &&
      !href.includes("Special:")
    );
  };
}

export default WikiPageScraper;
