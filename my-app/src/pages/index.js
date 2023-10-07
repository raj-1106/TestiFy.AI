import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/App.module.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() !== '') {
      try {
        const response = await getResponseFromServer(userInput);
        handleResponse(response);
        setUserInput('');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const getResponseFromServer = async (userInput) => {
    try {
      const response = await axios.post('http://localhost:3001/get-response', {
        userInput: userInput,
      });
      return response.data.response;
    } catch (error) {
      console.error('Error:', error);
      return 'Error fetching response';
    }
  };

  const handleResponse = (response) => {
    setChatLog([...chatLog, { sender: 'Bot', message: response }]);
  };

  return (
    <div>
      <div className={styles.aboveContainer}>
        <h1><strong class="left-margin">TestiFy.AI</strong></h1>
        <p>Ensure that Your Answer Is Right</p>
      </div>
      <div className={styles.container}>
        <div className={styles.chatContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.chatMessages}>
              {chatLog.map((chat, index) => (
                <div key={index} className={styles.chatMessage}>
                  <strong>{chat.sender}:</strong> {chat.message}
                </div>
              ))}
            </div>
            <div>
              <textarea
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your message"
                className={styles.textarea}
              ></textarea>
            </div>
            <div>
              <button type="submit" className={styles.button}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;