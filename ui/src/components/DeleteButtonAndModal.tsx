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
    fetch(`http://localhost:3080/api/recipe/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
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
        aria-label="Remove Recipe Modal Button"
      >
        Remove Recipe
      </Button>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        aria-label="Delete Modal"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Are you sure you want to delete?
            </Text>
            <Text fontWeight="bold">This action is permanent!</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              id="closeButton"
              aria-label="Close Modal"
            >
              Close
            </Button>
            <Button
              colorScheme="red"
              id="deleteButton"
              onClick={() => deleteRecipe(id)}
              aria-label="Delete Recipe"
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
