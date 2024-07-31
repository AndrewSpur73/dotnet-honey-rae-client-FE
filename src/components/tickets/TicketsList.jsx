import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { completeServiceTicket, deleteServiceTicket, getServiceTickets } from "../../data/serviceTicketsData";
import { Link } from "react-router-dom";

export default function TicketsList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getServiceTickets().then(setTickets);
  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Delete this Ticket?");
    if(!isConfirmed){
      return;
    }

    deleteServiceTicket(id)
      .then(() => {
        setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== id))
      })
      .catch((error) => {
        console.error("Error deleting service ticket:", error);
      });
  }

  const handleComplete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to mark this service ticket as complete?");
    if (!isConfirmed) {
      return;
    }
  
    completeServiceTicket(id)
      .then(() => {
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === id ? { ...ticket, completed: true } : ticket
          )
        );
        window.location.reload();
        navigate("/servicetickets/");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error completing service ticket:", error);
      });
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Description</th>
          <th>Emergency?</th>
          <th>Date Completed</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={`ticket-${t.id}`}>
            <th scope="row">{t.id}</th>
            <td>{t.description}</td>
            <td>{t.emergency ? "yes" : "no"}</td>
            <td>{t.dateCompleted?.split("T")[0] || "Incomplete"}</td>
            <td>
              <Link to={`${t.id}`}>Details</Link>
              {" "}
              <Button color="danger" id="delete" onClick={() => handleDelete(t.id)}>
                Delete
              </Button>
              {t.dateCompleted === null && (
                <Button color="success" id="complete" onClick={() => handleComplete(t.id)}>
                  Mark Complete
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
