import React from 'react'

const AdminCredetialsToast = ({setShowAdminCredential, handleFill}) => {
    return (
        <div class="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg" role="alert" tabindex="-1" aria-labelledby="hs-toast-condensed-label">
            <div class="flex p-4 gap-1">
                <p id="hs-toast-condensed-label" class="text-sm">
                    login using admin credential?
                </p>

                <div class="ms-auto flex items-center space-x-3">
                    <button onClick={handleFill} type="button" class="text-blue-600 decoration-2 hover:underline font-medium text-sm focus:outline-hidden focus:underline dark:text-blue-500">
                        use
                    </button>
                    <button onClick={()=> setShowAdminCredential(false)} type="button" class="inline-flex shrink-0 justify-center items-center size-5 rounded-lg opacity-50 hover:opacity-100 focus:outline-hidden focus:opacity-100" aria-label="Close">
                        <span class="sr-only">Close</span>
                        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminCredetialsToast
