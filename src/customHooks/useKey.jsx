import { useEffect } from "react";

const useKey = (key, action) => {
    useEffect(() => {
        const callBack = () =>
            document.addEventListener("keydown", (e) => {
                if (e.code.toLowerCase() === key.toLowerCase()) {
                    action();
                }
            });

        document.addEventListener('keydown', callBack);

        return () => {
            document.removeEventListener('keydown', callBack)
        }
    }, [action, key])
}

export default useKey