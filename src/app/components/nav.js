import React from "react";
import { NavLink } from "react-router-dom";

export default function sideNav() {
	return (
		<div className="sideNav">
			<NavLink
				to="/"
				exact
				className="nav-logo"
				style={{ display: "flex", alignItems: "center" }}
			>
				<span>
					Christian's
					<br />
					Music
				</span>
			</NavLink>
			<ul className="page-links">
				<li>
					<NavLink exact to="/">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to="/search">Search</NavLink>
				</li>
				<li>
					<NavLink to="/product/56">Library</NavLink>
				</li>
			</ul>
		</div>
	);
}
