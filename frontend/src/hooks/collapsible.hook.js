import {useCallback} from "react";

export const useCollapsible = () => {
    return useCallback((elem, options)=> {
        if (window.M && elem && options) window.M.Collapsible.init(elem, options);
    }, []);
};