import React, { useState } from 'react';

function EmailForm() {
  const [form, setForm] = useState({ to: '', subject: '', text: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setStatus('Email sent successfully!');
      } else {
        setStatus('Failed to send email.');
      }
    } catch (error) {
      setStatus('Error sending email.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="to"
        placeholder="Recipient Email"
        value={form.to}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
        required
      />
      <textarea
        name="text"
        placeholder="Message"
        value={form.text}
        onChange={handleChange}
        required
      />
      <button type="submit">Send Email</button>
      <div>{status}</div>
    </form>
  );
}

export default EmailForm;