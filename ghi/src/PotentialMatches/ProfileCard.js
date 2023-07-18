import React from 'react';
import PropTypes from 'prop-types';
//import { Test } from './ProfileCard.styles';

const ProfileCard = (props) => (
    <div style={{ width: '300px', margin: '0 auto' }}>
        <div className="card">
            <img
                src={props.image}
                className="card-img-top"
                alt="Profile"
                style={{
                    width: "100%", // or any other size
                    height: "auto" // or any other size
                }}
            />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.bio}</p>
            </div>
            <div
                className="card-footer"
            // style={{ display: "flex", justifyContent: "space-between" }}
            >
                <small className="text-muted">{props.age} - </small>
                <small className="text-muted">{props.city}, {props.state}</small>
            </div>
        </div>
    </div>
);

ProfileCard.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
};

ProfileCard.defaultProps = {
};


export default ProfileCard;
