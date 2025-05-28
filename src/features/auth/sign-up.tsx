'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from 'react-icons/fc';
import { BsApple, BsFacebook } from "react-icons/bs";
import CarParkLogoIcon from '@/icons/car-icon';
import { IoCaretForward } from "react-icons/io5";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

type SignUpData = z.infer<typeof schema>;

export default function SignUpForm({setShowSignIn}:{setShowSignIn:(val: boolean)=>void}) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<SignUpData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: SignUpData) => {
    console.log(data);
  };

  return (
    
      <div className="space-y-3 text-center">
        <div className="text-2xl font-semibold text-white flex flex-col items-center select-none gap-2">
          <CarParkLogoIcon height={36} width={36} />
          <div>Sign up for Park It</div>
        </div>

        <div className='border-b-1 border-gray-500 pb-4 space-y-4'>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
            <div>
              <Input placeholder="Username" {...register("username")} className=' text-white' />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            <div>
              <Input type="password" placeholder="Password" {...register("password")} className='text-white' />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div>
              <Input type="password" placeholder="Confirm Password" {...register("confirmPassword")} className='text-white ' />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            <Button
              type="submit"
              className={`w-full cursor-pointer transform transition-transform duration-300 hover:scale-105 active:scale-100 hover:text-gray-300 gap-1 flex items-center justify-center ${isValid && 'bg-slate-600'}`}
            >
              Create Account <IoCaretForward className='size-4' />
            </Button>
          </form>

        <div className='flex items-center justify-center'>
        <p className="text-sm text-gray-400">
            Already have an account?{" "}
            </p>
            <Button variant='link' className="text-blue-400 hover:underline inline-block pl-2 cursor-pointer" onClick={()=>setShowSignIn(true)}>
              Sign In
            </Button>
        </div>
         
          
        </div>

        <Button className='w-full h-full py-2 gap-4 cursor-pointer hover:text-gray-300 transform transition-transform duration-200 hover:scale-105 active:scale-100'>
          <FcGoogle className='h-6 w-6' />
          Continue with Google
        </Button>
        <Button className='w-full h-full py-2 gap-6 cursor-pointer hover:text-gray-300 transform transition-transform duration-200 hover:scale-105 active:scale-100'>
          <BsApple className='h-8 w-8' />
          Continue with Apple
        </Button>
        <Button className='w-full h-full py-2 cursor-pointer hover:text-gray-300 transform transition-transform duration-200 hover:scale-105 active:scale-100'>
          <BsFacebook className='h-12 w-12 text-blue-500' />
          Continue with Facebook
        </Button>
      </div>
    
  );
}
