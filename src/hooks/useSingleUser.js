import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Page/Provider/AuthProviders";


const useSingleUser = () => {
    const {user:{email}} = useContext(AuthContext);
    const { data: singleUser = [], isLoading: loading, refetch:userrefetch } = useQuery( 
        ['singleUser'], 
        async () => {
            const res = await fetch(`https://rw-server-gkzvfj4px-toufiqulislamtanmoy.vercel.app/singleuser/${email}`);
            return res.json();
            
        }
    );

    return { singleUser, loading, userrefetch }; // Return as an object
};

export default useSingleUser;