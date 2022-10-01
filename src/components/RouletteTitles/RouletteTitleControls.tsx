import React, {FC} from 'react';
import {Button, ButtonGroup, Icon, Text} from "@chakra-ui/react";
import {TiMinus, TiPlus} from 'react-icons/ti';
import {BsTrash} from 'react-icons/bs';
import {IRouletteTitle, rouletteTitlesStore} from "../../stores/RouletteTitlesStore";

interface IProps {
  title: IRouletteTitle;
}

const RouletteTitleControls: FC<IProps> = ({title}) => {
  const store = rouletteTitlesStore;

  return (
    <ButtonGroup isAttached size="sm">
      <Button
        colorScheme="red"
        onClick={() => store.decreaseWeight(title.item)}
      >
        <Icon as={TiMinus} />
      </Button>
      <Button disabled>
        <Text>{title.weight}</Text>
      </Button>
      <Button
        colorScheme="green"
        onClick={() => store.increaseWeight(title.item)}
      >
        <Icon as={TiPlus} />
      </Button>
      <Button
        colorScheme="red"
        onClick={() => store.removeTitle(title.item)}
      >
        <Icon as={BsTrash} />
      </Button>
    </ButtonGroup>
  );
};

export default RouletteTitleControls;
