import { Container, Text, useColorMode } from "@chakra-ui/react";
import { ThemeToggle } from "components/ThemeToggle/ThemeToggle";

import "./Header.scss";

export const Header = () => {
  const { colorMode } = useColorMode();

  return (
    <Container
      className="header"
      maxWidth="100%"
      borderBottomColor={colorMode === "light" ? "blackAlpha.300" : "gray.700"}
    >
      <Container className="container header__content" maxW="6xl">
        <Text className="header__title" fontSize="1.5em">Карусель (название временное)</Text>
        <ThemeToggle/>
      </Container>
    </Container>
  )
}
