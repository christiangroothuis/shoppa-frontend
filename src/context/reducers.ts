export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const DECREASE_PRODUCT = "DECREASE_PRODUCT";

const addProductToCart = (product: any, state: any) => {
	const updatedCart = [...state.cart];
	const updatedItemIndex = updatedCart.findIndex(
		(item) => item.slug === product.slug
	);

	if (updatedItemIndex < 0) {
		updatedCart.push({ ...product, quantity: 1 });
	} else if (product.quantity < product.availability){
		const updatedItem = {
			...updatedCart[updatedItemIndex],
		};
		updatedItem.quantity++;
		updatedCart[updatedItemIndex] = updatedItem;
	}
	
	localStorage.cart = JSON.stringify(updatedCart);
	
	return { ...state, cart: updatedCart };
};

const removeProductFromCart = (productId: any, state: any) => {
	const updatedCart = [...state.cart];
	const updatedItemIndex = updatedCart.findIndex(
		(item) => item.slug === productId
	);
    
	updatedCart.splice(updatedItemIndex, 1);

	localStorage.cart = JSON.stringify(updatedCart);

	return { ...state, cart: updatedCart };
};

const decreaseProductFromCart = (productId: any, state: any) => {
	const updatedCart = [...state.cart];
	const updatedItemIndex = updatedCart.findIndex(
		(item) => item.slug === productId
	);

	const updatedItem = {
		...updatedCart[updatedItemIndex],
	};
	updatedItem.quantity--;
	if (updatedItem.quantity <= 0) {
		updatedCart.splice(updatedItemIndex, 1);
	} else {
		updatedCart[updatedItemIndex] = updatedItem;
	}

	localStorage.cart = JSON.stringify(updatedCart);

	return { ...state, cart: updatedCart };
};

export const shopReducer = (state: any, action: any) => {
	switch (action.type) {
		case ADD_PRODUCT:
			return addProductToCart(action.product, state);
		case REMOVE_PRODUCT:
			return removeProductFromCart(action.productId, state);
		case DECREASE_PRODUCT:
			return decreaseProductFromCart(action.productId, state);
		default:
			return state;
	}
};
