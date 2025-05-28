'use client'
import AuthCard from '@/features/auth/auth-card';
import { useState } from 'react';
import SignUpForm from './sign-up';
import SignInForm from '@/features/auth/sign-in';
const AuthPage = () => {

    const[showSignIn, setShowSignIn] = useState<boolean>(false);
    return (
        <AuthCard>
            {
                showSignIn ? <SignInForm setShowSignIn={setShowSignIn}/> : <SignUpForm setShowSignIn={setShowSignIn}/>
            }
             
        </AuthCard>
      
    );
};

export default AuthPage;
