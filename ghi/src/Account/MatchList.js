import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import useToken from '@galvanize-inc/jwtdown-for-react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import zipcodes from 'zipcodes';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

Modal.setAppElement('#root');


function MatchList() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { token } = useToken();
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    // const zipcodes = require('zipcodes');

    useEffect(() => {
        if (!token) {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                // navigate("/login");
            }
        }
    }, [navigate, token]);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            fetchCurrentUser();
            fetchAllUsers();
        }
    }, [token]);

    useEffect(() => {
        if (currentUser) {
            fetchMatches();
        }
    }, [currentUser]);

    const fetchAllUsers = async () => {
        const url = `http://localhost:8000/api/users`;
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            console.log('Fetching All User Response', response)
            const data = await response.json();
            setAllUsers(data.users);
        }
    };

    const fetchCurrentUser = async () => {
        const url = `http://localhost:8000/token`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            setCurrentUser(data.account);
        }
    };

    useEffect(() => {
        if (token) {
            fetchCurrentUser();
        }
    }, [token]);

    const fetchMatches = async () => {
        if (!currentUser) return;

        const matchUrl = `http://localhost:8000/users/${currentUser.id}/matches/`;
        const matchResponse = await fetch(matchUrl);
        if (matchResponse.ok) {
            const matchData = await matchResponse.json();
            setMatches(matchData.matches);
        }
    }

    useEffect(() => {
        if (currentUser) {
            fetchMatches();
        }
    }, [currentUser]);

    const openModal = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            borderRadius: '100px'
        }}>
            <Typography variant="h2" color="white" align="center" style={{ marginBottom: '20px' }}>Your Match Profile</Typography>
            <List sx={{ width: '200%', maxWidth: 960, bgcolor: 'transparent' }}>
                {matches.map((data, index) => {
                    const matchedUser = allUsers.find(user => user.id === data.matched_user);
                    if (!matchedUser) return null;
                    const matchedUserName = matchedUser ? matchedUser.full_name : 'Unknown User';
                    const distanceInMiles = zipcodes.distance(currentUser.zip_code, matchedUser.zip_code)
                    return (
                        <React.Fragment key={data.id}>
                            <Card sx={{ borderRadius: '10px', overflow: 'hidden', background: 'linear-gradient(to right, #fffbe7, #fffacb 50%)' }}>
                                <ListItem alignItems="flex-start" onClick={() => openModal(matchedUser)} sx={{ borderRadius: 15, overflow: 'hidden' }}>
                                    <ListItemAvatar>
                                        <Avatar alt={matchedUserName} src={matchedUser.picture} onClick={() => openModal(matchedUser)} style={{ cursor: 'pointer', width: '100px', height: '100px', margin: '2px' }} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={matchedUserName}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Distance: {distanceInMiles} miles
                                                </Typography>
                                                {" — Matched on: " + new Date(data.matched_date).toLocaleDateString()}
                                            </React.Fragment>
                                        }
                                    />
                                    <Button color="primary">Delete</Button>
                                    <Button variant="contained" color="secondary" onClick={() => navigate(`/chat/${matchedUser.id}`)}>Chat</Button>
                                </ListItem>
                            </Card>
                            {index !== matches.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                    );
                })}

                <Modal isOpen={modalOpen} onRequestClose={closeModal} contentLabel="User Detail" style={{
                    content: {
                        borderRadius: '30px',
                        width: '50%',
                        height: '50%',
                        margin: 'auto'
                    }
                }}>
                    {selectedUser && (
                        <div>
                            <img src={selectedUser.picture} alt={selectedUser.full_name} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
                            <h2>{selectedUser.full_name}</h2>
                            <p>{selectedUser.bio}</p>
                            <p>Age: {selectedUser.age}</p>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    )}
                </Modal>
            </List>
        </div >
    );
};

export default MatchList;
