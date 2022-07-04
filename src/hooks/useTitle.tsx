import { useEffect } from "react"

export const useTitle = ({ title }: { title: string }) => {
    useEffect(() => {
        document.title = `${`Financy | ${title}`}`
    }, [])
}