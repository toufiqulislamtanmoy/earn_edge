import Lottie from "lottie-react";
import loginanimation from "../../assets/animation/loginanimation.json"
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthProviders";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import Hold from "../../Components/Hold/Hold";
import useLoading from "../../hooks/useLoadding";

const Signup = () => {
    const [phone, setPhone] = useState('');

    const isLoading = useLoading();


    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser,updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(phone);
    }, [phone]);

    const referralCode = Math.floor(100000 + Math.random() * 900000);
    const imgurl = "https://i.ibb.co/x3LC9CX/user.png";
    const onSubmit = data => {
        const userDetails = { ...data, phone, balance: 0.21, referralCode, restricted: false };
        console.log(userDetails);

        createUser(data.email, data.password).then((logedUser) => {
            console.log(logedUser);
            updateUserProfile(data.name, imgurl).then(() => {
                /********Insert user details in the database********/
                fetch('http://localhost:5000/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userDetails)
                }).then(res => res.json())
                    .then(data => {
                        // reset();
                        // logout();
                        console.log(data)
                        navigate("/", { replace: true });
                    });
            });
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${errorMessage} - ${errorCode}`,
            });
        });
    };

    return (
        <>
            {
                isLoading ? <Hold text={"Redirecting to Sign Up page"} /> :
                    <div className="hero min-h-screen my-16 lg:my-0 bg-[#F9F9FF]">
                        <div className="hero-content flex-col lg:flex-row-reverse">
                            <div className="text-center lg:text-left">
                                <h5 className="text-center">
                                    Already have an account?
                                    <Link className="text-blue-500" to="/login"> Move on to login!</Link>
                                </h5>
                                <Lottie animationData={loginanimation} loop={true} />
                            </div>
                            <div className="card flex-shrink-0 w-full max-w-md">
                                <div className="card-body">
                                    <h1 className="text-3xl font-semibold">Sign Up</h1>
                                    <form onSubmit={handleSubmit(onSubmit)}>


                                        {/* Name */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Username</span>
                                            </label>
                                            <input {...register("name", { required: true })} type="text" placeholder="username" className="input input-bordered" />
                                            {errors.name && <span className="text-red-500">This field is required</span>}
                                        </div>


                                        {/* Phone Number */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Phone Number</span>
                                            </label>
                                            <PhoneInput
                                                country={'ru'}
                                                value={phone}
                                                onChange={setPhone}
                                            />
                                        </div>


                                        {/* Email */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Recovery Email</span>
                                            </label>
                                            <input {...register("email", { required: true })} type="email" placeholder="Recovery email" className="input input-bordered" />
                                            {errors.email && <span className="text-red-500">You did not enter recovery email</span>}
                                        </div>

                                        {/* Password */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Password</span>
                                            </label>
                                            <input {...register("password", {
                                                required: true,
                                                minLength: 6,
                                                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{};':"\\|,.<>/?]).+$/
                                            })} type="password" placeholder="password" className="input input-bordered" />
                                            {errors.password?.type === 'minLength' && <p className="text-red-500">Password Must be 6 Charecter Long</p>}
                                            {errors.password?.type === 'pattern' && <p className="text-red-500">Password must have one uppercase lowercase symbol and number</p>}
                                            {errors.password?.type === 'required' && <span className="text-red-500">This field is required</span>}
                                        </div>

                                        {/* Submit Button */}
                                        <div className="form-control mt-6">
                                            <button className="btn btn bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all  duration-300 delay-100">Sign Up</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </>
    );
};

export default Signup;