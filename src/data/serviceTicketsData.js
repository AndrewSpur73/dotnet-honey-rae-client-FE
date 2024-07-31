const _apiUrl = "/api/servicetickets";
const _customersUrl = "/api/customers";
const _employeesUrl = "/api/employees";

export const getCustomers = async () => {
  const response = await fetch(_customersUrl);

  if (!response.ok) {
    throw new Error("Error fetching customer data");
  }

  return response.json();
};

export const getEmployees = async () => {
  const response = await fetch(_employeesUrl);

  if (!response.ok) {
    throw new Error("Error fetching employee data");
  }

  return response.json();
};

export const getServiceTickets = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

export const getServiceTicket = (id) => {
  const apiUrlWithId = `${_apiUrl}/${id}`;
  return fetch(apiUrlWithId).then((r) => r.json());
}

export const createServiceTicket = async (serviceTicketData) => {
const response = await fetch(_apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(serviceTicketData),
})
if (!response.ok) {
  throw new Error("Error creating service ticket");
}
return response.json();
};

export const deleteServiceTicket = async (id) => {
  const apiUrlWithId = `${_apiUrl}/${id}`;

  try {
    const response = await fetch(apiUrlWithId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error deleting service ticket");
    }

    console.log("Service ticket deleted successfully");
  } catch (error) {
    console.error("Error deleting service ticket:", error);
    throw error;
  }
};

export const completeServiceTicket = async (id) => {
  const apiUrlWithId = `${_apiUrl}/${id}/complete`;

  try {
    const response = await fetch(apiUrlWithId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response:", response);

    if (!response.ok) {
      throw new Error("Error completing service ticket");
    }

    console.log("Service ticket marked as complete successfully");
  } catch (error) {
    console.error("Error completing service ticket:", error);
    throw error;
  }
};

export const assignEmployeeToTicket = async (ticketId, employeeId) => {
  const apiUrlWithId = `${_apiUrl}/${ticketId}/assign`;

  try {
    const response = await fetch(apiUrlWithId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employeeId: employeeId }),
    });

    if (!response.ok) {
      throw new Error("Error assigning employee to ticket");
    }

    console.log("Employee assigned to ticket successfully");
  } catch (error) {
    console.error("Error assigning employee to ticket:", error);
    throw error;
  }
};

export const getAvailableEmployees = async () => {
  try {
    const response = await fetch(_employeesUrl);

    if (!response.ok) {
      throw new Error("Error fetching employee data");
    }

    const allEmployees = await response.json();

    return allEmployees;
  } catch (error) {
    console.error("Error in getAvailableEmployees:", error);
    throw error;
  }
};
