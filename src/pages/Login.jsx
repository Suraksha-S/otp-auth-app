import React, { useEffect, useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (otpSent && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      alert('OTP expired. Please request a new one.');
      
    }
    return () => clearInterval(timer);
  }, [otpSent, timeLeft, navigate]);


const sendOtp = async () => {
  try {
    await axios.post('http://localhost:5000/send-otp', { email });
    setOtpSent(true);
    setTimeLeft(30);
    alert('OTP sent to your email.');
  } catch (error) {
    alert('Error sending OTP. Please try again.');
  }
};
  

  const verifyOtp = async () => {
    try {
      await axios.post('http://localhost:5000/verify-otp', { email, otp });
      alert('OTP verified successfully.');
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid OTP or OTP expired. Please try again.');
     
    }
  };

  return (
    <div className='login-container'>
      <div className='login-heading'>
        <h1>Analytics Dashboard</h1>
      </div>
      
      <div className='signIn-container'>
        <div className='signIn-box1'>
          

          <div className='signIn-form'>
          {/* <div className='signIn-heading'><h2>Sign In</h2></div> */}
          {!otpSent  ? (
        <>
        <div className='signIn-heading'><h2>Sign In</h2></div>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <button onClick={sendOtp} disabled={!email}>
            Send OTP
          </button>
          
          
        </>
      ) : (
        <>
         <div className='signIn-heading1'><h2>Enter Otp sent to Email</h2></div>
        <div className='signIn-form1'>
          
          
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className='resend'>
          {/* <button className='resend-btn' onClick={sendOtp} disabled={timeLeft > 0}> */}
           
            <p className='resend-btn' onClick={sendOtp} disabled={timeLeft > 0}>resend otp</p> 
          
          <p>{timeLeft}:00 sec</p>
          </div>
          <button onClick={verifyOtp}>Verify OTP</button>
          
        </div>

        </>
        
      )}
          </div>
          
        </div>


        <div className='signIn-box2'>
          <p >
            Web Application with Analytics Dashboard
          </p>
        </div>
      </div>
      <div className='login-Footer'>
        <p>&copy; 2025, Greendzine Technology Pvt Ltd. All Rights Reserved. </p>
      </div>

    </div>
  )
}

export default Login;

