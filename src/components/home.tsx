import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import useDataApi from "../hooks/api";
// import ProductCard from "./productCard";

const Home = () => {
	const [{ data, isLoading, isError, error }, doFetch] = useDataApi("/home");

	useEffect(() => {
		doFetch("/home");
	}, [doFetch]);

	return (
		<>
			{isLoading ? (
				"isLoading..."
			) : isError ? (
				<pre>{JSON.stringify(error)}</pre>
			) : (
				<>
					{data.length > 0 &&
						data.map((item: any, i: number) => (
							<div key={i}>
								<div className="grid gap-x-4 gap-y-6 grid-cols-5 grid-rows-1 overflow-hidden mb-8 text-drakgray">
									<Link
										to={`/producten?category=${item.category.display_name}`}
										key={i}
										className="category-grid-item px-14 py-8 flex rounded-3xl flex-col justify-end"
										style={{
											backgroundColor:
												item.category.color,
										}}
									>
										<h1 className="text-6xl leading-normal font-bold text-2-lines">
											{item.category.display_name}
										</h1>
									</Link>
									{item.products.map(
										(product: any, i: number) => (
											<Link
												to={`/product/${product.slug}`}
												key={i}
												className="bg-white p-5 flex rounded-3xl flex-col items-center justify-evenly"
												style={{
													// height: "350px",
													// width: "250px",
												}}
											>
												<img
													className="p-3 object-contain"
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
												<div className="flex flex-col items-center justify-self-end">
													<span className="text-lg font-bold text-center text-2-lines">
														{product.title}
													</span>
													<span className="text-2.5xl mt-4 font-bold">
														€{product.price}
													</span>
												</div>
											</Link>
										)
									)}
								</div>
							</div>
						))}
				</>
			)}
		</>
	);
};

export default Home;
