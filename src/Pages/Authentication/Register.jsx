import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Providers/AuthContext';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { uploadImageToImgBB } from '../../API/utils';
import axios from 'axios';
import Spinner from '../../Components/Loaders/Spinner';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import toast from 'react-hot-toast';

const Register = () => {

  const navigate = useNavigate();
  const { userRegister, googleSignIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [imgLoading, setImgLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleUploadPhoto = async (photo) => {
    console.log(photo)

    try {
      setImgLoading(true)
      const res = await uploadImageToImgBB(photo)
      const imageURL = res.data.data.display_url
      if (imageURL) {
        setProfilePhoto(imageURL)
      }
    } catch {
      setImgLoading(false)
      console.log('image upload failed')
    } finally {
      setImgLoading(false)
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm()

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    const userData = {
      name,
      email,
      password,
      profilePhoto,
      createdAt: new Date().toISOString(),
      lastSignIn: new Date().toISOString(),
    }

    try {
      setLoading(true);
      const firebasePromise = await userRegister(email, password)
      if (firebasePromise.user) {
        // insert user data to DB
        const userPromise = await axios.post('http://localhost:3000/users', userData)

        if (userPromise.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "user registration successful",
            showConfirmButton: false,
            timer: 1500
          });
          reset();
          navigate('/')
        }
      }
    } catch {
      setLoading(false);
      console.log('user registration failed!')
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSignUp = async () => {
    // sign in using google provider

    try {
      setLoading(true);
      const userPromise = await googleSignIn();
      if (userPromise.user) {
        const user = userPromise.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          profilePhoto: user.photoURL,
          createdAt: new Date().toISOString(),
          lastSignIn: new Date().toISOString(),
        }

        console.log(user)

        //  save user to DB
        const res = await axiosPublic.post('/users', userInfo)
        console.log(res.data);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "user registration successful",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/')
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl p-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-sm text-gray-500 mt-1">
            Join <span className='text-black'>Bikroy Haat</span> community and track daily market prices.
          </p>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignUp}
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
              className="w-full border-b border-gray-300 focus:outline-none focus:border-primary transition placeholder:text-sm p-2"
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
              className="w-full border-b border-gray-300 focus:outline-none focus:border-primary transition placeholder:text-sm p-2"
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
              onChange={(e) => {
                handleUploadPhoto(e.target.files[0])
              }}
              className="w-full text-sm text-gray-700 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-primary file:text-white hover:file:bg-primary/90"
            />
            {
              imgLoading &&
              <Spinner />
            }
          </div>

          {/* Password */}
          <div className='relative'>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type={showPass ? 'text' : 'password'}
              name="password"
              required
              className="w-full border-b border-gray-300 focus:outline-none focus:border-primary transition placeholder:text-sm p-2"
              placeholder="••••••••"
              {...register("password")}
            />
            <button onClick={() => setShowPass(!showPass)} type='button' className='absolute top-9 right-4'>
              {
                showPass ?
                  <VscEye />
                  :
                  <VscEyeClosed />
              }
            </button>
          </div>

          {/* Submit */}
          <button
            disabled={imgLoading || loading}
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition"
          >
            {
              loading ?
                <Spinner />
                :
                'Register'
            }
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <button onClick={() => navigate('/login')} className="text-primary font-medium hover:underline">
            Login here
          </button>
        </p>
      </div>
    </section>
  )
}

export default Register
