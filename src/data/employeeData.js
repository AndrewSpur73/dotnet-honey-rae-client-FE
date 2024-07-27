const _apiUrl = "/api/employees";

export const getEmployees = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

export const getEmployee = (id) => {
  const apiUrlWithId = `${_apiUrl}/${id}`;
  return fetch(apiUrlWithId).then((r) => r.json());
};
