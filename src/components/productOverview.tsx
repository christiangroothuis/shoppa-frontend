import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useHistory } from "react-router-dom";
import useDataApi from "../hooks/api";
import ProductCard from "./productCard";

const CardSection = () => {
	function useQuery() {
		return new URLSearchParams(useLocation().search);
	}

	const history = useHistory();
	const query = useQuery();

	// const initialPage: number =
	// 	query.get("page") && Number.isInteger(query.get("page"))
	// 		? parseInt(query.get("page"))
	// 		: 1;

	const [pageNumber, setPageNumber] = useState(
		parseInt(query.get("page") || "1")
	);
	const [{ data, isLoading, isError, error }, doFetch] = useDataApi(
		`/products?page=${pageNumber}?category=${query.get(
			"category"
		)}&sort_by=${query.get("sort_by")}`
	);

	const array15 = Array.from({ length: 20 }, (x, i) => i);
	useEffect(() => {
		doFetch(`/products?page=${pageNumber}`);
	}, [doFetch, pageNumber]);

	useEffect(() => {
		history.push({
			search: `?page=${pageNumber}`,
		});
	}, [pageNumber, history]);

	return (
		<>
			{/* <div className="card h-80 rounded-3xl block relative overflow-hidden"></div> */}
			<button
				onClick={() => {
					setPageNumber(pageNumber - 1);
				}}
			>
				prev
			</button>
			<button onClick={() => setPageNumber(pageNumber + 1)}>next</button>
			{isLoading ? (
				<div className="mx-auto grid gap-x-4 gap-y-8 lg:grid-cols-4 xl:grid-cols-5 overflow-hidden mb-8 lg:mb-0 text-drakgray">
					{array15.map((item) => (
						<div
							key={item}
							className="h-80 rounded-3xl bg-red-500"
						></div>
					))}
				</div>
			) : isError ? (
				<pre>{JSON.stringify(error)}</pre>
			) : (
				<>
					{data.data.length > 0 && (
						<div className="mx-auto grid gap-x-4 gap-y-8 lg:grid-cols-4 xl:grid-cols-5 overflow-hidden mb-8 lg:mb-0 text-drakgray">
							{data.data.map((product: any) => {
								const { title, slug, price, images } = product;

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
					)}
				</>
			)}
		</>
	);
};

export default CardSection;
