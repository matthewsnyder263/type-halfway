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
    // b/c our list of mutual likes can get really long, we can split them into separate pages
    // using pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { token } = useToken();
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    // const zipcodes = require('zipcodes');


    // const handlePageChange = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // };

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
            console.log('Fetching Match Data', matchData)
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



    async function deleteMatch(matchId) {
        const url = `http://localhost:8000/matches/${matchId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error('Error deleting match:', response.status, response.statusText);
            return;
        }

        fetchMatches();
    }
    const sortedMatches = matches.sort((a, b) => new Date(b.match_timestamp) - new Date(a.match_timestamp));
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedMatches.slice(indexOfFirstItem, indexOfLastItem)

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
                {currentItems.map((data, index) => {
                    // matchedUserId & matchedUser stops you from seeing yourself in matches
                    const matchedUserId = data.logged_in_user === currentUser.id ? data.matched_user : data.logged_in_user;
                    const matchedUser = allUsers.find(user => user.id === matchedUserId);
                    if (!matchedUser) return null;
                    const matchedDate = new Date(data.match_timestamp);
                    const matchedDateString = isNaN(matchedDate.getTime()) ? "Unknown date" : matchedDate.toLocaleDateString();
                    const matchedUserName = matchedUser ? matchedUser.username : 'Unknown User';
                    const distanceInMiles = zipcodes.distance(currentUser.zip_code, matchedUser.zip_code)

                    return (
                        <React.Fragment key={data.id}>
                            <Card sx={{ borderRadius: '10px', overflow: 'hidden', background: 'linear-gradient(to right, #fffbe7, #fffacb 50%)' }}>
                                <ListItem alignItems="flex-start" onClick={() => openModal(matchedUser)} sx={{ borderRadius: 15, overflow: 'hidden' }}>
                                    <ListItemAvatar>
                                        <Avatar alt={matchedUserName} src={matchedUser.picture} onClick={() => openModal(matchedUser)} style={{ cursor: 'pointer', width: '100px', height: '100px', margin: '2px' }} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                                {matchedUserName}
                                            </Typography>
                                        }
                                    />
                                    <Box sx={{ position: 'absolute', bottom: '35px', left: '130px' }}>***MBTI STRENGTH HERE***</Box>
                                    <Box sx={{ position: 'absolute', bottom: '10px', left: '120px' }}>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Distance: {distanceInMiles} miles
                                        </Typography>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {" — Matched on: " + matchedDateString}
                                        </Typography>
                                    </Box>
                                    <Button onClick={(event) => { event.stopPropagation(); deleteMatch(data.id); }} style={{
                                        backgroundColor: 'rgba(225, 75, 180, 0.62',
                                        color: 'rgba(255, 0, 0, 0.87)',
                                        border: '2px solid white',
                                        borderRadius: '5em',
                                        boxShadow: '100em 100em 100em rgba(200, 75, 150, 0.5)',
                                        fontWeight: 'bold',
                                        fontFamily: 'ui-rounded'
                                    }}>Unmatch</Button>
                                    <Button variant="contained" color="secondary" onClick={() => navigate(`/chat/${matchedUser.id}`)}>Chat</Button>
                                </ListItem>
                            </Card>
                            {index !== matches.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                    );
                })}

                <Modal
                    isOpen={modalOpen}
                    onRequestClose={closeModal}
                    contentLabel="User Detail"
                    style={{
                        overlay: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        content: {
                            borderRadius: '30px',
                            width: '50%',
                            height: '50%',
                            margin: 'auto',
                            background: 'linear-gradient(to right, #fffbe7, #fffacb 50%)',
                            position: 'relative',
                        }
                    }}
                >
                    {selectedUser && (
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Button
                                onClick={closeModal}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                }}
                            >
                                X
                            </Button>

                            <img src={selectedUser.picture} alt={selectedUser.full_name} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />

                            <h2>{selectedUser.full_name}</h2>

                            <p>{selectedUser.bio}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <p><b>Age:</b> {selectedUser.age}</p>
                                    <p><b>Gender:</b> {selectedUser.gender}</p>
                                    <p><b>MBTI:</b> {selectedUser.mbti}</p>
                                </div>

                                <div>
                                    <p><b>ZIP Code:</b> {selectedUser.zip_code}</p>
                                    <p><b>Interests:</b> {selectedUser.interest}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </List>
            <Button sx={{ fontSize: '15px', fontWeight: 'bold' }} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(matches.length / itemsPerPage)}>Next</Button>
            <Button sx={{ fontSize: '15px', fontWeight: 'bold' }} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
        </div >
    );
};

export default MatchList;
