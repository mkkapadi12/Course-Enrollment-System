import privateAPI from "../../services/PrivateAPI";

export const registerAdminAPI = async (data) => {
  const response = await privateAPI.post("/admin/register", data);
  return response.data;
};

export const loginAdminAPI = async (data) => {
  const response = await privateAPI.post("/admin/login", data);
  return response.data;
};

export const getAdminProfileAPI = async () => {
  const response = await privateAPI.get("/admin/profile");
  return response.data;
};

export const getAllInstructorsAPI = async () => {
  const response = await privateAPI.get("/admin/instructors");
  return response.data;
};

export const getAllStudentsAPI = async () => {
  const response = await privateAPI.get("/admin/students");
  return response.data;
};

