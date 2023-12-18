"use client";
import React from "react";
import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  message,
  Space,
  Typography,
} from "antd";
import {
  CloseOutlined as CloseIcon,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useFormPersist } from "~/hooks/use-form-state";
import { CreateSurveyPayload, Survey } from "~/types/interfaces";
import { SurveyCreatedModal } from "~/app/create/survey-modal";
import { useCreateSurvey } from "~/hooks/use-survey";

const DEFAULT_VALUE = {
  title: "",
  questions: [{}],
};

const SurveyForm = () => {
  const [form] = Form.useForm();

  const { data: value, clear: clearPersistedData } = useFormPersist(
    "create-survey",
    () => {
      return form.getFieldsValue();
    },
  );

  const [surveyData, setSurveyData] = React.useState<Survey | null>(null);

  const createSurvey = useCreateSurvey();

  const onFinishFailed = (errorInfo: any) => {
    message.error("Please fill in all required fields.");
  };

  const onFinish = (values: CreateSurveyPayload) => {
    // Handle form submission (you can send the data to your server or process it as needed)
    createSurvey
      .mutateAsync(values)
      .then((response) => {
        message.success("Survey created successfully!");
        setSurveyData(response);
        clearPersistedData();
        form.resetFields();
      })
      .catch((err) => {
        message.error(err.message);
      });
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

        <Form.Item
          label="Survey Title"
          name={["title"]}
          rules={[{ required: true, message: "Please enter a Survey title" }]}
        >
          <Input placeholder="Enter survey title" />
        </Form.Item>

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
                  disabled={createSurvey.isLoading}
                  loading={createSurvey.isLoading}
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

      {surveyData ? <SurveyCreatedModal open data={surveyData} /> : null}
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
        name={[serial, "text"]}
        rules={[{ required: true, message: "Please enter a survey question!" }]}
      >
        <Input placeholder="Enter your survey question" />
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
                        name={[name, "text"]}
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
