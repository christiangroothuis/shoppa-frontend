import React from "react";
import { NavLink } from "react-router-dom";

const ProductCard = ({
	slug,
	title,
	image,
	price,
	className,
}: {
	slug: string;
	title: string;
	image: string;
	price: number;
	className?: string;
}) => (
	<NavLink
		to={`/product/${slug}`}
		className={`product-card block overflow-hidden rounded max-w-full h-80 bg-gray-800 relative hover:translate-y-64 ${className}`}
	>
		<div className="absolute z-10 w-full h-full p-5 text-white flex flex-col justify-end">
			<h3 className="text-3xl font-medium leading-tight">{title}</h3>
			<span className="text-1-line">
			</span>
		</div>
		<div className="absolute w-full h-full object-cover z-5 gradient" />
	</NavLink>
);

export default ProductCard;
