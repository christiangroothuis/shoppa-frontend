import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import API_URL from './api';

function App() {

	const [items, setItems] = useState([]);
	const [count, setCount] = useState(0);
	useEffect(() => {
		axios
			.get(`${API_URL}/products/`)
			.then((res) => {
				setItems(res.data);
				console.log(res);
			})
			.catch((err) => {
				console.log(err.config);
			});
	}, [count]);
	return (
		<div className="App">
      {count}
			<button onClick={() => setCount(count + 1)}></button>
			{items.map((item) => {
				return (
					<div key={item.id}>
						{item.title} €{item.price}
						{item.images[0] && (
							<img
                style={{width:"200px"}}
								src={item.images[0].image_url}
								alt={item.title}
							></img>
						)}
            <p dangerouslySetInnerHTML={{__html: item.description}} />
					</div>
				);
			})}
		</div>
	);
}

export default App;
