import React, { useState, createContext, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Calendar3D from './components/Calendar3D';
import AddEventForm from './components/AddEventForm';
import EventDetails from './components/EventDetails';

export const CalendarContext = createContext();

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const App = () => {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents([...events, { ...event, id: Date.now() }]);
  };

  const editEvent = (id, updatedEvent) => {
    setEvents(events.map(event => event.id === id ? { ...updatedEvent, id } : event));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <CalendarContext.Provider value={{ events, addEvent, editEvent, deleteEvent }}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <h1>3D Animated Calendar</h1>
          <nav>
            <StyledLink to="/">Calendar</StyledLink>
            <StyledLink to="/add-event">Add Event</StyledLink>
          </nav>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Calendar3D />} />
              <Route path="/add-event" element={<AddEventForm />} />
              <Route path="/event/:id" element={<EventDetails />} />
            </Routes>
          </Suspense>
        </AppContainer>
      </Router>
    </CalendarContext.Provider>
  );
};

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const StyledLink = styled(Link)`
  margin-right: 10px;
  text-decoration: none;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
`;

export default App;