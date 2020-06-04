import Link from "next/link";
import { useRouter } from "next/router";
import useRequest from "../../libs/useRequest";

const ExperimentDetailPage = () => {
  const router = useRouter();
  const { data, error } = useRequest(
    router.query.id
      ? {
          url: `/api/experiments/${router.query.id}`,
        }
      : null
  );

  return (
    <div>
      <Link href="/">
        <a>홈으로</a>
      </Link>
      <br />
      {data ? (
        <div>
          <h1>{data.code}</h1>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
};

export default ExperimentDetailPage;
