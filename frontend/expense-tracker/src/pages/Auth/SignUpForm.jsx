import React, { useContext, useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail, isStrongPassword } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import logo from "../../assets/images/Logo&Title.png";
import Footer from "../../components/Layouts/Footer";

const SignUpForm = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!password && !fullName && !email) {
      setError("All fields are required");
      return;
    }

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    if (!isStrongPassword(password)) {
      setError("Password must be at least 8 characters, include a number and a special character.");
      return;
    }
    

    setError("");

    // SignUp API Call
    try {
      // Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (

    <div className='bg-[#000819] text-white h-screen flex flex-col items-center pt-20'>
        <div className='bg-[#111827] flex flex-col pb-6 px-4 rounded-md' style={{ width: 400, maxWidth: '90vw' }}>
            <div className='py-4 flex justify-center items-center'>
                <img src={ logo } alt='GameVault' className='h-[70px]'/>
            </div>
            <div className='flex flex-col w-full items-center'>
                <form onSubmit={handleSignUp} className='flex flex-col gap-1 justify-center'>
                  <div className='flex flex-col gap-4'>
                    <div>
                        <input
                        className='outline-2 outline-[#38ced0] bg-[#000000] text-white p-2 rounded-md w-full'
                        value={fullName}
                        onChange={({ target }) => setFullName(target.value)}
                        label="Full Name"
                        placeholder="Full Name"
                        type="text"
                        />
                    </div>
                    <div>
                        <input
                        className='outline-2 outline-[#38ced0] bg-[#000000] text-white p-2 rounded-md w-full'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="Password"
                        type="password" 
                        />
                    </div>
                    <div>
                        <input
                        className='outline-2 outline-[#38ced0] bg-[#000000] text-white p-2 rounded-md w-full'
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="Email Address"
                        type="text"
                        />
                    </div>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                  </div>
                    <div>
                        <button type='submit'
                            className='bg-[#38ced0] flex p-1 mt-4 font-medium w-full justify-center text-center border-2 border-[#24b99c] outline-none rounded-md'
                        >
                        Submit
                        </button>
                        <div style={{ minHeight: 24 }}>
                          {error && (
                            <p
                              className="text-red-500 text-xs pb-2.5"
                              style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
                            >
                              {error}
                            </p>
                          )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div className='flex flex-col gap-1 items-center'>
            <div className='flex flex-row py-5'>
                <p>__________________</p>
                <p className='px-4'>or</p>
                <p>__________________</p>
            </div>
            <div className='bg-[#111827] p-2 flex flex-row gap-2 rounded-md'>
                    <p>Already have an account?</p>
                    <Link className="font-medium text-primary underline" to="/login">
                    Login
                  </Link>
                </div>
        </div>
        <div className="flex justify-center items-end w-full h-full box-border">
            <Footer />
        </div>
    </div>
  );
};

export default SignUpForm;
