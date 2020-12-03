import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/nav";

import "./App.scss";

// import API_URL from "./api";

function App() {
	return (
		<Router>
			<div className="wrapper">
				<div className="App">
					<Nav />

					<main>
						<Switch>
							<Route path="/" exact>
								home
							</Route>
							<Route path="/overview">overview</Route>
							<Route path="/search">search</Route>
							<Route path="/product/:productId">product</Route>

							<Route path="/about">over</Route>
						</Switch>
					</main>
				</div>
			</div>
		</Router>
	);
}

export default App;

// const [items, setItems] = useState([]);
// 	const [page, setPage] = useState(1);
// 	const [meta, setMeta] = useState({});
// 	useEffect(() => {
// 		axios
// 			.get(`${API_URL}/products?page=${page}`)
// 			.then((res) => {
// 				setItems(res.data.data);
// 				setMeta(res.data.meta);
// 				// console.log(res.data.data);
// 			})
// 			.catch((err) => {
// 				console.log(err.config);
// 			});
// 	}, [page]);

// 	const PageNav = () => {
// 		return (
// 			<>
// 				{page > 1 && (
// 					<button
// 						onClick={() => {
// 							setPage(page - 1);
// 							setItems([]);
// 						}}
// 					>
// 						prev
// 					</button>
// 				)}
// 				{page}
// 				{page !== meta.last_page && (
// 					<button
// 						onClick={() => {
// 							setPage(page + 1);
// 							setItems([]);
// 						}}
// 					>
// 						next
// 					</button>
// 				)}
// 			</>
// 		);
// 	};
// 	return (
// 		<div className="App">
// 			<PageNav />
// 			{items.map((item) => {
// 				return (
// 					<div key={item.id}>
// 						{item.title} €{item.price}
// 						{item.images[0] && (
// 							<img
// 								style={{ width: "200px" }}
// 								src={item.images[0].image_url}
// 								alt={item.title}
// 							></img>
// 						)}
// 						<p
// 							dangerouslySetInnerHTML={{
// 								__html: item.description,
// 							}}
// 						/>
// 					</div>
// 				);
// 			})}
// 			<PageNav />
// 		</div>
// 	);
