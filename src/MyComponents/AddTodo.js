import React, { useState } from 'react';
import song1 from './song1.mp3';
import song2 from './song2.mp3';
import song3 from './song3.mp3';

// Component to select songs from local storage playlist
const SongSelector = ({ onSelectSong }) => {
    // Sample playlist data stored in local storage
    const playlistData = [
        { title: "Song 1", url: song1 },
        { title: "Song 2", url: song2 },
        { title: "Song 3", url: song3 }
    ];

    // Function to handle song selection
    const handleSongSelect = (e) => {
        const selectedSongUrl = e.target.value;
        onSelectSong(selectedSongUrl);
    };

    return (
        <div>
            <h3 style={{color:'white'}}>Select a Song</h3>
            <select onChange={handleSongSelect}>
                <option value="">Select a song</option>
                {playlistData.map((song, index) => (
                    <option key={index} value={song.url}>{song.title}</option>
                ))}
            </select>
        </div>
    );
};


export const AddTodo = ({ addTodo }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectedSong, setSelectedSong] = useState("");
    const [showPopup, setShowPopup] = useState(false); // State variable for popup visibility

    const submit = (e) => {
        e.preventDefault();
        if (!title || !desc || !startDate || !endDate || !startTime || !endTime) {
            alert("Title, Description, Start Date, End Date, Start Time, or End Time cannot be blank");
        } else if (new Date(`${startDate}T${startTime}`) >= new Date(`${endDate}T${endTime}`)) {
            alert("End Date and Time cannot be earlier than Start Date and Time");
        } else {
            addTodo(title, desc, startDate, endDate, startTime, endTime, selectedSong);
            setTitle("");
            setDesc("");
            setStartDate("");
            setEndDate("");
            setStartTime("");
            setEndTime("");
            setSelectedSong("");
            setShowPopup(true); // Show popup when todo is added
            setTimeout(() => {
                setShowPopup(false); // Hide popup after 2 seconds
            }, 2000);
        }
    };

    return (
        <div className="container my-3" style={{ backgroundColor: 'black', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)' }}>
            <h3 style={{color:'white'}}>Add a Todo</h3>
            <form onSubmit={submit} className="row">
                <div className="col-12">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label" style={{ color: 'white' }}>Todo Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" aria-describedby="emailHelp" />
                    </div>
                </div>
                <div className="col-12">
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label" style={{ color: 'white' }}>Todo Description</label>
                        <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" id="desc" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="startDate" className="form-label" style={{ color: 'white' }}>Start Date</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="form-control" id="startDate" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="endDate" className="form-label" style={{ color: 'white' }}>End Date</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="form-control" id="endDate" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="startTime" className="form-label" style={{ color: 'white' }}>Start Time</label>
                        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="form-control" id="startTime" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="endTime" className="form-label" style={{ color: 'white' }}>End Time</label>
                        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="form-control" id="endTime" />
                    </div>
                </div>
                <div className="col-12">
                    <SongSelector onSelectSong={setSelectedSong} />
                    <br />
                </div>
                
                <div className="col-12">
                    <button type="submit" className="btn btn-sm btn-success">Add Todo</button>
                </div>
            </form>
            {/* Popup to show "Todo added successfully" */}
            {showPopup && (
                <div className="alert alert-success mt-3" role="alert">
                    Todo added successfully
                </div>
            )}
        </div>
    );
};
