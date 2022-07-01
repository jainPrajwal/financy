import { ProviderProps } from "../../constants/videos.types"

export const FlexContainer = ({ children }: ProviderProps) => {
    return <div className="d-flex ai-center jc-center w-100">
        {children}
    </div>
}