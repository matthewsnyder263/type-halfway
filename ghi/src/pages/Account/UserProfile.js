import React from 'react';
import { Link } from 'react-router-dom';
import './ProfilePage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '@galvanize-inc/jwtdown-for-react';

const UserProfile = () => {
    const [matchedUser, setMatchedUser] = useState('');
    const navigate = useNavigate();
    const { token } = useToken();

    useEffect(() => {
        if (token) {
            const storedUser = JSON.parse(localStorage.getItem('matchedUser'))
            setMatchedUser(storedUser)
        }
    }, [])
    // useEffect(() => {
    //     localStorage.removeItem('matchedUser')
    // }, [navigate])

    return (
        <>
            <div className="row py-5 px-4">
                <div className="col-md-9 mx-auto">
                    <div className="profile-widget bg-white shadow rounded overflow-hidden">
                        <div className="px-4 pt-0 pb-4 cover">
                            <div className="media align-items-end profile-head">
                                <div className="profile mr-3">
                                    <img
                                        src="https://picsum.photos/200"
                                        alt="..."
                                        // width="130"
                                        style={{
                                            width: "auto",
                                            height: "auto"
                                        }}
                                        className="rounded mb-2 img-thumbnail"
                                    />
                                </div>
                                <div className="media-body mb-5 text-white">
                                    <h4 className="mt-0 mb-0"> Name: {matchedUser.username}</h4>
                                    <h4 className="mt-0 mb-0"> Age: {matchedUser.age}</h4>
                                    <h4 className="mt-0 mb-0">MBTI: {matchedUser.mbti}</h4>
                                    <h4 className="mt-0 mb-0">Gender: {matchedUser.gender}</h4>
                                    <h4 className="mt-0 mb-0">Interests: {matchedUser.interest}</h4>
                                    <p className="small mb-4">
                                        <i className="fas fa-map-marker-alt mr-2"></i>
                                        {matchedUser.city}, {matchedUser.state}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 py-3">
                            <h5 className="mb-0">Bio:</h5>
                            <div className="p-4 rounded shadow-sm bg-light">
                                <p className="font-italic mb-0">{matchedUser.bio}</p>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-secondary">
                                View My Likes
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default UserProfile;
