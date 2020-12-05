import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useDataApi from "../hooks/api";

const ProductPage = () => {
	const { productId }: { productId: string } = useParams();

	const [{ data, isLoading, isError }, doFetch] = useDataApi(
		`/products/${productId}`
	);

	useEffect(() => {
		doFetch(`/products/${productId}`);
	}, [doFetch, productId]);

	return isLoading ? (
		<span>"isLoading..."</span>
	) : isError ? (
		<span>error</span>
	) : (
		<div className="flex flex-col">
			<span>{data.title}</span>
            <span className="font-bold text-4xl">€{data.price}</span>
			<img
				className="p-3"
				src={
					data.images[0] && data.images[0].image_url !== null
						? data.images[0].image_url
						: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FlVUEWS4wkYk%2Fhqdefault.jpg&f=1&nofb=1"
				}
				alt={data.title}
			/>
			<p dangerouslySetInnerHTML={{ __html: data.description }} />
		</div>
	);
};

export default ProductPage;
