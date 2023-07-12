import React, { useState, useEffect } from "react";

const InterestsForm = () => {
  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/api/interests")
      .then((response) => response.json())
      .then((data) => setInterests(data.interests));
  }, []);

  const handleCheckboxChange = (event) => {
    setSelectedInterests({
      ...selectedInterests,
      [event.target.name]: event.target.checked,
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
              checked={selectedInterests[interest.id || false]}
              onChange={handleCheckboxChange}
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
