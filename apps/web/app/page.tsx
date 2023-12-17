"use client";
import { Button, Flex, Typography } from "antd";
import Link from "next/link";
import React from "react";

export default function Page(): React.JSX.Element {
  return (
    <main
      className={"text-center min-h-screen flex items-center justify-center"}
    >
      <Flex vertical>
        <Typography.Title level={1}>Welcome to the Survey App</Typography.Title>
        <Typography.Paragraph className={"max-w-md"}>
          Create and view multiple choice surveys, share generated link and see
          the results. To begin click on the button below.
        </Typography.Paragraph>

        <Flex justify={"center"} className={"py-12"}>
          <Link href={"/create"}>
            <Button size={"large"}>Get Started</Button>
          </Link>
        </Flex>
      </Flex>
    </main>
  );
}
