import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);

      console.log('OTP response:', data); // ✅ Debug log

      // ✅ Handle success properly
      if (data.success || data.message?.includes('Verification OTP sent')) {
        toast.success(data.message || 'Verification OTP sent successfully');
        navigate('/email-verify'); // ✅ Redirect immediately
      } else {
        toast.error(data.message || 'Failed to send verification OTP');
      }
    } catch (error) {
      console.error('OTP error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 z-50">
      <img
        src={assets.logo}
        className="w-28 sm:w-32 cursor-pointer"
        alt="Logo"
        onClick={() => navigate('/')}
      />

      {userData ? (
        <div className="relative">
          <div
            className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-800 text-white text-lg font-semibold cursor-pointer"
            onClick={() => setShowMenu(prev => !prev)}
          >
            {userData?.name?.[0]?.toUpperCase() || ''}
          </div>

          {showMenu && (
            <div className="absolute top-10 right-0 z-10 text-black rounded bg-gray-100 shadow-md">
              <ul className="list-none m-0 p-2 text-sm">
                {!userData.isAccountVerified && (
                  <li
                    onClick={sendVerificationOtp}
                    className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Verify email
                  </li>
                )}
                <li
                  onClick={logout}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        >
          Login <img src={assets.arrow_icon} alt="Arrow Icon" />
        </button>
      )}
    </div>
  );
};

export default Navbar;