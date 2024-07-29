import { Link, Outlet } from "react-router-dom";

export default function ServiceTickets() {
  return (
    <>
      <h2>Service Tickets</h2>
      <Link to="/tickets/create">Add a Service Ticket</Link>
      <Outlet />
    </>
  );
}
