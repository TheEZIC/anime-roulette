import PackagesProviders from "config/PackagesProviders";
import Router from "./router/Router";
import { root } from "config/ReactConstants";
import { Header } from "components/Header/Header";

import "./index.scss";

root.render(
  <>
    <PackagesProviders>
      <Header />
      <Router />
    </PackagesProviders>
  </>
);
