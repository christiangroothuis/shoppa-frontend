import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import useDataApi from "../hooks/api";
import ProductCard from "./productCard";

const Home = () => {
	const [{ data, isLoading, isError, error }, doFetch] = useDataApi("/home");

	useEffect(() => {
		doFetch("/home");
	}, [doFetch]);

	return (
		<>
			{isLoading ? (
				<div>
					{[...Array(3)].map((item, i) => (
						<div
							key={i}
							className="mx-auto grid grid-1-row gap-x-4 gap-y-8 lg:grid-cols-4 xl:grid-cols-5 overflow-hidden mb-8 lg:mb-0 text-drakgray"
						>
							<div className="col-span-2 px-10 py-8 flex rounded-3xl flex-col justify-end card"></div>
							{[...Array(4)].map((item, i) => {
								return (
									<div
										key={i}
										className="h-80 rounded-3xl card"
									></div>
								);
							})}
						</div>
					))}
				</div>
			) : isError ? (
				<pre>{JSON.stringify(error)}</pre>
			) : (
				<>
					{data.length > 0 &&
						data.map((item: any) => {
							const category = item.category;
							const { id, display_name, color } = category;
							return (
								<div
									key={id}
									className="mx-auto grid grid-1-row gap-x-4 gap-y-8 lg:grid-cols-4 xl:grid-cols-5 overflow-hidden mb-8 lg:mb-0 text-drakgray"
								>
									<Link
										to={`/producten?category=${id}`}
										className="col-span-2 px-10 py-8 flex rounded-3xl flex-col justify-end"
										style={{
											backgroundColor: color,
										}}
									>
										<h1 className="text-5.5xl leading-normal font-bold text-2-lines">
											{display_name} →
										</h1>
									</Link>
									{item.products.map((product: any) => {
										const {
											title,
											slug,
											price,
											images,
										} = product;

										return (
											<ProductCard
												key={slug}
												className="h-80"
												title={title}
												slug={slug}
												price={price}
												images={images}
											/>
										);
									})}
								</div>
							);
						})}
				</>
			)}
		</>
	);
};

export default Home;
