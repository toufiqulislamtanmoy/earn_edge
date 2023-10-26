import { useEffect } from "react";

const useTitle = (title,faviconUrl) => {
    useEffect(() => {
        document.title = `${title} `;

        // Change favicon
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            favicon.href = faviconUrl;
        } else {
            // If favicon element doesn't exist, create it
            const newFavicon = document.createElement('link');
            newFavicon.rel = 'icon';
            newFavicon.href = faviconUrl;
            document.head.appendChild(newFavicon);
        }

        // Cleanup on component unmount (optional)
        return () => {
            if (favicon) {
                // Restore the original favicon when the component is unmounted
                favicon.href = '/original-favicon.ico'; // Replace with the path to your original favicon
            }
        };
    }, [title, faviconUrl]);    
};

export default useTitle;