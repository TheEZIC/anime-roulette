import {
  Button,
  Container,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure, Box,
} from '@chakra-ui/react';
import { SearchList } from './SearchList';

import "./Search.scss";
import {SearchInput} from "./SearchInput";

export const Search = () => {
  const modal = useDisclosure();

  return (
    <Box>
      <Button onClick={modal.onOpen}>Поиск</Button>
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        motionPreset='slideInBottom'
        // size='full'
      >
        <ModalOverlay
          // backdropFilter='blur(7px)'
        />

        <ModalContent bg="transparent" className="search-modal">
          <SearchInput />
          <SearchList />
        </ModalContent>
      </Modal>
    </Box>
  )
}
