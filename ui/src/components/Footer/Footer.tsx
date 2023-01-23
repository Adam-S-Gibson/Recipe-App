import { Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Text textAlign="center">
      Copyright &copy; {new Date().getFullYear()} Sero Kitchen All Rights
      Reserved
    </Text>
  );
};
