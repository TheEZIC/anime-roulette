import React from 'react';
import {Button, HStack, Icon, VStack} from "@chakra-ui/react";
import {Search} from "../Search/Search";
import {RouletteTitles} from "../RouletteTitles/RouletteTitles";
import {BsTrash} from 'react-icons/bs';
import {rouletteTitlesStore} from "../../stores/RouletteTitlesStore";
import {observer} from "mobx-react";
import {searchListStore} from "../../stores/SearchListStore";

const ControlGroup = observer(() => {
  const onNsfwClick  = () => {
    searchListStore.toggleNsfw();
    console.log("on nsfw click", searchListStore.nsfw);
  }

  return (
    <VStack align="stretch">
      <HStack justifyContent="space-between" align="stretch">
        <HStack>
          <Search />
          <Button
            colorScheme="red"
            variant={searchListStore.nsfw ? "solid" : "outline"}
            onClick={onNsfwClick}
          >NSFW</Button>
        </HStack>
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
});

export default ControlGroup;
