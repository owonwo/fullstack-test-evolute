"use client";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Flex,
  Input,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";
import theme from "~/config/theme";
import { assoc } from "ramda";
import React from "react";
import { useFormPersist } from "~/hooks_/use-form-state";
import { SurveyQuestion } from "~/types/interfaces";

type Props = {
  params: { id: string };
  searchParams: Record<string, any>;
};

export default function Survey({ params }: Props) {
  const [sessionData, setSessionData] = React.useState({
    full_name: "",
    email: "",
  });

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
            <Card>
              <Typography.Title level={4}>Welcome</Typography.Title>

              <Typography.Paragraph>
                Some personal information is required for this survey.
              </Typography.Paragraph>

              <Space direction={"vertical"} size={12} className={"w-full"}>
                <Input size="large" placeholder="Full name" type={"text"} />
                <Input
                  size="large"
                  placeholder="Email address"
                  type={"email"}
                />
                <Button
                  className={"mx-auto block"}
                  loading={isLoading}
                  onClick={onSubmit}
                >
                  Begin
                </Button>
              </Space>
            </Card>
          ) : (
            <SurveyQuestions data={questions} surveyId={params.id} />
          )}
        </Col>
      </Row>
    </ConfigProvider>
  );
}

function SurveyQuestions(props: { surveyId: string; data: SurveyQuestion[] }) {
  const { data: questions, surveyId } = props;

  const { data } = useFormPersist(surveyId, () => state);
  const [state, setState] = React.useState<Record<string, number>>(
    () => data ?? {},
  );

  const setAnswer = (question_id: string, answer_index: string) => {
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

              <Radio.Group
                value={state[sample_data._id] ?? ""}
                onChange={(event) => {
                  setAnswer(sample_data._id, event.target.value);
                }}
              >
                <Typography.Paragraph color={"blue"}>
                  Select one answer
                </Typography.Paragraph>

                <Space size={8} direction={"vertical"}>
                  {sample_data.options.map((item, idx) => {
                    return (
                      <Radio key={idx} name={sample_data._id} value={idx}>
                        {item}
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>
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
