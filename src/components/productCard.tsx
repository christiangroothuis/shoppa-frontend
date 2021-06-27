import React, { useState } from "react";
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
}) => {
	const [loaded, setLoaded] = useState(false);
	return (
		<Link
			to={`/product/${slug}`}
			className={`${className} text-lg bg-white p-5 flex rounded-3xl flex-col items-center justify-evenly scale-50`}
		>
			<div className="h-1/2 w-full">
				<img
					loading="lazy"
					className={`object-contain w-full h-full transition-opacity ${
						loaded ? `opacity-100` : `opacity-0`
					}`}
					style={{ transitionDuration: "300ms" }}
					src={
						images[0] && images[0].image_url !== null
							? images[0].image_url
							: "/backend/uploads/images/Drip_placeholder.png"
					}
					alt={title}
					onLoad={() => setLoaded(true)}
				/>
			</div>
			<div className="flex flex-col items-center justify-self-end mt-3">
				<span className=" font-bold text-center text-2-lines">
					{title}
				</span>
				<span className="text-2.5xl mt-2 font-bold">€{price}</span>
			</div>
		</Link>
	);
};

export default ProductCard;
