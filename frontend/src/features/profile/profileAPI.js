import axiosInstance from "../../api/axios";


// GET PROFILE
export const getProfileAPI = async () => {

  const response = await axiosInstance.get(
    "/profile/me"
  );

  return response.data;
};


// UPDATE PROFILE
export const updateProfileAPI = async (
  formData
) => {

  const response = await axiosInstance.put(
    "/profile/update",
    formData
  );

  return response.data;
};


// CHANGE PASSWORD
export const changePasswordAPI = async (
  formData
) => {

  const response = await axiosInstance.put(
    "/profile/change-password",
    formData
  );

  return response.data;
};


// UPLOAD PHOTO
export const uploadPhotoAPI = async (
  formData
) => {

  const response = await axiosInstance.post(
    "/profile/upload-photo",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};