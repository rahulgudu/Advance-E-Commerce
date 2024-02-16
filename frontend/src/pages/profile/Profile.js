import React, { useEffect, useState } from "react";
import "./profile.scss";
import { AiOutlineCloudUpload } from "react-icons/ai";
import PageMenu from "../../components/pageMenu/PageMenu";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  updatePhoto,
  updateUser,
} from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const url = "https://api.cloudinary.com/v1_1/rahulgudu/image/upload";

const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.auth);
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    photo: user?.photo || "",
    address: user?.address || {
      address: user?.address?.address || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "",
    },
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
          photo: user?.photo || "",
          address: user?.address || {
            address: user?.address?.address || "",
            state: user?.address?.state || "",
            country: user?.address?.country || "",
          },
        });
      }
    }
  }, [user]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

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
          country: profile.country,
        },
      },
    };
    // console.log(userData);
    await dispatch(updateUser(userData));
  };

  const saveImage = async (e) => {
    e.preventDefault();
    let imageURL;
    try {
      if (
        profileImage !== null &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", cloud_name);
        image.append("upload_preset", upload_preset);

        // Save image to cloudinary
        const response = await fetch(url, {
          method: "post",
          body: image,
        });
        const imgData = await response.json();
        // console.log(imgData);
        imageURL = imgData.url.toString();
      }
      // save image to mongodb
      const userData = {
        photo: profileImage ? imageURL : profile.photo,
      };

      await dispatch(updatePhoto(userData));
      setImagePreview(null);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <div className="container">
          <h2>Profile</h2>
          <PageMenu />
          <div className="--flex-start profile">
            
            <Card cardClass={"card"}>
              {!isLoading && (
                <>
                  <div className="profile-photo">
                    <div>
                      <img
                        src={imagePreview === null ? user?.photo : imagePreview}
                        alt="profile"
                      />
                      <h3>Role : {profile.role}</h3>
                      {imagePreview != null && (
                        <div className="--center-all">
                          <button
                            className="--btn --btn-secondary"
                            onClick={saveImage}
                          >
                            <AiOutlineCloudUpload
                              size={18}
                            ></AiOutlineCloudUpload>
                            Upload Photo
                          </button>
                        </div>
                      )}
                    </div>
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
