import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';

function TaskForm({ onSave, initialTask }) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [dueDate, setDueDate] = useState(initialTask?.due_date || '');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError(null);
    await onSave({ title, description, due_date: dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>{initialTask ? 'Edit Task' : 'Add Task'}</Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField
          id="task-title"
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          inputProps={{ 'data-testid': 'title-input' }}
        />
        <TextField
          id="task-description"
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiline
          minRows={2}
          inputProps={{ 'data-testid': 'description-input' }}
        />
        <TextField
          id="task-due-date"
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ 'data-testid': 'due-date-input' }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Box display="flex" gap={2}>
          <Button type="submit" variant="contained" color="primary" data-testid="submit-task">
            {initialTask ? 'Save' : 'Add'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default TaskForm;
