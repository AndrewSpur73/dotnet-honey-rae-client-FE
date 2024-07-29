import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createServiceTicket, getCustomers, getEmployees } from "../../data/serviceTicketsData";
import { Button, FormGroup, Input, Label, Form } from "reactstrap";


export default function CreateTicket() {
  const navigate = useNavigate();
  const [serviceTicketData, setServiceTicketData] = useState({
    customerId: "",
    employeeId: "",
    description: "",
    emergency: false,
  });

  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getCustomers().then((customerData) => setCustomers(customerData));
    getEmployees().then((employeeData) => setEmployees(employeeData));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setServiceTicketData({
      ...serviceTicketData,
      [name]: inputValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createServiceTicket(serviceTicketData)
      .then((newTicket) => {
        console.log("New service ticket created:", newTicket);
        navigate("/tickets/");
      })
      .catch((error) => {
        console.error("Error creating service ticket:", error);
      });
  };

  const handleCancel = () => {
    navigate("/tickets/")
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="customerId">Customer</Label>
        <Input
          type="select"
          name="customerId"
          id="customerId"
          onChange={handleInputChange}
          value={serviceTicketData.customerId}
          >
            <option value="" disabled>Select a Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </Input>
      </FormGroup>
      <FormGroup>
        <Label for="employeeId">Employee</Label>
        <Input
          type="select"
          name="employeeId"
          id="employeeId"
          onChange={handleInputChange}
          value={serviceTicketData.employeeId}
        >
          <option value="" disabled>Select an employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          type="text"
          name="description"
          id="description"
          onChange={handleInputChange}
          value={serviceTicketData.description}
        />
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="emergency"
            onChange={handleInputChange}
            checked={serviceTicketData.emergency}
          />{" "}
          Emergency
        </Label>
      </FormGroup>
      <Button id="submit-ticket" type="submit">Submit Service Ticket</Button>

      <Button id="cancel-ticket" type="button" onClick={handleCancel}>Cancel Service Request</Button>
    </Form>
  )
}
