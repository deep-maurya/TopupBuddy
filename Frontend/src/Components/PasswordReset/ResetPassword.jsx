import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AxioPost } from '../../utils/AxiosUtils';
import { LucideLoader, MailWarning, Verified } from 'lucide-react'
import { BackgroundBackdrop } from '../HomePage/BackgroundBackdrop';
import { useCookies } from 'react-cookie';
export const ResetPassword = () => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const { token } = useParams();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [alertColor, setAlertColor] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);
    const [newPassword, setNewPassword] = useState({
        newPassword: "",
        confirmNewPassword: ""
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleResetemail = async (e) => {
        e.preventDefault();
        setButtonDisabled(true);
        try {
            const response = await AxioPost('user/forget_password_request', { email });
            setError(response.data.message);
            if (response.data.status === 1) {
                console.log(response.data)
                
                setAlertColor(1);
            }
            console.log(response.data);
        } catch (err) {
            if (err.response) {
                console.error('Error response:', err.response.data);
            } else if (err.request) {
                console.error('Error request:', err.request);
            } else {
                console.error('Error:', err.message);
            }
        } finally {
            setEmail("");
            setButtonDisabled(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setButtonDisabled(true)
        setAlertColor(0);
        if (newPassword.newPassword === newPassword.confirmNewPassword) {
            try {
                const response = await AxioPost('user/forget_password', { password:newPassword.confirmNewPassword });
                //console.log(response.data);
                setError(response.data.message);
                if (response.data.status === 1) {
                    setAlertColor(1);
                    removeCookie('fprl_token')
                    setTimeout(() => {
                        navigate("/login");
                    }, 5000);
                } else {
                    setButtonDisabled(false)
                }
            } catch (err) {
                if (err.response) {
                    console.error('Error response:', err.response.data);
                } else if (err.request) {
                    console.error('Error request:', err.request);
                } else {
                    console.error('Error:', err.message);
                }
                setButtonDisabled(false)
            }
        } else {
            setError("Password & confirm Password Should be Same.");
        }
    };

    useEffect(() => {
        const validateToken = async () => {
            if (token) {
                try {
                    const response = await AxioPost('user/forget_password_verify', { token });
                    console.log(response.data);
                    setError(response.data.messege)
                    if (response.data.status) {
                        setCookie('fprl_token',token)
                        setError('');
                        setUpdatePassword(true);
                    }
                } catch (error) {
                    console.error("Error validating token:", error);
                    setError("Invalid or expired token.");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        validateToken();
    }, [token]);

    return (
        <>

<section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <BackgroundBackdrop/>
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            {/* We can Place logo Here */}
          </div>
          <h2 className="text-center text-2xl mb-5 font-bold leading-tight text-black">
            Recover your account password
          </h2>
          
          {error && <div className={`rounded-md mb-5 border-l-4 border-${alertColor?"green":"violet"}-500 bg-${alertColor?"green":"violet"}-100 p-4`}>
                <div className="flex items-center space-x-4">
                <div>
                    {alertColor?(<>
                        <Verified className={`h-6 w-6 text-${alertColor?"green":"violet"}-600`} />
                    </>):(<>
                        <MailWarning className={`h-6 w-6 text-${alertColor?"green":"violet"}-600`} />
                    </>)}
                    
                </div>
                <div>
                    <p className={`text-sm font-medium text-${alertColor?"green":"violet"}-600`}>
                    {error}
                    </p>
                </div>
                </div>
            </div>}
            <div className="border bg-white rounded-md p-5">
                {token?(<>
                    {loading && <div className="rounded-md border-b-4 mt-5 mb-5 border-violet-500 bg-violet-100 p-4">
                        <div className="flex flex-col text-center justify-center space-x-4">
                        <div className='text-center'>
                            <LucideLoader className="text-center m-5 ml-auto mr-auto h-20 w-20 text-violet-600" />
                        </div>
                        <div>
                            <p className="text font-medium text-violet-600">
                            Loading Please wait.....
                            </p>
                        </div>
                        </div>
                    </div>}
                    {updatePassword && (
                        <>
                            <form onSubmit={handlePasswordSubmit} method="post">
                                <div className="space-y-5">
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                    New Password
                                    </label>
                                    <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        placeholder="Enter new Password"
                                        value={newPassword.newPassword}
                                        onChange={(e) => setNewPassword({ ...newPassword, newPassword: e.target.value })}
                                        required
                                    ></input>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                    Confirm New Password
                                    </label>
                                    <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        placeholder="Confirm your Password"
                                        value={newPassword.confirmNewPassword}
                                        onChange={(e) => setNewPassword({ ...newPassword, confirmNewPassword: e.target.value })}
                                        required
                                    ></input>
                                    </div>
                                </div>
                                <div>
                                    <button
                                    type="submit"
                                    className={`inline-flex w-full items-center justify-center rounded-md ${buttonDisabled?'bg-violet-300':'bg-violet-500'} px-3.5 py-2.5 font-semibold leading-7 text-white ${buttonDisabled?'':'hover:bg-violet/80'}`}
                                    >
                                    {buttonDisabled ? "Loading....." : "Submit"}
                                    </button>
                                </div>
                                </div>
                            </form>
                        </>
                    )}
                </>):(<>
                    <form onSubmit={handleResetemail}>
                        <div className="space-y-5">
                        <div>
                            <label htmlFor="" className="text-base font-medium text-gray-900">
                            {' '}
                            Email address{' '}
                            </label>
                            <div className="mt-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            ></input>
                            <p className='mt-2 text-center mb-5 text-sm text-gray-600 '>We will share a link to your email through which you will be able to reset your password.</p>
                            </div>
                        </div>
                        <div>
                            <button
                            type="submit"
                            className={`inline-flex w-full items-center justify-center rounded-md ${buttonDisabled?'bg-violet-300':'bg-violet-500'} px-3.5 py-2.5 font-semibold leading-7 text-white ${buttonDisabled?'':'hover:bg-violet/80'}`}
                            >
                            {buttonDisabled ? "Loading....." : "Submit"}
                            </button>
                        </div>
                        </div>
                    </form>
                </>)}
            </div>
        </div>
      </div>
    </section>
        </>
    );
};
