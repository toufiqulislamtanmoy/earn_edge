import Lottie from "lottie-react";
import banner from "../../../assets/animation/banner.json"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProviders";
import { FaCopy } from "react-icons/fa";
const Header = () => {
    const authContext = useContext(AuthContext);
    const { user } = authContext || {};
    const userEmail = user?.email || '';

    const [singleUser, setSingleUser] = useState([]);
    const [copySuccess, setCopySuccess] = useState(false);
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        // Only fetch data if userEmail is truthy (not null, undefined, or empty string)
        if (userEmail) {
            fetch(`https://rw-server-gkzvfj4px-toufiqulislamtanmoy.vercel.app/singleuser/${userEmail}`)
                .then(res => res.json())
                .then(data => {
                    setSingleUser(data);
                });
        }
    }, [userEmail]);



    const handleCopyClick = () => {
        // Select the input field
        const inputField = document.getElementById('referralCodeInput');

        // Select the text in the input field
        inputField.select();
        inputField.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text to the clipboard
        document.execCommand('copy');

        // Update state to show copy success message
        setCopySuccess(true);

        // Reset copy success message after a few seconds
        setTimeout(() => {
            setCopySuccess(false);
        }, 2000);
    };
    return (
        <div className='bg-[#F9F9FF] px-3 lg:px-16 z-[-10]'>
            <div className='lg:flex flex-row-reverse items-center justify-center'>
                <div className='w-full lg:w-1/2'>
                    <Lottie animationData={banner} loop={true} />
                </div>
                <div className='w-full lg:w-1/2'>
                    <h2 className='text-5xl font-bold tracking-wider font-Poppins'>Your Referrals, Your <span className="text-orange-300">Rewards!</span> </h2>
                    <p className='my-5 font-mono text-justify'>Share, Task, Earn! Instant rewards for referrals and completing simple tasks. Join now!</p>


                    <div className='text-center lg:text-left py-5 lg:py-0'>


                        <button
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 delay-100"
                            onClick={() => {
                                const modal = document.getElementById('my_modal_2');
                                if (singleUser && singleUser.myReferCode) {
                                    modal.showModal();
                                }
                            }}
                            disabled={!singleUser || !singleUser.myReferCode}
                        >
                            Refer Now
                        </button>


                        <dialog id="my_modal_2" className="modal">
                            <div className="modal-box space-y-3">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Your Refer Code</span>
                                    </label>
                                    <input
                                        id="referralCodeInput"
                                        type="text"
                                        value={singleUser.myReferCode}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        readOnly
                                        className="focus:border-none focus:outline-none"

                                    />
                                </div>
                                <div className="">
                                    
                                    <button onClick={handleCopyClick}><FaCopy/></button>
                                    {copySuccess && <span className="text-green-500 font-extralight ml-3">Code copied to clipboard!</span>}
                                </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>

                    </div>


                </div>

            </div>


        </div>
    );
};

export default Header;