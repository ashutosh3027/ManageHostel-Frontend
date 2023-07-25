import React, { useState } from 'react';
import '../../assets/css/forgetPassword.css';
import authServices from "../../services/authServices";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from 'react-toastify';
export default function ForgetPassword() {
  // State variables
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Functions used by the screen components
  const doRequestPasswordReset = async function () {
    // Note that this value come from state variables linked to your text input
    const emailValue = email;
    try {
      setIsSending(true);
      await authServices.forgotPassword(emailValue);
      setEmail('')
      setIsSending(false);
      toast.success("Email sent successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
        draggable: true
      });
    }
    catch (error) {
      setIsSending(false);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Server Error';
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        draggable: true,
      });
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
          <p class="button-43" role="button" onClick={() => doRequestPasswordReset()}> {isSending ? <PulseLoader color={"#f5b921"} size={10} loading={isSending} /> : `Reset Password`}</p>
        </div>
      </div>
    </div>
  );
};