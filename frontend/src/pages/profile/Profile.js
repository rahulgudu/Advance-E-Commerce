import React, { useEffect, useState } from "react";
import "./profile.scss";
import PageMenu from "../../components/pageMenu/PageMenu";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.auth);
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    address: user?.address || {},
  };

  const [profile, setProfile] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === null) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user !== null) {
      if (user) {
        setProfile({
          name: user?.name || "",
          email: user?.email || "",
          phone: user?.phone || "",
          role: user?.role || "",
          address: user?.address || {},
        });
      }
    }
  }, [user]);

  const handleImageChange = () => {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    const userData = {
      name: profile.name,
      phone: profile.phone,
      address: {
        address: {
          address: profile.address,
          state: profile.state,
          country: profile.country
        }
      }
    }
    // console.log(userData);
    await dispatch(updateUser(userData));
  };

  return (
    <>
      <section>
      {isLoading && <Loader />}
        <div className="container">
          <PageMenu />
          <h2>Profile</h2>
          <div className="--flex-start profile">
            <Card cardClass={"card"}>
              {!isLoading && (
                <>
                  <div className="profile-photo">
                    <h2>Profile Image</h2>
                  </div>
                  <form onSubmit={saveProfile}>
                    <p>
                      <label>Change Photo</label>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                      />
                    </p>
                    <p>
                      <label>Name : </label>
                      <input
                        type="text"
                        value={profile?.name}
                        name="name"
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label>Email : </label>
                      <input
                        type="email"
                        value={profile?.email}
                        name="email"
                        onChange={handleInputChange}
                        required
                        disabled
                      />
                    </p>
                    <p>
                      <label>Phone : </label>
                      <input
                        type="text"
                        value={profile?.phone}
                        name="phone"
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label>Address : </label>
                      <input
                        type="text"
                        value={profile?.address?.address?.address}
                        name="address"
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label>State : </label>
                      <input
                        type="text"
                        value={profile?.address?.address?.state}
                        name="state"
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label>Country : </label>
                      <input
                        type="text"
                        value={profile?.address?.address?.country}
                        name="country"
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <button className="--btn --btn-primary --btn-block">
                      Update
                    </button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
