import { Heading as ChakraHeader, Flex } from "@chakra-ui/react";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <Flex justify="center" align="center">
      <ChakraHeader size="3xl" textAlign="center">
        {title}
      </ChakraHeader>
    </Flex>
  );
};
