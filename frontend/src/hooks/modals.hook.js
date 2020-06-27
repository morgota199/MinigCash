import {useCallback} from "react";

export const useModal = () => {
    return useCallback((elems, options) => {
        return window.M.Modal.init(elems, options);
    })
}