import Link from "next/link";
import { useRouter } from "next/router";

const ExperimentDetailPage = () => {
  const router = useRouter();

  return (
    <div>
      <Link href="/">
        <a>홈으로</a>
      </Link>
      <br />
      Post ID: {router.query.id}
    </div>
  );
};

export default ExperimentDetailPage;
