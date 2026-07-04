import { Link } from "react-router"
import Background from "../../../assets/auth_bg.png"
import LoadingSpinner from "../../../components/LoadingSpinner"
import useLogin from "./hooks/useLogin/hook"
import {  ShieldAlert } from "lucide-react"

function LoginPage() {
    const {login, handleChange, handleSubmit, errorMessage} = useLogin()
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col gap-4 rounded-xl bg-[#17161D] border border-[#423D44] w-100 h-140 text-white justify-center items-center p-10 ">
                <h1 className="text-4xl font-bold">Welcome to S.I.S!</h1>
                <p className="font-extralight">We’re  so excited to see you again!</p>

                {errorMessage.length > 0 && 
                <div className="p-4 gap-2 w-full bg-red-500 rounded-xl flex flex-row">
                    <ShieldAlert/> {errorMessage}
                </div>
                }
                <input 
                    type="email"
                    placeholder="email" 
                    name="email" 
                    className={"text-white rounded-md px-4 py-2 outline-none bg-[#34353B] w-full " + (login.status === 'error' && 'border border-red-500')} 
                    value={login.email}
                    onChange={handleChange}
                />
                <input 
                    type="password" 
                    placeholder="password" 
                    name="password" 
                    className={"text-white rounded-md px-4 py-2 outline-none bg-[#34353B] w-full " + (login.status === 'error' && 'border border-red-500')}
                    value={login.password}
                    onChange={handleChange}
                />

                <button onClick={handleSubmit} className="cursor-pointer bg-violet-500 text-white rounded-md w-full px-4 py-2 justify-center items-center">
                    {login.status === 'loading' ? <LoadingSpinner/> : "Login"}
                </button>

                <span className="w-full flex justify-start gap-2 items-center">Already have an account? <Link to={"/register"} className="text-violet-500">register</Link></span>

            </div>
            <div className="fixed w-full h-full bg-black/50 -z-10"/>
            <img src={Background} alt="bg_auth" className="flex w-full h-full fixed -z-20"/> 
        </div>
    )
}



export default LoginPage