import axiosInstance from "../../api/axios";


// REGISTER
export const registerAPI =
  async (data) => {

    const response =
      await axiosInstance.post(
        "/auth/register",
        data
      );

    return response.data;

};


// LOGIN
export const loginAPI =
  async (data) => {

    const response =
      await axiosInstance.post(
        "/auth/login",
        data
      );

    return response.data;

};


// CURRENT USER
export const getCurrentUserAPI =
  async () => {

    const response =
      await axiosInstance.get(
        "/auth/me"
      );

    return response.data;

};


// LOGOUT
export const logoutAPI =
  async () => {

    const response =
      await axiosInstance.post(
        "/auth/logout"
      );

    return response.data;

};


// FORGOT PASSWORD
export const forgotPasswordAPI =
  async (email) => {

    const response =
      await axiosInstance.post(
        "/auth/forgot-password",
        { email }
      );

    return response.data;

};


// RESET PASSWORD
export const resetPasswordAPI =
  async (
    token,
    password
  ) => {

    const response =
      await axiosInstance.put(
        `/auth/reset-password/${token}`,
        { password }
      );

    return response.data;

};