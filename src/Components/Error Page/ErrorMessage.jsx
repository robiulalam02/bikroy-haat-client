import React from "react";
import error from "../../assets/error.png"
import { useNavigate } from "react-router";

const ErrorMessage = () => {
    const navigate = useNavigate()
    return (
        <section className="relative z-10 py-[120px]">
            <div className="container mx-auto">
                <div className="-mx-4 flex">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[400px] text-center flex flex-col items-center">
                            <img className="w-20 mb-4" src={error} alt="" />
                            <h4 className="mb-3 text-[22px] font-semibold leading-tight text-rose-600">
                                Oops! Internal Server Error
                            </h4>
                            <p className="mb-8 text-lg ">
                                The page you are looking for it maybe deleted
                            </p>
                            <button
                                onClick={()=>navigate('/')}
                                className="inline-block rounded-lg border border-primary px-8 py-3 text-center text-primary font-semibold  transition hover:bg-primary hover:text-white"
                            >
                                Go To Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
                <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
                <div className="flex h-full w-1/3">
                    <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
                    <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
                </div>
                <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
            </div>
        </section>
    );
};

export default ErrorMessage;
