import { useContext } from "react";
import Hold from "../../Components/Hold/Hold";
import loginanimation from "../../assets/animation/loginanimation1.json"
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import faviconFacebook from "../../../public/facebook.svg"
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthProviders";
import Swal from "sweetalert2";
import useLoading from "../../hooks/useLoadding";
import { FaFacebook } from "react-icons/fa";
const Login = () => {
    useTitle("Facebook | Login", faviconFacebook);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const isLoading = useLoading();
    const destination = location.state?.from?.pathname || "/"

    // Login with email and password
    const onSubmit = data => {
        console.log(data);

        loginUser(data.email, data.password).then((loggedInUser) => {
            // Signed in 
            const user = loggedInUser.user;
            console.log(user);
            navigate(destination, { replace: true })
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Login Successful',
                // title: `${destination}`,
                showConfirmButton: true,
            })
            // ...
        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error Message: ", errorMessage, "Error Code: ", errorCode);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            });
    }


    return (
        <div>
            {
                isLoading ? <Hold text={"Redirecting To Login Page"} />
                    :
                    <div className="hero min-h-screen my-16 lg:my-0 signin">
                        <div className="hero-content flex-col lg:flex-row-reverse">
                            <div className="text-center lg:text-left">
                                <h5 className="text-center">
                                    Do not have an account yet?
                                    <Link className="" to="/signup"> </Link>

                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="text-blue-500" onClick={() => document.getElementById('my_modal_2').showModal()}>Create new for free!</button>
                                    <dialog id="my_modal_2" className="modal">
                                        <div className="modal-box text-center">

                                            <Link to="/signup" className="flex items-center justify-center bg-base-300 px-5 py-2 gap-2">
                                                <FaFacebook /> Create With Facebook
                                            </Link>
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                            <button>close</button>
                                        </form>
                                    </dialog>
                                </h5>
                                <Lottie animationData={loginanimation} loop={true} />
                            </div>
                            <div className="card flex-shrink-0 w-full max-w-md">
                                <div className="card-body">
                                    <h1 className="text-3xl font-semibold">Login</h1>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input {...register("email", { required: true })} type="text" placeholder="email" className="input input-bordered" />
                                            {errors.email && <span className="text-red-500">This field is required</span>}
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Password</span>
                                            </label>
                                            <input {...register("password", { required: true })} type="password" placeholder="password" className="input input-bordered" />
                                            {errors.password && <span className="text-red-500">This field is required</span>}

                                        </div>
                                        <div className="form-control mt-6">
                                            <button className="btn bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all  duration-300 delay-100">Login</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Login;