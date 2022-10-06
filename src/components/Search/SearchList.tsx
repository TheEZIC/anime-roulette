import {FC} from 'react';
import {Container, Box, useColorModeValue, Spinner, HStack} from "@chakra-ui/react";
import {searchListStore} from "../../stores/SearchListStore";
import {observer} from "mobx-react";
import {MangaItem} from "../MangaItem/MangaItem";
import {rouletteTitlesStore} from "../../stores/RouletteTitlesStore";
import EmptyText from "../EmptyText/EmptyText";

export const SearchList: FC = observer(() => {
  const listBGColor = useColorModeValue("white", "gray.700");

  const renderLoading = () => {
    return (
      <HStack mt={5} mb={5} justifyContent="center" align="stretch">
        <Spinner size="xl"/>
      </HStack>
    );
  }

  const renderList = () => {
    if (searchListStore.loading) {
      return renderLoading();
    }

    //const existedIds = rouletteTitlesStore.titles.map(t => t.item.id);
    const items = (searchListStore.result ?? [])
      .filter((item) => !rouletteTitlesStore.checkTitle(item));

    if (!items.length) {
      return <EmptyText>По данному запросу ничего не найдено</EmptyText>;
    }

    return items.map((item) => (
      <MangaItem
        key={`api-title-${item.id}`}
        item={item}
        onClick={() => rouletteTitlesStore.addTitle(item)}
      />
    )).filter(t => t);
  }

  return (
    <Box bg={listBGColor} className="search-box search-list">
      <Container w="100%">
        {renderList()}
      </Container>
    </Box>
  )
});
