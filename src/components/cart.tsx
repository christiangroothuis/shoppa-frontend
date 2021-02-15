import React from "react";
import { Link } from "react-router-dom";

const ProductCard = () => {
	const cart = [
		{
			id: 1,
			name: "nigaga",
			price: 340,
			quantity: 2,
			images: [
				{
					image_url:
						"https://stockx.imgix.net/images/adidas-Yeezy-Boost-350-V2-Clay-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1606321232",
				},
			],
		},
		{
			id: 2,
			name: "Yeezy 350 Clay Brick",
			price: 340,
			quantity: 20,
			images: [
				{
					image_url:
						"https://stockx.imgix.net/images/adidas-Yeezy-Boost-350-V2-Clay-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1606321232",
				},
			],
		},
		{
			id: 3,
			name: "yeezy 350",
			price: 340,
			quantity: 2,
			images: [
				{
					image_url:
						"https://stockx.imgix.net/images/adidas-Yeezy-Boost-350-V2-Clay-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=1606321232",
				},
			],
		},
	];

	let totalAmount = cart.reduce((acc, cur) => {
		return acc + cur.price * cur.quantity;
	}, 0);

	return (
		<div className="flex flex-col">
			<h1 className="text-5xl font-bold mb-10">Winkelmand</h1>

			<div className="flex-1">
				<table className="w-full text-sm lg:text-base">
					<thead>
						<tr className="h-12 text-lg">
							<th className="text-left">Product</th>
							<th className="text-left">Prijs</th>
							<th className="text-left">Hoeveelheid</th>
							<th className="text-left">Totaal</th>
						</tr>
					</thead>
					<tbody>
						{cart.map((item, i) => {
							return (
								<tr>
									<td className="pb-4 flex">
										<div className="bg-white rounded-lg">
											<img
												src={item.images[0].image_url}
												className="w-20 rounded"
												alt={item.name}
											/>
										</div>
										<div className="ml-4">
											<p className="mb-0.5">
												{item.name}
											</p>
											<button className="text-red-700">
												<small>Verwijderen</small>
											</button>
										</div>
									</td>
									<td className="text-left">
										<span className="text-sm lg:text-base font-medium">
											€{item.price}
										</span>
									</td>
									<td>
										{/* <div className="flex flex-row items-center">
											<div className="bg-white rounded border-gray border cursor-pointer mr-2 w-4 h-4 flex items-center justify-center">
												-
											</div>
											{item.quantity}
											<div className="bg-white rounded border-gray border cursor-pointer ml-2 w-4 h-4 flex items-center justify-center">
												+
											</div>
										</div> */}
									</td>
									<td className="text-left">
										<span className="text-sm lg:text-base font-medium">
											€{item.price * item.quantity}
										</span>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className="my-4 mt-5 -mx-2 lg:flex justify-end">
					{/* <div className="lg:px-2 lg:w-1/2"></div> */}
					<div className="max-w-full w-100">
						<div className="p-4">
							<div className="flex justify-between py-4 text-xl">
								<div className="font-bold text-center text-gray-800">
									Totaal
								</div>
								<div className="font-bold text-center text-gray-900">
									€{totalAmount}
								</div>
							</div>
							<button className="flex justify-center w-full px-10 py-4 mt-3 font-medium text-white  bg-black rounded-xl text-xl">
								Afrekenen
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
