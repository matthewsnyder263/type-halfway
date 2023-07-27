import React from 'react';
import PropTypes from 'prop-types';
//import { Test } from './ProfileCard.styles';

const ProfileCard = (props) => (
    <div
        style={{
            width: "300px",
            margin: "0 auto",
            boxShadow: "5px 5px 15px rgb(255, 175, 204)",
            transition: "0.3s",
            borderRadius: '30px',
            overflow: 'hidden'
        }}
    >
        <div className="card">
            <img
                src={props.picture}
                className="card-img-top"
                alt="Profile"
                style={{
                    width: "100%",
                    height: "auto"
                }}
            />
            <div style={{ padding: "10px 0 0 4px" }}>
                <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>{props.full_name}</h2>
            </div>
            <div
                className="card-footer"
                style={{
                    display: "flex",
                    // justifyContent: "space-between",
                    fontSize: "18px",
                    // borderTop: "1px solid #ddd",
                    paddingTop: "10px",
                    padding: '4px'
                }}
            >
                <h5 className="text-muted">{props.age} - </h5>
                <h5 className="text-muted">
                    {props.mbti}, {props.zip_code}
                </h5>
            </div>
        </div>
    </div>
);


ProfileCard.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
    mbti: PropTypes.string.isRequired,
    zip_code: PropTypes.string.isRequired,
};

ProfileCard.defaultProps = {
};


export default ProfileCard;
