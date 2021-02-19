import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useDataApi from "../hooks/api";
import ProductCard from "./productCard";
import CategoriesList from "./categoriesList";

const CardSection = () => {
	const useQuery = () => {
		return new URLSearchParams(useLocation().search);
	};
	const query = useQuery();

	const page: number = Number(query.get("page")) || 1;
	const category_id = Number(query.get("category"));
	const order_by: string = query.get("order_by") || "";

	const [{ data, isLoading, isError, error }, doFetch] = useDataApi(
		`/products?page=${page}&category=${category_id}&order_by=${order_by}`
	);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [page]);

	useEffect(() => {
		doFetch(
			`/products?page=${page}&category=${category_id}&order_by=${order_by}`
		);
	}, [doFetch, page, order_by, category_id]);

	return (
		<div className="flex relative">
			<CategoriesList category_id={category_id} />
			<div className="w-full">
				{isLoading ? (
					<div className="mx-auto grid gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 overflow-hidden mb-8  text-drakgray">
						{[...Array(24)].map((item,i) => (
							<div
								key={i}
								className="h-80 rounded-3xl card"
							></div>
						))}
					</div>
				) : isError ? (
					<pre>{JSON.stringify(error)}</pre>
				) : (
					<>
						<div>
							{data.data.length > 0 && (
								<div className="mx-auto grid gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 overflow-hidden mb-8  text-drakgray">
									{data.data.map((product: any) => {
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
							)}
							<div className="w-full flex justify-center sticky z-50 bottom-14 self-start">
								<div className="inline-flex rounded-md shadow-sm -space-x-px mx-auto ">
									<Link
										to={`/producten?page=${
											page - 1
										}&category=${category_id}&order_by=${order_by}`}
										className={`relative inline-flex ${
											data.meta.current_page === 1 &&
											`pointer-events-none text-opacity-40`
										} items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
									>
										<span className="sr-only">Vorige</span>

										<svg
											className="h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
											/>
										</svg>
									</Link>

									{data.meta.current_page !== 1 && (
										<>
											<Link
												to={`/producten?page=${1}&category=${category_id}&order_by=${order_by}`}
												className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
											>
												{1}
											</Link>
											<span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
												...
											</span>

											<Link
												to={`/producten?page=${
													data.meta.current_page + -1
												}&category=${category_id}&order_by=${order_by}`}
												className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
											>
												{data.meta.current_page + -1}
											</Link>
										</>
									)}

									<span className="relative inline-flex items-center px-4 py-1 border border-gray-300 bg-white text-md font-black">
										{data.meta.current_page}
									</span>
									{data.meta.current_page !==
										data.meta.last_page && (
										<>
											<Link
												to={`/producten?page=${
													data.meta.current_page + 1
												}&category=${category_id}&order_by=${order_by}`}
												className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
											>
												{data.meta.current_page + 1}
											</Link>

											<span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
												...
											</span>
											<Link
												to={`/producten?page=${data.meta.last_page}&category=${category_id}&order_by=${order_by}`}
												className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
											>
												{data.meta.last_page}
											</Link>
										</>
									)}
									<Link
										to={`/producten?page=${
											page + 1
										}&category=${category_id}&order_by=${order_by}`}
										className={`relative inline-flex ${
											data.meta.current_page ===
												data.meta.last_page &&
											`pointer-events-none text-opacity-40`
										} items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
									>
										<span className="sr-only">Next</span>

										<svg
											className="h-5 w-5"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
											/>
										</svg>
									</Link>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default CardSection;
