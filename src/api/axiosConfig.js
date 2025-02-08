import axios from 'axios';

const apiUrl = 'https://stage.achareh.ir/api/karfarmas/address';

const axiosInstance = axios.create({
	baseURL: apiUrl,
	headers: {
		'Content-Type': 'application/json',
		Authorization: import.meta.env.VITE_APP_API_TOKEN,
	},
});

export default axiosInstance;
