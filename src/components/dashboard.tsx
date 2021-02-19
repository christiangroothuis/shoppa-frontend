import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { CSSTransition } from "react-transition-group";
import Modal from "react-modal";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import axios from "axios";

Modal.setAppElement("#root");

const Dashboard = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [modalOpen, setmodalOpen] = useState(false);
	const [modalState, setmodalState] = useState("");

	useEffect(() => {
		if (localStorage.user?.token) {
			const token =
				"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9yZWdpc3RlciIsImlhdCI6MTYxMzY5NDAyOSwiZXhwIjoxNjEzNzgwNDI5LCJuYmYiOjE2MTM2OTQwMjksImp0aSI6Im14TDUyNjRsZnJwc3BTMEoiLCJzdWIiOjYsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJyb2xlIjpudWxsfQ.Nwlrwqyxh8g78iz8RqIbDbUqXjcQkpNyUs1j1RI_b7A";
			const decodedToken: any = jwt_decode(token);

			console.log(decodedToken);

			if (Date.now() <= decodedToken.exp * 1000) {
				setLoggedIn(true);
			} else {
				setmodalOpen(true);
			}
		} else {
			setmodalOpen(true);
		}
	}, []);

	const SignupSchema = Yup.object().shape({
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

	return (
		<div>
			<h1 className="text-5xl font-bold mb-5">Dashboard</h1>
			{loggedIn && "bruh"}
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
							<>
								<Formik
									initialValues={{
										name: "",
										email: "",
										password: "",
									}}
									validationSchema={SignupSchema}
									onSubmit={(values) => {
										// axios.post('')
										console.log(values);
									}}
								>
									{({ errors, touched }) => (
										<Form className="w-125 max-w-screen">
											<h2 className="text-2xl font-bold mb-4">
												Registreren
											</h2>
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
												Wachtwoord (Minimaal 6
												karakters):
												<Field
													className="bg-white relative border-2 border-gray p-2.5 px-4 rounded-xl w-full focus:border-blue-500"
													name="password"
													type="password"
												/>
											</label>
											{errors.password &&
											touched.password ? (
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
							</>
						)}
					</div>
				</Modal>
			</CSSTransition>
		</div>
	);
};

export default Dashboard;
