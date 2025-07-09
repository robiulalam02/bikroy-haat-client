import React from 'react'
import { useForm } from 'react-hook-form';
import { FcGoogle } from "react-icons/fc";

const Register = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <section className="flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl p-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-sm text-gray-500 mt-1">
            Join the কাঁচাবাজার community and track daily market prices.
          </p>
        </div>

        {/* Google Signup */}
        <button
          // onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition text-sm font-medium mb-6"
        >
          <FcGoogle size={20} />
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        {/* Register Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border-b border-gray-300 focus:outline-none focus:border-primary transition placeholder:text-sm py-2"
              placeholder="Enter your name"
              {...register("name")}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border-b border-gray-300 focus:outline-none focus:border-primary transition placeholder:text-sm py-2"
              placeholder="you@example.com"
              {...register("email")}
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Upload Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="w-full text-sm text-gray-700 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-primary file:text-white hover:file:bg-primary/90"
              {...register("photo")}
            />
            
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full border-b border-gray-300 focus:outline-none focus:border-primary transition placeholder:text-sm py-2"
              placeholder="••••••••"
              {...register("password")}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>
    </section>
  )
}

export default Register
