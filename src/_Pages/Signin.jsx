import React from 'react'
import { Link } from 'react-router-dom'

export default function Signin() {
    return (
        <div className="w-full h-screen flex justify-center items-center overflow-hidden">
            <div className="w-full mx-6 sm:mx-auto sm:max-w-sm min-h-[528px] flex flex-col justify-end relative">
                <span className='absolute md:hidden top-2/3 left-2/3 w-56 h-56 rounded-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500'></span>
                <span className='absolute md:hidden bottom-1/3 right-2/3 w-56 h-56 rounded-full bg-gradient-to-b from-[#EB121A] to-[#FAEB18]'></span>
                <div className="w-full bg-[#4773F455] p-6 rounded-lg shadow-2xl flex flex-col z-0 backdrop-blur">
                    <h2 className="font-semibold text-3xl mt-8 mb-5 text-white">Sign In</h2>
                    <div className="w-full bg-blue-700 rounded-xl flex flex-row items-center gap-2 font-normal p-2 mb-5">
                        <label htmlFor="username" className="w-6 h-6 ml-2">
                            <img src="icons/User.svg" alt="username input" className="w-full h-full" />
                        </label>
                        <input type="text" id="username" name="username" placeholder="Enter Username" className="outline-none bg-transparent text-white h-8 placeholder-slate-300" />
                    </div>
                    <div className="w-full bg-blue-700 rounded-xl flex flex-row items-center gap-2 font-normal p-2 mb-5">
                        <label htmlFor="password" className="w-6 h-6 ml-2">
                            <img src="icons/Lock.svg" alt="password input" className="w-full h-full" />
                        </label>
                        <input type="password" id="password" name="password" placeholder="Enter Password" className="outline-none bg-transparent text-white h-8 placeholder-slate-300" />
                    </div>
                    <button className="max-w-[240px] w-full bg-white mx-auto text-indigo-800 py-2 rounded-3xl mb-4 shadow-md">
                        Login
                    </button>
                    <Link to="/signup" className="text-center text-white font-normal text-sm">Sign-up here for a new user</Link>
                </div>
            </div>
        </div>
    )
}