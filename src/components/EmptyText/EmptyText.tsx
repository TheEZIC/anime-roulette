import React, {FC} from 'react';
import {Heading} from "@chakra-ui/react";

interface IProps {
  children: React.ReactNode
}

const EmptyText: FC<IProps> = (props) => {
  return (
    <Heading
      as='h5'
      size='md'
      mt={5}
      mb={5}
      noOfLines={1}
      textAlign="center"
    >
      {props.children}
    </Heading>
  );
};

export default EmptyText;
