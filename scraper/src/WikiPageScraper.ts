import * as cheerio from "cheerio";
import fetch from "node-fetch";

class WikiPageScraper {
  private _url: string;
  private _links: Set<string>;
  private _words: string[];

  constructor(url: string) {
    this._url = url;
    this._links = new Set();
    this._words = [];
  }

  get links(): string[] {
    return Array.from(this._links);
  }

  get words(): string[] {
    return this._words;
  }

  run = async () => {
    const res = await fetch(this._url);
    const body = await res.text();
    const $ = cheerio.load(body);
    const links = $("#bodyContent a");
    const words = $("#bodyContent p");

    links.each((i: number, link: cheerio.Element) => {
      const href = $(link).attr("href");
      if (href && this.isValid(href)) {
        this._links.add(href);
      }
    });

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

        console.log(text);

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
