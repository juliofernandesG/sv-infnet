import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { v4 as uuidv4 } from 'uuid';

import { List, ListItem, ListItemText } from '@mui/material';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';
import Footer from '../components/Footer';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginBottom: '16px',
  width: '300px',
});

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activity, setActivity] = useState({ date: null, time: '', team: '', deadline: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState('');

  useEffect(() => {
    const loadEvents = async () => {
  try {
    const eventsRef = collection(firestore, 'events');
    const snapshot = await getDocs(eventsRef);
    const loadedEvents = snapshot.docs.map((doc) => {
      const data = doc.data();
      const start = data.start ? data.start.toDate() : null;
      const end = data.end ? data.end.toDate() : null;
      return {
        id: doc.id,
        title: data.title,
        start,
        end,
      };
    });
    setEvents(loadedEvents);
  } catch (error) {
    console.error('Error loading events:', error);
  }
};


    loadEvents();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedDate(null);
    setActivity({ date: null, time: '', team: '', deadline: '' });
  };

  const handleSaveActivity = () => {
    const eventsRef = collection(firestore, 'events');
    addDoc(eventsRef, {
      title: activity.team,
      start: activity.date,
      end: activity.date,
    })
      .then((docRef) => {
        const newEvent = {
          id: docRef.id,
          title: activity.team,
          start: activity.date,
          end: activity.date,
        };
        setEvents([...events, newEvent]);
        handleDialogClose();
      })
      .catch((error) => {
        console.error('Error adding activity:', error);
      });
  };

  const handleActivityInputChange = (event) => {
    setActivity((prevActivity) => ({
      ...prevActivity,
      [event.target.name]: event.target.value,
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (editMode) {
      // Atualizar tarefa existente
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editTodoId) {
          return { ...todo, text: todoText };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setEditMode(false);
      setEditTodoId('');
    } else {
      // Adicionar nova tarefa
      const newTodo = { id: uuidv4(), text: todoText };
      setTodos([...todos, newTodo]);
    }
    setTodoText('');
  };

  const handleEditTodo = (id, text) => {
    setEditMode(true);
    setEditTodoId(id);
    setTodoText(text);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <Navbar onMenuButtonClick={toggleSidebar} />
      <Sidebar open={isSidebarOpen} onClose={toggleSidebar} />
      <div style={{ padding: '16px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleDateSelect}
        />

        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Salvar atividade</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Data"
              type="date"
              value={moment(selectedDate).format('YYYY-MM-DD')}
              fullWidth
              disabled
            />
            <TextField
              margin="dense"
              label="Hora"
              type="time"
              name="time"
              value={activity.time}
              onChange={handleActivityInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Time"
              name="team"
              value={activity.team}
              onChange={handleActivityInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Data de entrega"
              type="date"
              name="deadline"
              value={activity.deadline}
              onChange={handleActivityInputChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSaveActivity} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>

        <Container>
          <Form onSubmit={handleAddTodo}>
            <TextField
              label="Todo"
              value={todoText}
              onChange={handleInputChange}
              required
            />
            <Button
              variant="contained"
              type="submit"
              startIcon={editMode ? <SaveIcon /> : null}
            >
              {editMode ? 'Salvar' : 'Adicionar'}
            </Button>
          </Form>
          <List>
            {todos.map((todo) => (
              <ListItem key={todo.id}>
                <ListItemText primary={todo.text} />
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditTodo(todo.id, todo.text)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default MyCalendar;
