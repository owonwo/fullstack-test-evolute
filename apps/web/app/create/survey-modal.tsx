"use client";
import React from "react";
import { Button, Flex, Modal, Typography } from "antd";
import { Survey } from "~/types/interfaces";
import { useClipboard } from "~/hooks/use-clipboard";
import { baseUrl, Routes } from "~/libs/routes";

type Props = React.ComponentProps<typeof Modal> & { data: Survey };

export function SurveyCreatedModal(props: Props) {
  const { data: survey, ...PROPS } = props;
  const copy = useClipboard();

  return (
    <Modal {...PROPS} title="Survey created" footer={null}>
      <Typography.Paragraph>
        You survey was created successfully. <br /> You can share the link with
        the world.
      </Typography.Paragraph>
      <Flex gap={8}>
        <Button
          onClick={() => {
            const url = baseUrl(Routes.Survey(survey._id));
            copy(url, "Survey link copied");
          }}
        >
          Copy Link
        </Button>
      </Flex>
    </Modal>
  );
}
