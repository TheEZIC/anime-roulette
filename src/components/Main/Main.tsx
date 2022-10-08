import {SimpleGrid, Box, Button, VStack} from '@chakra-ui/react';
import { Page } from 'components/Page/Page';
import { Roulette } from "components/Roulette/Roulette";
import ControlGroup from "../ControlGroup/ControlGroup";
import {useRef} from "react";
import {rouletteStore} from "../../stores/RouletteStore";
import {observer} from "mobx-react";
import {rouletteTitlesStore} from "../../stores/RouletteTitlesStore";

export const Main = observer(() => {
  const spinRef = useRef<any>(null);

  const renderWinner = (): React.ReactNode | null => {
    if (!rouletteStore.winner) {
      return null;
    }

    const {item} = rouletteStore.winner;

    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={"https://shikimori.one/" + item.url}
      >
        <b>{item.russian}</b>
      </a>
    );
  }

  return (
    <Page>
      <SimpleGrid columns={[null, null, 1, 2]} spacing={20}>
        <ControlGroup />
        <VStack>
          <Roulette
            getSpin={(spin) => {
              spinRef.current = spin;
            }}
          />
          {rouletteTitlesStore.titles.length && <Button onClick={() => spinRef?.current()}>Спин</Button>}
          {renderWinner()}
        </VStack>
      </SimpleGrid>
    </Page>
  );
});
