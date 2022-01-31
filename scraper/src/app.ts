import WikiPageScraper from "./WikiPageScraper";
import { createDir } from "./FileCreator";

const run = async () => {
  const mainScraper = new WikiPageScraper(
    "https://en.wikipedia.org/wiki/Marvel_Cinematic_Universe"
  );

  await mainScraper.run();

  console.time("CreateDir");
  createDir("../data/Words/Marvel");
  createDir("../data/Links/Marvel");
  console.timeEnd("CreateDir");
};

run();
