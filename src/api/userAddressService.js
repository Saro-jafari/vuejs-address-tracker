import axiosInstance from './axiosConfig';

export const postAddress = async addressData => {
	try {
		const response = await axiosInstance.post('', addressData);

		if (response.status === 201) {
			return response.data;
		} else {
			return { error: true, message: `Unexpected status: ${response.status}` };
		}
	} catch (error) {
		if (error.response) {
			return { error: true, message: error.response.data?.message || 'Server error' };
		} else if (error.request) {
			return { error: true, message: 'No response from server' };
		} else {
			return { error: true, message: error.message };
		}
	}
};
