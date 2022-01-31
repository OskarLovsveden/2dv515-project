import WikiPageScraper from "./WikiPageScraper";

const run = async () => {
  const mainScraper = new WikiPageScraper(
    "https://en.wikipedia.org/wiki/Marvel_Cinematic_Universe"
  );

  await mainScraper.run();
};

run();
