import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useAppDispatch } from "../../app/hooks";
import { useLoginUserMutation } from '../../features/userLogique/signUp';
import {jwtDecode} from 'jwt-decode'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userExist } from '../../features/userLogique/userCridentials';
import { type UserIDJwtPayload } from 'jwt-decode';
import { type UserToken,type ErrorMessage } from '../../features/userLogique/signUp';
export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  
    const [loginUserMutation, { isLoading: isGettingtoken }] = useLoginUserMutation();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    function loginUser(e: string, p: string) {
      const userCridentials = {
        email: e,
        password: p,
      };
      console.log(userCridentials);
      loginUserMutation(userCridentials)
        .unwrap()
        .then((payload) => handleSuccessUserCreation(payload))
        .catch((error) => handleErrorInUserCreation(error));
    }
  
    function handleSuccessUserCreation(payload:UserToken) {
      toast.success('Logged in', {
        position: "top-right",
        autoClose: 5000,
      });
      localStorage.setItem('authTokens', JSON.stringify(payload));
      const token:UserIDJwtPayload= jwtDecode(JSON.stringify(payload)); 
      dispatch(userExist(token.first_name));
      navigate('/');
    }
  
    function handleErrorInUserCreation(error:ErrorMessage) {
      toast.error(error.data.detail, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      loginUser(email, password);
    };
  return (
    <section className="section section-shaped section-lg">
      <div className="shape shape-style-1 bg-gradient-default">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="container pt-lg-7">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="card bg-secondary shadow border-0">
              <div className="card-header bg-white pb-5">
                <div className="text-muted text-center mb-3">
                  <small>Sign in with</small>
                </div>
                <div style={{ display: 'flex',justifyContent:"space-around", gap: '6rem' }}>
                    <button
                        style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#DB4437', // Google red
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        }}
                    >
                        <GoogleIcon style={{ marginRight: '0.5rem' }} />
                        Google
                    </button>
                    <button
                        style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#1877F2', 
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        }}
                    >
                        <FacebookIcon style={{ marginRight: '0.5rem' }} />
                        Facebook
                    </button>
                    </div>
              </div>
              <div className="card-body px-lg-5 py-lg-5">
        <div className="text-center text-muted mb-4">
          <small>Or sign in with credentials</small>
        </div>
        <form role="form" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <div className="input-group input-group-alternative">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="ni ni-email-83"></i>
                </span>
              </div>
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group focused">
            <div className="input-group input-group-alternative">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="ni ni-lock-circle-open"></i>
                </span>
              </div>
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="custom-control custom-control-alternative custom-checkbox">
            <input className="custom-control-input" id="customCheckLogin" type="checkbox" />
            <label className="custom-control-label" htmlFor="customCheckLogin">
              <span>Remember me</span>
            </label>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary my-4" disabled={isGettingtoken}>
              {isGettingtoken ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <a href="#" className="text-light">
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="col-6 text-right">
                <a href="/register" className="text-light">
                  <small>Create new account</small>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
