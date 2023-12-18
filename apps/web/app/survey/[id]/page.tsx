"use client";
import { Col, Flex, message, Row, Skeleton, Typography } from "antd";
import React from "react";
import { SelectedSurveyOptions, SurveyParticipant } from "~/types/interfaces";
import { PersonalInfo } from "./personal-info";
import { SurveyQuestions } from "~/app/survey/[id]/survey-questions";
import { useCreateSurveyResponse, useGetSurvey } from "~/hooks/use-survey";
import { match } from "ts-pattern";
import { Routes } from "~/libs/routes";
import { useRouter } from "next/navigation";

type Props = {
  params: { id: string };
  searchParams: Record<string, any>;
};

export default function Survey({ params }: Props) {
  const router = useRouter();
  const { status, data, isLoading } = useGetSurvey(params.id);
  const createSurveyResponse = useCreateSurveyResponse(params.id);

  const [participant, setParticipant] =
    React.useState<SurveyParticipant | null>(null);

  const onSubmit = (participant: SurveyParticipant) => {
    setParticipant(participant);
  };

  const onSaveResponse = (selectedOptions: SelectedSurveyOptions) => {
    createSurveyResponse
      .mutateAsync({
        user: participant,
        survey: params.id,
        answers: Object.values(selectedOptions),
      })
      .then(() => {
        router.push(Routes.SurveyResult(params.id));
      })
      .catch(() => {
        message.error("Error saving results. Please check your connection");
      });
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
            if (!data)
              return (
                <UnexpectedError>
                  Something went wrong. We're working on it
                </UnexpectedError>
              );

            return (
              <>
                {!participant ? (
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
                    data={data}
                    isLoading={createSurveyResponse.isLoading}
                    onSubmit={onSaveResponse}
                    surveyId={params.id}
                  />
                )}
              </>
            );
          })
          .otherwise(() => (
            <UnexpectedError>Something unexpected happened</UnexpectedError>
          ))}
      </Col>
    </Row>
  );
}

function UnexpectedError(props: { children?: React.ReactNode }) {
  return <Typography.Paragraph>{props.children}</Typography.Paragraph>;
}
