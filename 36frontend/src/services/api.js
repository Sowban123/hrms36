import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 🔥 REQUIRED for session auth
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================
// 🔐 CSRF INTERCEPTOR
// ==========================
api.interceptors.request.use(
  (config) => {
    const csrfToken = getCookie("csrftoken");
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================
// 🍪 COOKIE HELPER
// ==========================
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// ==========================
// 🔐 AUTH APIs (SESSION)
// ==========================
export const authAPI = {
  login: (username, password) =>
    api.post("/api/accounts/login/", { username, password }),
  logout: () => api.post("/api/accounts/logout/"),
  getCurrentUser: () => api.get("/api/accounts/current-user/"),
};

// ==========================
// 📊 DASHBOARD APIs
// ==========================
export const dashboardAPI = {
  getDashboard: () => api.get("/api/dashboard/"),
  getStats: () => api.get("/api/dashboard/stats/"),
};

// ==========================
// 👥 EMPLOYEE APIs
// ==========================
export const employeeAPI = {
  create: (data) => api.post("/api/employees/create/", data),
  getList: () => api.get("/api/employees/list/"),
  update: (id, data) => api.put(`/api/employees/detail/${id}/`, data),
  delete: (id) => api.delete(`/api/employees/detail/${id}/`),
  getDepartments: () => api.get("/api/employees/departments/"),
  getDesignations: () => api.get("/api/employees/designations/"),
  getPendingProfiles: () => api.get("/api/employees/pending-profiles/"),
  approveProfile: (profileId) => api.post(`/api/employees/approve-profile/${profileId}/`),
};

// ==========================
// 👤 EMPLOYEE PROFILE APIs
// ==========================
export const profileAPI = {
  get: () => api.get("/api/employees/profile/"),
  update: (data) => api.put("/api/employees/profile/", data),
};

// ==========================
// 🕒 ATTENDANCE APIs
// ==========================
export const attendanceAPI = {
  getToday: () => api.get("/api/attendance/today/"),
  checkIn: () => api.post("/api/attendance/check-in/"),
  checkOut: () => api.post("/api/attendance/check-out/"),
  getMonthly: (month, year) => api.get(`/api/attendance/monthly/?month=${month}&year=${year}`),
  getManagerTeam: () => api.get("/api/attendance/manager-team/"),
};

// ==========================
// 🏖 LEAVE APIs
// ==========================
export const leaveAPI = {
  apply: (data) => api.post("/api/leaves/apply/", data),
  getList: () => api.get("/api/leaves/list/"),
  getAdminList: () => api.get("/api/leaves/admin/list/"),
  approve: (id) => api.post(`/api/leaves/admin/approve/${id}/`),
  reject: (id) => api.post(`/api/leaves/admin/reject/${id}/`),
  getManagerList: () => api.get("/api/leaves/manager/list/"),
  managerApprove: (id) => api.post(`/api/leaves/manager/approve/${id}/`),
  managerReject: (id) => api.post(`/api/leaves/manager/reject/${id}/`),
};

// ==========================
// 💰 PAYROLL APIs
// ==========================
export const payrollAPI = {
  generate: (data) => api.post("/api/payroll/generate/", data),
  getList: (month, year) => {
    let url = "/api/payroll/list/";
    const params = [];
    if (month) params.push(`month=${month}`);
    if (year) params.push(`year=${year}`);
    if (params.length > 0) url += `?${params.join("&")}`;
    return api.get(url);
  },
  getDetail: (id) => api.get(`/api/payroll/detail/${id}/`),
  getEmployeesForPayroll: () => api.get("/api/payroll/employees/"),
};

export default api;
