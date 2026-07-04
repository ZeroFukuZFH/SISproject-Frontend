import { useState, type ChangeEvent } from "react"

type LoginState = {
    email: string,
    password: string,
    status: 'success' | 'error' | 'loading' | 'normal'
}

const defaultLoginState : LoginState = {
    email: "",
    password: "",
    status: "normal"
}

function useLogin(){
    const [login, setLogin] = useState(defaultLoginState)
    const [errorMessage, setErrorMessage] = useState("")
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setLogin(prev => ({...prev,[name]:value,status:'normal'}))
        if(login.status === 'normal'){
            setErrorMessage("")
        }
    }

    const handleSubmit = async () => {
        const {email,password} = login
        
        try {
            if(email === "" || password === ""){
                throw new Error("fields should not be empty!")
            }

            if(!email.includes("@") || !email.includes(".")){
                throw new Error("email must be valid")
            }

            const hasUppercase = /[A-Z]/.test(password);
            const hasSpecial = /[^A-Za-z0-9]/.test(password);

            if (password.length < 12 || !hasUppercase || !hasSpecial) {
                throw new Error("password must be at least 12 characters and contain atleast one special and uppercase character");
            }
            
            setLogin({...login,status:'loading'})
            await new Promise(resolve => setTimeout(resolve, 1000)); 
        } catch (error: unknown) {
            if(error instanceof Error){
                setErrorMessage(error.message)
                setLogin({...login, status:'error'})
            }
            return
        }
    }

    return {
        login,
        handleChange,
        handleSubmit,
        errorMessage
    }
}

export default useLogin