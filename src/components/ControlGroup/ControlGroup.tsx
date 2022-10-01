import React from 'react';
import {Button, HStack, Icon, VStack} from "@chakra-ui/react";
import {Search} from "../Search/Search";
import {RouletteTitles} from "../RouletteTitles/RouletteTitles";
import {BsTrash} from 'react-icons/bs';
import {rouletteTitlesStore} from "../../stores/RouletteTitlesStore";

const ControlGroup = () => {
  return (
    <VStack align="stretch">
      <HStack justifyContent="space-between" align="stretch">
        <Search />
        <Button
          colorScheme="red"
          onClick={() => rouletteTitlesStore.clearTitles()}
        >
          <Icon as={BsTrash} />
        </Button>
      </HStack>
      <RouletteTitles/>
    </VStack>
  );
};

export default ControlGroup;
