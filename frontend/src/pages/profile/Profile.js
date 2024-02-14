import React, { useEffect, useState } from "react";
import "./profile.scss";
import PageMenu from "../../components/pageMenu/PageMenu";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/features/auth/authSlice";
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
    if (user === null) {
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
  }, [dispatch, user]);

  const handleImageChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const handleInputChange = () => {};
  const saveProfile = async () => {};

  return (
    <>
      <section>
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
                      />
                    </p>
                    <p>
                      <label>Email : </label>
                      <input
                        type="email"
                        value={profile?.email}
                        name="email"
                        onChange={handleInputChange}
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
                      />
                    </p>
                    <p>
                      <label>Address : </label>
                      <input
                        type="text"
                        value={profile?.address?.address}
                        name="address"
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      <label>Country : </label>
                      <input
                        type="text"
                        value={profile?.address?.country}
                        name="country"
                        onChange={handleInputChange}
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
