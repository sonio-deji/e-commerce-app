import axios from "axios";

const BASE_URL = "https://jsstore-api.herokuapp.com/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2E5YzBiYmVhOWE0ZjE5ZTk2MWEyMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NDc5Mzk4NSwiZXhwIjoxNjY1MDUzMTg1fQ.rSTcWA4IrpjDtWWrJ_81LzrPIfAZo8WGEOK-F38od_w";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
