import {Routes, Route, BrowserRouter} from "react-router-dom";

import HomePage from "pages/home";
import NotFound from "pages/error";

const Router = () => {
	return (
		<BrowserRouter basename={!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "" : "/anime-roulette"}>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
