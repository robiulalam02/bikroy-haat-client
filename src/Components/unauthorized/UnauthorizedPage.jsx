import React from 'react';
import { useNavigate } from 'react-router';

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center transform hover:scale-105 transition-transform duration-300 border border-gray-200">
                <div className="mb-6">
                    <svg className="mx-auto h-24 w-24 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                    </svg>
                </div>
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Unauthorized Access</h1>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    It looks like you don't have permission to view this page. This could be due to an expired session, insufficient privileges, or an invalid request.
                </p>
                <p className="text-gray-500 text-sm mb-8">
                    Please log in again or contact support if you believe this is an error.
                </p>
                <button
                    onClick={handleGoToLogin}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;