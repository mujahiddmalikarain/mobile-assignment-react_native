import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://dummy.restapiexample.com/api/v1',
});

export const getEmployees = async () => {
  const response = await apiClient.get('/employees');
  return response.data.data;
};

export const getEmployee = async (id) => {
  try {
    const response = await apiClient.get(`/employee/${id}`);
    console.log(response, "get employee details");
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching employee with id ${id}:`, error);
    throw error;
  }
};
export const createEmployee = async (employee) => {
  const response = await apiClient.post('/create', employee);
  return response.data.data;
};

export const updateEmployee = async (id, employee) => {
  const response = await apiClient.put(`/update/${id}`, employee);
  return response.data.data;
};

export const deleteEmployee = async (id) => {
  const response = await apiClient.delete(`/delete/${id}`);
  return response.data.message;
};
