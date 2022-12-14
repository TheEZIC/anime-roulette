import * as localForage from "localforage";
import PackagesProviders from "config/PackagesProviders";
import Router from "./router/Router";
import { root } from "config/ReactConstants";
import { Header } from "components/Header/Header";

import "./index.scss";
import {create} from "mobx-persist";
import {searchListStore} from "./stores/SearchListStore";
import {rouletteTitlesStore} from "./stores/RouletteTitlesStore";
import {rouleteStoreInitialState, rouletteStore} from "./stores/RouletteStore";

const hydrate = create({
  storage: localForage,
  jsonify: true,
});

const renderApp = () => {
  Promise.all([
    hydrate("searchList", searchListStore),
    hydrate("rouletteTitles", rouletteTitlesStore),
    hydrate("roulette", rouletteStore, rouleteStoreInitialState),
  ]).then(() => {
    root.render(
      <>
        <PackagesProviders>
          <Header />
          <Router />
        </PackagesProviders>
      </>
    );
  });
}

renderApp();
