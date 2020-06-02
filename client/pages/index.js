import Head from "next/head";
import Router from "next/router";
import { getExperiments } from "../api/experiment.api";
import { ExperimentList } from "../components/ExperimentList";

const searchPageQuery = (urlString) => {
  try {
    const url = new URL(urlString);
    const params = new URLSearchParams(url.search);
    if (params.has("page")) return params.get("page");
    else return "1";
  } catch (e) {
    return "1";
  }
};

export default function Home({ data }) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <button
          onClick={() =>
            Router.push(`/?page=${searchPageQuery(data.previous)}`)
          }
        >
          Previous
        </button>
        <button
          onClick={() => Router.push(`/?page=${searchPageQuery(data.next)}`)}
        >
          Next
        </button>
        <ExperimentList experiments={data.results} />
      </main>
    </div>
  );
}

Home.getInitialProps = async (ctx) => {
  console.log(ctx.query);
  let data = undefined;
  if (ctx.req) data = await getExperiments("http://server:8000", ctx.query);
  else data = await getExperiments("http://localhost:8000", ctx.query);
  return { data };
};
