import { useNavigate } from "react-router"

export const Fallback = ({ fallbackTitle }: { fallbackTitle: string }) => {
    const navigate = useNavigate();
    return <div className="header-secondary text-white d-flex ai-center w-100 jc-center f-direction-col gap-10">

        <span>{fallbackTitle} </span>
        <button className="btn btn-danger" onClick={() => {
            navigate(`/`)
        }}>
            <span>Explore Videos</span>
        </button>

    </div>
}