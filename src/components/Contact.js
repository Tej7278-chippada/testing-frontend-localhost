import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contact() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching the data:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default Contact;
