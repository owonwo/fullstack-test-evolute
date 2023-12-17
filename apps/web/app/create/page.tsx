"use client";
import React from "react";
import {
  Form,
  Input,
  Button,
  Space,
  message,
  Typography,
  Card,
  Flex,
} from "antd";
import { PlusOutlined, CloseOutlined as CloseIcon } from "@ant-design/icons";

const SurveyForm = () => {
  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Please fill in all required fields.");
  };

  const onFinish = (values: any) => {
    // Handle form submission (you can send the data to your server or process it as needed)
    console.log("Received values:", values);
    message.success("Survey questions and choices created successfully!");
  };

  return (
    <div className={"container mx-auto px-4 py-12"}>
      <Form
        form={form}
        name={"survey-form"}
        layout={"vertical"}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Typography.Title>Create New Survey</Typography.Title>

        <Form.List
          name={"questions"}
          initialValue={[""]} // Initial empty choices
        >
          {(fields, { add, remove }) => (
            <Space direction={"vertical"} size={32} className={"w-full"}>
              {fields.map((_, idx) => {
                return (
                  <SurveyField
                    key={idx}
                    index={idx}
                    onRemove={() => remove(idx)}
                  />
                );
              })}
              <Form.Item>
                <Space className={"py-4"}>
                  <Button
                    size={"large"}
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Question
                  </Button>

                  <Button size={"large"} type="primary" htmlType="submit">
                    Create Survey
                  </Button>
                </Space>
              </Form.Item>
            </Space>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

function SurveyField(props: {
  index: number;
  onRemove: () => void;
  children?: React.ReactNode;
}) {
  const { index, onRemove } = props;
  const serial = String(index);

  return (
    <Card>
      <Flex justify={"space-between"}>
        <Typography.Paragraph
          className={"uppercase tracking-widest opacity-50"}
        >
          Question #{index + 1}
        </Typography.Paragraph>
        <Button icon={<CloseIcon />} shape={"circle"} onClick={onRemove} />
      </Flex>

      <Form.Item
        label="Survey Question"
        name={[serial, "question"]}
        rules={[{ required: true, message: "Please enter a survey question!" }]}
      >
        <Input placeholder="Enter your survey question" className={"block"} />
      </Form.Item>

      <Typography.Paragraph className={"uppercase tracking-widest opacity-50"}>
        CHOICES
      </Typography.Paragraph>

      <Form.List
        name={[serial, "options"]}
        initialValue={["", ""]} // Initial empty choices
        rules={[
          {
            validator: async (_, options) => {
              if (!options || options.length < 2) {
                return Promise.reject(
                  new Error("Please add at least two choices!"),
                );
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }) => {
          return (
            <Flex vertical>
              <Space direction={"vertical"}>
                {fields.map(({ key, name, fieldKey, ...restField }) => {
                  return (
                    <Space
                      key={key}
                      align="center"
                      className={"flex bg-gray-50 p-1 rounded-lg border"}
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "choice"]}
                        className={"!mb-0"}
                        rules={[
                          {
                            required: true,
                            message: "Please enter a choice!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter a choice" />
                      </Form.Item>

                      <Button
                        type={"text"}
                        shape="circle"
                        onClick={() => remove(name)}
                        icon={<CloseIcon />}
                      />
                    </Space>
                  );
                })}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Choice
                  </Button>
                </Form.Item>
              </Space>
            </Flex>
          );
        }}
      </Form.List>
    </Card>
  );
}

export default SurveyForm;
