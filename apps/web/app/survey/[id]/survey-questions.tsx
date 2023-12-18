"use client";
import { SelectedSurveyOptions, Survey } from "~/types/interfaces";
import { useFormPersist } from "~/hooks/use-form-state";
import React from "react";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { assoc } from "ramda";
import { Button, Card, Checkbox, Flex, Space, Typography } from "antd";

/** Note: Tried to use the AntD Form components for this but kept failing **/
export function SurveyQuestions(props: {
  surveyId: string;
  data: Survey;
  isLoading: boolean;
  onSubmit: (state: SelectedSurveyOptions) => void;
}) {
  const {
    data: { title, questions },
    surveyId,
    isLoading,
    onSubmit,
  } = props;
  const { data } = useFormPersist(surveyId + ":checkbox_", () => checks);
  const [checks, setChecks] = React.useState<SelectedSurveyOptions>(
    () => data ?? {},
  );

  const setAnswer = (
    question_id: string,
    answer_index: CheckboxValueType[],
  ) => {
    setChecks(assoc(question_id, answer_index));
  };

  return (
    <Flex vertical>
      <Flex vertical>
        <Typography.Title level={1}>{title}</Typography.Title>
        <Typography.Paragraph>
          All answers are required for this survey
        </Typography.Paragraph>
      </Flex>

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
                value={checks[question_id] ?? []}
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
                        value={option._id}
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
          <Button
            type={"default"}
            disabled={isLoading}
            loading={isLoading}
            size={"large"}
            onClick={() => onSubmit(checks)}
          >
            Submit
          </Button>
        </Flex>
      </Space>
    </Flex>
  );
}
