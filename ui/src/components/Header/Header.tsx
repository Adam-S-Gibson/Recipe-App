import { Heading as ChakraHeader, Flex } from "@chakra-ui/react";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <Flex justify="center" align="center">
      <ChakraHeader size="3xl" mt={2} textAlign="center">
        {title}
      </ChakraHeader>
    </Flex>
  );
};
