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
		error: {};
	},
	React.Dispatch<React.SetStateAction<string>>
] => {
	const API_URL = "http://informatica.gymnasiumbreda.nl/informatica/leerlingenwebsites/IN2021/ProjectWebsites/Drip/backend/public/api";
	// const API_URL = "https://shoppa-backend-v2.herokuapp.com/api";
	// const API_URL = "http://localhost:8000/api";

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
				const result = await axios(`${API_URL}${url}`);

				setData(result.data);
			} catch (error) {
				setIsError(true);
				setError(error);
			}
			setIsLoading(false);
		};

		fetchData();
	}, [url]);

	return [{ data, isLoading, isError, error }, setUrl];
};

export default useDataApi;
