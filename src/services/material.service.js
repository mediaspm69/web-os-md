import axios from "axios";
import { mtrService } from "../helpers/contents";

export const GetMaterialService = async (page,pageSize,role_Id,department_Id,employee_Id,days) => {
  try {
    const body = JSON.stringify({ action: "getlist_material" ,page,pageSize,role_Id,department_Id,employee_Id,days});
    const resp = await axios.post(mtrService.MTR_URL, body);
    let json = await resp.data;
    if (json && json.success) {
      return json
    }
    return null;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};

export const GetByIdMaterialService = async (id) => {
  try {
    const body = JSON.stringify({ action: "getbyid_material", id});
    const resp = await axios.post(mtrService.MTR_URL, body);
    let json = await resp.data;
    console.log('json',json)
    if (json && json.status === "200") {
      return json.data
    }
    return null;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};

export const InsertMaterialService = async (formData) => {
  try {
    const body = JSON.stringify({ action: "insert_material", ...formData});
    const resp = await axios.post(mtrService.MTR_URL, body);
    let json = await resp.data;
    if (json) {
      return json
    }
    return null;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};


export const UpdateMaterialService = async (formData) => {
  try {
    const body = JSON.stringify({ action: "update_material", ...formData});
     const resp = await axios.post(mtrService.MTR_URL, body);
    let json = await resp.data;
    if (json) {
      return json
    }
    return null;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};
