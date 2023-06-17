import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import Navbar from './Navbar';
import Sidebar from './SideBar';
import Footer from './Footer';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activity, setActivity] = useState({ date: null, time: '', team: '', deadline: '' });

  useEffect(() => {
    const loadEvents = async () => {
      const eventsRef = collection(firestore, 'events');
      const snapshot = await getDocs(eventsRef);
      const loadedEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate(),
      }));
      setEvents(loadedEvents);
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

  return (
    <div>
      <Navbar onMenuButtonClick={() => {}} />
      <Sidebar />
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
              name="Time"
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
      </div>
      <Footer />
    </div>
  );
};

export default MyCalendar;
