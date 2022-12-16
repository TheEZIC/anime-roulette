import React, {ChangeEvent} from 'react';
import {
  Button,
  HStack,
  Icon,
  Input, NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack
} from "@chakra-ui/react";
import {Search} from "../Search/Search";
import {RouletteTitles} from "../RouletteTitles/RouletteTitles";
import {BsTrash} from 'react-icons/bs';
import {rouletteTitlesStore} from "../../stores/RouletteTitlesStore";
import {observer} from "mobx-react";
import {searchListStore} from "../../stores/SearchListStore";
import {rouletteStore} from "../../stores/RouletteStore";

const ControlGroup = observer(() => {
  const onNsfwClick  = () => {
    searchListStore.toggleNsfw();
    console.log("on nsfw click", searchListStore.nsfw);
  }

  const onTimerChange = (value: string) => {
    let v = Number(value);
    console.log(v);
    rouletteStore.timer = v;
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
        <HStack>
          <NumberInput
            step={5}
            min={5}
            placeholder={"Время кручения"}
            value={rouletteStore.timer}
            onChange={(e) => onTimerChange(e)}
          >
            <NumberInputField/>
            <NumberInputStepper>
              <NumberIncrementStepper/>
              <NumberDecrementStepper/>
            </NumberInputStepper>
          </NumberInput>
          <Button
            colorScheme="red"
            onClick={() => rouletteTitlesStore.clearTitles()}
          >
            <Icon as={BsTrash} />
          </Button>
        </HStack>

      </HStack>
      <RouletteTitles/>
    </VStack>
  );
});

export default ControlGroup;
