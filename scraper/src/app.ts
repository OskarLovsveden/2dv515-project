import WikiPageScraper from "./WikiPageScraper";
import { createFile, createDir } from "./FileCreator";

const run = async () => {
  const mainScraper = new WikiPageScraper(
    "https://en.wikipedia.org/wiki/Marvel_Cinematic_Universe"
  );

  await mainScraper.run();

  console.time("CreateDir");
  createDir("../data/Words/Marvel");
  createDir("../data/Links/Marvel");
  console.timeEnd("CreateDir");

  console.time("CreateFiles");
  for await (const link of mainScraper.links) {
    const subScraper = new WikiPageScraper("https://en.wikipedia.org" + link);
    await subScraper.run();

    const wordsPath = "../data/Words/Marvel/" + link.replace("/wiki/", "");
    const linksPath = "../data/Links/Marvel/" + link.replace("/wiki/", "");

    createFile(wordsPath, subScraper.words.join(" "));
    createFile(linksPath, subScraper.links.join("\n"));
  }
  console.timeEnd("CreateFiles");
};

run();
