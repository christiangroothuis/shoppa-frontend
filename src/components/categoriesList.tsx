import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useDataApi from "../hooks/api";
import Spinner from "./spinner";

const CategoriesList = ({
	category_id,
	className,
}: {
	category_id: number;
	className?: string;
}) => {
	const [{ data, isLoading, isError, error }, doFetch] = useDataApi(
		`/categories`
	);

	useEffect(() => {
		doFetch("/categories");
	}, [doFetch]);

	return (
		<div className={`sticky top-28 self-start mr-10 mt-8 ${className}`}>
			<h2 className="text-4xl font-bold">Categorieën</h2>
			{isLoading ? (
				<div className="flex justify-center items-center h-64">
					<Spinner />
				</div>
			) : (
				<ul className="ml-2 mt-5 max-w-100">
					{isError ? (
						<div className="whitespace-pre-wrap overflow-scroll">{JSON.stringify(error)}</div>
					) : (
						[
							{ display_name: "Alle producten", id: 0 },
							...data,
						].map((category) => (
							<li
								className={`text-2xl font-bold my-3 ${
									category_id === category.id && `underline`
								}`}
							>
								<Link
									to={`/producten?page=${1}&category=${
										category.id
									}&order_by=`}
								>
									{category.display_name}
								</Link>
							</li>
						))
					)}
				</ul>
			)}
		</div>
	);
};

export default CategoriesList;
