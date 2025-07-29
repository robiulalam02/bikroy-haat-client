import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './router/router.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import Aos from 'aos'
import 'aos/dist/aos.css';
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient();

Aos.init({
  duration: 1000,
  easing: 'ease',
  once: true,
  mirror: false,
  offset: 300
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
