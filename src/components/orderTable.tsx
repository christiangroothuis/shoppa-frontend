import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import useDataApi from "../hooks/api";
import Spinner from "./spinner";

const OrderTable = ({ className }: { className?: string }) => {
	const history = useHistory();
	const [{ data, isLoading, isError, error }, doFetch]: [
		{ data: any; isLoading: boolean; isError: boolean; error: any },
		any
	] = useDataApi(`/orders`, JSON.parse(localStorage.user).token);

	useEffect(() => {
		doFetch(`/orders`, JSON.parse(localStorage.user).token);
	}, [doFetch]);

	console.log(data);
	return !isLoading && !isError ? (
		<div className={`container ${className || ""}`}>
			<table className="mt-4 w-full text-base ">
				<thead>
					<tr className="text-lg h-8">
						<th className="text-left">Id</th>
						<th className="text-right">Status</th>
						{JSON.parse(localStorage.user).user.role ===
							"admin" && (
							<>
								<th className="text-right">Naam</th>
								<th className="text-right">E-mail</th>
							</>
						)}
						<th className="text-right">Datum</th>
						<th className="text-right">Bedrag</th>
					</tr>
				</thead>
				<tbody>
					{data.data.map((order: any, i: number) => {
						let totalAmount = order.items.reduce(
							(acc: number, cur: any) => {
								if (cur.product)
									return acc + cur.product.price * cur.amount;
								else return acc;
							},
							0
						);

						const date = new Date(order.created_at);
						const formattedDate =
							date.getDate() +
							"-" +
							(date.getMonth() + 1) +
							"-" +
							date.getFullYear();

						return (
							<tr
								className="font-medium border-t border-gray-300 cursor-pointer h-10"
								key={i}
								onClick={() => {
									history.push(`/order/${order.id}`);
								}}
							>
								<td className="text-left">{order.id}</td>
								<td className="text-right">{order.status}</td>
								{JSON.parse(localStorage.user).user.role ===
									"admin" && (
									<>
										<td className="text-right">
											{order.user.name}
										</td>
										<td className="text-right">
											{order.user.email}
										</td>
									</>
								)}
								<td className="text-right">{formattedDate}</td>
								<td className="text-right">€{totalAmount}</td>
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

export default OrderTable;
