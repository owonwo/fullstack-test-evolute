"use client";
import { Col, Flex, Row, Skeleton, Typography } from "antd";
import React from "react";
import { SurveyParticipant } from "~/types/interfaces";
import { PersonalInfo } from "./personal-info";
import { SurveyQuestions } from "~/app/survey/[id]/survey-questions";
import { useGetSurvey } from "~/hooks/use-get-survey";
import { match } from "ts-pattern";

type Props = {
  params: { id: string };
  searchParams: Record<string, any>;
};

export default function Survey({ params }: Props) {
  const [isStarted, setIsStarted] = React.useState(false);
  const { status, data, isLoading } = useGetSurvey(params.id);

  const onSubmit = (participant: SurveyParticipant) => {
    setIsStarted(true);
  };

  return (
    <Row justify={"center"} align={"middle"} className={"min-h-screen py-24"}>
      <Col span={21} md={16} lg={12}>
        {match({ status })
          .with({ status: "loading" }, () => {
            return (
              <>
                <Skeleton />
              </>
            );
          })
          .with({ status: "success" }, () => {
            return (
              <>
                {!isStarted ? (
                  <Flex vertical gap={24} align={"center"}>
                    <Flex vertical className={"max-w-md text-center"}>
                      <Typography.Paragraph
                        className={"uppercase tracking-widest"}
                      >
                        Survey TITLE
                      </Typography.Paragraph>
                      <Typography.Title level={2} className={"!mt-0"}>
                        {data?.title}
                      </Typography.Title>
                    </Flex>

                    <PersonalInfo isLoading={isLoading} onSuccess={onSubmit} />
                  </Flex>
                ) : (
                  <SurveyQuestions
                    data={data?.questions ?? []}
                    surveyId={params.id}
                  />
                )}
              </>
            );
          })
          .otherwise(() => (
            <Typography.Paragraph>
              Something unexpected happened
            </Typography.Paragraph>
          ))}
      </Col>
    </Row>
  );
}
