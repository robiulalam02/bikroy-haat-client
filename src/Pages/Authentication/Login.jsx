import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthContext";
import Spinner from "../../Components/Loaders/Spinner";
import Swal from "sweetalert2";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import AdminCredetialsToast from "../../Components/Toasts/AdminCredetialsToast";
import { AnimatePresence, motion } from "framer-motion";

const Login = () => {

  const { pathname } = useLocation();

  const { googleSignIn, userLogin } = useContext(AuthContext)
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showAdminCredential, setShowAdminCredential] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAdminCredential(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm()

  // Autofill admin credentials
  const handleFill = () => {
    setValue("email", "programmingadmin@hero.com");
    setValue("password", "@#Admin09");

    setShowAdminCredential(false)
    clearErrors(["email", "password"]);
  };

  const onSubmit = async (data) => {
    const { email, password } = data;

    // sign in user using firebase
    try {
      setLoading(true);
      const res = await userLogin(email, password)

      if (res.user) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "user login successfull",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(`${location.state ? location.state : '/'}`)
      }
    } catch (error) {
      toast.error("invalid email & password")
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleSignIn = async () => {
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

        //  save user to DB
        const res = await axiosPublic.post('/users', userInfo)

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(`${location.state ? location.state : '/'}`)
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex items-center justify-center  px-4 py-15 relative">
      <Helmet>
        <title>User Login</title>
      </Helmet>
      <div className="w-full max-w-md bg-white rounded-xl p-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">
            Login to access <span className="text-black">Bikroy Haat</span> and track prices in real-time.
          </p>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition text-sm font-medium mb-6"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-primary transition placeholder:text-sm p-2"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}

            />
            {errors.email && (
              <p className="text-red-500 text-sm absolute">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type={showPass ? 'text' : 'password'}
              name="password"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-primary transition placeholder:text-sm p-2"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm absolute">{errors.password.message}</p>
            )}
            <button onClick={() => setShowPass(!showPass)} type='button' className='absolute top-9 right-4'>
              {
                showPass ?
                  <VscEye />
                  :
                  <VscEyeClosed />
              }
            </button>
          </div>

          <div className="flex justify-end text-sm text-primary font-medium">
            <a href="#" className="hover:underline">Forgot password?</a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition"
          >
            {
              loading ?
                <Spinner />
                :
                'Login'
            }
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <button onClick={() => navigate('/register')} className="text-primary font-medium hover:underline">
            Register now
          </button>
        </p>
      </div>
      <AnimatePresence>
        {
          showAdminCredential &&
          <motion.div
            initial={{  opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}   // 👈 animate down when removed
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className='absolute top-1 lg:top-auto bottom-auto lg:bottom-0'>
            <AdminCredetialsToast setShowAdminCredential={setShowAdminCredential} handleFill={handleFill} />
          </motion.div>
        }
      </AnimatePresence>
    </section>
  );
}

export default Login