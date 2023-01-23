import {
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

interface DeleteButton {
  id: string;
}

export const DeleteButtonAndModal = ({ id }: DeleteButton) => {
  const pageHistory = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteRecipe = async (id: string) => {
    fetch(`http://localhost:3080/api/recipes/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        pageHistory.push("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Button
        id="removeButton"
        size="sm"
        float="right"
        colorScheme="red"
        onClick={onOpen}
      >
        Remove Recipe
      </Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Are you sure you want to delete?
            </Text>
            <Text fontWeight="bold">This action is permanent!</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="red"
              id="deleteButton"
              onClick={() => deleteRecipe(id)}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
