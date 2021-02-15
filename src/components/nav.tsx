import { NavLink } from "react-router-dom";

import React from "react";
import Container from "./container";

import { ReactComponent as ShoppingBag } from "../assets/icons/shopping-bag.svg";
// import { ReactComponent as Chevron } from "../assets/icons/chevron-down.svg";
import { ReactComponent as User } from "../assets/icons/user.svg";

const Nav = () => {


	const cart = [
		{
			id: 1,
			name: "yeezy 350",
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
			id: 2,
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

	let totalQuantity = cart.reduce((acc, cur) => {
		return acc + cur.quantity;
	}, 0);

	return (
		<nav className="bg-white fixed w-full top-0 z-20 h-16 flex items-center border-b-2 border-gray-100">
			<Container className="flex justify-between text-7 h-full items-center">
				<NavLink to="/" className="font-bold text-4xl">
					DRIP
				</NavLink>
				<div className="flex justify-between text-xl">
					<NavLink exact className="nav-item" to="/">
						Home
					</NavLink>
					<NavLink className="nav-item" to="/about">
						Info
					</NavLink>
					<NavLink to="/producten" className="nav-item">
						Producten
					</NavLink>
				</div>
				<form className="w-3/5 max-w-md">
					<input
						className="bg-white border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
						placeholder="Zoek naar producten, categorieën..."
					/>
				</form>
				<div className="flex">
					<NavLink
						className="mx-3"
						to="/dashboard"
						aria-label="dashboard"
					>
						<User
							viewBox="0 0 24 24"
							className="h-7 w-7 ml-1 inline-block stroke-2"
						/>
					</NavLink>
					<NavLink
						className="relative"
						to="/winkelmand"
						aria-label="winkelmand"
					>
						<div className="w-6 h-6 rounded-full overflow-hidden bg-red-500 absolute top-0 top right-0 -m-3 flex justify-center items-center text-white text-sm font-bold border-white border-2">
							{totalQuantity}
						</div>
						<ShoppingBag
							viewBox="0 0 24 24"
							className="h-7 w-7 ml-1 inline-block stroke-2"
						/>
					</NavLink>
				</div>
			</Container>
		</nav>
	);
};

export default Nav;
