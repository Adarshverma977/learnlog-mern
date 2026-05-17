import axiosInstance from "../../api/axios";


// CREATE ENTRY
export const createEntryAPI = async (data) => {

  const response = await axiosInstance.post(
    "/journal/create",
    data
  );

  return response.data;
};


// GET ALL ENTRIES
export const getAllEntriesAPI = async (
  search = "",
  difficulty = ""
) => {

  const response = await axiosInstance.get(
    `/journal/all?search=${search}&difficulty=${difficulty}`
  );

  return response.data;
};


// DELETE ENTRY
export const deleteEntryAPI = async (id) => {

  const response = await axiosInstance.delete(
    `/journal/delete/${id}`
  );

  return response.data;
};