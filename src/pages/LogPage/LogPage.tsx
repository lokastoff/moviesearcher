import { useState, ChangeEvent } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { login,logout } from "../../store/slices/isLoggedSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
export const LogPage = () => {

    const navigate = useNavigate()
    const user = 'admin';
    const pass = '1234';

    const dispatch = useDispatch()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        if (username === user && password === pass) {
            dispatch(login())
            navigate('/')
        } else {
            setErrorMessage('Неверное имя пользователя или пароль');
        }
    };

    return (
        <div className="flex items-center justify-center bg-[#081b27] h-[90vh]">
            <div className="contentContainer flex flex-col items-center justify-center px-[60px] ">
                <div className="searchContainer mb-[100px] w-full sm:max-w-[50%]  relative flex flex-col gap-[20px]">
                    <input 
                        type="text" 
                        value={username} 
                        onChange={handleUsernameChange} 
                        placeholder="Имя пользователя" 
                        className="w-full rounded-[40px] border-[1px] border-[#1e445c] text-center placeholder:text-[0.7rem]"/>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        placeholder="Пароль" 
                        className="w-full rounded-[40px] border-[1px] border-[#1e445c] text-center placeholder:text-[0.7rem]"/>
                    <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Войти</button>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </div>
                
            </div>
        </div>
    );
};