import axios from "axios";
import { mtrService } from "../helpers/contents";

export const GetMtrReqService = async (page,pageSize,role_Id,department_Id,employee_Id,days) => {
  try {
    const body = JSON.stringify({ action: "getlist" ,page,pageSize,role_Id,department_Id,employee_Id,days});
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

export const GetByIdMtrReqService = async (id) => {
  try {
    const body = JSON.stringify({ action: "getbyid", id});
    const resp = await axios.post(mtrService.MTR_URL, body);
    let json = await resp.data;
    if (json && json.status === "200") {
      return json.data
    }
    return null;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};

export const InsertMtrReqService = async (formData) => {
  try {
    const body = JSON.stringify({ action: "insert", ...formData});
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

export const UpdateMtrReqService = async (formData) => {
  try {
    const body = JSON.stringify({ action: "update", ...formData});
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

export const UpdateMtrReqStatusService = async (formData) => {
  try {
    const body = JSON.stringify({ action: "update_status",...formData});
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

export const GetMRHistoryService = async (id) => {
  try {
    const body = JSON.stringify({ action: "get_mrhistory", id});
    const resp = await axios.post(mtrService.MTR_URL, body);
    let json = await resp.data;
    if (json && json.status === "200") {
      return json.data
    }
    return null;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};
