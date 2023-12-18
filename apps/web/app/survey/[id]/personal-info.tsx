"use client";
import { SurveyParticipant } from "~/types/interfaces";
import { Button, Card, Flex, Form, Input, Typography } from "antd";
import {
  emailSchema,
  fullNameSchema,
  validateWithSchema,
} from "~/libs/validators";
import React from "react";

export function PersonalInfo(props: {
  isLoading?: boolean;
  onSuccess: (data: SurveyParticipant) => void;
}) {
  const { isLoading } = props;

  const [form] = Form.useForm<SurveyParticipant>();

  return (
    <Card>
      <Typography.Paragraph>
        Please provide the following information to continue
      </Typography.Paragraph>

      <Form
        form={form}
        layout={"vertical"}
        name={"login-form"}
        onFinish={(values) => {
          props.onSuccess(values);
        }}
      >
        <Flex vertical className={"w-full"}>
          <Form.Item
            name={"full_name"}
            label={"Full name"}
            rules={[
              { required: true, validator: validateWithSchema(fullNameSchema) },
            ]}
          >
            <Input size="large" placeholder="John Doe" type="text" />
          </Form.Item>

          <Form.Item
            name={"email_address"}
            label={"Email address"}
            rules={[
              {
                required: true,
                validator: validateWithSchema(emailSchema),
              },
            ]}
          >
            <Input size="large" type="email" placeholder="someone@domain.com" />
          </Form.Item>

          <Form.Item>
            <Button
              className={"mx-auto block"}
              loading={isLoading}
              size={"large"}
              htmlType={"submit"}
            >
              Start Survey
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Card>
  );
}
