import { axiosInstance } from "../customAxios";

export const CreatePost = async (data) => {

    try {
        const response = await axiosInstance.post('merchant/post-create', data);
        return response
    } catch (error) {
        throw error
    }

}
export const getPayment = async (data) => {
    try {
        const response = await axiosInstance.get('merchant/post-payment', data);
        return response
    } catch (error) {
        throw error
    }

}

export const getPost = async (data) => {
    try {
        const response = await axiosInstance.get('merchant/post-list');
        return response
    } catch (error) {
        throw error
    }

}

export const getPostShow = async (id) => {
    try {
        const response = await axiosInstance.get(`merchant/post-show/${id}`);
        return response
    } catch (error) {
        throw error
    }

}

export const UpdatePost = async (data) => {
    try {
        const response = await axiosInstance.post(`merchant/post-update`,data);
        return response
    } catch (error) {
        throw error
    }

}


export const deletPost = async (id) => {
    try {
        const response = await axiosInstance.delete(`merchant/post-delete/${id}`);
        return response
    } catch (error) {
        throw error
    }

}