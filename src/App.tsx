import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Container from "./components/container";
import Nav from "./components/nav";
import Home from "./components/home";
import ProductPage from "./components/productPage";
import ProductOverview from "./components/productOverview";
import Cart from "./components/cart";

import "./styles/output.css";

function App() {
	return (
		<Router basename="/informatica/leerlingenwebsites/IN2021/ProjectWebsites/Drip/">
			<Nav />

			<Container className="my-14 mt-32">
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/overview">overview</Route>
					<Route path="/search">search</Route>
					{/* <Route path="/winkelmand">winkelmand</Route> */}
					<Route path="/winkelmand"><Cart/></Route>
					<Route path="/producten/" exact>
						<ProductOverview />
					</Route>
					<Route path="/product/:productId">
						<ProductPage />
					</Route>

					<Route path="/about">over</Route>
				</Switch>
			</Container>
		</Router>
	);
}

export default App;
