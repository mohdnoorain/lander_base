'use client';

import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

const LoginApi = async (payload: { [x: string]: number | string }) => {
    try {
        const response = await fetch("/api/admin/auth/logIn",
            {
                method: 'POST',
                body: JSON.stringify(payload)
            }
        );
        if (!response.ok) {
            throw new Error("Failed to fetch feature data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return false;
    }
}

const LoginPage = () => {
    const Router = useRouter();


    const checkCredentials = async (e: any) => {
        e?.preventDefault();
        const data = await LoginApi({
            username: e.target[0].value,
            password: e.target[1].value
        });
        if (data) {
            console.log('Login successful');
            sessionStorage.setItem('token', data.token);
            Router.replace('/adminPanel/dashboard');
        } else {
            console.log('Login failed');
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token') || "";
        const time = new Date(token);
        if (token && time && time?.getTime() + 3600000 > Date.now()) {
            Router.replace('/adminPanel/dashboard');
        } else {
            sessionStorage.removeItem('token');
        }
    }, [])

    return (
        <div>
            <form onSubmit={checkCredentials} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '10rem' }}>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage
