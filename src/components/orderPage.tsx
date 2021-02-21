import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useDataApi from "../hooks/api";
import Spinner from "./spinner";

const OrderPage = () => {
	const { orderId }: { orderId: string } = useParams();

	const [{ data, isLoading, isError, error }, doFetch]: [
		{ data: any; isLoading: boolean; isError: boolean; error: any },
		any
	] = useDataApi(`/orders/${orderId}`, JSON.parse(localStorage.user).token);

	useEffect(() => {
		doFetch(`/orders/${orderId}`, JSON.parse(localStorage.user).token);
	}, [doFetch]);

	let totalAmount = data?.data?.items.reduce((acc: number, cur: any) => {
		if (cur.product) return acc + cur.product.price * cur.amount;
		else return acc;
	}, 0);

	const date = new Date(data?.data?.created_at);
	const formattedDate =
		date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

	return !isLoading && !isError ? (
		<div>
			<h1 className="text-4xl font-bold mb-5">Order #{data.data.id}</h1>
			<div className="flex flex-col">
				<span>Naam: {data.data.user.name}</span>
				<span>E-mail: {data.data.user.email}</span>
				<span>Status: {data.data.status}</span>
				<span>Datum: {formattedDate}</span>
				<span>Adres: {data.data.user.address}</span>
				<span>Postcode: {data.data.user.zip_code}</span>
				<span>Plaats: {data.data.user.city}</span>
			</div>
			<table className="w-full text-base">
				<thead>
					<tr className="h-16 text-lg">
						<th className="text-left">Product</th>
						<th className="text-right">Prijs</th>
						<th className="text-right">Aantal</th>
						<th className="text-right">Totaal</th>
					</tr>
				</thead>
				<tbody>
					{data.data.items.map((item: any) => {
						if (!item.product) {
							return <tr></tr>;
						} else {
							return (
								<tr key={item.slug}>
									<td className="flex align-center pb-4">
										<Link
											to={`/product/${item.product.slug}`}
										>
											<div className="bg-white rounded-lg h-24 w-24 p-2 flex justify-center items-center">
												{item.product.images[0] && (
													<img
														src={
															item.product
																.images[0]
																.image_url
														}
														className="w-full h-full rounded object-contain"
														alt={item.product.title}
													/>
												)}
											</div>
										</Link>
										<div className="ml-4 flex flex-col justify-center">
											<Link
												to={`/product/${item.product.slug}`}
												className="mb-1 hover:underline text-lg"
											>
												<span className="text-2-lines">
													{item.product.title}
												</span>
											</Link>
										</div>
									</td>
									<td className="text-right">
										<span className="text-sm lg:text-base font-medium">
											€{item.product.price}
										</span>
									</td>
									<td className="text-right font-medium">
										{item.amount}
									</td>
									<td className="text-right">
										<span className="text-base font-medium">
											€{item.product.price * item.amount}
										</span>
									</td>
								</tr>
							);
						}
					})}
				</tbody>
			</table>

			<div className="mt-4 flex justify-end">
				<div className="max-w-full w-80">
					<div className="flex justify-between py-4 text-xl">
						<div className="font-bold text-center text-gray-800">
							Totaal
						</div>
						<div className="font-bold text-center text-gray-900">
							€{totalAmount}
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<>
			{isError ? (
				<span className="overflow-x-scroll max-w-full">
					{JSON.stringify(error)}
				</span>
			) : (
				<div className="w-full flex justify-center items-center h-64">
					<Spinner className="w-8 h-8" />
				</div>
			)}
		</>
	);
};

export default OrderPage;
