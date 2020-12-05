import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import useDataApi from "../hooks/api";
// import ProductCard from "./productCard";

const Home = () => {
	const [{ data, isLoading, /*isError*/ }, doFetch] = useDataApi("/home");

	useEffect(() => {
		doFetch("/home");
	}, [doFetch]);
	console.log(data);

	return (
		<>
			{isLoading ? (
				"isLoading..."
			) : (
				<div>
					{data.length > 0 &&
						data.map((item: any) => (
							<div className="relative">
								<h1 className="font-bold text-2xl">
									{item.category.display_name}
								</h1>
								<div className="flex">
									{item.products.map((product: any) => (
										<Link
											to={`/product/${product.slug}`}
											className="bg-white my-5 mr-5 p-5 flex rounded-3xl flex-col items-center justify-evenly"
											style={{
												height: "350px",
												width: "250px",
											}}
										>
											<img
												className="p-3"
												src={
													product.images[0] &&
													product.images[0]
														.image_url !== null
														? product.images[0]
																.image_url
														: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FlVUEWS4wkYk%2Fhqdefault.jpg&f=1&nofb=1"
												}
												alt={product.slug}
											/>
											<div className="flex flex-col items-center px-2">
												<span className="text-lg font-bold text-center text-2-lines">
													{product.title}
												</span>
												<span className="text-2.5xl mt-4 font-bold">
													€{product.price}
												</span>
											</div>
										</Link>
									))}
								</div>
							</div>
						))}
				</div>
			)}
		</>
	);
};

export default Home;
