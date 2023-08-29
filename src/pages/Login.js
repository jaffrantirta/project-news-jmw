import React, { useState } from 'react'
import { ButtonComponent, InputComponent } from '../components'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login, updateSession } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setErrorMsg("");
            setLoading(true);
            const formData = new FormData(e.target)
            const email = formData.get('email')
            const password = formData.get('password')
            if (email === null || password === null) {
                setErrorMsg("Please fill in the fields");
                return;
            }
            const { data: { user, session }, error } = await login(email, password);
            if (error) setErrorMsg(error.message);
            if (user && session) {
                await updateSession()
                navigate("/dashboard")
            }
        } catch (error) {
            setErrorMsg("Email or Password Incorrect");
        }
        setLoading(false);
    };
    return (
        <div className='h-screen font-primary bg-accentColor p-10 flex justify-center items-center'>
            <div className='p-10 bg-white rounded-3xl shadow-xl md:w-1/4 h-1/2 w-full'>
                <p className='text-center'>Silahkan masuk ke CMS</p>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <InputComponent name={'email'} placeholder={'Masukan email'} type={'email'} inputMode={'email'} />
                    <InputComponent name={'password'} placeholder={'Masukan password'} type={'password'} />
                    {errorMsg && <p className='text-red-300 text-center'>{errorMsg}</p>}
                    <ButtonComponent disabled={loading} text={'MASUK'} onClick={() => { }} />
                    <p className='text-center'>Belum punya akun? <Link className='text-primary' to={'/register'}>Daftar disini</Link></p>
                </form>
            </div>
        </div>
    )
}
