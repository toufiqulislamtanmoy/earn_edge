import { useEffect, useState } from "react";

const useLoading = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // 3000 milliseconds = 3 seconds

        return () => clearTimeout(timeout);
    }, []);

    return isLoading;
};

export default useLoading;
