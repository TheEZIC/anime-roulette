import { FC, PropsWithChildren } from "react";
import { Container, VStack } from "@chakra-ui/react";
import "./Page.scss";

export const Page: FC<PropsWithChildren> = (props) => {
  return (
    <VStack maxW="100%" className="page">
      <Container height="100%" className="container" maxW="6xl">
        {props.children}
      </Container>
    </VStack>
  )
}
