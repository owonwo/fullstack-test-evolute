"use client";
import { Typography, Row, Col, Flex } from "antd";

type Props = {
  searchParams: Record<string, any>;
  params: { id: string };
};

const data = [
  { title: "A bag of somethings", value: [10, 45, 16, 22] },
  { title: "A bag of somethings", value: [1, 41, 19, 26] },
  { title: "A bag of somethings", value: [6, 2, 5, 1] },
];

export default function ResultsPage(props: Props) {
  return (
    <Row justify={"center"} align={"top"} className={"min-h-screen py-24"}>
      <Col span={21} md={16} lg={12}>
        <Flex vertical>
          <Typography.Title>Results</Typography.Title>
          <Typography.Paragraph>{props.params.id}</Typography.Paragraph>
        </Flex>
      </Col>
    </Row>
  );
}
