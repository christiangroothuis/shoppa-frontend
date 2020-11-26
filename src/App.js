import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import API_URL from "./api";

function App() {
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);
	useEffect(() => {
		axios
			.get(`${API_URL}/products?page=${page}`)
			.then((res) => {
				setItems(res.data.data);
				console.log(res.data.data);
			})
			.catch((err) => {
				console.log(err.config);
			});
	}, [page]);
	return (
		<div className="App">
			{page}
			<button
				onClick={() => {
					setPage(page + 1);
					setItems([]);
				}}
			>next</button>
			{items.map((item) => {
				return (
					<div key={item.id}>
						{item.title} €{item.price}
						{item.images[0] && (
							<img
								style={{ width: "200px" }}
								src={item.images[0].image_url}
								alt={item.title}
							></img>
						)}
						<p
							dangerouslySetInnerHTML={{
								__html: item.description,
							}}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default App;
