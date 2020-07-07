import * as server from "./server.constants";
import authHeader from "./auth.service";
import { handleResponse } from "./reusable.functions";


const addProduct = (product) => {
  

}

const createNewOrder = (orderData) => {
  const rawData = JSON.stringify(orderData);
  // create multi-row headers
  const multiHeader = new Headers(authHeader());
  multiHeader.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    body: rawData,
    headers: multiHeader,
  };
  // return ?
  fetch(`${server.API_URL}/orders/create`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      // remove old cart from local storage
      localStorage.removeItem("cartProducts");
      return data;
    })
    .catch((error) => console.log("frontend error", error));
};

export const cartService = {
  createNewOrder,
};
