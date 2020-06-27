import {useCallback} from "react";

export const useDate = () => {
    return useCallback((elem, options) => {
        if(window.M && elem && options) window.M.Datepicker.init(elem, options);
    }, [])
}