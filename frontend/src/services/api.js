// Placeholder for api service
export const api = {};

// Set your backend IP here. Use your system's local IP address so other devices on the same WiFi can access it.
// Use localhost for local dev, otherwise use current hostname (for LAN access)
const API_BASE_URL = "https://edutrack-app-kep0.onrender.com";

export async function registerUser({ email, password, role }) {
  const res = await fetch(`${API_BASE_URL}/api/register/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function registerStudent(studentData) {
  const res = await fetch(`${API_BASE_URL}/api/register/student`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.text();
}

export async function registerTeacher(teacherData) {
  const res = await fetch(`${API_BASE_URL}/api/register/teacher`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teacherData),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.text();
}

export async function checkEmailExists(email) {
  const res = await fetch(
    `${API_BASE_URL}/api/register/check-email?email=${encodeURIComponent(
      email
    )}`
  );
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function login({ email, password }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function checkAadhaarExists(aadhaar) {
  const res = await fetch(
    `${API_BASE_URL}/api/register/check-aadhaar?aadhaar=${encodeURIComponent(
      aadhaar
    )}`
  );
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function checkEmployeeIdExists(employeeId) {
  const res = await fetch(
    `${API_BASE_URL}/api/register/check-employee-id?employeeId=${encodeURIComponent(
      employeeId
    )}`
  );
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}
