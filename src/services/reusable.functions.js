export const handleResponse = (response) => {
  const data = response.json();
  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    throw Error(error); // new Error ?
    // return Promise.reject(error);
  }
  return data;
};
