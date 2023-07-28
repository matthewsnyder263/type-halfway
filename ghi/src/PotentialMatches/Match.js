// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import zipcodes from 'zipcodes';
// import { useParams } from 'react-router-dom';
// import useToken from '@galvanize-inc/jwtdown-for-react';

// function Match() {
//     const { token } = useToken();
//     const { matchId, matched_user } = useParams();
//     const [match, setMatch] = useState();
//     const [matchedUser, setMatchedUser] = useState({});
//     const [currentUser, setCurrentUser] = useState({});
//     const [error, setError] = useState(null);

//     const matchIdNumber = Number(matchId);

//     useEffect(() => {
//         const fetchMatchAndUser = async () => {
//             try {
//                 console.log(`Fetching match for ID: ${matchIdNumber}`);  // NEW
//                 const matchResponse = await axios.get(`/matches/${matchIdNumber}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 console.log(`Fetched match data: ${JSON.stringify(matchResponse.data)}`);  // NEW

//                 console.log(`Fetching user for ID: ${matched_user}`);  // NEW
//                 const userResponse = await axios.get(`/users/${matched_user}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 console.log(`Fetched user data: ${JSON.stringify(userResponse.data)}`);  // NEW

//                 setMatch(matchResponse.data);
//                 setMatchedUser(userResponse.data);

//                 const currentUser = JSON.parse(localStorage.getItem('user'));
//                 if (currentUser) {
//                     console.log(`Fetching current user for ID: ${currentUser.id}`);  // NEW
//                     const currentUserResponse = await axios.get(`/users/${currentUser.id}`, {
//                         headers: {
//                             'Authorization': `Bearer ${token}`
//                         }
//                     });
//                     console.log(`Fetched current user data: ${JSON.stringify(currentUserResponse.data)}`);  // NEW

//                     setCurrentUser(currentUserResponse.data);
//                 }
//             } catch (error) {
//                 console.error(`Error occurred: ${error}`);  // NEW
//                 setError(error.message);
//             }
//         };

//         fetchMatchAndUser();
//     }, [matched_user, matchIdNumber, token]);

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!match) {
//         return null;
//     }

//     const { id, match_timestamp } = match;
//     const { name, picture, zip_code: matchedUserZipCode } = matchedUser;
//     const { zip_code: currentUserZipCode } = currentUser;

//     const distanceInMiles = zipcodes.distance(currentUserZipCode, matchedUserZipCode);

//     return (
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} >
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <img src={picture} alt={name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
//                 <div>
//                     <div>{name}</div>
//                     <small>{distanceInMiles} miles away</small>
//                 </div>
//             </div>
//             <div>
//                 <div>{new Date(match_timestamp).toLocaleDateString()}</div>
//                 <Link to={`/chat/${id}`}>Chat</Link>
//             </div>
//         </div >
//     );
// }

// export default Match;
