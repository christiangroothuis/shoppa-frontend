import { useState, useEffect } from "react";
import axios from "axios";

// export const API_URL = "http://localhost:8000/api";
export const API_URL = "http://5620fd30912c.ngrok.io/api"
// export const API_URL = "https://shoppa-backend-v2.herokuapp.com/api";
// export const API_URL = "http://informatica.gymnasiumbreda.nl/informatica/leerlingenwebsites/IN2021/ProjectWebsites/Drip/backend/public/api";

const useDataApi = (
	initialUrl: string,
	token: string = "",
	initialData?: any,
	method: string = "get"
): [
	{
		data: any;
		isLoading: boolean;
		isError: boolean;
		error: {};
	},
	React.Dispatch<React.SetStateAction<string>>
] => {
	// const CancelToken = axios.CancelToken;
	// const source = CancelToken.source();

	const [data, setData] = useState(initialData);
	const [url, setUrl] = useState(initialUrl);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);

			try {
				const result = await axios({
					method: "GET",
					url: API_URL + url,
					headers: {
						Authorization: `Bearer ${token}`,
					},
					// cancelToken: source.token,
					// data: { firstName: "Fred", lastName: "Flintstone" },
				});

				setData(result.data);
			} catch (error) {
				setIsError(true);
				setError(error);
			}
			setIsLoading(false);
		};

		fetchData();

		// return () => {
		// 	source.cancel();
		// }
	}, [url]);

	return [{ data, isLoading, isError, error }, setUrl];
};

export default useDataApi;
