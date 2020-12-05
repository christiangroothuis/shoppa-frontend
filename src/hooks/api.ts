import { useState, useEffect } from "react";
import axios from "axios";

const useDataApi = (
	initialUrl: string,
	initialData?: any
): [
	{
		data: any;
		isLoading: boolean;
		isError: boolean;
	},
	React.Dispatch<React.SetStateAction<string>>
] => {
	const API_URL = "https://shoppa-backend-v2.herokuapp.com/api";
	// const API_URL = "http://localhost:8000/api";

	const [data, setData] = useState(initialData);
	const [url, setUrl] = useState(initialUrl);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);

			try {
				const result = await axios(`${API_URL}${url}`);

				setData(result.data);
			} catch (error) {
				setIsError(true);
			}
			setIsLoading(false);
		};

		fetchData();
	}, [url]);

	return [{ data, isLoading, isError }, setUrl];
};

export default useDataApi;

// : [any, React.Dispatch<React.SetStateAction<string>>]
