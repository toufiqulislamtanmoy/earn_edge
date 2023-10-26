import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faCommentsDollar, faEuroSign, } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Page/Provider/AuthProviders";
import { useContext } from "react";
const Navbar = () => {
    const location = useLocation();
    // const user = true;
    const { user, logout } = useContext(AuthContext);

    const handelLogOut = async () => {
        logout();
    }

console.log(user);

    return (
        <div className="navbar bg-[#c6dcf9] rounded-md bg-clip-padding backdrop-filter  bg-opacity-70 px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link className={`hover:text-info hover:transition-colors hover:duration-500 ${location.pathname === '/' ? 'text-info' : ''}`} to="/">Home</Link></li>

                        <li><Link className={`hover:text-info hover:transition-colors hover:duration-500 ${location.pathname === '/books' ? 'text-info' : ''}`} to="/books">Books</Link></li>

                        <li><Link className={`hover:text-info hover:transition-colors hover:duration-500 ${location.pathname === '/magazines' ? 'text-info' : ''}`} to="/magazines">Magazines</Link></li>

                        <li><Link className={`hover:text-info hover:transition-colors hover:duration-500 z-20 ${location.pathname === '/newspaper' ? 'text-info' : ''}`} to="/newspaper">Newspaper</Link></li>
                    </ul>
                </div>
                <Link to="/" className=" normal-case text-xl hidden lg:block">
                    {/* <img className="w-full" src={logo} alt="Not FOund" /> */}
                    Earn Edge <FontAwesomeIcon icon={faCoins} />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link className={`hover:text-info hover:transition-colors hover:duration-500 ${location.pathname === '/' ? 'text-info' : ''}`} to="/">Home</Link></li>

                    <li><Link className={`hover:text-info hover:transition-colors hover:duration-500 ${location.pathname === '/task' ? 'text-info' : ''}`} to="/task">Tasks</Link></li>

                    <li><Link className={`hover:text-info hover:transition-colors hover:duration-500 ${location.pathname === '/magazines' ? 'text-info' : ''}`} to="/magazines">Magazines</Link></li>

                    <li><Link className={`hover:text-info hover:transition-colors hover:duration-500 z-20 ${location.pathname === '/newspaper' ? 'text-info' : ''}`} to="/newspaper">Newspaper</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <div className="flex space-x-3">
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <FontAwesomeIcon className="text-2xl" icon={faCommentsDollar} />
                                    </div>
                                </label>
                                <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                                    <div className="card-body">
                                        <span className="font-bold text-lg">0.21 <FontAwesomeIcon icon={faEuroSign} /></span>

                                        <div className="card-actions">
                                            <Link
                                                to="/userdashboard/userCart"
                                                className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 delay-100 btn-block text-center'

                                            >
                                                Withdraw Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL}  title={user.displayName}/>
                                        <h2></h2>
                                    </div>
                                </label>
                                <ul tabIndex={0} className="z-20 menu menu-sm dropdown-content mt-3 p-2 shadow rounded-box w-52 bg-base-100">
                                    <li>
                                        <Link to="/userdashboard/userCart" className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>

                                    <li><button onClick={handelLogOut}>Logout</button></li>
                                </ul>
                            </div>
                        </div>
                        :

                        <div>
                            <Link to="/login">Sign In</Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;