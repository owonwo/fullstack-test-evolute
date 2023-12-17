"use client";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Flex,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";
import theme from "~/config/theme";
import { assoc } from "ramda";
import React from "react";
import { useFormPersist } from "~/hooks_/use-form-state";
import samples from "./sample-data.json";

type Props = {
  params: { id: string };
  searchParams: Record<string, any>;
};

export default function Survey({ searchParams, params }: Props) {
  const { data } = useFormPersist(params.id, () => state);
  const [state, setState] = React.useState<Record<string, number>>(
    () => data ?? {},
  );

  const setAnswer = (question_id: string, answer_index: string) => {
    setState(assoc(question_id, answer_index));
  };

  return (
    <ConfigProvider theme={theme}>
      <Row justify={"center"} align={"middle"} className={"min-h-screen py-24"}>
        <Col span={21} md={16} lg={12}>
          <Flex vertical>
            <Space size={32} direction={"vertical"}>
              {samples.map((sample_data, index) => {
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
        </Col>
      </Row>
    </ConfigProvider>
  );
}
