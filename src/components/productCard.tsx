import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({
	slug,
	title,
	images,
	price,
	className,
}: {
	slug: string;
	title: string;
	images: any;
	price: number;
	className?: string;
}) => (
	<Link
		to={`/product/${slug}`}
		className={`${className} text-lg bg-white p-5 flex rounded-3xl flex-col items-center justify-evenly scale-50`}
	>
		<img
			className="p-3 object-contain"
			src={
				images[0] && images[0].image_url !== null
					? images[0].image_url
					: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FlVUEWS4wkYk%2Fhqdefault.jpg&f=1&nofb=1"
			}
			alt={title}
		/>
		<div className="flex flex-col items-center justify-self-end">
			<span className=" font-bold text-center text-2-lines">{title}</span>
			<span className="text-2.5xl mt-4 font-bold">€{price}</span>
		</div>
	</Link>
);

export default ProductCard;
