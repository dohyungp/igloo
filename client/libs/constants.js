import Link from "next/link";
import { Tag } from "antd";

export const EXPERIMENT_TABLE_SCHEMA = [
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
    render: (_, record) =>
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
