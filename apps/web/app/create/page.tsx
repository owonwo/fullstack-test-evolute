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
import {
  PlusOutlined,
  CloseOutlined as CloseIcon,
  SaveOutlined,
} from "@ant-design/icons";
import { useFormPersist } from "~/hooks_/use-form-state";

const DEFAULT_VALUE = {
  questions: [{}],
};

const SurveyForm = () => {
  const [form] = Form.useForm();

  const { data: value } = useFormPersist("create-survey", () => {
    return form.getFieldsValue();
  });

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
        initialValues={value ?? DEFAULT_VALUE}
        name={"survey-form"}
        layout={"vertical"}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Typography.Title>Create New Survey</Typography.Title>

        <Form.List
          name={"questions"}
          rules={[
            {
              validator: async (_, options) => {
                if (options === 0) {
                  throw new Error(
                    "At least one question required to create a survey.",
                  );
                }
              },
            },
          ]}
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

              <Flex justify={"space-between"} className={"py-4"}>
                <Button
                  size={"large"}
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add Question
                </Button>

                <Button
                  size={"large"}
                  type="default"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                >
                  Create Survey
                </Button>
              </Flex>
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
        <Button
          icon={<CloseIcon />}
          type="text"
          shape={"circle"}
          onClick={onRemove}
        />
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
              <Flex vertical gap={8} align={"flex-start"}>
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
              </Flex>
            </Flex>
          );
        }}
      </Form.List>
    </Card>
  );
}

export default SurveyForm;
