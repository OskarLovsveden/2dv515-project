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
}

export default WikiPageScraper;
