import React, { useState, useEffect } from 'react';
import { LogOutIcon, Wallet, LayoutDashboard, UserIcon } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '/logo.png'; // Make sure the logo path is correct
import { Loading } from '../Utils/Loading';
import { useAuthContext } from '../../Context/Auth';

export const Layout = (props) => {
  const { authUser, authStatus, loading, logout } = useAuthContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(); // Ensure logout clears user data and tokens
        Swal.fire({
          title: "Logout!",
          text: "Logout Successful",
          icon: "success",
          timer: 1500,
        }).then(() => {
          navigate('/login'); // Redirect after logout
        });
      }
    });
  };

  return (
    <>
      {authUser ? (
        <div className="flex h-screen overflow-hidden">
          <aside
            style={{ padding: '0px' }}
            className={`fixed inset-y-0 border left-0 bg-white z-30 w-20 text-green-600 p-4 transform ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:w-20`}
          >
            <img
              className="p-3 py-5 self-center ml-auto mr-auto"
              width={'300%'}
              src={logo}
              alt="Logo"
            />
            <div className="flex flex-col content-between">
              <nav className="flex flex-1 flex-col items-center space-y-6 py-5">
                <NavLink
                  to={'/dashboard'}
                  className={({ isActive }) =>
                    `rounded-md p-1.5 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none ${
                      isActive ? 'bg-green-200 text-green-700' : ' text-gray-700'
                    }`
                  }
                >
                  <LayoutDashboard size={24} />
                </NavLink>
                <NavLink
                  to={'/wallet'}
                  className={({ isActive }) =>
                    `rounded-md p-1.5 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none ${
                      isActive ? 'bg-green-200 text-green-700' : ' text-gray-700'
                    }`
                  }
                >
                  <Wallet size={24} />
                </NavLink>
                <NavLink
                  to={'/profile'}
                  className={({ isActive }) =>
                    `rounded-md p-1.5 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none ${
                      isActive ? 'bg-green-200 text-green-700' : ' text-gray-700'
                    }`
                  }
                >
                  <UserIcon size={24} />
                </NavLink>
              </nav>
            </div>
          </aside>

          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
              onClick={toggleSidebar}
            ></div>
          )}

          <div className="flex flex-1">
            <div className="flex-1 flex flex-col">
              <header className="bg-white shadow border-b-4 p-4 flex items-center justify-between">
                <div className="flex">
                  <button className="text-gray-800 lg:hidden" onClick={toggleSidebar}>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  </button>
                  <h1 className="text-xl ml-3 font-bold"></h1>
                </div>

                <div className="flex items-center space-x-4">
                  {authUser && <span className="font-bold">{authUser.name}</span>}
                  <button
                    onClick={handleLogout}
                    className={`bg-green-500 text-white p-2 font-bold text-medium rounded`}
                  >
                    <LogOutIcon />
                  </button>
                </div>
              </header>
              <main className="flex-1 p-4 bg-green-50 overflow-auto">
                {props.children}
              </main>
            </div>
          </div>
        </div>
      ) : null }
    </>
  );
};
