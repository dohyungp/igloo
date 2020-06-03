import Head from "next/head";
import useRequest from "../libs/useRequest";
import { ExperimentList } from "../components/ExperimentList";
import { useState } from "react";

export default function Home() {
  const [pageNum, setPageNum] = useState(1);
  const [isScored, setIsScored] = useState(null);

  const { data, error } = useRequest({
    url: "/api/experiments",
    params: { page: pageNum, is_prioritized: isScored },
  });
  return (
    <div className="container">
      <Head>
        <title>IGLOO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button
          onClick={() => setPageNum(pageNum - 1)}
          disabled={!data?.previous}
        >
          이전
        </button>
        <button onClick={() => setPageNum(pageNum + 1)} disabled={!data?.next}>
          다음
        </button>
        <select
          name="scored"
          onChange={(event) => {
            setIsScored(event.target.value);
            setPageNum(1);
          }}
        >
          <option value={null}>all</option>
          <option value={false}>not scored</option>
          <option value={true}>scored</option>
        </select>
        {error ? <div>failed to load</div> : ""}
        {!data ? (
          <div>loading ...</div>
        ) : (
          <div>{<ExperimentList experiments={data.results} />}</div>
        )}
      </main>
    </div>
  );
}
