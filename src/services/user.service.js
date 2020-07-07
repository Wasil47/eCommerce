import * as server from "./server.constants";
import authHeader from "./auth.service";
import { handleResponse } from "./reusable.functions";

const login = (login, password) => {
  const rawData = JSON.stringify({ login, password });
  const requestOptions = {
    method: "POST",
    body: rawData,
    headers: {
      "Content-Type": "application/json",
    },
  };
  // return ?
  fetch(`${server.API_URL}/user/login`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      // store jwt (login, token) in local storage
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    })
    .catch((error) => console.log("frontend error", error));
};

const logout = () => {
  // remove user token from local storage to log out
  localStorage.removeItem("user");
};

const getUserData = () => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  // return?
  fetch(`${server.API_URL}/user/authorized`, requestOptions)
    .then(handleResponse)
    .then((userData) => {
      return userData;
    })
    .catch((error) => console.log("frontend error", error));
};

const getUserOrders = (userId) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  // return?
  fetch(`${server.API_URL}/orders/${userId}`, requestOptions)
    .then(handleResponse)
    .then((orders) => {
      return orders;
    })
    .catch((error) => console.log("frontend error", error));
};

const getOrderDetails = (orderId) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  fetch(`${server.API_URL}/orders/details/${orderId}`, requestOptions)
    .then(handleResponse)
    .then((orderDetails) => {
      return orderDetails;
    })
    .catch((error) => console.log("frontend error", error));
};

export const userService = {
  login,
  logout,
  getUserData,
  getUserOrders,
};
