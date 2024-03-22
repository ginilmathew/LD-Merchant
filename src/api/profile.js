import { axiosInstance } from "../customAxios";

export const getProfile = async () => {
    try {
        const response = await axiosInstance.get('merchant/profile');
        return response
    } catch (error) {
        throw error
    }

}
export const updateProfile = async (data) => {
    try {
        const response = await axiosInstance.post('merchant/profile-update',data);
        return response
    } catch (error) {
        throw error
    }

}

export const UpdateProfilePassword = async (data) => {
    try {
        const response = await axiosInstance.post('merchant/profile-password-update',data);
        return response
    }
    catch (error) {
        throw error;
    }
}

