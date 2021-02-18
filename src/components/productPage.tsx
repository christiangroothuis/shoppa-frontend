import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useDataApi from "../hooks/api";
import range from "../utils/range";

import ProductCard from "./productCard";
import Container from "./container";

import { ReactComponent as TrashCan } from "../assets/icons/trash-2.svg";
import { ReactComponent as Edit } from "../assets/icons/edit-3.svg";
import { ReactComponent as Check } from "../assets/icons/check.svg";

import ShopContext from "../context/shopContext";
import Spinner from "./spinner";

const ProductPage = () => {
	const context = useContext(ShopContext);
	const addProduct = context.addProductToCart;

	const cart = context.cart;
	const { productId }: { productId: string } = useParams();

	const [{ data, isLoading, isError }, doFetch] = useDataApi(
		`/products/${productId}`
	);

	const [currentImage, setCurrentImage] = useState("");

	const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		doFetch(`/products/${productId}`);
		return () => {
			setImageLoaded(false);
		};
	}, [doFetch, productId]);

	useEffect(() => {
		if (
			data &&
			data.data &&
			data.data.images[0] &&
			data.data.images[0].image_url !== null
		) {
			setCurrentImage(data.data.images[0].image_url);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	if (!isLoading && !isError) {
		const {
			title,
			price,
			description,
			images,
			related_products,
			slug,
			availability = 5,
		} = data.data;

		const inCart = cart.filter((item) => item.slug === slug);

		const currentInCart =
			inCart[0] && inCart[0].quantity ? inCart[0].quantity : 0;

		const available = availability - currentInCart;

		return (
			<>
				<div className="flex justify-end fixed left-0 w-full top-22 mx-auto z-20">
					<Container className="flex justify-end w-full">
						<button className="clickable cursor-pointer flex justify-center items-center bg-white rounded-full w-14 h-14 mr-2">
							<Edit />
						</button>
						<button className="clickable cursor-pointer flex justify-center items-center bg-white rounded-full w-14 h-14 text-red-500">
							<TrashCan />
						</button>
					</Container>
				</div>

				<div className="flex relative mb-14 text-drakgray">
					<div className="flex flex-col p-12 w-9/16 bg-white rounded-4xl mr-14">
						<div className="w-full h-110 mb-4 relative">
							<img
								className={`object-contain w-full h-full absolute ${
									imageLoaded ? `opacity-100` : `opacity-0`
								}`}
								style={{ transitionDuration: "300ms" }}
								src={
									images[0] && images[0].image_url !== null
										? currentImage
										: "https://cdn.discordapp.com/attachments/811000693715370005/811286686675370014/Drip_Placeholder.png"
								}
								alt={title}
								onLoad={() => setImageLoaded(true)}
							/>
						</div>
						{images.length > 1 && (
							<div className="flex overflow-x-scroll">
								{images.map((image: Image, i: number) => {
									const { image_url } = image;

									return (
										<div
											key={i}
											className={`cursor-pointer rounded-lg h-22 w-22 mr-2 flex flex-none items-center justify-center border-2 p-1 transition-colors ${
												currentImage === image_url
													? ` border-blue-500`
													: ` border-gray-200`
											}`}
											onMouseEnter={() =>
												setCurrentImage(image_url)
											}
										>
											<img
												className="object-contain w-full h-full"
												src={
													image_url !== null
														? image_url
														: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FlVUEWS4wkYk%2Fhqdefault.jpg&f=1&nofb=1"
												}
												alt={title}
											/>
										</div>
									);
								})}
							</div>
						)}
					</div>
					<div className="flex flex-col flex-1 mt-8">
						<h1 className="font-bold text-4.5xl mb-4 leading-tight">
							{title}
						</h1>
						<span className="font-bold text-3xl mb-5">
							€{price}
						</span>
						<div className="mb-6">
							{availability !== null && !isNaN(availability) && (
								<span
									className="block mt-2"
									style={{
										color: `hsl(${range(
											available
										)},94%, 40%)`,
									}}
								>
									{available} op voorraad
								</span>
							)}
						</div>
						{availability > 0 && (
							<span className="font-medium text-1.5xl mb-6 text-green-600 flex items-center">
								<div className="w-6 h-6 p-1 mr-2 inline-flex rounded-full bg-green-600 items-center justify-center">
									<Check className="text-white stroke-4" />
								</div>
								Voor 23:59 besteld? Morgen in huis!
							</span>
						)}
						<button
							onClick={() => {
								if (available > 0) {
									addProduct({
										title,
										price,
										images,
										slug,
										availability,
										quantity: currentInCart,
									});
								}
							}}
							className={`${
								available > 0 ? `clickable` : `opacity-50`
							}  max-w-xs w-full bg-white rounded-xl p-4 font-bold text-xl`}
						>
							Toevoegen aan winkelmand
						</button>
					</div>
				</div>
				<div className="flex">
					<div className="w-9/16 mr-14">
						{description !== null && (
							<>
								<h2 className="font-medium text-3xl mb-3">
									Productinformatie
								</h2>
								<p
									className="font-normal text-lg text-gray-800"
									dangerouslySetInnerHTML={{
										__html: description,
									}}
								/>
							</>
						)}
					</div>
					{related_products.length >= 2 && (
						<div className="flex-1">
							<h2 className="font-medium text-3xl mb-3">
								Gerelateerde producten
							</h2>
							<div className="grid gap-4 grid-1-row grid-cols-2 overflow-hidden">
								{related_products.map((product: any) => {
									const {
										title,
										slug,
										price,
										images,
									} = product;
									return (
										<ProductCard
											className="text-sm h-80"
											key={slug}
											title={title}
											slug={slug}
											price={price}
											images={images}
										/>
									);
								})}
							</div>
						</div>
					)}
				</div>
			</>
		);
	} else if (isLoading) {
		return (
			<>
				<div className="flex relative mb-14 text-drakgray">
					<div className="flex flex-col p-12 w-9/16 bg-white rounded-4xl mr-14">
						<div className="w-full h-110 mb-4 relative flex justify-center items-center">
							<Spinner/>
						</div>
					</div>
					<div className="flex flex-col flex-1 mt-8">
						<h1 className="font-bold text-4.5xl mb-4 leading-tight">
							{/* bruh */}
						</h1>
						{/* <span className="font-bold text-3xl mb-5">€69.69</span> */}
					</div>
				</div>
			</>
		);
	} else {
		return <span>error</span>;
	}
};

export default ProductPage;
