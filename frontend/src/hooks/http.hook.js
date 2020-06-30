import {useCallback, useState} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false),
        [error, setError] = useState(null);

    const request = useCallback(async (URL, method="GET", body=null, headers={}) => {
        setLoading(true);
        try{
            if(body){
                body = JSON.stringify(body);
                headers["Content-Type"] = "application/json"
            }

            const response = await fetch(URL, {method, body, headers}),
                  data     = await response.json();

            setLoading(false);
            return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => {setError(null)}, []);

    return {loading, error, clearError, request};
};