import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

import Container from "./components/container";
import Nav from "./components/nav";
import Home from "./components/home";
import ProductPage from "./components/productPage";
import ProductOverview from "./components/productOverview";
import Cart from "./components/cart";
import Footer from "./components/footer";
import Dashboard from "./components/dashboard";
import Return from "./components/return";

import GlobalState from "./context/globalState";

import "./styles/output.css";
import Info from "./components/info";
import ProductPageEdit from "./components/productPageEdit";
import ProductPageCreate from "./components/productPageCreate";
import OrderPage from "./components/orderPage";

function App() {
	return (
		<GlobalState>
			<Router>
				<div className="flex flex-col justify-between min-h-screen">
					<Nav />

					<Container className="my-14 mt-32">
						<Switch>
							<Route path="/" exact>
								<Home />
							</Route>
							{/* <Route path="/search">search</Route> */}
							<Route path="/winkelmand" exact>
								<Cart />
							</Route>
							<Route path="/producten" exact>
								<ProductOverview />
							</Route>
							<Route path="/dashboard" exact>
								<Dashboard />
							</Route>
							<Route exact path="/product/:productId">
								<ProductPage />
							</Route>
							<Route exact path="/order/:orderId">
								<OrderPage />
							</Route>
							<Route path="/product/:productId/edit" exact>
								<ProductPageEdit />
							</Route>
							<Route exact path="/productcreate">
								<ProductPageCreate />
							</Route>
							<Route path="/over" exact>
								<Info />
							</Route>
							<Route path="/return">
								<Return />
							</Route>

							<Route path="*" exact={true}>
								404 Not found
							</Route>
						</Switch>
					</Container>
					<Footer />
				</div>
			</Router>
		</GlobalState>
	);
}

export default App;
