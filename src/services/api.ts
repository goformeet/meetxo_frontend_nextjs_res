import { AuthData } from "@/types/authTypes";
import axios from "axios";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// const token =localStorage.getItem("token")
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MTk2OGI4MDUxNGY1NGNlY2Q1NTcxIiwicGhvbmVfbnVtYmVyIjoiKzkxNzkwNzc1MzE2MyIsImlhdCI6MTczMjM1NDQ2OH0.g-Z5LfT_6LCXO2stpH18jMm6B2ifbEusRUsyhbrbAvY";
  

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
};
export const getServicesById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services/host/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    throw error;
  }
};
export const getSingleService = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services/single/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    throw error;
  }
};
export const getTiming = async (id: string, date: string) => {
  try {
     const [day, month, year] = date.split("/");
    const response = await axios.post(
      `${API_BASE_URL}/services/get-timings?service_id=${id}&date=${year}-${month}-${day}`,
      {},
    
    );
    if (response.data.success){
      
      return response.data.timings;
    } 
  } catch (error) {
    console.error("Error fetching service timings:", error);
    throw error;
  }
};
export const bookMeetingApi = async (data: Record<string, string | boolean>,token:string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/meetings/book`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  } catch (error) {
    console.error("Error fetching service timings:", error);
    throw error;
  }
};
export const getAllEvents=async()=>{
try {
  const response = await axios.get(`${API_BASE_URL}/events/all`);
    return response.data;
} catch (error) {
   console.error("Error fetching service timings:", error);
   throw error;
}
}
export const sendOtp = async (phone: string) => {
  const data = {
    mobile_number: phone,
  };
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/send-otp`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const verifyOtp = async (authData: AuthData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`,authData);
    return response.data
  } catch (error) {
    console.error(error);
    
    throw error;
  }
};
export const setUpProfile = async (data: Record<string, unknown>,token:string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/profile/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const eventBooking = async (data: {
  event_id: string;
  user_id: string;
},token:string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/event-bookings`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getEventsByHost = async (hostId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/${hostId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const User = async (token: string)=> {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}