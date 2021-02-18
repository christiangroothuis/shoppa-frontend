import { createContext } from "react";

export default createContext({
	cart: [
		{
			title: "brhu",
			price: 340,
			quantity: 2,
			slug: "n",
			images: [
				{
					image_url:
						"2",
				},
			],
		},
	],
	addProductToCart: (product: any) => {},
	decreaseProductFromCart: (product: any) => {},
	removeProductFromCart: (productId: any) => {},
});
