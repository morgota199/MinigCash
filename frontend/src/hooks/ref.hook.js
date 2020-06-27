import {useState, useCallback, useEffect} from 'react';

const storageName = "RefId";

export const useReference = () => {
    const [ref, setRef] = useState(null);

    const loginRef = useCallback((refId) => {
        setRef(refId);

        localStorage.setItem(storageName, JSON.stringify({refId}));
    }, []);

    const logoutRef = useCallback(() => {
        setRef(null);

        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const dataRefId = JSON.parse(localStorage.getItem(storageName));

        if(dataRefId && dataRefId.refId){
            loginRef(dataRefId.refId)
        }

    }, [loginRef]);

    return { loginRef, logoutRef, ref };
};