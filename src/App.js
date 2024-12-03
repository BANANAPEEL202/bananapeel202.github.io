import React, { useState } from 'react';
import '@mantine/core/styles.css'; // Import Mantine CSS directly
import { MantineProvider, Container, Button, Group, Text, Title, useMantineTheme } from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';  // Import Notifications and showNotification

const App = () => {
  const theme = useMantineTheme();
  const [currentMode, setCurrentMode] = useState('OFF');
  const [message, setMessage] = useState('');

  const modes = ['PARTY', 'PACIFICA', 'FIRE', 'WHITE', 'SANTA', 'OFF'];

  const sendModeRequest = async (action) => {
    try {
      // Send request using no-cors (response is opaque and cannot be accessed)
      const response = await fetch(`http://10.89.26.143/control?action=${action}`, {
        method: 'GET',
        mode: 'no-cors', // this is required for no-cors mode
      });

      // Update the state regardless of the response since no-cors prevents response access
      setCurrentMode(action);
      setMessage(`Set mode to ${action}`);  // Display a generic success message



    } catch (error) {
      console.log(error);
      setMessage('Error connecting to the server.');

      
    }
  };

  return (
    <MantineProvider theme={theme}>
      <Notifications /> {/* Add this to render notifications */}
      <Container size="xs" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width:'33%'}}>
        <Title order={2} style={{ marginBottom: '1rem' }}>
          Light Mode Controller
        </Title>

        <Group position="center" direction="column" spacing="sm"> 
          {modes.map((mode) => (
            <Button
              key={mode}
              onClick={() => sendModeRequest(mode)}
              variant={mode === currentMode ? 'filled' : 'light'}  // Change variant based on the currentMode
              color={mode === 'OFF' ? 'red' : 'blue'}  // Change color based on mode
              style={{ width: '100%' }}  // Optional: Make buttons fill the container width
            >
              {mode}
            </Button>
          ))}
        </Group>

        {message && (
          <Text size="sm" style={{ marginTop: '1rem' }}>
            {message}
          </Text>
        )}
      </Container>
    </MantineProvider>
  );
};

export default App;
