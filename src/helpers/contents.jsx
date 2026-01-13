

export const employeeService = {
  EMPLOYEE_URL: `https://script.google.com/macros/s/${import.meta.env.VITE_EMPLOYEE_BEARERTOKEN}/exec`,
};

export const jobService = {
  JOB_URL: `https://script.google.com/macros/s/${import.meta.env.VITE_JOB_BEARERTOKEN}/exec`,
};

export const removeAllStorage = async () => {
  let keys = ["empId","empCode","empUsername","empRole"];
  keys.forEach((k) => localStorage.removeItem(k));
  return;
};

export const removeStorage = async (key) => {
  localStorage.removeItem(key);
  return;
};

// Local Storage
export const setStorage = (key, value) => localStorage.setItem(key, value);
export const getStorage = (key) => localStorage.getItem(key);
