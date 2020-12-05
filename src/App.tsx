import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Container from "./components/container";
import Home from "./components/home";
import Nav from "./components/nav";

import "./styles/output.css";

function App() {
	return (
		<Router>
			<Nav />

			<Container className="mt-14">
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/overview">overview</Route>
					<Route path="/search">search</Route>
					<Route path="/producten/" exact>
						producten
					</Route>
					<Route path="/product/:productId">product</Route>

					<Route path="/about">over</Route>
				</Switch>
			</Container>
		</Router>
	);
}

export default App;
