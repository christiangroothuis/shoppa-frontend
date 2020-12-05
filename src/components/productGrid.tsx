import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./productCard";

const CardSection = () => {
	// const mainInnerRef = useRef();
	// const [limiter, setLimiter] = useState(0);

	// // Calculate how much cards with the gaps (25px) will fit in main div without padding on window resize
	// useEffect(() => {
	// 	const handleWindowResize = () => {
	// 		const calculation = Math.floor(
	// 			(mainInnerRef.current.getBoundingClientRect().width + 25) /
	// 				(164 + 25)
	// 		);

	// 		rows && setLimiter(calculation < 1 ? rows : calculation * rows);
	// 	};

	// 	handleWindowResize();

	// 	window.addEventListener("resize", handleWindowResize);

	// 	return () => window.removeEventListener("resize", handleWindowResize);
	// }, [rows]);

	// let dataShown = data;
	// if (rows) dataShown = data.slice(0, limiter);

	return <a/>;
	// <section className="items-grid" ref={mainInnerRef}>
	// 	{data &&
	// 		dataShown.map((item, i) => {
	// 			return (
	// 				<ProductCard
	// 					key={i}
	// 					slug={item.slug}
	// 					title={item.name}
	// 					image={item.img}
	// 					price={item.price}
	// 				/>
	// 			);
	// 		})}
	// </section>
};

export default CardSection;
