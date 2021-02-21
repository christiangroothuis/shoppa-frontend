import React, { useEffect, useState } from "react";
import useDataApi, { API_URL } from "../hooks/api";
import Spinner from "./spinner";
import { ReactComponent as X } from "../assets/icons/x.svg";
import axios from "axios";

const DashboardCat = ({ className }: { className?: string }) => {
	const [{ data, isLoading, isError, error }, doFetch] = useDataApi(
		`/categories`
	);

	const [showSpinner, setshowSpinner] = useState(false);

	const [newCategory, setnewCategory] = useState("");

	useEffect(() => {
		doFetch("/categories");
	}, [doFetch]);

	return (
		<div className={`${className}`}>
			{isLoading ? (
				<div className="w-full flex justify-center items-center h-64">
					<Spinner className="w-8 h-8" />
				</div>
			) : (
				<>
					{isError ? (
						<div className="whitespace-pre-wrap overflow-scroll">
							{JSON.stringify(error)}
						</div>
					) : (
						<>
							{showSpinner && (
								<div className="absolute z-20 w-full h-full flex justify-center items-center">
									<Spinner className="w-8 h-8" />
								</div>
							)}

							<div className={`${showSpinner && 'opacity-20'}`}>
								<ul>
									{data.map((category: any, i: number) => (
										<li
											key={i}
											className="text-xl my-3 flex justify-between w-full"
										>
											{category.display_name}
											<X
												onClick={async () => {
													setshowSpinner(true);

													await axios.delete(
														`${API_URL}/categories/${category.id}`,
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
													setshowSpinner(false);
													doFetch("/categories");
												}}
												className="w-8 h-8 text-red-600 cursor-pointer"
											/>
										</li>
									))}
								</ul>
								<input
									onChange={(e) => {
										const searchQuery = e.target.value;
										setnewCategory(searchQuery);
									}}
									value={newCategory}
									required
									placeholder="Categorie"
									className="bg-white relative border-2 mr-2 border-gray p-2.5 px-4 h-14 rounded-xl w-50 focus:border-blue-500 z-40"
								/>

								<button
									type="button"
									onClick={async (e) => {
										e.preventDefault();

										setshowSpinner(true);

										if (newCategory.length > 0) {
											await axios.post(
												`${API_URL}/categories/`,
												{
													name: newCategory,
												}
											);

											setshowSpinner(false);
											doFetch("/categories");
										} else {
											alert("Categorie vereist");
										}
									}}
									className="bg-black text-white p-4 h-14 rounded-lg mt-3 font-bold"
								>
									Categorie toevoegen
								</button>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default DashboardCat;
