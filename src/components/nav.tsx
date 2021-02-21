import { Link, NavLink } from "react-router-dom";

import React, { useContext, createRef, useState } from "react";
import Container from "./container";
import Spinner from "./spinner";

import { ReactComponent as ShoppingBag } from "../assets/icons/shopping-bag.svg";
// import { ReactComponent as Chevron } from "../assets/icons/chevron-down.svg";
import { ReactComponent as User } from "../assets/icons/user.svg";

import ShopContext from "../context/shopContext";

import useDataApi from "../hooks/api";

const Nav = () => {
	const [query, setQuery] = useState("");

	const [imageLoaded, setImageLoaded] = useState(false);

	const inputRef: React.RefObject<HTMLInputElement> = createRef();

	const [showResult, setShowResult] = useState(false);

	const [{ data, isLoading, isError }, doFetch] = useDataApi(
		`/products/${query}`
	);

	const fetchSearch = (query: string) => {
		doFetch(`/search/${query}`);
	};

	const onChange = (e: any) => {
		const searchQuery = e.target.value;
		setQuery(searchQuery);

		if (searchQuery.length > 1) {
			setShowResult(true);
			// if (query.length % 2 === 0) {
			fetchSearch(searchQuery);
			// }
		} else {
			setShowResult(false);
		}
	};

	const results = data?.data;

	const context = useContext(ShopContext);

	const cart = context.cart;

	let totalQuantity = cart.reduce((acc, cur) => {
		return acc + cur.quantity;
	}, 0);

	return (
		<nav className="bg-white fixed w-full top-0 z-50 h-16 flex items-center border-b-2 border-gray-100">
			<Container className="flex justify-between text-7 h-full items-center">
				<NavLink to="/" className="font-black text-4xl">
					DRIP
				</NavLink>
				<div className="flex justify-between text-xl">
					<NavLink exact className="nav-item" to="/">
						Home
					</NavLink>
					<NavLink className="nav-item" to="/over">
						Info
					</NavLink>
					<NavLink to="/producten" className="nav-item">
						Producten
					</NavLink>
					<a className="nav-item bg-black text-white hover:bg-gray-500" href="http://informatica.gymnasiumbreda.nl/informatica/leerlingenwebsites/IN2021/ProjectWebsites/Drip/backend/public/documenten/DRIP-Handleiding.pdf" target="_blank" rel="noreferrer">
						Help
					</a>
				</div>
				<form className="w-3/5 max-w-md relative">
					<input
						onFocus={() => setShowResult(true)}
						onBlur={() => {
							setTimeout(() => setShowResult(false), 150);
						}}
						ref={inputRef}
						onChange={onChange}
						value={query}
						className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500 z-40"
						placeholder="Zoek naar merken, producten..."
					/>
					{showResult && query.length > 1 && (
						<div className="absolute w-full bg-white h-150 max-h-screen rounded-b-2xl overflow-y-scroll pt-2 -mt-2 border-2 border-gray">
							{!isLoading && !isError ? (
								<div>
									{results.length > 0 ? (
										results.map((result: any) => {
											return (
												<Link
													key={result.id}
													to={`/product/${result.slug}`}
													className="p-5 flex max-w-full items-center z-10 border-b-2 "
												>
													<div className="w-36 h-18 relative flex items-center justify-center">
														<img
															className={`object-contain w-full ${
																imageLoaded
																	? `opacity-100`
																	: `opacity-0`
															}`}
															style={{
																transitionDuration:
																	"300ms",
															}}
															src={
																result
																	.images[0] &&
																result.images[0]
																	.image_url !==
																	null
																	? result
																			.images[0]
																			.image_url
																	: "https://cdn.discordapp.com/attachments/811000693715370005/811286686675370014/Drip_Placeholder.png"
															}
															alt={result.title}
															onLoad={() =>
																setImageLoaded(
																	true
																)
															}
														/>
													</div>
													<span className="ml-5 flex-grow text-2-lines w-full">
														{result.title}
													</span>
												</Link>
											);
										})
									) : (
										<div className="w-full h-125 flex items-center justify-center">
											Geen producten gevonden
										</div>
									)}
								</div>
							) : (
								<div className="w-full h-125 flex items-center justify-center px-5">
									{isError ? (
										"Er was een error bij het ophalen van de zoekresultaten"
									) : (
										<Spinner />
									)}
								</div>
							)}
						</div>
					)}
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
						{totalQuantity > 0 && (
							<div className="w-6 h-6 rounded-full overflow-hidden bg-red-500 absolute top-0 top right-0 -m-3 flex justify-center items-center text-white text-sm font-bold border-white border-2">
								{totalQuantity}
							</div>
						)}
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
