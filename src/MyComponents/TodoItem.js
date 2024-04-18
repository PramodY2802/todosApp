import React, { useState, useEffect } from 'react';
import img from './img.png';

export const TodoItem = ({ todo, onDelete }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [songAudio, setSongAudio] = useState(null);

    useEffect(() => {
        const checkTime = setInterval(() => {
            const currentTime = new Date();
            const startTime = new Date(todo.startDate + ' ' + todo.startTime);
            const endTime = new Date(todo.endDate + ' ' + todo.endTime);

            if (currentTime >= startTime && currentTime <= endTime) {
                setShowPopup(true);

                if (Notification.permission === 'granted') {
                    // Show notification when the current time is within the specified time range
                    new Notification('Todo Notification', {
                        body: `It's time for ${todo.title}`,
                        icon: img // Replace with the path to your icon image
                    });
                } else {
                    // Ask for permission if not granted
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            new Notification('Todo Notification', {
                                body: `It's time for ${todo.title}`,
                                icon: img // Replace with the path to your icon image
                            });
                        }
                    });
                }

                // Play the selected song
                if (todo.selectedSong && !songAudio) {
                    const audio = new Audio(todo.selectedSong);
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
    }, [todo, songAudio]);

    const handlePopupOk = () => {
        setShowPopup(false);
        if (songAudio) {
            songAudio.pause();
            setSongAudio(null);
        }
    };

    return (
        <div style={{ background:'white', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
            <h4>{todo.title}</h4>
            <p>{todo.desc}</p>
            <p><strong>Start Date:</strong> {todo.startDate}</p>
            <p><strong>End Date:</strong> {todo.endDate}</p>
            <p><strong>Start Time:</strong> {todo.startTime}</p>
            <p><strong>End Time:</strong> {todo.endTime}</p>
            {todo.selectedSong && (
                <div>
                    <strong>Selected Song:</strong>
                    <audio controls>
                        <source src={todo.selectedSong} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
            {showPopup && (
                <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: '999', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#fff', width: '80%', padding: '20px', borderRadius: '5px', textAlign: 'center', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)' }}>
                        <h2>{todo.title}</h2>
                        <p>It's time for {todo.title}!</p>
                        <button style={{ backgroundColor: 'green', color: '#fff', width: '60%', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }} onClick={handlePopupOk}>OK</button>
                    </div>
                </div>
            )}
            <button style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px' }} onClick={() => onDelete(todo)}>Delete</button>
        </div>
    );
};
