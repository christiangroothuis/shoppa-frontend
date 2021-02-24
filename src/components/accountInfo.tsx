import axios from "axios";
import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import useDataApi, { API_URL } from "../hooks/api";
import Spinner from "./spinner";
import * as Yup from "yup";

const AccountInfo = ({ className }: { className?: string }) => {
	const [formError, setformError] = useState("");

	const [showSpinner, setshowSpinner] = useState(false);

	const [{ data, isLoading, isError }, doFetch]: [
		{ data: any; isLoading: boolean; isError: boolean; error: any },
		any
	] = useDataApi(`/auth/me`, JSON.parse(localStorage.user).token);

	useEffect(() => {
		doFetch(`/auth/me`, JSON.parse(localStorage.user).token);
	}, [doFetch]);

	const AccountSchema = Yup.object().shape({
		name: Yup.string()
			.min(4, "Minimaal 4 tekens lang")
			.max(100, "Te lang!")
			.required("Naam vereist"),
		email: Yup.string().email("Ongeldige email").required("E-mail vereist"),
		address: Yup.string().max(200, "Te lang!").nullable(),
		zip_code: Yup.string().max(7, "Te lang!").nullable(),
		city: Yup.string().max(200, "Te lang!").nullable(),
	});

	return !isLoading && !isError ? (
		<Formik
			initialValues={{
				name: data.name,
				email: data.email,
				address: data.address,
				zip_code: data.zip_code,
				city: data.city,
			}}
			validationSchema={AccountSchema}
			onSubmit={async (values: any) => {
				setshowSpinner(true);
				try {
					await axios.put(`${API_URL}/auth/me`, values, {
						headers: {
							Authorization: `Bearer ${
								JSON.parse(localStorage.user).token
							}`,
						},
					});
					setshowSpinner(false);
				} catch (error) {

					setshowSpinner(false);
					setformError("Error");
				}
			}}
		>
			{({ errors, touched }) => (
				<Form className="w-125 max-w-screen relative">
					{showSpinner && (
						<div className="absolute z-20 w-full h-full flex justify-center items-center">
							<Spinner className="w-8 h-8" />
						</div>
					)}
					<div className={`${showSpinner && `opacity-20`}`}>
						<div className="text-red-600">{formError}</div>
						<label className="mt-10">
							Naam*:
							<Field
								name="name"
								className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
							/>
						</label>
						{errors.name && touched.name ? (
							<div className="text-red-600">{errors.name}</div>
						) : null}
						<label className="mt-10">
							E-mail*:
							<Field
								name="email"
								className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
							/>
						</label>
						{errors.email && touched.email ? (
							<div className="text-red-600">{errors.email}</div>
						) : null}
						<label className="mt-10">
							Straatnaam en huisnummer:
							<Field
								name="address"
								className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
							/>
						</label>
						{errors.address && touched.address ? (
							<div className="text-red-600">{errors.address}</div>
						) : null}
						<label className="mt-10">
							Postcode:
							<Field
								className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
								name="zip_code"
							/>
						</label>
						{errors.zip_code && touched.zip_code ? (
							<div className="text-red-600">
								{errors.zip_code}
							</div>
						) : null}
						<label className="mt-10">
							Plaats:
							<Field
								className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
								name="city"
							/>
						</label>
						{errors.city && touched.city ? (
							<div className="text-red-600">{errors.city}</div>
						) : null}

						<button
							type="submit"
							className="bg-black text-white px-5 py-4 rounded-xl mt-3 font-bold text-xl clickable"
						>
							Updaten
						</button>
					</div>
				</Form>
			)}
		</Formik>
	) : (
		<div className="w-full flex justify-center items-center h-64">
			<Spinner className="w-8 h-8" />
		</div>
	);
};

export default AccountInfo;
