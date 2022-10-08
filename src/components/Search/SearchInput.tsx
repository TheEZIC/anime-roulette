import React, {ChangeEvent, useEffect} from 'react';
import {observer} from "mobx-react";
import {Box, Input, useColorModeValue} from "@chakra-ui/react";
import {searchListStore} from "../../stores/SearchListStore";
import {useDebounce} from "../../hooks/useDebounce";

export const SearchInput = observer(() => {
  const inputBGColor = useColorModeValue("white", "gray.700");

  const executeRequest = useDebounce(() => {
    searchListStore.request();
  }, 550);

  const onChange = (e: ChangeEvent<any>) => {
    searchListStore.changeSearch(e.target?.value);
    executeRequest();
  }

  return (
    <Box bg={inputBGColor} className="search-box">
      <Input value={searchListStore.search} onChange={onChange}/>
    </Box>
  );
});
