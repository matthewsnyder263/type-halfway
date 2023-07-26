import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';

const InterestsForm = ({ user_id }) => {
  const { token } = useAuthContext;
  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState({});

//   useEffect(() => {
//     fetch("http://localhost:8000/api/interests")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => setInterests(data.interests))
//       .catch((error) => {
//         console.error("Error fetching interests:", error);
//       });

  //     fetch(`http://localhost:8000/api/users/${user_id}`)
  //       .then((response) => response.json())
  //       .then((data) => setSelectedInterests(data.interests));
  //   }, [user_id]);

  const navigate = useNavigate();


  useEffect(() => {
  async function fetchInterests() {
    const response = await fetch('http://localhost:8000/api/interests', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setInterests(data.interests);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  async function fetchUserInterests() {
    const response = await fetch(`http://localhost:8000/api/users/${user_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setSelectedInterests(data.interests);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  if (user_id && token) {
    fetchInterests();
    fetchUserInterests();
  } else {
    console.log('User is not logged in');
    navigate('/login');
  }
}, [user_id, navigate, token]);


  // useEffect(() => {
  //   async function fetchInterests() {
  //     const response = await fetch('http://localhost:8000/api/interests', {
  //       headers: {
  //         'Authorization': 'Bearer ${token}',
  //       },
  //     });

  //   if (!user_id) {
  //     console.log('User is not logged in');
  //     navigate('/login');
  //     return;
  //   }
  //   fetch("http://localhost:8000/api/interests")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => setInterests(data.interests))
  //     .catch((error) => {
  //       console.error("Error fetching interests:", error);
  //     });

  //   fetch(`http://localhost:8000/api/users/${user_id}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => setSelectedInterests(data.interests))
  //     .catch((error) => {
  //       console.error(`Error fetching user ${user_id} interests:`, error);
  //     });
  // }, [user_id, navigate]);

  const handleCheckboxChange = (event, interest) => {
    setSelectedInterests({
      ...selectedInterests,
      [interest.id]: event.target.checked ? interest : null,
    });
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  const selectedInterestsIds = Object.keys(selectedInterests)
    .filter(key => selectedInterests[key] !== null)
    .map(Number);

  await fetch(`http://localhost:8000/api/users/${user_id}/interests`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(selectedInterestsIds)
  });
  };


  return (
    user_id ? (
      <form onSubmit={handleSubmit}>
        {interests.map((interest) => (
          <div key={interest.id}>
            <label>
              <input
                type="checkbox"
                name={interest.id}
                checked={selectedInterests[interest.id !== undefined]}
                onChange={(event) => handleCheckboxChange(event, interest)}
              />
              {interest.interest_name}
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    ) : (
      <p>Please log in to view this form.</p>
    )
  );
};

export default InterestsForm;
