import { useParams } from "react-router-dom";

const ProductPage = () => {
    const {productId}:{productId: string} = useParams();
	return <div>{productId}</div>;
};

export default ProductPage;
