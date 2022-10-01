import React, {ChangeEvent, useEffect} from 'react';
import {observer} from "mobx-react";
import {Box, Input, useColorModeValue} from "@chakra-ui/react";
import {searchListStore} from "../../stores/SearchListStore";
import {useInput} from "../../hooks/useInput";
import {useDebounce} from "../../hooks/useDebounce";

export const SearchInput = observer(() => {
  const inputBGColor = useColorModeValue("white", "gray.700");
  const input = useInput("");

  const onChange = useDebounce(() => {
    searchListStore.request(input.value);
  }, 550);

  useEffect(() => onChange(), [input.value]);

  return (
    <Box bg={inputBGColor} className="search-box">
      <Input {...input}/>
    </Box>
  );
});
