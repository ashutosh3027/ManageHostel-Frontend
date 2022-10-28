import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import '../../assets/css/forgetPassword.css';
import authServices from "../../services/authServices";
import PulseLoader from "react-spinners/PulseLoader";
export default function ForgetPassword() {
  // State variables
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Functions used by the screen components
  const doRequestPasswordReset = async function () {
    // Note that this value come from state variables linked to your text input
    const emailValue = email;
    try{
        setIsSending(true);
        await authServices.forgotPassword(emailValue);
        toast.success("Email has been sent successfully!!")
        setEmail('')
        setIsSending(false);
      }
      catch (error) {
        setIsSending(false);
        toast.error("Something went wrong!!");
      }   
  };

  return (
    <div>
      <div className="forgetPassword-container">
        <h2 className="heading">{'Reset Password'}</h2>
        <p>Enter your email address below and we'll send you a link to reset your password.</p>
        <div className="form_wrapper">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your account email"
            className="form_input"
          />
        </div>
        <div className="form_buttons">
        <button class="button-43" role="button"  onClick={() => doRequestPasswordReset()}> {isSending?<PulseLoader color={"#f5b921"} size={10} loading={isSending} />: `Reset Password`}</button>
        <Toaster position="top-right" />
        </div>
      </div>
    </div>
  );
};