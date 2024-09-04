import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CalendarContext } from '../App';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, editEvent, deleteEvent } = useContext(CalendarContext);
  const event = events.find(e => e.id === parseInt(id));
  const [editing, setEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);

  if (!event) return <div>Event not found</div>;

  const handleEdit = () => {
    editEvent(event.id, editedEvent);
    setEditing(false);
  };

  const handleDelete = () => {
    deleteEvent(event.id);
    navigate('/');
  };

  const handleChange = (e) => {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
  };

  return (
    <EventContainer>
      {editing ? (
        <Form onSubmit={handleEdit}>
          <Input
            type="text"
            name="title"
            value={editedEvent.title}
            onChange={handleChange}
            required
          />
          <Input
            type="date"
            name="date"
            value={editedEvent.date}
            onChange={handleChange}
            required
          />
          <Select
            name="category"
            value={editedEvent.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </Select>
          <Button type="submit">Save</Button>
          <Button type="button" onClick={() => setEditing(false)}>Cancel</Button>
        </Form>
      ) : (
        <>
          <h2>{event.title}</h2>
          <p>Date: {event.date}</p>
          <p>Category: {event.category}</p>
          <Button onClick={() => setEditing(true)}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </>
      )}
    </EventContainer>
  );
};

const EventContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export default EventDetails;