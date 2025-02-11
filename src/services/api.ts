import axios from "axios";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MTk2OGI4MDUxNGY1NGNlY2Q1NTcxIiwicGhvbmVfbnVtYmVyIjoiKzkxNzkwNzc1MzE2MyIsImlhdCI6MTczMjM1NDQ2OH0.g-Z5LfT_6LCXO2stpH18jMm6B2ifbEusRUsyhbrbAvY";
// export const Hosts = async (query: string | boolean, key: string) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/hosts`, {
//       [key]: query,
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error searching data:", error);
//     throw error;
//   }
// };
export const Hosts = async (filters: Record<string, string | boolean>) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/hosts`, filters);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};
export const Professions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/professions`);
    return response.data;
  } catch (error) {
    console.error("Error searching data:", error);
    throw error;
  }
};
export const ProfessionSubCategories = async (id: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/profession-sub-categories/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching data:", error);
    throw error;
  }
}
export const getServicesById = async (id: string) => {

  
  try {
    const response = await axios.get(`${API_BASE_URL}/services/host/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    throw error; 
  }
};
