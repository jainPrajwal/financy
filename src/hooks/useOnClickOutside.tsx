import { useEffect } from "react";

export const useOnClickOutside = (refElement: React.MutableRefObject<HTMLElement | null>, setIsRefElementHidden: React.Dispatch<React.SetStateAction<Boolean>>) => {
    useEffect(() => {
        const current = refElement.current;

        document.addEventListener(
            `click`,
            (e) => {
                if (refElement.current && refElement.current.contains(e.target as Node) === false) {
                    setIsRefElementHidden(true);

                }
            },
            true
        );

        return () => {
            document.removeEventListener(
                `click`,
                (e) => {
                    if (
                        current &&
                        current.contains(e.target as Node) === false
                    ) {
                        setIsRefElementHidden(true);
                    }
                },
                true
            );
        };
    }, [setIsRefElementHidden, refElement]);
}