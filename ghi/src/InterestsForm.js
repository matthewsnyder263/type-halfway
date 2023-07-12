import React, { useState, useEffect } from "react";

const InterestsForm = ({ user_id }) => {
  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState({});

  //   useEffect(() => {
  //     fetch("http://localhost:8000/api/interests")
  //       .then((response) => response.json())
  //       .then((data) => setInterests(data.interests));

  //     fetch(`http://localhost:8000/api/users/${user_id}`)
  //       .then((response) => response.json())
  //       .then((data) => setSelectedInterests(data.interests));
  //   }, [user_id]);

  useEffect(() => {
    fetch("http://localhost:8000/api/interests")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setInterests(data.interests))
      .catch((error) => {
        console.error("Error fetching interests:", error);
      });

    fetch(`http://localhost:8000/api/users/${user_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setSelectedInterests(data.interests))
      .catch((error) => {
        console.error(`Error fetching user ${user_id} interests:`, error);
      });
  }, [user_id]);

  const handleCheckboxChange = (event, interest) => {
    setSelectedInterests({
      ...selectedInterests,
      [interest.id]: event.target.checked ? interest : null,
    });
  };

  return (
    <form>
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
  );
};

export default InterestsForm;
