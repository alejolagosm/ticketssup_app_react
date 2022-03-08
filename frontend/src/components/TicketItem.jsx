import React from 'react';
import { Link } from 'react-router-dom';

function TicketItem({ ticket }) {
  return (
    <div className="ticket">
      <p>{new Date(ticket.createdAt).toLocaleString('en-us')}</p>
      <p>{ticket.product}</p>
      <div className={`status status-${ticket.status}`}>
        <p>{ticket.status}</p>
      </div>
      <Link to={`/ticket/${ticket._id}`} className="btn btn-reversed btn-sm">
        View
      </Link>
    </div>
  );
}

export default TicketItem;
