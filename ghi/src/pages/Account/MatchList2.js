import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Match from './Match';
import { useNavigate } from "react-router-dom";
import useToken from '@galvanize-inc/jwtdown-for-react';
import zipcodes from 'zipcodes';
import { Link } from 'react-router-dom';

function MatchList() {
    const { token } = useToken();
    const navigate = useNavigate();
    const [matches, setMatches] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
    const [allUsers, setAllUsers] = useState([]);

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

    return (
        <div>
            {matches.map((data) => {
                const matchedUser = allUsers.find(user => user.id === data.matched_user);
                if (!matchedUser) return null;
                const matchedUserName = matchedUser ? matchedUser.full_name : 'Unknown User';
                const userProfileUrl = `/profile/${matchedUser.id}`;
                const distanceInMiles = zipcodes.distance(currentUser.zip_code, matchedUser.zip_code)
                return (
                    <div key={data.id}>
                        <h1>Matched User Name: {matchedUserName}</h1>
                        <p>Distance: {distanceInMiles} miles away</p>
                        <a href={userProfileUrl}>View profile</a>
                        <Link to={`/chat/${data.matched_user}`}>Chat</Link>
                    </div>
                );
            })}
        </div>
    );
}

export default MatchList;








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Match from './Match';
// import { useNavigate } from "react-router-dom";
// import useToken from '@galvanize-inc/jwtdown-for-react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';

// function MatchList() {
//     const { token } = useToken();
//     const navigate = useNavigate();
//     const [matches, setMatches] = useState([]);
//     const [currentUser, setCurrentUser] = useState("");
//     const [allUsers, setAllUsers] = useState([]);

//     useEffect(() => {
//         if (!token) {
//             const storedToken = localStorage.getItem("token");
//             if (storedToken) {
//                 // navigate("/login");
//             }
//         }
//     }, [navigate, token]);

//     useEffect(() => {
//         if (token) {
//             localStorage.setItem("token", token);
//             fetchCurrentUser();
//             fetchAllUsers();
//         }
//     }, [token]);

//     useEffect(() => {
//         if (currentUser) {
//             fetchMatches();
//         }
//     }, [currentUser]);

//     const fetchAllUsers = async () => {
//         const url = `http://localhost:8000/api/users`;
//         const response = await fetch(url, {
//             method: "GET",
//             credentials: "include",
//         });
//         if (response.ok) {
//             console.log('Fetching All User Response', response)
//             const data = await response.json();
//             setAllUsers(data.users);
//         }
//     };

//     const fetchCurrentUser = async () => {
//         const url = `http://localhost:8000/token`;
//         const response = await fetch(url, {
//             method: "GET",
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//             },
//             credentials: "include",
//         });
//         if (response.ok) {
//             const data = await response.json();
//             setCurrentUser(data.account);
//         }
//     };

//     useEffect(() => {
//         if (token) {
//             fetchCurrentUser();
//         }
//     }, [token]);

//     const fetchMatches = async () => {
//         if (!currentUser) return;

//         const matchUrl = `http://localhost:8000/users/${currentUser.id}/matches/`;
//         const matchResponse = await fetch(matchUrl);
//         if (matchResponse.ok) {
//             const matchData = await matchResponse.json();
//             setMatches(matchData.matches);
//         }
//     }

//     useEffect(() => {
//         if (currentUser) {
//             fetchMatches();
//         }
//     }, [currentUser]);


//     return (
//         <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//             {matches.map((data, index) => {
//                 const matchedUser = allUsers.find(user => user.id === data.matched_user);
//                 if (!matchedUser) return null;
//                 const matchedUserName = matchedUser ? matchedUser.full_name : 'Unknown User';
//                 const userProfileUrl = `/profile/${matchedUser.id}`;

//                 return (
//                     <React.Fragment key={data.id}>
//                         <ListItem alignItems="flex-start">
//                             <ListItemAvatar>
//                                 <Avatar alt={matchedUserName} src={matchedUser.picture} />
//                             </ListItemAvatar>
//                             <ListItemText
//                                 primary={matchedUserName}
//                                 secondary={
//                                     <React.Fragment>
//                                         <Typography
//                                             sx={{ display: 'inline' }}
//                                             component="span"
//                                             variant="body2"
//                                             color="text.primary"
//                                         >
//                                             {matchedUserName}
//                                         </Typography>
//                                         {" — I'll be in your neighborhood doing errands this…"}
//                                     </React.Fragment>
//                                 }
//                             />
//                         </ListItem>
//                         {index !== matches.length - 1 && <Divider variant="inset" component="li" />}
//                     </React.Fragment>
//                 );
//             })}
//         </List>
//     );
// }

// export default MatchList;
