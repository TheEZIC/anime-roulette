import React, {FC} from 'react';
import { BoxProps, Heading, HStack, Image, useColorModeValue, VStack} from "@chakra-ui/react";
import {IShikimoriTitleResponse} from "../../shikimoriApi/ShikimoriTypes";

import "./MangaItem.scss";

interface IProps extends BoxProps {
  item: IShikimoriTitleResponse;
  controls?: React.ReactNode;
}

export const MangaItem: FC<IProps> = (props) => {
  const {item} = props;
  const baseURL = "https://shikimori.one/";

  const subTitleColor = useColorModeValue("#555", "#AAA");

  const renderControls = () => {
    if (!props.controls) {
      return;
    }

    return (
      <HStack>
        {props.controls}
      </HStack>
    );
  }

  return (
    <HStack {...props} className="manga-item">
      <div className="manga-item__image">
        <Image
          src={baseURL + item.image.preview}
          alt="preview"
        />
      </div>
      <VStack className="manga-item__body">
        <Heading
          className="manga-item__title"
          as='h5'
          size='sm'
          noOfLines={1}
        >
          {item.russian}
        </Heading>
        <Heading
          className="manga-item__subtitle"
          color={subTitleColor}
          as='h6'
          size='xs'
          noOfLines={1}
        >
          {item.name}
        </Heading>
      </VStack>
      {renderControls()}
    </HStack>
  );
}
