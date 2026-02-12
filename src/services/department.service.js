import axios from "axios";
import { dpmService } from "../helpers/contents";

export const GetAllDpmService = async () => {
  try {
    const body = JSON.stringify({ action: "getall"});
    const resp = await axios.post(dpmService.DPM_URL, body);
    let json = await resp.data;
    if (json && json.success) {
      return json.data;
    }
    return null;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};



// export const GetListEmployeeService = async (page,pageSize) => {
//   try {
//     const body = JSON.stringify({ action: "getlist",page,pageSize });
//     const resp = await axios.post(employeeService.EMPLOYEE_URL, body);
//     let json = await resp.data;
//     if (json && json.success) {
//       return json;
//     }
//     return null;
//   } catch (error) {
//     console.log("Error fetching movie details:", error);
//     throw error;
//   }
// };

// export const GetByIdEmployeeService = async (id) => {
//   try {
//     const body = JSON.stringify({ action: "getbyid", id});
//     const resp = await axios.post(employeeService.EMPLOYEE_URL, body);
//     let json = await resp.data;
//     if (json && json.data) {
//       return json.data
//     }
//     return null;
//   } catch (error) {
//     console.log("Error fetching movie details:", error);
//     throw error;
//   }
// };

// export const InsertEmployeeService = async (formData) => {
//   try {
//     const body = JSON.stringify({ action: "insert", ...formData});
//     const resp = await axios.post(employeeService.EMPLOYEE_URL, body);
//     let json = await resp.data;
//     if (json) {
//       return json
//     }
//     return null;
//   } catch (error) {
//     console.log("Error fetching movie details:", error);
//     throw error;
//   }
// };


// export const UpdateEmployeeService = async (formData) => {
//   try {
//     const body = JSON.stringify({ action: "update", ...formData});
//     const resp = await axios.post(employeeService.EMPLOYEE_URL, body);
//     let json = await resp.data;
//     if (json) {
//       return json
//     }
//     return null;
//   } catch (error) {
//     console.log("Error fetching movie details:", error);
//     throw error;
//   }
// };

// export const UpdateEmployeeStatusService = async (val) => {
//   try {
//     const body = JSON.stringify({ action: "update_statusbyid",...val});
//     const resp = await axios.post(employeeService.EMPLOYEE_URL, body);
//     let json = await resp.data;
//     if (json) {
//       return json
//     }
//     return null;
//   } catch (error) {
//     console.log("Error fetching movie details:", error);
//     throw error;
//   }
// };


// export const DeleteEmployeeService = async (id) => {
//   try {
//     const body = JSON.stringify({ action: "delete", id});
//     const resp = await axios.post(employeeService.EMPLOYEE_URL, body);
//     let json = await resp.data;
//     if (json) {
//       return json
//     }
//     return null;
//   } catch (error) {
//     console.log("Error fetching movie details:", error);
//     throw error;
//   }
// };




