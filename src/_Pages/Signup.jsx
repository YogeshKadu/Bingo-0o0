import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
    return (
        <div className="w-full h-screen flex justify-center items-center relative z-50 overflow-hidden">
            <span className='absolute md:hidden top-2/3 left-2/3 w-56 h-56 rounded-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500'></span>
            <span className='absolute md:hidden bottom-2/3 right-2/3 w-56 h-56 rounded-full bg-gradient-to-b from-[#EB121A] to-[#FAEB18]'></span>
            <div className="w-full mx-6 sm:mx-auto sm:max-w-sm bg-[#4773F455] p-6 rounded-lg shadow-2xl flex flex-col min-h-[528px] z-0 relative backdrop-blur">
                <h2 className="font-semibold text-3xl mt-8 mb-5 text-white">Sign Up</h2>
                <div className="w-full bg-blue-700 rounded-xl flex flex-row items-center gap-2 font-normal p-2 mb-5">
                    <label htmlFor="email" className="w-6 h-6 ml-2">
                        <img src="icons/Email.svg" alt="email input" className="w-full h-full" />
                    </label>
                    <input type="email" id="email" name="email" placeholder="Email Address" className="outline-none text-white h-8 placeholder-slate-300 bg-transparent" autoComplete='false' />
                </div>
                <div className="w-full bg-blue-700 rounded-xl flex flex-row items-center gap-2 font-normal p-2 mb-5">
                    <label htmlFor="username" className="w-6 h-6 ml-2">
                        <img src="icons/User.svg" alt="username input" className="w-full h-full" />
                    </label>
                    <input type="text" id="username" name="username" placeholder="Create Username" className="outline-none bg-transparent text-white h-8 placeholder-slate-300" />
                </div>
                <div className="w-full bg-blue-700 rounded-xl flex flex-row items-center gap-2 font-normal p-2 mb-5">
                    <label htmlFor="password" className="w-6 h-6 ml-2">
                        <img src="icons/Lock.svg" alt="password input" className="w-full h-full" />
                    </label>
                    <input type="password" id="password" name="password" placeholder="Create Password" className="outline-none bg-transparent text-white h-8 placeholder-slate-300" />
                </div>
                <div className="w-full bg-blue-700 rounded-xl flex flex-row items-center gap-2 font-normal p-2 mb-5">
                    <label htmlFor="confirm-password" className="w-6 h-6 ml-2">
                        <img src="icons/Lock.svg" alt="confirm password input" className="w-full h-full" />
                    </label>
                    <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm Password" className="outline-none bg-transparent text-white h-8 placeholder-slate-300" />
                </div>
                <div className="w-full flex flex-row items-center gap-2 font-normal px-2 mb-5 text-white">
                    <label htmlFor="aggriment" className="flex flex-row items-center cursor-pointer">
                        <img src="icons/Check.svg" alt="check icons" className="w-4 h-4 mx-2" />
                        <span className='text-sm'>I agree to the Terms and Conditions.</span>
                    </label>
                    <input type="checkbox" name="aggriment" id="aggriment" className="w-0 opacity-0" />
                </div>
                <button className="max-w-[240px] w-full py-2 rounded-3xl mb-4 shadow-md  text-indigo-800 bg-white mx-auto active:bg-slate-300">
                    Register
                </button>
                <Link to="/signin" className="text-center text-white font-normal text-sm">Already have an account ?</Link>
            </div>
        </div>
    )
}