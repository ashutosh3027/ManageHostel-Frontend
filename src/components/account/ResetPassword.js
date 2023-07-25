import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import './../../assets/css/resetPassword.css'
import AuthServices from './../../services/authServices'
import { useUser } from './../../context/userContext'
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import { Button } from 'react-bootstrap';
export default function ResetPassword(props) {
    const { token } = useParams()
    const { setUserState } = useUser()
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [userStateIsUpdatedSuccessfully, setUserStateIsUpdatedSuccessfully] = useState(false);
    const [state, setState] = useState({
        password: "",
        cPassword: ""
    });
    const [passMatch, setPassMatch] = useState(true);
    const validatePassword = () => {
        state.password === state.cPassword
            ? setPassMatch(true)
            : setPassMatch(false);
    };
    useEffect(() => {
        validatePassword();
    }, [state])
    useEffect(() => {
        (async () => {
            try {
                await AuthServices.isValid(token);
                setIsValid(true);
                setIsLoading(false);
            } catch (error) {
                setIsValid(false);
                setIsLoading(false);
            }
        })()
        props.setIsResetPasswordRoute(true)
    }, [])
    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };
    const handleSubmit = async (e) => {
        setIsUpdating(true);
        try {

            e.preventDefault();
            const data = await AuthServices.resetPassword(state.password, state.cPassword, token);
            setUserState(data);
            toast.success("Password  Changed Successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
                draggable: true
            });
            setState({ password: "", cPassword: "" });
            setUserStateIsUpdatedSuccessfully(true);
            setIsUpdating(false)
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Server Error';
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                draggable: true,
            });
            setIsUpdating(false)
        }
    }
    const handleClick = ()=>{
        setUserStateIsUpdatedSuccessfully(true);
        props.setIsResetPasswordRoute(false)
    }
    // Redirect to '/' if the user state is updated successfully
    if (userStateIsUpdatedSuccessfully) {
        return <Navigate to="/" />;
    }
    if (isLoading) {
        return null;
    }
    if (!isValid) {
        return (
            <div className="invalid-page">
                <h1 className='text-center'>Invalid Token</h1>
                <Button variant="primary" onClick={handleClick}>Go To ManageHostels</Button>{' '}
            </div>
        )
    }
    return (
        <div className="resetPass-page">

            <h1 className='text-center'>Reset Password</h1>
            <div class="form">
                <label className='text-left label'>Password</label>
                <input
                    aria-label="Password"
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={state.password}
                    onChange={handleChange}
                    aria-required="true"
                />
                <label className='text-left label'>Confirm Password</label>
                <input
                    aria-label="Confirm Password"
                    type="password"
                    className={`form-control ${passMatch ? "" : "input-error-border"}`}
                    id="cPassword"
                    placeholder="Confirm Password"
                    value={state.cPassword}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={passMatch ? true : false}
                />

                {state.password !== state.cPassword ? <div className="input-error">
                    {state.password !== state.cPassword ? "" : ""}
                    <div className="input-error">
                        {passMatch ? "" : "Error: Passwords do not match"}
                    </div>
                </div> : null}

                <button aria-label="Reset Password" onClick={handleSubmit} disabled={isUpdating}>{isUpdating ? <PulseLoader color={"#0a138b"} size={10} /> : "Submit"}</button>
            </div>
        </div>
    )
}
