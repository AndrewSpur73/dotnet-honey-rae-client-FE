const _apiUrl = "/api/customers";

export const getCustomers = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

export const getCustomer = (id) => {
  const apiUrlWithId = `${_apiUrl}/${id}`;
  return fetch(apiUrlWithId).then((r) => r.json());
};
