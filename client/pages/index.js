import { MainLayout } from "../components/MainLayout";
import useRequest from "../libs/useRequest";
// import { ExperimentList } from "../components/ExperimentList";
import { useState } from "react";
import { message, Table, Select, Space, Button } from "antd";
import Link from "next/link";
import { EXPERIMENT_TABLE_SCHEMA } from "../libs/constants";

export default function Home() {
  const [pageNum, setPageNum] = useState(1);
  const [isScored, setIsScored] = useState(true);
  const [orderIndex, setOrderIndex] = useState(null);

  const { data, error } = useRequest({
    url: "/api/experiments",
    params: { page: pageNum, is_prioritized: isScored, ordering: orderIndex },
  });

  const onTableChange = (pagination, filters, sorter, extra) => {
    const symbolMap = {
      ascend: "",
      descend: "-",
    };

    if (Array.isArray(sorter)) {
      const queriedIndex = sorter
        .filter((e) => e.order === "ascend" || e.order === "descend")
        ?.map((e) => `${symbolMap[e.order]}${e.field}`)
        ?.join(",");
      setOrderIndex(queriedIndex);
    } else if (!sorter?.order) {
      setOrderIndex(null);
    } else {
      setOrderIndex(`${symbolMap[sorter.order]}${sorter.field}`);
    }
  };

  return (
    <MainLayout title="Home">
      {error ? message.error("Fetching data was failed") : ""}
      <div>
        <Space style={{ marginBottom: 16 }}>
          <Select
            style={{ minWidth: 100 }}
            defaultValue={isScored}
            onChange={(value) => setIsScored(value)}
          >
            <Select.Option value={null}>All</Select.Option>
            <Select.Option value={true}>Scored</Select.Option>
            <Select.Option value={false}>Not scored</Select.Option>
          </Select>
          <Link href={`/experiments/create`}>
            <Button style={{ float: "right" }} type="primary">
              New idea
            </Button>
          </Link>
        </Space>
        <Table
          rowKey="id"
          dataSource={data?.results}
          columns={EXPERIMENT_TABLE_SCHEMA}
          loading={data || error ? false : true}
          pagination={{
            defaultCurrent: pageNum,
            total: data?.count || 0,
            onChange: (page) => setPageNum(page),
            showSizeChanger: false,
          }}
          onChange={onTableChange}
        />
      </div>
    </MainLayout>
  );
}
