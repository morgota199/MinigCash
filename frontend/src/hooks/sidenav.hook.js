import {useCallback} from "react";

export const useSidenav = () => {
    return useCallback((elems, options) => {
        return window.M.Sidenav.init(elems, options);
    })
}