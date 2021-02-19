import React, { useReducer } from "react";

import ShopContext from "./shopContext";
import {
	shopReducer,
	ADD_PRODUCT,
	REMOVE_PRODUCT,
	DECREASE_PRODUCT,
} from "./reducers";

const GlobalState = (props) => {
	// const [cart, setCart] = useState([]);
	const [cartState, dispatch] = useReducer(shopReducer, {
		cart: localStorage.cart ? JSON.parse(localStorage.cart) : [],
	});

	const addProductToCart = (product) => {
		dispatch({ type: ADD_PRODUCT, product: product });
	};

	const decreaseProductFromCart = (productId) => {
		// setCart(updatedCart);
		dispatch({ type: DECREASE_PRODUCT, productId: productId });
	};

	const removeProductFromCart = (productId) => {
		// setCart(updatedCart);
		dispatch({ type: REMOVE_PRODUCT, productId: productId });
	};

	return (
		<ShopContext.Provider
			value={{
				cart: cartState.cart,
				addProductToCart: addProductToCart,
				removeProductFromCart: removeProductFromCart,
				decreaseProductFromCart: decreaseProductFromCart,
			}}
		>
			{props.children}
		</ShopContext.Provider>
	);
};

export default GlobalState;
