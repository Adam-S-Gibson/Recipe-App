import { Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Text textAlign="center">
      Copyright &copy; {new Date().getFullYear()} All Rights
      Reserved
    </Text>
  );
};
