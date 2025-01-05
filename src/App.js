import '@mantine/core/styles.css';  // Ensure this is imported
import React, { useState } from 'react';
import { Container, Button, Group, Text, Title } from '@mantine/core';

const App = () => {
  const [currentMode, setCurrentMode] = useState('OFF');
  const [message, setMessage] = useState('');

  const modes = [
    { value: '🎉 PARTY', key: 'PARTY' },
    { value: '🌊 PACIFICA', key: 'PACIFICA' },
    { value: '🔥 FIRE', key: 'FIRE' },
    { value: '⬜️ WHITE', key: 'WHITE' },
    { value: '🎅 SANTA', key: 'SANTA' },
    { value: '❌ OFF', key: 'OFF' },
  ];

  const openLink = (action) => {
    try {
      // Open the link in a new tab
      window.open(`http://10.89.13.89/control?action=${action}`, '_blank');

      // Update the state
      setCurrentMode(action);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container size="xs" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '33%' }}>
      <Title order={2} style={{ marginBottom: '1rem' }}>
        Light Mode Controller
      </Title>

      <Group position="center" direction="column" spacing="sm">
        {modes.map((mode) => (
          <Button
            key={mode.key}
            onClick={() => openLink(mode.key)}
            variant={mode.key === currentMode ? 'filled' : 'light'}  // Change variant based on the currentMode
            color={mode.key === 'OFF' ? 'red' : 'blue'}  // Change color based on mode
            style={{ width: '100%' }}  // Optional: Make buttons fill the container width
          >
            {mode.value}
          </Button>
        ))}
      </Group>

      {message && (
        <Text size="sm" style={{ marginTop: '1rem' }}>
          {message}
        </Text>
      )}
    </Container>
  );
};

export default App;
