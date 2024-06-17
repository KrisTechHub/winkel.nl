import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import '../users/user.css'
import Login from './Login';
import FormOverlay from './FormOverlay';
import Register from './Register';


export default function Form() {
    const [swapPanel, setSwapPanel] = useState(false);
    // const [startDate, setStartDate] = useState(new Date());

    const signUpButton = () => {
      setSwapPanel(true);
    };
    const signInButton = () => {
      setSwapPanel(false);
    };
  
    return (
      <div className="container mx-auto form font-PoppinsLight">
        <div className={["container", swapPanel ? "right-panel-active" : null].filter(Boolean).join(" ")} id="container">
            
            {/* SIGN UP FORM */}
            <Register signUpButton={signUpButton} />

            {/* LOG IN FORM */}
            <Login signInButton={signInButton} />

            {/* OVERLAY */}
            <FormOverlay signInButton={signInButton} signUpButton={signUpButton}/>

        </div>
      </div>
    );
  }