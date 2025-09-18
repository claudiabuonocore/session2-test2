import React, { useState } from 'react';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

function App() {
  const [editingTask, setEditingTask] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = async (task) => {
    if (editingTask) {
      // Edit existing task
      await fetch(`/api/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      setEditingTask(null);
    } else {
      // Add new task
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
    }
    setRefreshKey(k => k + 1);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            TODO App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <TaskForm onSave={handleSave} initialTask={editingTask} />
          <TaskList key={refreshKey} onEdit={setEditingTask} />
        </Box>
      </Container>
    </>
  );
}

export default App;