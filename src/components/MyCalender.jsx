import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { firestore } from '../config/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore'; // Import the required functions

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activity, setActivity] = useState({ date: null, time: '', team: '', deadline: '' });

  useEffect(() => {
    // Load events from Firebase or any other data source
    const loadEvents = async () => {
      // Example code to load events from Firebase
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
    // Save activity to Firebase or any other data source
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
    <div style={{ height: '100vh' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleDateSelect}
      />

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Save Activity</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Date"
            type="date"
            value={moment(selectedDate).format('YYYY-MM-DD')}
            fullWidth
            disabled
          />
          <TextField
            margin="dense"
            label="Time"
            type="time"
            name="time"
            value={activity.time}
            onChange={handleActivityInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Team"
            name="team"
            value={activity.team}
            onChange={handleActivityInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Deadline"
            type="date"
            name="deadline"
            value={activity.deadline}
            onChange={handleActivityInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveActivity} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyCalendar;
