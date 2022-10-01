import { FC } from 'react'
import { Button, Icon, useColorMode } from '@chakra-ui/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

import './ThemeToggle.scss';

export const ThemeToggle: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button className='theme-toggle' onClick={toggleColorMode}>
      <Icon as={colorMode === 'light' ? MdLightMode : MdDarkMode} />
    </Button>
  );
}
