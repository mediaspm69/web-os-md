import axios from "axios";
import { jobService } from "../helpers/contents";

export const GetListJobService = async (page,pageSize,department_Id,role_Id) => {
  try {
    const body = JSON.stringify({ action: "getlist" ,page,pageSize,department_Id,role_Id});
    const resp = await axios.post(jobService.JOB_URL, body);
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

export const GetListJobHistoryByIdService = async (id) => {
  try {
    const body = JSON.stringify({ action: "getlistjobhistorybyid",id});
    const resp = await axios.post(jobService.JOB_URL, body);
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

export const GetByIdJobService = async (id) => {
  try {
    const body = JSON.stringify({ action: "getbyid", id});
    const resp = await axios.post(jobService.JOB_URL, body);
    let json = await resp.data;
    if (json && json.data) {
      return json.data
    }
    return null;
  } catch (error) {
    console.log("Error fetching movie details:", error);
    throw error;
  }
};

export const InsertJobService = async (formData) => {
  try {
    const body = JSON.stringify({ action: "insert", ...formData});
    const resp = await axios.post(jobService.JOB_URL, body);
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

export const InsertJobHistoryService = async (formData) => {
  try {
    const body = JSON.stringify({ action: "insertjobhistory", ...formData});
    const resp = await axios.post(jobService.JOB_URL, body);
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

export const UpdateJobService = async (formData) => {
  try {
    const body = JSON.stringify({ action: "update", ...formData});
    const resp = await axios.post(jobService.JOB_URL, body);
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

export const UpdateJobStatusService = async (job_Id,jobStatus_Id,recipient_Id,recipient_Name) => {
  try {
    const body = JSON.stringify({ action: "updatestatusbyid",job_Id,jobStatus_Id,recipient_Id,recipient_Name});
    const resp = await axios.post(jobService.JOB_URL, body);
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

export const DeleteJobService = async (id) => {
  try {
    const body = JSON.stringify({ action: "delete", id});
    const resp = await axios.post(jobService.JOB_URL, body);
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

export const RemoveIsShowService = async (id,isShow) => {
  try {
    const body = JSON.stringify({ action: "remove_isshow", id,isShow});
    const resp = await axios.post(jobService.JOB_URL, body);
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

export const ReportStatusListService = async () => {
  try {
    const body = JSON.stringify({ action: "reportStatusList" });
    const resp = await axios.post(jobService.JOB_URL, body);
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

export const ReportHistoryTimeService = async () => {
  try {
    const body = JSON.stringify({ action: "reporthistorytime" });
    const resp = await axios.post(jobService.JOB_URL, body);
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

export const ReportDepatrmentListService = async () => {
  try {
    const body = JSON.stringify({ action: "reportDepatrmentList" });
    const resp = await axios.post(jobService.JOB_URL, body);
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




