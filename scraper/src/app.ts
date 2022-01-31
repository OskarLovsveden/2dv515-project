import WikiPageScraper from "./WikiPageScraper";
import { createFile, createDir } from "./FileCreator";

/** Runs the scraper application. */
const run = async () => {
  const mainScraper = new WikiPageScraper(
    "https://en.wikipedia.org/wiki/Marvel_Cinematic_Universe"
  );

  await mainScraper.run();

  // Create directories
  console.time("CreateDir");
  createDir("../data/Words/Marvel");
  createDir("../data/Links/Marvel");
  console.timeEnd("CreateDir");

  console.time("CreateFiles");
  // Loop links found
  for await (const link of mainScraper.links) {
    const subScraper = new WikiPageScraper("https://en.wikipedia.org" + link);
    await subScraper.run();

    // File names
    const wordsPath = "../data/Words/Marvel/" + link.replace("/wiki/", "");
    const linksPath = "../data/Links/Marvel/" + link.replace("/wiki/", "");

    // Create files using data retreived in scraper
    createFile(wordsPath, subScraper.words.join(" "));
    createFile(linksPath, subScraper.links.join("\n"));
  }
  console.timeEnd("CreateFiles");
};

run();
