import axiosInstance from './axiosConfig';

const CACHE_KEY = 'addresses';
const CACHE_EXPIRATION = 10 * 60 * 1000;

export const getAddresses = async () => {
	try {
		const cachedData = localStorage.getItem(CACHE_KEY);

		if (cachedData) {
			const { timestamp, data } = JSON.parse(cachedData);

			if (Date.now() - timestamp < CACHE_EXPIRATION) {
				return data;
			} else {
				localStorage.removeItem(CACHE_KEY);
			}
		}

		const response = await axiosInstance.get('');

		const responseData = response.data;
		localStorage.setItem(
			CACHE_KEY,
			JSON.stringify({
				timestamp: Date.now(),
				data: responseData,
			}),
		);

		return responseData;
	} catch (error) {
		return { error: true, message: 'خطا در دریافت داده' };
	}
};
