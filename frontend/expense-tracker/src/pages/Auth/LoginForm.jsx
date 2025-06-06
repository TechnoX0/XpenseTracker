import { useContext,  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import logo from "../../assets/images/Logo&Title.png";
import Footer from "../../components/Layouts/Footer";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      setError("All fields are required");
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

    setError("");

    //Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };


  return (
    <div className='bg-[#000819] text-white h-screen flex flex-col items-center pt-20'>
                <div className='bg-[#111827] flex flex-col w-fit pb-6 px-4 rounded-md' style={{ width: 400, maxWidth: '90vw' }}>
                    <div className='py-4 flex justify-center items-center'>
                        <img src={logo} alt='GameVault' className='h-[70px]' />
                    </div>
                    <div className='flex flex-col w-full items-center'>
                        <form onSubmit={ handleLogin } className='flex flex-col gap-1 justify-center'>
                          <div className='flex flex-col gap-4'>
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
                          </div>
                            <div>
                                <button type='submit'
                                    className='bg-[#38ced0] flex p-1 mt-4 w-full font-medium justify-center text-center border-2 border-[#24b99c] outline-none rounded-md'
                                >
                                    Submit
                                </button>
                                {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
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
                    <div className='bg-[#111827 ] p-2 flex flex-row gap-2 rounded-md'>
                        <p>Don't have an account?</p>
                            <Link className="font-medium text-primary underline" to="/signup">
                            SignUp
                            </Link>
                    </div>
                </div>
                <div className='flex justify-center items-end w-full h-full box-border'>
                    <Footer />
                </div>
            </div>
  );
};

export default LoginForm;
