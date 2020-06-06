import { MainLayout } from "../components/MainLayout";
import useRequest from "../libs/useRequest";
// import { ExperimentList } from "../components/ExperimentList";
import { useState } from "react";
import { message, Table, Tag } from "antd";
import Link from "next/link";

const TABLE_SCHEMA = [
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    render: (text, record) => (
      <Link href={`/experiments/[id]`} as={`/experiments/${record.id}`}>
        <a>{text}</a>
      </Link>
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    responsive: ["md"],
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text, record) =>
      record?.status?.name ? (
        <Tag color={record?.status?.tag_color || "default"}>
          {record?.status?.name}
        </Tag>
      ) : null,
    responsive: ["md"],
  },
  {
    title: "I",
    dataIndex: "impact",
    key: "impact",
    sorter: { multiple: 1 },
  },
  {
    title: "C",
    dataIndex: "confidence",
    key: "confidence",
    sorter: { multiple: 1 },
  },
  {
    title: "E",
    dataIndex: "ease",
    key: "ease",
    sorter: { multiple: 1 },
  },
];

export default function Home() {
  const [pageNum, setPageNum] = useState(1);
  const [isScored, setIsScored] = useState(null);

  const { data, error } = useRequest({
    url: "/api/experiments",
    params: { page: pageNum, is_prioritized: isScored },
  });

  return (
    <MainLayout title="Home">
      {error ? message.error("Fetching data was failed") : ""}
      <div>
        <Table
          rowKey="id"
          dataSource={data?.results}
          columns={TABLE_SCHEMA}
          loading={data || error ? false : true}
          pagination={{
            defaultCurrent: pageNum,
            total: data?.count || 0,
            onChange: (page) => setPageNum(page),
            showSizeChanger: false,
          }}
        />
      </div>
    </MainLayout>
  );
}
