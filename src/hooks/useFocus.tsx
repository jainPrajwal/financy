import { useEffect } from "react";

export const useFocus = (inputRef: React.MutableRefObject<HTMLInputElement | null>, shouldFocus: Boolean) => {
    useEffect(() => {
        if (shouldFocus) {
            inputRef.current?.focus();
           
        }
    }, [inputRef, shouldFocus])
}