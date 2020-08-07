import axios from "axios";
const BASE_URL = "http://localhost:3000";
const ENDPOINTS = {
  CUSTOMERS: "/api/customers",
  CUSTOMERS_BY_PAGE: "/api/customers/page/",
};

const getAllCustomers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${ENDPOINTS.CUSTOMERS}`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
const getCustomersByPage = async ({ skip = 0, count = 10 }: any) => {
  try {
    return await axios.get(
      `${BASE_URL}${ENDPOINTS.CUSTOMERS_BY_PAGE}${skip}/${count}`
    );
  } catch (err) {
    console.log(err);
  }
};
export { getAllCustomers, getCustomersByPage };
