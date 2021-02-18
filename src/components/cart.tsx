import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ShopContext from "../context/shopContext";

const ProductCard = () => {
	const context = useContext(ShopContext);

	const removeProduct = context.removeProductFromCart;
	const decreaseProduct = context.decreaseProductFromCart;
	const addProduct = context.addProductToCart;

	const cart = context.cart;

	let totalAmount = cart.reduce((acc, cur) => {
		return acc + cur.price * cur.quantity;
	}, 0);

	return (
		<div className="flex flex-col">
			<h1 className="text-5xl font-bold mb-5">Winkelmand</h1>
			{context.cart.length === 0 ? (
				<div className="font-bold text-xl flex justify-center items-center h-56">
					Uw winkelmand is leeg
				</div>
			) : (
				<>
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
							{cart.map((item) => {
								return (
									<tr key={item.slug}>
										<td className="flex align-center pb-4">
											<Link to={`/product/${item.slug}`}>
												<div className="bg-white rounded-lg h-24 w-24 p-2 flex justify-center items-center">
													{item.images[0] && (
														<img
															src={
																item.images[0]
																	.image_url
															}
															className="w-full h-full rounded object-contain"
															alt={item.title}
														/>
													)}
												</div>
											</Link>
											<div className="ml-4 flex flex-col justify-center">
												<Link
													to={`/product/${item.slug}`}
													className="mb-1 hover:underline text-lg"
												>
													<span className="text-2-lines">{item.title}</span>
												</Link>
												<button
													onClick={() => {
														removeProduct(
															item.slug
														);
													}}
													className="text-red-600 flex hover:underline text-sm"
												>
													Verwijderen
												</button>
											</div>
										</td>
										<td className="text-right">
											<span className="text-sm lg:text-base font-medium">
												€{item.price}
											</span>
										</td>
										<td className="relative">
											<div className="flex justify-end items-center font-medium relative ">
												<button
													onClick={() => {
														decreaseProduct(
															item.slug
														);
													}}
													className="bg-white rounded border-gray border cursor-pointer mr-2 w-5 h-5 flex items-center justify-center"
												>
													-
												</button>
												{item.quantity}
												<button
													onClick={() => {
														addProduct(item);
													}}
													className="bg-white rounded border-gray border cursor-pointer ml-2 w-5 h-5 flex items-center justify-center"
												>
													+
												</button>
											</div>
										</td>
										<td className="text-right">
											<span className="text-base font-medium">
												€{item.price * item.quantity}
											</span>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<div className="mt-4 flex justify-end">
						<div className="max-w-full w-110">
							<div className="flex justify-between py-4 text-xl">
								<div className="font-bold text-center text-gray-800">
									Totaal
								</div>
								<div className="font-bold text-center text-gray-900">
									€{totalAmount}
								</div>
							</div>
							<button className="clickable flex justify-center w-full px-10 py-4 mt-3 font-medium text-white  bg-black rounded-xl text-xl">
								Afrekenen
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ProductCard;
