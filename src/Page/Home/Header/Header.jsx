import Lottie from "lottie-react";
import banner from "../../../assets/animation/banner.json"
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div className='bg-[#F9F9FF] px-3 lg:px-16 z-[-10]'>
            <div className='lg:flex flex-row-reverse items-center justify-center'>
                <div className='w-full lg:w-1/2'>
                    <Lottie animationData={banner} loop={true} />
                </div>
                <div className='w-full lg:w-1/2'>
                    <h2 className='text-5xl font-bold tracking-wider font-Kaushan'>Your Referrals, Your <span className="text-orange-300">Rewards!</span> </h2>
                    <p className='my-5 font-mono text-justify'>Share, Task, Earn! Instant rewards for referrals and completing simple tasks. Join now!</p>


                    <div className='text-center lg:text-left py-5 lg:py-0'>

                        <Link
                            to='/'
                            className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all  duration-300 delay-100'

                        >
                            Refer Now
                        </Link>

                    </div>


                </div>

            </div>


        </div>
    );
};

export default Header;