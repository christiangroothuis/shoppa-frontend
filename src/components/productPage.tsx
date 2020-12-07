import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useDataApi from "../hooks/api";

interface Image {
	image_url: string;
}

const ProductPage = () => {
	const { productId }: { productId: string } = useParams();

	const [{ data, isLoading, isError }, doFetch] = useDataApi(
		`/products/${productId}`
	);

	const [currentImage, setCurrentImage] = useState("");

	useEffect(() => {
		doFetch(`/products/${productId}`);
	}, [doFetch, productId]);

	useEffect(() => {
		if (
			data &&
			data.data &&
			data.data.images[0] &&
			data.data.images[0].image_url !== null
		) {
			setCurrentImage(data.data.images[0].image_url);
		}
	}, [data]);

	if (!isLoading && !isError) {
		const {
			title,
			price,
			description,
			images,
			related_products,
		} = data.data;

		return (
			<>
				<div className="flex relative mb-14 text-drakgray">
					<div
						className="flex flex-col p-12 w-9/16 bg-white rounded-4xl mr-6"
						// style={{ maxHeight: "10%", maxWidth: "750px" }}
					>
						<div className="w-full h-110 mb-4 relative">
							<img
								className="object-contain w-full h-full absolute"
								src={
									images[0] && images[0].image_url !== null
										? currentImage
										: // images[0].image_url
										  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FlVUEWS4wkYk%2Fhqdefault.jpg&f=1&nofb=1"
								}
								alt={title}
							/>
						</div>
						{images.length > 1 && (
							<div className="flex overflow-x-scroll">
								{images.map((image: Image, i: number) => {
									return (
										<div
											key={i}
											className={`flex-none rounded-lg h-22 w-22 mr-2 flex items-center justify-center border-2 overflow-hidden p-1 transition-colors ${
												currentImage === image.image_url
													? ` border-blue-500`
													: ` border-gray-200`
											}`}
											onMouseEnter={() =>
												setCurrentImage(image.image_url)
											}
										>
											<img
												className="object-contain w-full h-full"
												src={
													image.image_url !== null
														? image.image_url
														: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FlVUEWS4wkYk%2Fhqdefault.jpg&f=1&nofb=1"
												}
												alt={title}
											/>
										</div>
									);
								})}
							</div>
						)}
					</div>
					<div className="flex flex-col p-8 flex-1">
						<h1 className="font-bold text-4.5xl mb-4 leading-tight">
							{title}
						</h1>
						<span className="font-bold text-3xl">€{price}</span>
					</div>
				</div>
				<div className="w-9/16">
					{description !== null && (
						<>
							<h2 className="font-medium text-3xl mb-3">
								Productinformatie
							</h2>
							<p
								className="font-normal text-lg text-gray-800"
								dangerouslySetInnerHTML={{
									__html: description,
								}}
							/>
						</>
					)}
				</div>
				<div className="flex">
					{related_products.map((product: any, i: number) => (
						<img
							key={i}
							className="w-64"
							alt={product.title}
							src={product.images[0].image_url}
						/>
					))}
				</div>
			</>
		);
	} else if (isLoading) {
		return <span>Loading...</span>;
	} else {
		return <span>Error</span>;
	}
};

export default ProductPage;
