import React, { useState, useEffect } from 'react';
import {
  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Typography, Box, CircularProgress, Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TaskList({ onEdit }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed })
      });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper elevation={2} sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6" gutterBottom>Tasks</Typography>
      <List>
        {tasks.length === 0 && <Typography>No tasks found.</Typography>}
        {tasks.map((task) => (
          <ListItem key={task.id} divider secondaryAction={
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => onEdit(task)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          }>
            <Checkbox
              edge="start"
              checked={!!task.completed}
              onChange={() => handleToggleComplete(task)}
              inputProps={{ 'aria-label': 'Mark task complete' }}
            />
            <ListItemText
              primary={<span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#9e9e9e' : undefined }}>{task.title}</span>}
              secondary={task.description}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default TaskList;
