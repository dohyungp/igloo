import { useState } from "react";
import Router from "next/router";

import useRequest from "../../libs/useRequest";
import fetch from "../../libs/fetch";
import { MainLayout } from "../../components/MainLayout";

import {
  Form,
  Input,
  Select,
  Tag,
  InputNumber,
  Button,
  Tooltip,
  message,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

const ExperimentCreatePage = () => {
  const { data: status, error: statusError } = useRequest({
    url: "/api/status",
  });
  const onFinish = async (values) => {
    try {
      const { data } = await fetch({
        method: "POST",
        url: "/api/experiments",
        data: values,
      });
      message.success(
        "To create a new experiment was successed! It will move to the list page"
      );
      setTimeout(() => Router.push("/"), 1000);
    } catch (e) {
      message.error("Something was wrong!");
    }
  };

  return (
    <MainLayout title="Create a idea">
      {statusError ? message.error("Fetching status data was failed") : ""}
      <Form {...layout} initialValues={{ size: "large" }} onFinish={onFinish}>
        <Form.Item
          name="code"
          label={
            <span>
              Code&nbsp;
              <Tooltip title="어떤 실험인지 확인할 수 있도록 코드를 입력해주세요">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Select loading={!(status || statusError)} allowClear>
            <Select.OptGroup label="Status">
              {status?.results?.map((option) => {
                return (
                  <Select.Option value={option.id} key={option.id}>
                    <Tag
                      color={option?.tag_color ? option.tag_color : "default"}
                    >
                      {option.name}
                    </Tag>
                  </Select.Option>
                );
              })}
            </Select.OptGroup>
            <Select.Option>
              <div onClick={(e) => console.log(e)}>Create a new status</div>
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea autoSize={{ minRows: 8 }} allowClear />
        </Form.Item>
        <Form.Item name="impact" label="Impact">
          <InputNumber min={0} max={10} />
        </Form.Item>
        <Form.Item name="confidence" label="Confidence">
          <InputNumber min={0} max={10} />
        </Form.Item>
        <Form.Item name="ease" label="Ease">
          <InputNumber min={0} max={10} />
        </Form.Item>
        <Form.Item wrapperCol={{ md: { span: 12, offset: 4 } }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </MainLayout>
  );
};

export default ExperimentCreatePage;
