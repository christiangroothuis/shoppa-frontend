import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Modal from "react-modal";
import * as Yup from "yup";
import { SignupSchema, LoginSchema } from "./dashboard";

import ShopContext from "../context/shopContext";
import { API_URL } from "../hooks/api";
import Spinner from "./spinner";
import { ReactComponent as X } from "../assets/icons/x.svg";

const ProductCard = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [modalOpen, setmodalOpen] = useState(false);
	const [modalState, setmodalState] = useState("");

	const [error, setError] = useState("");

	const [showSpinner, setshowSpinner] = useState(false);

	useEffect(() => {
		if (localStorage.user && JSON.parse(localStorage.user).token) {
			const decodedToken: any = jwt_decode(
				JSON.parse(localStorage.user).token
			);

			if (Date.now() <= decodedToken.exp * 1000) {
				setLoggedIn(true);
			}
		}
	}, []);

	const OrderSchema = Yup.object().shape({
		address: Yup.string().max(200, "Te lang!"),
		postal: Yup.string().max(7, "Te lang!"),
		city: Yup.string().max(200, "Te lang!"),
	});

	const context = useContext(ShopContext);

	const removeProduct = context.removeProductFromCart;
	const decreaseProduct = context.decreaseProductFromCart;
	const addProduct = context.addProductToCart;

	const cart = context.cart;

	let totalAmount = cart.reduce((acc, cur) => {
		return acc + cur.price * cur.quantity;
	}, 0);

	return (
		<div className="flex flex-col">
			<h1 className="text-5xl font-bold mb-5">Winkelmand</h1>
			{context.cart.length === 0 ? (
				<div className="font-bold text-xl flex justify-center items-center h-56">
					Uw winkelmand is leeg
				</div>
			) : (
				<>
					<table className="w-full text-base">
						<thead>
							<tr className="h-16 text-lg">
								<th className="text-left">Product</th>
								<th className="text-right">Prijs</th>
								<th className="text-right">Aantal</th>
								<th className="text-right">Totaal</th>
							</tr>
						</thead>
						<tbody>
							{cart.map((item) => {
								return (
									<tr key={item.slug}>
										<td className="flex align-center pb-4">
											<Link to={`/product/${item.slug}`}>
												<div className="bg-white rounded-lg h-24 w-24 p-2 flex justify-center items-center">
													{item.images[0] && (
														<img
															src={
																item.images[0]
																	.image_url
															}
															className="w-full h-full rounded object-contain"
															alt={item.title}
														/>
													)}
												</div>
											</Link>
											<div className="ml-4 flex flex-col justify-center">
												<Link
													to={`/product/${item.slug}`}
													className="mb-1 hover:underline text-lg"
												>
													<span className="text-2-lines">
														{item.title}
													</span>
												</Link>
												<button
													onClick={() => {
														removeProduct(
															item.slug
														);
													}}
													className="text-red-600 flex hover:underline text-sm"
												>
													Verwijderen
												</button>
											</div>
										</td>
										<td className="text-right">
											<span className="text-sm lg:text-base font-medium">
												€{item.price}
											</span>
										</td>
										<td className="relative">
											<div className="flex justify-end items-center font-medium relative ">
												<button
													onClick={() => {
														decreaseProduct(
															item.slug
														);
													}}
													className="bg-white rounded border-gray border cursor-pointer mr-2 w-5 h-5 flex items-center justify-center"
												>
													-
												</button>
												{item.quantity}
												<button
													onClick={() => {
														addProduct(item);
													}}
													className="bg-white rounded border-gray border cursor-pointer ml-2 w-5 h-5 flex items-center justify-center"
												>
													+
												</button>
											</div>
										</td>
										<td className="text-right">
											<span className="text-base font-medium">
												€{item.price * item.quantity}
											</span>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<div className="mt-4 flex justify-end">
						<div className="max-w-full w-110">
							<div className="flex justify-between py-4 text-xl">
								<div className="font-bold text-center text-gray-800">
									Totaal
								</div>
								<div className="font-bold text-center text-gray-900">
									€{totalAmount}
								</div>
							</div>
							<button
								onClick={() => setmodalOpen(true)}
								className="clickable flex justify-center w-full px-10 py-4 mt-3 font-medium text-white  bg-black rounded-xl text-xl"
							>
								Afrekenen
							</button>
						</div>
					</div>
				</>
			)}
			<CSSTransition in={modalOpen} timeout={300} classNames="dialog">
				<Modal
					closeTimeoutMS={500}
					isOpen={modalOpen}
					className="absolute inset-20 flex justify-center items-center"
				>
					<div className="bg-white p-10 rounded-xl border-2 border-gray flex justify-center items-center">
						<X
							onClick={() => {
								setmodalOpen(false);
								setmodalState("");
							}}
							className="mr-6 stroke-2 w-8 h-8 cursor-pointer"
						/>
						{modalState === "" && (
							<>
								{loggedIn ? (
									<>
										<Formik
											initialValues={{
												address: "",
												postal: "",
												city: "",
											}}
											validationSchema={OrderSchema}
											onSubmit={async (values) => {
												setshowSpinner(true);
												try {
													const res = await axios.post(
														`${API_URL}/orders/`,
														{
															data: {
																user: values,
																cart: JSON.parse(
																	localStorage.cart
																),
															},
														},
														{
															headers: {
																Authorization: `Bearer ${
																	JSON.parse(
																		localStorage.user
																	).token
																}`,
															},
														}
													);
													// setshowSpinner(false);
													console.log(res);
													if (res.status === 200) {
														if (res.data.err) {
															setError(
																res.data.err
															);
														} else
															localStorage.removeItem(
																"cart"
															);
														window.location.href =
															res.data.url;
													}
												} catch (error) {
													console.log(error);
													setshowSpinner(false);
													setError("Error");
												}
											}}
										>
											{({ errors, touched }) => (
												<Form className="w-125 max-w-screen relative">
													<h2 className="text-2xl font-bold">
														Afrekenen
													</h2>
													<span className="mb-4">
														(invullen gegevens niet
														vereist)
													</span>
													<div className="text-red-600">
														{error}
													</div>
													<label className="mt-10">
														Straatnaam en
														huisnummer:
														<Field
															name="address"
															className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
														/>
													</label>
													{errors.address &&
													touched.address ? (
														<div className="text-red-600">
															{errors.address}
														</div>
													) : null}
													<label className="mt-10">
														Postcode:
														<Field
															className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
															name="postal"
														/>
													</label>
													{errors.postal &&
													touched.postal ? (
														<div className="text-red-600">
															{errors.postal}
														</div>
													) : null}
													<label className="mt-10">
														Plaats:
														<Field
															className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
															name="city"
														/>
													</label>
													{errors.city &&
													touched.city ? (
														<div className="text-red-600">
															{errors.city}
														</div>
													) : null}
													<div className="flex items-center justify-between">
														<button
															type="submit"
															className="bg-black text-white px-5 py-4 rounded-xl mt-3 font-bold text-xl"
														>
															Afrekenen
														</button>
														<span className="text-2xl font-bold">
															€{totalAmount}
														</span>
													</div>
												</Form>
											)}
										</Formik>
									</>
								) : (
									<>
										<button
											onClick={() => {
												setmodalState("login");
											}}
											className="bg-black text-white px-5 py-4 rounded-xl mr-5 font-bold text-xl"
										>
											Inloggen
										</button>
										of
										<button
											onClick={() => {
												setmodalState("register");
											}}
											className="bg-black text-white px-5 py-4 rounded-xl ml-5 font-bold text-xl"
										>
											Registreren
										</button>
									</>
								)}
							</>
						)}
						{modalState === "register" && (
							<Formik
								initialValues={{
									name: "",
									email: "",
									password: "",
								}}
								validationSchema={SignupSchema}
								onSubmit={async (values) => {
									setshowSpinner(true);
									try {
										const res = await axios.post(
											`${API_URL}/auth/register`,
											values
										);
										setshowSpinner(false);
										if (res.status === 201) {
											const user = {
												token: res.data.token,
												user: res.data.user,
											};
											localStorage.user = JSON.stringify(
												user
											);
											setLoggedIn(true);
											setmodalState("");
										}
									} catch (error) {
										setshowSpinner(false);
										setError(
											"Er trad een fout op bij het registreren"
										);
									}
								}}
							>
								{({ errors, touched }) => (
									<Form className="w-125 max-w-screen relative">
										<h2 className="text-2xl font-bold mb-4">
											Registreren
										</h2>
										<div className="text-red-600">
											{error}
										</div>
										<label className="mt-10">
											Naam (Minimaal 4 karakters):
											<Field
												name="name"
												className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
											/>
										</label>
										{errors.name && touched.name ? (
											<div className="text-red-600">
												{errors.name}
											</div>
										) : null}
										<label className="mt-10">
											E-mail:
											<Field
												name="email"
												type="email"
												className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
											/>
										</label>
										{errors.email && touched.email ? (
											<div className="text-red-600">
												{errors.email}
											</div>
										) : null}
										<label className="mt-10">
											Wachtwoord (Minimaal 6 karakters):
											<Field
												className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
												name="password"
												type="password"
											/>
										</label>
										{errors.password && touched.password ? (
											<div className="text-red-600">
												{errors.password}
											</div>
										) : null}
										<button
											type="submit"
											className="bg-black text-white px-5 py-4 rounded-xl mt-3 font-bold text-xl"
										>
											Account aanmaken
										</button>
									</Form>
								)}
							</Formik>
						)}
						{modalState === "login" && (
							<Formik
								initialValues={{
									email: "",
									password: "",
								}}
								validationSchema={LoginSchema}
								onSubmit={async (values) => {
									setshowSpinner(true);
									try {
										const res = await axios.post(
											`${API_URL}/auth/login`,
											values
										);
										setshowSpinner(false);
										if (res.status === 200) {
											const user = {
												token: res.data.access_token,
												user: res.data.user,
											};
											localStorage.user = JSON.stringify(
												user
											);
											setLoggedIn(true);
											setmodalState("");
										}
									} catch (error) {
										setshowSpinner(false);
										setError("Onjuiste inlogdata");
									}
								}}
							>
								{({ errors, touched }) => (
									<Form className="w-125 max-w-screen relative">
										<h2 className="text-2xl font-bold mb-4">
											Inloggen
										</h2>
										<div className="text-red-600">
											{error}
										</div>
										<label className="mt-10">
											E-mail:
											<Field
												name="email"
												type="email"
												className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
											/>
										</label>
										{errors.email && touched.email ? (
											<div className="text-red-600">
												{errors.email}
											</div>
										) : null}
										<label className="mt-10">
											Wachtwoord:
											<Field
												className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
												name="password"
												type="password"
											/>
										</label>
										{errors.password && touched.password ? (
											<div className="text-red-600">
												{errors.password}
											</div>
										) : null}
										<button
											type="submit"
											className="bg-black text-white px-5 py-4 rounded-xl mt-3 font-bold text-xl"
										>
											Inloggen
										</button>
									</Form>
								)}
							</Formik>
						)}

						{showSpinner && (
							<div className="absolute w-full h-full bg-white flex justify-center items-center rounded-xl">
								<Spinner />
							</div>
						)}
					</div>
				</Modal>
			</CSSTransition>
		</div>
	);
};

export default ProductCard;
