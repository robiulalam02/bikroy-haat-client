import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Submit handler
    const onSubmit = (data) => {
        toast.success("Message sent successfully!");
        reset()
    };

    // Error handler
    const onError = () => {
        toast.error("Please fill all required fields!");
    };

    return (
        <section className="bg-white max-w-screen-2xl mx-auto min-h-dvh my-10 rounded-2xl p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <h2 className="text-2xl font-semibold">Send Message</h2>
                    <p className="text-gray-600 text-sm">
                        We’d love to hear from you! Whether you have a question about our
                        services, need assistance, or just want to share your feedback, our
                        team is here to help. Simply fill out the form below and we’ll get
                        back to you as soon as possible. Your thoughts and inquiries are
                        valuable to us, and we strive to provide you with the best support
                        experience.
                    </p>

                    <form
                        className="mt-5 space-y-5"
                        onSubmit={handleSubmit(onSubmit, onError)}
                    >
                        {/* Name */}
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-600 text-sm">Your Name</label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className="bg-slate-100 h-10 px-2 placeholder:text-sm rounded focus:outline-1 outline-primary"
                                placeholder="Enter your name"
                            />
                            {errors.name && (
                                <span className="text-red-500 text-xs">Name is required</span>
                            )}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-600 text-sm">Your Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="bg-slate-100 h-10 px-2 placeholder:text-sm rounded focus:outline-1 outline-primary"
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <span className="text-red-500 text-xs">Email is required</span>
                            )}
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-600 text-sm">Message</label>
                            <textarea
                                {...register("message", { required: true })}
                                cols="30"
                                rows="6"
                                className="bg-slate-100 p-2 rounded focus:outline-1 outline-primary"
                                placeholder="Type your message..."
                            ></textarea>
                            {errors.message && (
                                <span className="text-red-500 text-xs">
                                    Message is required
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary text-primary bg-transparent border border-primary hover:bg-primary hover:text-white transition ease-in-out"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Image */}
                <div className="flex items-center justify-center">
                    <img src="contact-us.svg" alt="contact us" />
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
