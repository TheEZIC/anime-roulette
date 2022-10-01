import React from 'react';
import {Button, ButtonGroup, Heading, Icon, VStack} from "@chakra-ui/react";
import {IRouletteTitle, rouletteTitlesStore} from "../../stores/RouletteTitlesStore";
import {MangaItem} from "../MangaItem/MangaItem";
import {observer} from "mobx-react";

import "./RouletteTitles.scss";
import EmptyText from "../EmptyText/EmptyText";
import RouletteTitleControls from "./RouletteTitleControls";

export const RouletteTitles = observer(() => {
  const renderList = () => {
    const {titles} = rouletteTitlesStore;

    if (!titles.length) {
      return <EmptyText>У вас не выбраны тайтлы</EmptyText>
    }

    return rouletteTitlesStore.titles.map((title) => (
      <MangaItem
        key={`local-item-${title.item.id}`}
        item={title.item}
        controls={<RouletteTitleControls title={title}/>}
      />
    ));
  }

  return (
    <VStack className="roulette-titles">
      {renderList()}
    </VStack>
  );
});
