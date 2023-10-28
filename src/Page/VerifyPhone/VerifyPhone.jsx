import { useContext, useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import "./style.css";
import { AuthContext } from '../Provider/AuthProviders';
import maskPhoneNumber from '../../hooks/maskPhoneNumber';
import { useForm } from 'react-hook-form';
import Hold from '../../Components/Hold/Hold';
import { useNavigate } from 'react-router-dom';

const VerifyPhone = () => {
    const { handleSubmit } = useForm();
    const { user: { email } } = useContext(AuthContext);
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(180); // 180 seconds = 3 minutes
    const [showResendButton, setShowResendButton] = useState(false);
    const [mp, setMaskPhone] = useState('');
    const [isPatchSuccessful, setIsPatchSuccessful] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        email && fetch(`https://rw-server-gkzvfj4px-toufiqulislamtanmoy.vercel.app/singleuser/${email}`).then(res => res.json()).then(data => {
            setMaskPhone(maskPhoneNumber(data.phone))
        })
    }, [email])


    const handleChange = (otpValue) => {
        setOtp(otpValue);
        console.log(otp);
    };


    useEffect(() => {
        // Start the countdown timer
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        // Clear the interval when the timer reaches zero and show the Resend OTP button
        if (timer === 0) {
            clearInterval(interval);
            setShowResendButton(true);
        }

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, [timer]);

    const handleResendClick = () => {
        // Logic for resending OTP
        // Reset the timer to 3 minutes and hide the Resend OTP button
        setTimer(180);
        setShowResendButton(false);
    };


    const onSubmit = data => {

        console.log(otp, data);

        email && fetch(`https://rw-server-gkzvfj4px-toufiqulislamtanmoy.vercel.app/users/update/${email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers if needed, such as authentication headers
            },
            body: JSON.stringify({ otp }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the successful response data
                console.log('PATCH request was successful', data);
                setIsPatchSuccessful(true);

                setTimeout(() => {

                    setIsPatchSuccessful(false);
                    navigate("/", { replace: true });
                }, 30000);


            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });


    };


    return (
        <>
            {
                isPatchSuccessful ? <Hold text={"Wait a minute, Don't Close the Window or Refresh"} /> :
                    <div className="flex items-center justify-center min-h-screen bg-blend-darken">
                        <div className="">
                            <h1 className="text-3xl font-bold">Enter OTP</h1>
                            <p className="">We have Sent you an OTP on +{mp}</p>
                            <form className='text-center' onSubmit={handleSubmit(onSubmit)}>
                                {/* <input hidden={true} type="text" value={otp} {...register("name", { required: true })} /> */}
                                <OtpInput
                                    value={otp}
                                    onChange={handleChange}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    placeholder="0" // You can customize the placeholder character
                                    containerStyle={{ margin: '20px 0' }} // Custom styles for the container
                                    inputStyle={{
                                        width: '40px', height: '40px',
                                        border: '2px solid #4CAF50', // Set the border color to green
                                        borderRadius: '5px', // Optional: Add rounded corners to the container
                                        boxShadow: '0 0 10px #4CAF50', // Add a glowing effect with green shadow
                                        transition: 'box-shadow 0.3s ease', // Smooth transition for the glowing effect
                                        padding: '10px', // Optional: Add padding to the container
                                        margin: '20px auto', // Optional: Center the container horizontally and add vertical margin
                                    }}
                                    renderInput={(props) => <input {...props} />}
                                />

                                <button className='bg-gradient-to-r from-green-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 transition-delay-300 btn-block text-center'>Verify Now</button>

                            </form>
                            {timer > 0 ? (
                                <div>Request New OTP after: <span className='text-red-400'>{timer}</span> sec</div>
                            ) : (
                                showResendButton && <button onClick={handleResendClick} >Resend OTP</button>
                            )}
                        </div>
                    </div>
            }

        </>

    );
};

export default VerifyPhone;