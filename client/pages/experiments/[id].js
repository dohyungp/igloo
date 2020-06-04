import Link from "next/link";
import { useRouter } from "next/router";
import useRequest from "../../libs/useRequest";

const ExperimentDetailPage = () => {
  const router = useRouter();
  const { data: experiment } = useRequest(
    router.query.id
      ? {
          url: `/api/experiments/${router.query.id}`,
        }
      : null
  );
  const { data: schedules } = useRequest(
    router.query.id
      ? {
          url: `/api/schedules`,
          params: {
            experiment: router.query.id,
          },
        }
      : null
  );

  return (
    <div>
      <Link href="/">
        <a>홈으로</a>
      </Link>
      <br />
      {experiment ? (
        <div>
          <h1>{experiment.code}</h1>
          <h3>{experiment.title}</h3>
          <p>{experiment.description}</p>
        </div>
      ) : (
        "loading"
      )}

      {schedules ? JSON.stringify(schedules) : ""}
    </div>
  );
};

export default ExperimentDetailPage;
