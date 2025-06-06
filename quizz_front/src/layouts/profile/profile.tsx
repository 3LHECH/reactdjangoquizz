import React, { useContext, useEffect, useState } from 'react';
import person from '../../assets/template/assets/img/pages/mohamed.jpg';
import AuthContext from '../../utils/AuthContext/AuthContext';
import {
  useGetOneUserMutation,
  useUpdateUserMutation,
  type User,
  type UserCreateUpdate
} from '../../features/userLogique/signUp';
import { toast } from 'react-toastify';

const Profile: React.FC = () => {
  const user = useContext(AuthContext);
  const [userProfileData] = useGetOneUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [userData, setUserData] = useState<User | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<Partial<UserCreateUpdate>>({
    email: '',
    first_name: '',
    last_name: '',
    profession: '',
    bio: '',
    birth_date: '',
    profile_picture: undefined
  });

  useEffect(() => {
    if (user?.user?.id) {
      userProfileData(user.user.id)
        .unwrap()
        .then((payload) => {
          setUserData(payload);
          setUpdatedUser({
            email: payload.email,
            first_name: payload.first_name,
            last_name: payload.last_name,
            profession: payload.profession,
            bio: payload.bio || '',
            birth_date: payload.birth_date || '',
            profile_picture: undefined
          });
        })
        .catch((err) => console.error('Error fetching user:', err));
    }
  }, [user, userProfileData]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const formPayload = {
      id: userData?.id,
      email: updatedUser.email,
      password: userData?.password,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      profession: updatedUser.profession,
      bio: updatedUser.bio,
      birth_date: updatedUser.birth_date,
      profile_picture: updatedUser.profile_picture instanceof File ? updatedUser.profile_picture : undefined
  };

  const cleanedPayload = Object.fromEntries(
      Object.entries(formPayload).filter(([, value]) => value !== undefined)
  ) as UserCreateUpdate;
  updateUser(cleanedPayload)
  .unwrap()
  .then((updated) => {
      setUserData(updated);
      setShowUpdateForm(false);
      handleSuccessUserCreation();
  })
  .catch(() => {
    handleErrorInUserCreation();
  });
  };
    function handleSuccessUserCreation() {
      toast.success('profile Updated', {
        position: "top-right",
        autoClose: 5000,
      });
    }
  
    function handleErrorInUserCreation() {
      toast.error("there is an error", {
        position: "top-right",
        autoClose: 5000,
      });
    }

  return (
    <div className="wrapper">
      <section className="section-profile-cover section-shaped my-0">
        <img className="bg-image" src={person} style={{ width: '100%' }} alt="Profile Cover" />
        <div className="separator separator-bottom separator-skew">
          <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polygon className="fill-secondary" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>

      <section className="section bg-secondary">
        <div className="container">
          <div className="card card-profile shadow mt--300">
            <div className="px-4">
              <div className="text-center">
                <div className="card-profile-image" style={{ marginTop: '-75px' }}>
                  {userData && (
                    <img
                      src={userData.profile_picture}
                      className="rounded-circle"
                      alt="Profile"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                  )}
                </div>
                <div className="card-profile-actions py-4 mt-3">
                  <button className="btn btn-sm btn-info mr-2">Connect</button>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => setShowUpdateForm(true)}
                  >
                    Update
                  </button>
                </div>
              </div>

              <div className="text-center mt-3">
                <h3>{userData?.first_name} {userData?.last_name}</h3>
                <div className="h6 font-weight-300">
                  <i className="ni location_pin mr-2"></i> {userData?.profession}
                </div>
              </div>

              <div className="mt-5 py-5 border-top text-center">
                <div className="row justify-content-center">
                  <div className="col-lg-9">
                    <p>{userData?.bio}</p>
                  </div>
                </div>
              </div>

              {showUpdateForm && (
                <form onSubmit={handleUpdate} className="text-center mb-4">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={updatedUser.first_name}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, first_name: e.target.value })}
                    className="form-control mb-2"
                  />

                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={updatedUser.last_name}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, last_name: e.target.value })}
                    className="form-control mb-2"
                  />

                  <label className="form-label">Profession</label>
                  <input
                    type="text"
                    placeholder="Profession"
                    value={updatedUser.profession}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, profession: e.target.value })}
                    className="form-control mb-2"
                  />

                  <label className="form-label">Bio</label>
                  <textarea
                    placeholder="Bio"
                    value={updatedUser.bio}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, bio: e.target.value })}
                    className="form-control mb-2"
                  />

                  <label className="form-label">Birth Date</label>
                  <input
                    type="date"
                    value={updatedUser.birth_date}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, birth_date: e.target.value })}
                    className="form-control mb-2"
                  />

                  <label className="form-label">Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setUpdatedUser({ ...updatedUser, profile_picture: file });
                      }
                    }}
                    className="form-control mb-2"
                  />

                  <button type="submit" className="btn btn-success mr-2">Save</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowUpdateForm(false)}>Cancel</button>
                </form>
              )}

            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        {/* footer code unchanged */}
      </footer>
    </div>
  );
};

export default Profile;
