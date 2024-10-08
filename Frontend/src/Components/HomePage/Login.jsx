import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { AxioPost } from '../../utils/AxiosUtils';
import { BackgroundBackdrop } from './BackgroundBackdrop';
import { useAuthContext } from '../../Context/Auth';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isDisable, setDisable] = useState(false);
    const navigate = useNavigate();
    const { authStatus,login } = useAuthContext();
    useEffect(()=>{
        if(authStatus){
            navigate("/dashboard")
        }
    },[authStatus])
    const handleLogin = async (e) => {
        e.preventDefault();
        setDisable(true);
        let endpoint = 'user/login';

        try {
            const response = await AxioPost(endpoint, { email, password });
            setError(response.data.message);
            if (response.data.status === 1) {
                const token = response.data.data.auth_token;
                login(token, response);
                setError('');
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate("/dashboard"); // Ensure navigation happens after the alert
                });
            }
        } catch (err) {
            setError("Try Again Later");
            if (err.response) {
                setError(err.response.data.message);
                console.error('Error response:', err.response.data);
            } else if (err.request) {
                console.error('Error request:', err.request);
            } else {
                console.error('Error:', err.message);
            }
        } finally {
            setDisable(false);
        }
    };

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm w-full md:mx-auto md:w-1/2 2xl:max-w-md">
                    <h2 className="text-center mb-5 text-2xl font-bold leading-tight text-black">
                        <div className="mb-2"><u>LOGIN</u></div>
                        <hr />
                    </h2>
                    {error && (
                        <div className="rounded-md mb-5 border-l-4 border-violet-500 bg-violet-100 p-4">
                            <div className="flex items-center space-x-4">
                                <AlertCircle className="h-6 w-6 text-violet-600" />
                                <p className="text-sm font-medium text-violet-600">{error}</p>
                            </div>
                        </div>
                    )}
                    <BackgroundBackdrop />
                    <div className="border bg-white rounded-md p-5">
                        <form onSubmit={handleLogin} method='post'>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">Email ID</label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900">Password</label>
                                        <Link to={'/forget_password'} className="text-sm font-semibold text-black hover:underline">Forgot password?</Link>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            minLength={8}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className={`inline-flex w-full items-center justify-center rounded-md ${isDisable ? 'bg-violet-300' : 'bg-violet-500'} px-3.5 py-2.5 font-semibold leading-7 text-white ${isDisable ? '' : 'hover:bg-violet/80'}`}
                                        disabled={isDisable}
                                    >
                                        {isDisable ? 'Loading....' : <>Get started <ArrowRight className="ml-2" size={16} /></>}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
