"use client";
import { Typography, Row, Col, Flex } from "antd";
import { BarChart } from "@tremor/react";
import sample from "../sample-data.json";

type Props = {
  searchParams: Record<string, any>;
  params: { id: string };
};

const data = sample.map((record) => {
  return {
    title: record.question,
    categories: record.options.map((e) => e),
    values: record.options.map((d) => {
      return { option: d, [d]: Math.floor(Math.random() * 1000) };
    }),
  };
});

const valueFormatter = (number: number) => {
  return Intl.NumberFormat("us").format(number).toString();
};

export default function ResultsPage(props: Props) {
  return (
    <Row justify={"center"} align={"top"} className={"min-h-screen py-24"}>
      <Col span={21} md={16} lg={12}>
        <Flex vertical>
          <Typography.Title>Survey Result</Typography.Title>
          <Typography.Paragraph>
            See the result for each question from the survey
          </Typography.Paragraph>

          {data.map((entry) => {
            return (
              <Flex key={entry.title} vertical className={"py-12"}>
                <Typography.Title level={3}>{entry.title}</Typography.Title>
                <BarChart
                  className="mt-4 h-80"
                  data={entry.values}
                  index="option"
                  categories={entry.categories}
                  valueFormatter={valueFormatter}
                  colors={["orange", "violet", "fuchsia", "cyan", "lime"]}
                  showGridLines={true}
                  showXAxis={true}
                  stack={true}
                  showLegend={false}
                  layout={"vertical"}
                />
              </Flex>
            );
          })}
        </Flex>
      </Col>
    </Row>
  );
}
