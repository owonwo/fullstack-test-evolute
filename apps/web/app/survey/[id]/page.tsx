"use client";
import {
  Button,
  Card,
  Checkbox,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import theme from "~/config/theme";
import { assoc } from "ramda";
import React from "react";
import { useFormPersist } from "~/hooks/use-form-state";
import { SurveyQuestion } from "~/types/interfaces";
import { CheckboxValueType } from "antd/es/checkbox/Group";

type Props = {
  params: { id: string };
  searchParams: Record<string, any>;
};

export default function Survey({ params }: Props) {
  const [questions, setQuestions] = React.useState<SurveyQuestion[]>([]);
  const [isStarted, setIsStarted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = () => {
    setIsLoading(true);
    import("./sample-data.json")
      .then((res: any) => {
        setQuestions(res.default);
        setIsStarted(true);
        // setSessionData({})
      })
      .catch(() => {
        alert(
          "Error loading survey data. Please check your internet connection",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ConfigProvider theme={theme}>
      <Row justify={"center"} align={"middle"} className={"min-h-screen py-24"}>
        <Col span={21} md={16} lg={12}>
          {!isStarted ? (
            <PersonalInfo isLoading={isLoading} onSuccess={onSubmit} />
          ) : (
            <SurveyQuestions data={questions} surveyId={params.id} />
          )}
        </Col>
      </Row>
    </ConfigProvider>
  );
}

function PersonalInfo(props: { isLoading: boolean; onSuccess: () => void }) {
  const { isLoading } = props;

  const [form] = Form.useForm();

  return (
    <Card>
      <Typography.Title level={4}>Welcome</Typography.Title>

      <Typography.Paragraph>
        Some personal information is required for this survey.
      </Typography.Paragraph>

      <Form form={form} layout={"vertical"}>
        <Flex vertical className={"w-full"}>
          <Form.Item name={"full_name"} label={"Full name"}>
            <Input size="large" placeholder="John Doe" type={"text"} />
          </Form.Item>

          <Form.Item name={"email_address"} label={"Email address"}>
            <Input
              size="large"
              placeholder="someone@domain.com"
              type={"email"}
            />
          </Form.Item>

          <Button
            className={"mx-auto block"}
            loading={isLoading}
            onClick={props.onSuccess}
          >
            Begin
          </Button>
        </Flex>
      </Form>
    </Card>
  );
}

function SurveyQuestions(props: { surveyId: string; data: SurveyQuestion[] }) {
  const { data: questions, surveyId } = props;

  const { data } = useFormPersist(surveyId + ":checkbox", () => state);
  const [state, setState] = React.useState<Record<string, CheckboxValueType[]>>(
    () => data ?? {},
  );

  const setAnswer = (
    question_id: string,
    answer_index: CheckboxValueType[],
  ) => {
    setState(assoc(question_id, answer_index));
  };

  return (
    <Flex vertical>
      <Typography.Title level={4}>
        Answer all questions and click the Finish button to save
      </Typography.Title>

      <Space size={32} direction={"vertical"}>
        {questions.map((sample_data, index) => {
          return (
            <Card key={sample_data._id}>
              <Typography.Title level={4}>
                {index + 1}. {sample_data.question}
              </Typography.Title>

              <Typography.Paragraph className={"opacity-50"}>
                You can select more than one option
              </Typography.Paragraph>

              <Checkbox.Group
                value={state[sample_data._id] ?? []}
                onChange={(values) => {
                  setAnswer(sample_data._id, values);
                }}
              >
                <Space size={8} direction={"vertical"}>
                  {sample_data.options.map((item, idx) => {
                    return (
                      <Checkbox key={idx} name={sample_data._id} value={idx}>
                        {item}
                      </Checkbox>
                    );
                  })}
                </Space>
              </Checkbox.Group>
            </Card>
          );
        })}

        <Flex align={"stretch"} justify={"flex-end"}>
          <Button type={"default"} size={"large"}>
            Submit
          </Button>
        </Flex>
      </Space>
    </Flex>
  );
}
