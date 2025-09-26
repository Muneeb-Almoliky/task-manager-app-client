import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { axiosPrivate, getBaseUrl } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import styles from './Profile.module.css';
import Modal from "../../utils/Modal/Modal";
import { toast } from "react-toastify";
import { faClose, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = ({ isAuthenticating, isOpen, setOpen }) => {
  const [profile, setProfile] = useState({ profile_picture: "", email: "" });
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [cookies] = useCookies(["email"]);
  const userEmail = cookies.email;
  const { auth } = useAuth();

  const fetchProfile = async () => {
    console.log("Auth token before fetching profile:", auth?.accessToken); 
    if (!auth?.accessToken) {
      console.log("Token not available yet");
      return;
    }
    try {
      const response = await axiosPrivate.get(`/upload/${userEmail}`);
      setProfile(response.data);
      console.log("Profile fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching profile:", error.message);
    }
  };

 

  useEffect(() => {
    const fetchWithDelay = async () => {
      if (!isAuthenticating) {
        // Wait a short duration to ensure the token refresh completes
        setTimeout(async () => {
          await fetchProfile();
        }, 500); 
      }
    };
    fetchWithDelay();
  }, [isAuthenticating, auth?.accessToken]); 



  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); 
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected for upload.");
      setErrorMsg('No file selected for upload.');
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosPrivate.post(`/upload/${userEmail}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update the profile data with the response
      setProfile(response.data.user);
      toast.success("Profile picture uploaded successfully!", {
        position: "top-center",
        autoClose: 3000, 
        hideProgressBar: true,
      });
      setShowModal(false);
      setErrorMsg(null);
      
    } catch (error) {
      console.error("Error uploading profile picture:", error.message);
      setErrorMsg(`Error uploading profile picture`);
    } finally {
      setFile(null); 
    }
  }

  const handleEditClick = () => {
    setTimeout(() => {
        setShowModal(!showModal);
    }, 500)
    setOpen(!isOpen);
  }

  return (
    <div className={styles.profile}>
      <div>
        {profile.profile_picture ? (
          <img
            src={`${getBaseUrl() + profile.profile_picture}`}
            alt="Profile"
            style={{ width: "70px", height: "70px", borderRadius: "50%" }}
          />

        ) : (
          <div className={styles.noProfilePicture} ><FontAwesomeIcon icon={faUser} style={{height: '50%', color: 'white'}}/></div>
        )}
      </div>
      <p className={styles.email}>{userEmail}</p>
      <button className={styles.editBtn} onClick={handleEditClick}>Edit Profile</button>

      {showModal &&
        <Modal>
          <div className={styles.editProfile}>
            <div>
              <h3>Edit Profile Picture</h3>
              <button onClick={() => { setShowModal(false); setErrorMsg(null); setFile(null) }}><FontAwesomeIcon icon={faClose}/></button>
            </div>
            <div>
              <input type="file" onChange={handleFileChange} />
              <button className={styles.uploadBtn} onClick={handleUpload}>Upload</button>
            </div>
          </div>
          {errorMsg && <p style={{ color: "red", marginTop: '1rem' }}>{errorMsg}</p>}
        </Modal>
      }

    </div>
  );
};

export default Profile;
