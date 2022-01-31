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
