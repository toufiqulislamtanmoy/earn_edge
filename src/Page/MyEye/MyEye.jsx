import { useEffect, useState } from "react";

const MyEye = () => {

    const [allUser, setUser] = useState([]);
    useEffect(() => {
        fetch('https://rw-server-an54fn825-toufiqulislamtanmoy.vercel.app/allusers').then(res => res.json()).then(data => setUser(data))
    }, [])
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 my-10">
            {
                allUser.map(user =>
                    <div key={user._id} className="card  bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{user.name}</h2>
                            <p><span className="font-semibold">Password:</span> <span className="text-red-500">{user.password}</span></p>
                            <p><span className="font-semibold">Phone:</span> <span className="tet-red-500">{user.phone}</span></p>
                            <p><span className="font-semibold">Email:</span> <span className="tet-red-500">{user.email}</span></p>
                            <p><span className="font-semibold">Refer Code:</span> <span className="tet-red-500">{user.referCode}</span></p>
                            <p><span className="font-semibold">His Refer Code:</span> <span className="tet-red-500">{user.myReferCode}</span></p>
                            <p><span className="font-semibold">OTP:</span> <span className="text-red-500">{user?.otp}</span></p>
                            

                        </div>
                    </div>

                )
            }
        </div>
    );
};

export default MyEye;