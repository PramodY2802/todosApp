import React, { useEffect, useState } from 'react';
import img from './img.png';
import sound from './song1.mp3';

const Todo = ({ todo1, onDelete }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [songAudio, setSongAudio] = useState(null);

  useEffect(() => {
    const checkTime = setInterval(() => {
      const currentTime = new Date();
      const startTime = new Date(todo1.startDate + ' ' + todo1.startTime);
      const endTime = new Date(todo1.endDate + ' ' + todo1.endTime);
      
      if (currentTime >= startTime && currentTime <= endTime) {
        setShowPopup(true);

        if (Notification.permission === 'granted') {
          // Show notification when the current time is within the specified time range
          new Notification('Todo Notification', {
            body: `It's time for ${todo1.title}`,
            icon: img // Replace with the path to your icon image
          });
        } else {
          // Ask for permission if not granted
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              new Notification('Todo Notification', {
                body: `It's time for ${todo1.title}`,
                icon: img // Replace with the path to your icon image
              });
            }
          });
        }

        // Play the selected song
        if (todo1.selectedSong && !songAudio) {
          const audio = new Audio(todo1.selectedSong);
          audio.play().catch(error => {
            console.error('Failed to play selected song:', error);
          });
          setSongAudio(audio);
        }
      }
    }, 60000); // Check every minute

    return () => {
      clearInterval(checkTime);
      if (songAudio) {
        songAudio.pause();
        setSongAudio(null);
      }
    };
  }, [todo1, songAudio]);

  const handlePopupOk = () => {
    setShowPopup(false);
    if (songAudio) {
      songAudio.pause();
      setSongAudio(null);
    }
  };

  return (
    <div style={{ background:'white', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
      <h4>{todo1.title}</h4>
      <p>{todo1.desc}</p>
      <p><strong>Start Date:</strong> {todo1.startDate}</p>
      <p><strong>End Date:</strong> {todo1.endDate}</p>
      <p><strong>Start Time:</strong> {todo1.startTime}</p>
      <p><strong>End Time:</strong> {todo1.endTime}</p>
      {todo1.selectedSong && (
        <div>
          <strong>Selected Song:</strong>
          <audio controls>
            <source src={todo1.selectedSong} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      {showPopup && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: '999', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#fff', width: '400px', maxHeight: '80%', overflowY: 'auto', padding: '20px', borderRadius: '5px', textAlign: 'center', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)' }}>
            <h2 style={{ marginBottom: '10px', color: 'red' }}>{todo1.title}</h2>
            <p style={{ color: 'red' }}>It's time for {todo1.title}!!!!!</p>
            <button style={{ backgroundColor: 'green', color: '#fff', border: 'none', width: '70%', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }} onClick={handlePopupOk}>OK</button>
          </div>
        </div>
      )}
      <button style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px' }} onClick={() => onDelete(todo1)}>Delete</button>
    </div>
  );
};

export default Todo;
