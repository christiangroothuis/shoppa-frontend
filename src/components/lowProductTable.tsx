import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useDataApi from "../hooks/api";
import Spinner from "./spinner";

const LowProductTable = ({ className }: { className?: string }) => {
	const history = useHistory();
	const [{ data, isLoading, isError }, doFetch]: [
		{ data: any; isLoading: boolean; isError: boolean; error: any },
		any
	] = useDataApi(`/products_low`, JSON.parse(localStorage.user).token);

	useEffect(() => {
		doFetch(`/products_low`, JSON.parse(localStorage.user).token);
	}, [doFetch]);

	console.log(data);
	return !isLoading && !isError ? (
		<div className={`container ${className || ""}`}>
			<table className="mt-4 w-full text-base ">
				<thead>
					<tr className="text-lg h-8">
						<th className="text-left">Id</th>
						<th className="text-left">Titel</th>
						<th className="text-right">Prijs</th>
						<th className="text-right">Voorraad</th>
					</tr>
				</thead>
				<tbody>
					{data.data.map((product: any, i: number) => {
						return (
							<tr
								className="font-medium border-t border-gray-300 cursor-pointer h-10"
								key={i}
								onClick={() => {
									history.push(`/product/${product.slug}/edit`);
								}}
							>
								<td className="text-left">{product.id}</td>
								<td className="text-left">{product.title}</td>
								<td className="text-right">€{product.price}</td>
								<td className="text-right">
									{product.availability}
								</td>
								<hr />
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	) : (
		<div className="w-full flex justify-center items-center h-64">
			<Spinner className="w-8 h-8" />
		</div>
	);
};

export default LowProductTable;
