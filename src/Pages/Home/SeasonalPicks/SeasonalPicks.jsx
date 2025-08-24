import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Typewriter } from 'react-simple-typewriter'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

export default function SeasonalPicks() {
  const navigate = useNavigate();
  return (
    <div className="h-[700px] max-w-screen-3xl mx-auto overflow-hidden">
      <div className="z-30 relative items-center h-full justify-center">
        <div className="inset-0 h-full bg-cover bg-center "
          style={{ backgroundImage: 'url("/market-banner.jpg")' }}
        >
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center h-full w-full bg-gray-900/75"></div>


        <div className="absolute inset-1 z-50 h-full flex flex-col text-center justify-center items-center mx-auto max-w-screen-2xl px-4">
          <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Connecting Communities with Everyday <br />
            <span className="text-primary">
              <Typewriter
                words={['Essentials', 'Products', 'Services', 'Care', 'Support']}
                loop={0} // 0 = infinite
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h1>
          <p class="mb-6 text-base font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">At Bikroy Haat, we bring transparency, convenience, and trust to your shopping experience. Discover real-time market prices, compare trends, and shop directly from trusted local vendors. all in one reliable platform.</p>
          <button onClick={() => navigate('/about-us')} href="#" class="inline-flex items-center justify-center px-5 py-3 text-sm md:text-base font-medium text-center text-white bg-primary rounded-lg">
            Learn more
            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        </div>

        {/* <div className="absolute inset-0 z-30 flex flex-col items-center justify-center mx-auto max-w-screen-2xl">
          <div data-aos="flip-up" className="shadow-2xl rounded-lg h-96 bg-cover bg-center bg-[url(/market-banner.jpg)] overflow-hidden">


            <div className="grid grid-cols-12">
              <div className="relative px-8 col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-7 xxl:col-span-7">
                <div className="bg-black/30 h-full w-full inset-0 absolute" />

                <div className="md:border-l-4 border-gray-400 h-[90%] my-5 flex items-center px-5 mx-5 absolute left-0">
                  <p className="italic text-white text-xl md:text-4xl lg:text-6xl uppercase text-center  font-semibold hidden md:block">
                    THE POWER OF LOCAL MARKETS
                  </p>
                </div>
                <div className="absolute border-gray-400 border-t-4 mb-5 ml-5 bottom-0 py-1 px-4 w-4/5 hidden md:block"></div>
              </div>
              <div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-5 xxl:col-span-5">
                <div className="relative bg-primary h-full md:h-96 w-full bg-opacity-50 rounded-tr-lg rounded-br-lg">
                  <div className="p-8">
                    <p className="text-base-200 text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl mb-4">
                      Local markets are the heartbeat of our communities. From fresh vegetables to handcrafted goods, these markets connect people with the essence of daily life. At Bikroy Haat, we bring that vibrant marketplace online—making it easier to discover, buy, and sell fresh and affordable items near you. Whether you're a buyer looking for daily essentials or a vendor reaching out to your neighborhood, your haat is now just a click away.
                    </p>
                    <div className="bottom-0 absolute p-2 right-0">
                      <button onClick={() => navigate('/all-products')} className="opacity-75 bg-gray-100 hover:bg-primary hover:text-white text-xs sm:text-sm font-bold py-2 px-4 rounded inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>EXPLORE NOW</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

    </div>
  );
}
