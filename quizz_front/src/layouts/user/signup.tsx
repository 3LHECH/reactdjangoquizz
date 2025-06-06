import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useCreateUserMutation } from '../../features/userLogique/signUp'; // Adjust import path!
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { type ErrorMessage } from '../../features/userLogique/signUp';

export default function SignUp() {
    const [createUser, { isLoading, isError, error }] = useCreateUserMutation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',  
        profession: '',
        bio: '',
        birth_date: '',
        profile_picture: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target;
        if (name === 'profile_picture' && files) {
            setFormData({ ...formData, profile_picture: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
            toast.error('Please fill in all required fields (First Name, Last Name, Email, Password).');
            return;
        }

        if (formData.password !== formData.confirm_password) {
            toast.error('Passwords do not match.');
            return;
        }

        const userPayload = { ...formData };

        try {
            await createUser(userPayload).unwrap()
                .then(() => handleSuccessUserCreation())
                .catch((error) => handleErrorInUserCreation(error));
        } catch (err) {
            console.error('Failed to create user:', err);
        }
    };

    function handleSuccessUserCreation() {
        toast.success('User created successfully!', {
            position: "top-right",
            autoClose: 5000,
            theme: "dark",
        });
        navigate('/login');
    }

    function handleErrorInUserCreation(error: ErrorMessage) {
        toast.error(error.data.detail || 'An error occurred.', {
            position: "top-right",
            autoClose: 5000,
            theme: "dark",
        });
    }

    return (
        <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
                {[...Array(8)].map((_, i) => <span key={i}></span>)}
            </div>
            <div className="container pt-lg-7">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card bg-secondary shadow border-0">
                            <div className="card-header bg-white pb-5">
                                <div className="text-muted text-center mb-3"><small>Sign up with</small></div>
                                <div style={{ display: 'flex', justifyContent: "space-around", gap: '6rem' }}>
                                    <button style={btnStyle('#DB4437')}>
                                        <GoogleIcon style={{ marginRight: '0.5rem' }} /> Google
                                    </button>
                                    <button style={btnStyle('#1877F2')}>
                                        <FacebookIcon style={{ marginRight: '0.5rem' }} /> Facebook
                                    </button>
                                </div>
                            </div>
                            <div className="card-body px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <small>Or sign up with credentials</small>
                                </div>
                                <form role="form" onSubmit={handleSubmit}>
                                    <InputField name="first_name" placeholder="First Name" icon="ni-hat-3" value={formData.first_name} onChange={handleChange} />
                                    <InputField name="last_name" placeholder="Last Name" icon="ni-hat-3" value={formData.last_name} onChange={handleChange} />
                                    <InputField name="email" placeholder="Email" icon="ni-email-83" type="email" value={formData.email} onChange={handleChange} />
                                    <InputField name="password" placeholder="Password" icon="ni-lock-circle-open" type="password" value={formData.password} onChange={handleChange} />
                                    <InputField name="confirm_password" placeholder="Confirm Password" icon="ni-lock-circle-open" type="password" value={formData.confirm_password} onChange={handleChange} />
                                    <InputField name="profession" placeholder="Profession" icon="ni-briefcase-24" value={formData.profession} onChange={handleChange} />
                                    <TextAreaField name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} />
                                    <InputField name="birth_date" placeholder="Birth Date" type="date" icon="ni-calendar-grid-58" value={formData.birth_date} onChange={handleChange} />
                                    <div className="form-group">
                                        <label>Profile Picture</label>
                                        <input type="file" name="profile_picture" onChange={handleChange} className="form-control" />
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary mt-4" disabled={isLoading}>
                                            {isLoading ? 'Creating account...' : 'Create account'}
                                        </button>
                                    </div>
                                    {isError && <p className="text-danger mt-2">Error: {JSON.stringify(error)}</p>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const InputField = ({ name, placeholder, icon, type = 'text', value, onChange }) => (
    <div className="form-group">
        <div className="input-group input-group-alternative mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={`ni ${icon}`}></i>
                </span>
            </div>
            <input className="form-control" name={name} placeholder={placeholder} type={type} value={value} onChange={onChange} />
        </div>
    </div>
);

const TextAreaField = ({ name, placeholder, value, onChange }) => (
    <div className="form-group">
        <textarea className="form-control" name={name} placeholder={placeholder} value={value} onChange={onChange} rows={3} />
    </div>
);

const btnStyle = (bgColor: string) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    backgroundColor: bgColor,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
});
