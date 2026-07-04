import { useState, type ChangeEvent } from "react"

type RegisterState = {
    username: string,
    email: string,
    password: string,
    status: 'success' | 'error' | 'loading' | 'normal'
}

const defaultRegisterState : RegisterState = {
    username: "",
    email: "",
    password: "",
    status: "normal"
}

function useRegister(){
    const [register, setRegister] = useState(defaultRegisterState)
    const [errorMessage, setErrorMessage] = useState("")
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        
        setRegister(prev => ({ ...prev, [name]: value, status: 'normal' }))
        setErrorMessage("")
    }

    const handleSubmit = async () => {
        const { username, email, password } = register
        
        try {
            if (username.trim() === "" || email === "" || password === "") {
                throw new Error("fields should not be empty!")
            }

            if (!email.includes("@") || !email.includes(".")) {
                throw new Error("email must be valid")
            }

            const hasUppercase = /[A-Z]/.test(password);
            const hasSpecial = /[^A-Za-z0-9]/.test(password);

            if (password.length < 12 || !hasUppercase || !hasSpecial) {
                throw new Error("password must be at least 12 characters and contain atleast one special and uppercase character");
            }
            
            setRegister({ ...register, status: 'loading' })
            await new Promise(resolve => setTimeout(resolve, 1000)); 
            
            setRegister({ ...register, status: 'success' })
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
                setRegister({ ...register, status: 'error' })
            }
            return
        }
    }

    return {
        register,
        handleChange,
        handleSubmit,
        errorMessage
    }
}

export default useRegister