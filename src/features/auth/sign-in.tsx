'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import { BsFacebook } from "react-icons/bs";
import CarParkLogoIcon from '@/icons/car-icon';
import { IoCaretForward } from "react-icons/io5";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type SignInData = z.infer<typeof schema>;

export default function SignInForm({setShowSignIn}:{setShowSignIn:(val: boolean)=>void}) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<SignInData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: SignInData) => {
    console.log(data);
  };

  return (
      <div className="space-y-3 text-center">
        <div className="text-2xl font-semibold text-white flex flex-col items-center select-none gap-2">
          <CarParkLogoIcon height={36} width={36} />
          <div> Sign in to Park It</div></div>
        <div className='border-b-1 border-gray-500 pb-4 space-y-4'>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
            <div>
              <Input placeholder="Username" {...register("username")} className='text-white bg-zinc-800' />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>
            <div>
            <Input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="text-white bg-zinc-800"
              />

              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <Button
              type="submit"
              className={`w-full cursor-pointer transform transition-transform duration-300 hover:scale-105 active:scale-100 hover:text-gray-300 gap-1 flex items-center justify-center ${isValid && 'bg-slate-600'}`}
            >
              Continue <IoCaretForward className='size-4'/>
            </Button>

          </form>

          <div className='flex items-center justify-center'>
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?
            </p>
            <Button variant='link' className="text-blue-400 hover:underline inline-block pl-2 cursor-pointer" onClick={()=>setShowSignIn(false)}>
              Sign Up
            </Button>
          </div>
          
          

        </div>

        <Button className='w-full h-full py-2 gap-4 cursor-pointer hover:text-gray-300 transform transition-transform duration-200 hover:scale-105 active:scale-100'>
          <FcGoogle className='h-6 w-6 ' />
          Continue with Google
        </Button>
        <Button className='w-full h-full py-2 gap-6 cursor-pointer hover:text-gray-300 transform transition-transform duration-200 hover:scale-105 active:scale-100'>
          <BsApple className='h-8 w-8 ' />
          Continue with Apple
        </Button>
        <Button className='w-full h-full py-2 cursor-pointer hover:text-gray-300 transform transition-transform duration-200 hover:scale-105 active:scale-100'>
          <BsFacebook className='h-12 w-12 text-blue-500' />
          Continue with Facebook
        </Button>
      </div>
  );
}
