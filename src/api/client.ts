import { ApiResponse } from "@/types/api";
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.kth-tentor.se/api",
  timeout: 10000,
});

export const fetchExamById = async (
  examId: string | number
): Promise<ApiResponse> => {
  const response = await apiClient.get(`/course/${examId}/sv`);
  return response.data;
};

export default apiClient;
