import { NavLink } from "react-router-dom";

import React from "react";
import Container from "./container";

import { ReactComponent as ShoppingBag } from "../assets/icons/shopping-bag.svg";
// import { ReactComponent as Chevron } from "../assets/icons/chevron-down.svg";
import { ReactComponent as User } from "../assets/icons/user.svg";

const Nav = () => {
	return (
		<nav className="bg-white sticky top-0 z-20 h-16 flex items-center">
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
						{/* <Chevron
							viewBox="0 0 24 24"
							className="h-4 w-4 ml-1 inline-block stroke-3"
						/> */}
					</NavLink>
				</div>
				<form className="w-3/5 max-w-md">
					<input
						className="bg-white border-2 border-gray p-2.5 px-4 rounded-xl w-full"
						placeholder="Zoek naar producten, categorieën..."
					/>
				</form>
				<div className="flex ">
					<NavLink
						className="mx-3"
						to="/dashboard"
						aria-label="dashboard"
					>
						<User
							viewBox="0 0 24 24"
							className="h-7 w-7 ml-1 inline-block"
						/>
					</NavLink>
					<NavLink
						className="relative"
						to="/winkelmand"
						aria-label="winkelmand"
					>
						<div className="w-6 h-6 rounded-full bg-red-500 absolute top-0 top right-0 -m-3 flex justify-center items-center text-white text-sm border-white border-2">
							4
						</div>
						<ShoppingBag
							viewBox="0 0 24 24"
							className="h-7 w-7 ml-1 inline-block"
						/>
					</NavLink>
				</div>
			</Container>
		</nav>
	);
};

export default Nav;
