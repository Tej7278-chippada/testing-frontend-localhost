import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Contact() {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    fname: '',
    sname: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    axios.get('/api')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching the data:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('http://localhost:5000/send-email', formData);
      const response = await axios.post('https://backend-demo-2-156a59c3faa0.herokuapp.com/send-email', formData);
      if (response.status === 200) {
        setStatus('Email sent successfully!');
        setFormData({ fname: '', sname: '', email: '', message: '' });
      }
    } catch (error) {
      setStatus('Failed to send email.');
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="App">
      <h1>{message}</h1>
      <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            name="fname"
            id="name"
            value={formData.fname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            name="sname"
            id="name"
            value={formData.sname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Send</button>
      </form>
      {status && <p>{status}</p>}
    </div>
    </div>
  );
}

export default Contact;
