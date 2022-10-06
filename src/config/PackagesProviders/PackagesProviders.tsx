import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';

import theme from '../ColorTheme';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const PackagesProviders: React.FC<Props> = ({children}) => {
  return (
    <BrowserRouter basename={!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "" : "/anime-roulette"}>
      <ChakraProvider theme={theme} cssVarsRoot="html">
        {children}
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default PackagesProviders;
