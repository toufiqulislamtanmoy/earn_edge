import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Page/Provider/AuthProviders";


const useSingleUser = () => {
    const {user} = useContext(AuthContext);
    const { data: singleUser = [], isLoading: loading, refetch:userrefetch } = useQuery( 
        ['singleUser'], 
        async () => {
            const res = await fetch(`http://localhost:5000/singleuser/${user.email}`);
            return res.json();
            
        }
    );

    return { singleUser, loading, userrefetch }; // Return as an object
};

export default useSingleUser;