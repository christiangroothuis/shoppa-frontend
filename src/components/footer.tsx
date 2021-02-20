import React from "react";
import { Link } from "react-router-dom";
import Container from "./container";

const Footer = ({ className }: { className?: string }) => {
	return (
		<footer
			className={`py-8 bg-white border-t-2 border-gray-100 ${
				className || ""
			}`}
		>
			<Container className="flex justify-between items-center">
				<div className="flex items-center font-medium text-base">
					Drip 2021
				</div>
				<span className="text-5xl font-black">DRIP</span>
				<Link to="/over#disclaimer" className="underline cursor-pointer">Disclaimer</Link>
			</Container>
		</footer>
	);
};

export default Footer;
