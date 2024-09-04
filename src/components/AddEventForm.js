import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CalendarContext } from '../App';

const AddEventForm = () => {
  const [event, setEvent] = useState({ title: '', date: '', category: '' });
  const { addEvent } = useContext(CalendarContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(event);
    navigate('/');
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="title"
        value={event.title}
        onChange={handleChange}
        placeholder="Event Title"
        required
      />
      <Input
        type="date"
        name="date"
        value={event.date}
        onChange={handleChange}
        required
      />
      <Select
        name="category"
        value={event.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
      </Select>
      <Button type="submit">Add Event</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
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

export default AddEventForm;