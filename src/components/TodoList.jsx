import React, { useState } from 'react';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { v4 as uuidv4 } from 'uuid';

import { List, ListItem, ListItemText } from '@mui/material';

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

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState('');

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
    <>
      <Navbar />
      <Sidebar />
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
      <Footer />
    </>
  );
};

export default TodoList;
