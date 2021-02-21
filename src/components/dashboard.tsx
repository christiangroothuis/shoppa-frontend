import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { CSSTransition } from "react-transition-group";
import Modal from "react-modal";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { API_URL } from "../hooks/api";
import Spinner from "./spinner";
import OrderTable from "./orderTable";
import AccountInfo from "./accountInfo";
import DashboardCat from "./dashboardCat";

Modal.setAppElement("#root");

export const SignupSchema = Yup.object().shape({
	name: Yup.string()
		.min(4, "Minimaal 4 tekens lang")
		.max(100, "Te lang!")
		.required("Naam vereist"),
	email: Yup.string().email("Ongeldige email").required("E-mail vereist"),
	password: Yup.string()
		.min(6, "Minimaal 6 karakters")
		.max(70, "Te lang!")
		.required("Wachtwoord vereist"),
});

export const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Ongeldige email").required("E-mail vereist"),
	password: Yup.string()
		.min(6, "Minimaal 6 karakters")
		.max(70, "Te lang!")
		.required("Wachtwoord vereist"),
});

const Dashboard = () => {
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
			} else {
				setmodalOpen(true);
			}
		} else {
			setmodalOpen(true);
		}
	}, []);

	return (
		<div>
			<div className="flex justify-between mb-5">
				<h1 className="text-5xl font-bold ">Dashboard</h1>
				<button
					onClick={() => {
						localStorage.removeItem("user");
						setLoggedIn(false);
						setmodalState("");
						setmodalOpen(true);
					}}
					className="bg-blue-600 text-white rounded-xl px-4 py-1 font-bold text-xl"
				>
					Uitloggen
				</button>
			</div>
			{/* {JSON.parse(localStorage.user).user.name}  */}
			{loggedIn && (
				<div>
					<div className="">
						<h2 className="font-bold text-2xl">Accountinfo</h2>
						<AccountInfo />
					</div>

					{JSON.parse(localStorage.user).user.role !== "admin" ? (
						<>
							<h2 className="font-bold text-2xl mt-10">
								Jouw bestellingen
							</h2>
							<OrderTable />
						</>
					) : (
						<>
							<h2 className="text-2xl font-bold mt-10">
								Categorieën
							</h2>
							<DashboardCat />
							<h2 className="font-bold text-2xl mt-10">
								Alle bestellingen
							</h2>
							<OrderTable />
						</>
					)}
				</div>
			)}
			<CSSTransition in={modalOpen} timeout={300} classNames="dialog">
				<Modal
					closeTimeoutMS={500}
					isOpen={modalOpen}
					className="absolute inset-20 flex justify-center items-center"
				>
					<div className="bg-white p-10 rounded-xl border-2 border-gray flex justify-center items-center">
						{modalState === "" && (
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
											setmodalOpen(false);
										}
									} catch (error) {
										setshowSpinner(false);
										setError(
											"Er trad een fout op bij het registreren"
										);
										console.log(error);
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
											setmodalOpen(false);
										}
									} catch (error) {
										setshowSpinner(false);
										setError("Onjuiste inlogdata");
										// console.log(error);
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

export default Dashboard;
