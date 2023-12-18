"use client";
import { Survey } from "~/types/interfaces";
import { useFormPersist } from "~/hooks/use-form-state";
import React from "react";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { assoc } from "ramda";
import { Button, Card, Checkbox, Flex, Space, Typography } from "antd";

export function SurveyQuestions(props: {
  surveyId: string;
  data: Survey["questions"];
}) {
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
        {questions.map((question, index) => {
          const question_id = String(index);

          return (
            <Card key={question_id}>
              <Typography.Title level={4}>
                {index + 1}. {question.text}
              </Typography.Title>

              <Typography.Paragraph className={"opacity-50"}>
                You can select more than one option
              </Typography.Paragraph>

              <Checkbox.Group
                value={state[question_id] ?? []}
                onChange={(values) => {
                  setAnswer(question_id, values);
                }}
              >
                <Space size={8} direction={"vertical"}>
                  {question.options.map((option, idx) => {
                    return (
                      <Checkbox
                        key={option._id}
                        name={question.text}
                        value={idx}
                      >
                        {option.text}
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
