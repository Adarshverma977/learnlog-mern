import axiosInstance from "../../api/axios";


export const getDashboardStatsAPI =
  async () => {

    const response =
      await axiosInstance.get(
        "/dashboard/stats"
      );

    return response.data;

};