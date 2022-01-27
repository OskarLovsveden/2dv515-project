import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import styles from "styles/Home.module.css";

import QueryResTable from "components/QueryResTable";
import Searchbar from "components/Searchbar";
import { Score } from "types/Score";

const Home: NextPage = () => {
  const [queryTime, setQueryTime] = useState<number>(0);
  const [queryRes, setQueryRes] = useState<Array<Score>>(new Array<Score>());
  const [pagination, setPagination] = useState<number>(5);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const onFirstPage = pagination === 5;
  const onLastPage = queryRes.length - pagination <= 0;
  const currentPage = pagination / 5;
  const lastPage = Math.ceil(queryRes.length / 5);
  const pageNumbers = "page " + currentPage + " of " + lastPage;
  const numOfResultsAndTime =
    "Found " + queryRes.length + " results in " + queryTime.toFixed(3) + " sec";

  const resultHandler = (data: Array<Score>, time: number) => {
    setQueryRes(data);
    setQueryTime(time);
    setPagination(5);
    setHasSearched(true);
  };

  const pageBack = () => setPagination(pagination - 5);
  const pageForward = () => setPagination(pagination + 5);

  return (
    <div className={styles.container}>
      <Head>
        <title>A3 | 2dv515</title>
        <meta name="description" content="A3 2dv515" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Searchbar resultHandler={resultHandler} />
        {queryRes.length ? (
          <div>
            <QueryResTable
              queryRes={queryRes}
              startAt={pagination - 5}
              endAt={pagination}
            />
            <button disabled={onFirstPage} onClick={pageBack}>
              {"<"}
            </button>
            <span className="mx-1">{pageNumbers}</span>
            <button disabled={onLastPage} onClick={pageForward}>
              {">"}
            </button>
            <div>{numOfResultsAndTime}</div>
          </div>
        ) : (
          hasSearched && (
            <div>
              <h3>{"Sorry, no results to be found! :("}</h3>
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default Home;
