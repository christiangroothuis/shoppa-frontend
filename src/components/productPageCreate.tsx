import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { API_URL } from "../hooks/api";
import jwt_decode from "jwt-decode";

import { ReactComponent as X } from "../assets/icons/x.svg";

import Spinner from "./spinner";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ProductPageEdit = () => {
	const history = useHistory();

	const [imageChanged, setimageChanged] = useState(false);

	const [showSpinner, setshowSpinner] = useState(false);

	const [categories, setcategories] = useState([]);

	const [formError, setformError] = useState("");

	const [formImages, setformImages]: [any, any] = useState([]);

	useEffect(() => {
		if (localStorage.user) {
			const decodedToken: any = jwt_decode(
				JSON.parse(localStorage.user).token
			);

			if (
				Date.now() >= decodedToken.exp * 1000 ||
				JSON.parse(localStorage.user).user.role !== "admin"
			) {
				history.push(`/dashboard`);
			}
		} else {
			history.push(`/dashboard`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		axios
			.get(`${API_URL}/categories`)
			.then((res) => setcategories(res.data));
	}, []);

	const ProductSchema = Yup.object().shape({
		title: Yup.string()
			// .min(4, "Minimaal 4 tekens lang")
			// .max(100, "Te lang!")
			.required("Naam vereist"),
		slug: Yup.string().required("Slug vereist"),
		brand: Yup.string().nullable(),
		description: Yup.string().nullable(),
		category: Yup.number().nullable(),
		availability: Yup.number().required("Voorraad vereist"),
		price: Yup.number().required("Prijs vereist"),
	});

	return (
		<>
			{showSpinner && (
				<div className="fixed top-0 left-0 bg-white bg-opacity-80 w-full h-full z-20 flex items-center justify-center">
					<div className="flex flex-col items-center">
						<Spinner />
					</div>
				</div>
			)}

			<Formik
				initialValues={{
					title: "",
					slug: "",
					brand: "",
					price: 10,
					description: "",
					category_id: "",
					availability: 10,
				}}
				validationSchema={ProductSchema}
				onSubmit={async (values) => {
					setshowSpinner(true);
					try {
						const submittedProduct: any = await axios.post(
							`${API_URL}/products`,
							values,
							{
								headers: {
									Authorization: `Bearer ${
										JSON.parse(localStorage.user).token
									}`,
								},
							}
						);

						if (imageChanged) {
							formImages.forEach(
								async (image: any, i: number) => {
									// if (image.image_url) {
									let data = new FormData();

									let file: any = await fetch(image.image_url)
										.then((r) => r.blob())
										// .then((res)	 => console.log(res))
										.then(
											(blobFile) =>
												new File(
													[blobFile],
													`${
														submittedProduct.data
															.data.id
													}--:-+${i + 1}.${
														blobFile.type.split(
															"/"
														)[1]
													}`,
													{
														type: blobFile.type,
													}
												)
										);

									console.log(file);

									data.append("image", file);

									axios
										.post(`${API_URL}/images`, data, {
											headers: {
												Authorization: `Bearer ${
													JSON.parse(
														localStorage.user
													).token
												}`,
												accept: "application/json",
												"Accept-Language":
													"en-US,en;q=0.8",
												"Content-Type": `multipart/form-data;`,
											},
										})
										.catch((err) => console.log(err));
								}
							);
						}
						history.push(
							`/product/${submittedProduct.data.data.slug}`
						);
						setshowSpinner(false);
					} catch (error) {
						setshowSpinner(false);
						setformError(
							"Er trad een fout op bij het uploaden. Probeer later opnieuw"
						);
						console.log(error);
					}
				}}
			>
				{({ errors, touched }) => (
					<Form className="w-150 max-w-full relative">
						<h2 className="text-4xl font-bold mb-4">
							Product aanmaken
						</h2>
						<div className="text-red-600">{formError}</div>
						<label className="mt-10">
							Titel:
							<Field
								name="title"
								className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
							/>
						</label>
						<span className="w-full flex text-red-600">
							<ErrorMessage name="title" />
						</span>
						<label className="mt-10">
							Slug:
							<Field
								name="slug"
								className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
							/>
						</label>
						<span className="w-full flex text-red-600">
							<ErrorMessage name="slug" />
						</span>
						<label className="mt-10">
							Prijs:
							<Field
								name="price"
								type="number"
								className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
							/>
						</label>
						<span className="w-full flex text-red-600">
							<ErrorMessage name="price" />
						</span>
						<label className="mt-10">
							Voorraad:
							<Field
								name="availability"
								type="number"
								className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
							/>
						</label>
						<span className="w-full flex text-red-600">
							<ErrorMessage name="availability" />
						</span>
						<label className="mt-10">
							Categorie:
							<Field
								name="category_id"
								as="select"
								className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
							>
								{[
									{ display_name: "", id: "" },
									...categories,
								].map((category, i) => {
									return (
										<option key={i} value={category.id}>
											{category.display_name}
										</option>
									);
								})}
							</Field>
						</label>
						<span className="w-full flex text-red-600">
							<ErrorMessage name="category_id" />
						</span>
						<label className="mt-10">
							Merk:
							<Field
								name="brand"
								className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
							/>
						</label>
						<span className="w-full flex text-red-600">
							<ErrorMessage name="brand" />
						</span>
						<label className="mt-10">
							Beschrijving:
							<Field
								name="description"
								as="textarea"
								className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500 h-60"
							/>
						</label>
						<span className="w-full flex text-red-600">
							<ErrorMessage name="description" />
						</span>
						<div className="mb-5">
							Foto's:
							{formImages.map((image: any, i: number) => {
								return (
									<div
										className="flex mt-5 overflow-visible items-center"
										key={i}
									>
										<img
											src={image.image_url}
											alt={`Foto ${i + 1}`}
											className="w-28 mr-5"
										/>
										<label className="mt-5 max-w-60 overflow-x-scroll">
											<input
												type="file"
												name="file"
												accept="image/*"
												onChange={(event) => {
													setimageChanged(true);
													if (
														event &&
														event.target &&
														event.target.files &&
														event.target.files[0]
													) {
														console.log(
															event.target.files
														);

														const newUrl = URL.createObjectURL(
															event.target
																.files[0]
														);

														setformImages(
															formImages.map(
																(
																	image: any,
																	iteration: number
																) => {
																	if (
																		i ===
																		iteration
																	) {
																		return {
																			image_url: newUrl,
																		};
																	} else
																		return image;
																}
															)
														);
													} else {
														setformImages(
															formImages.map(
																(
																	image: any,
																	iteration: number
																) => {
																	if (
																		i ===
																		iteration
																	) {
																		return {
																			image_url:
																				"",
																		};
																	} else
																		return image;
																}
															)
														);
													}
												}}
											/>
										</label>
										<X
											onClick={() => {
												setimageChanged(true);
												setformImages(
													formImages.filter(
														(
															image: any,
															iteration: number
														) => i !== iteration
													)
												);
											}}
											className="w-8 h-8 cursor-pointer"
										/>
									</div>
								);
							})}
							<button
								type="button"
								onClick={() => {
									setformImages([
										...formImages,
										{ image_url: "" },
									]);
								}}
								className="bg-black text-white p-3 rounded-lg mt-3 font-bold"
							>
								Foto toevoegen
							</button>
						</div>
						<button
							type="submit"
							className="bg-black text-white px-5 py-4 rounded-xl mt-3 font-bold text-xl clickable"
						>
							Product updaten
						</button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default ProductPageEdit;
