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
// import { useToast } from "@/components/ui/use-toast"; // assumes shadcn/ui setup
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

type SignUpData = z.infer<typeof schema>;

export default function SignUpForm({ setShowSignIn }: { setShowSignIn: (val: boolean) => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpData>({
    resolver: zodResolver(schema),
  });

  // const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignUpData) => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, password: data.password }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Registration failed");
      }

      // toast({
      //   title: "Account created!",
      //   description: "You can now sign in with your credentials.",
      // });

      setShowSignIn(true);
    } catch (error) {
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: error.message || "Something went wrong.",
      // });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 text-center">
      <div className="text-2xl font-semibold text-white flex flex-col items-center select-none gap-2">
        <CarParkLogoIcon height={36} width={36} />
        <div>Sign up for Park It</div>
      </div>

      <div className='border-b border-gray-500 pb-4 space-y-4'>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <div>
            <Input placeholder="Username" {...register("name")} className='text-white' />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <Input type="password" placeholder="Password" {...register("password")} className='text-white' />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <Input type="password" placeholder="Confirm Password" {...register("confirmPassword")} className='text-white' />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`w-full gap-1 flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-100 hover:text-gray-300 ${!loading ? 'bg-slate-600' : 'opacity-70'}`}
          >
            {loading ? "Creating..." : <>Create Account <IoCaretForward className='size-4' /></>}
          </Button>
        </form>

        <div className='flex items-center justify-center'>
          <p className="text-sm text-gray-400">Already have an account?</p>
          <Button variant='link' className="text-blue-400 hover:underline inline-block pl-2 cursor-pointer" onClick={() => setShowSignIn(true)}>
            Sign In
          </Button>
        </div>
      </div>

      <Button className='w-full h-full py-2 gap-4 hover:text-gray-300 hover:scale-105 active:scale-100'>
        <FcGoogle className='h-6 w-6' />
        Continue with Google
      </Button>
      <Button className='w-full h-full py-2 gap-6 hover:text-gray-300 hover:scale-105 active:scale-100'>
        <BsApple className='h-8 w-8' />
        Continue with Apple
      </Button>
      <Button className='w-full h-full py-2 hover:text-gray-300 hover:scale-105 active:scale-100'>
        <BsFacebook className='h-12 w-12 text-blue-500' />
        Continue with Facebook
      </Button>
    </div>
  );
}
