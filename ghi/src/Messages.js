import React, { useState, useEffect, useCallback } from "react";
import useToken from '@galvanize-inc/jwtdown-for-react';
import { useParams } from 'react-router-dom';


function Messages() {
    let { id } = useParams();
    const { token } = useToken();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [matchedUser, setMatchedUser] = useState(null);

    const fetchMatchedUser = async () => {
        const url = `http://localhost:8000/api/users/${id}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Data:", data);
            setMatchedUser(data);
            // setMatchedUser(data.user);
            console.log('After fetching matchedUser:', matchedUser);
            console.log('Matched User:', data);
            if (data && currentUser) {
                fetchMessages();
            }
        } else {
            console.log('Response Status:', response.status);
        }
    }


    useEffect(() => {
        if (token) {
            fetchMatchedUser();
        }
    }, [token, id]);

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
            console.log("Data:", data);
            setCurrentUser(data.account);
            console.log(data);
            if (data.account && matchedUser) {
                fetchMessages();
            }

        }
    };


    useEffect(() => {
        if (token) {
            fetchCurrentUser();
        }
    }, [token]);



    const fetchMessages = useCallback(async () => {
        const response = await fetch(`http://localhost:8000/api/messages/${currentUser.id}/${matchedUser.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log("Data:", data);
        setMessages(data.messages);
    }, [currentUser, matchedUser, token]);


    useEffect(() => {
        console.log('In useEffect with matchedUser as a dependency:', matchedUser);
        if (currentUser && matchedUser) {
            fetchMessages();
        }
    }, [matchedUser, currentUser]);



    const handleMessageChange = (event) => {
        setNewMessage(event.target.value);
    }

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        console.log('currentUser:', currentUser);
        console.log('matchedUser:', matchedUser);
        console.log('newMessage:', newMessage);
        if (!currentUser || !matchedUser) {
            window.alert('Cannot send message. Invalid user information.');
            return;
        }
        console.log('In handleMessageSubmit, matchedUser is:', matchedUser);

        console.log('About to make fetch call to send message');
        const response = await fetch('http://localhost:8000/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                sender_id: currentUser.id,
                receiver_id: matchedUser.id,
                message: newMessage,
            }),
        });
        if (!response.ok) {
            console.error('Error sending message:', response.status, response.statusText);
            return;
        }
        const data = await response.json();
        setMessages([...messages, data]);
        setNewMessage('');
    }


    const handleMessageDelete = async (messageId) => {
        const response = await fetch(`http://localhost:8000/api/messages/${messageId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error('Error deleting message:', response.status, response.statusText);
            return;
        }

        setMessages(messages.filter((message) => message.id !== messageId));
    }



    return (
        <div>
            <h2>Messages</h2>
            {messages.map((message) => (
                <div key={message.id}>
                    <p>{message.message}</p>
                    <button onClick={() => handleMessageDelete(message.id)}>Delete</button>
                </div>
            ))}
            <form onSubmit={handleMessageSubmit}>
                <input type="text" value={newMessage} onChange={handleMessageChange} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
export default Messages;
