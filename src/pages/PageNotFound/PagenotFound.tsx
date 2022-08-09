import { useNavigate } from "react-router"

export const PageNotFound = () => {
    const navigate = useNavigate();
    return <div className="d-flex ai-center jc-center f-direction-col gap-10 p-lg" style={{ height: `100vh` }}>
        <div className="my-lg py-lg">

            <img src="https://res.cloudinary.com/dmk11fqw8/image/upload/v1656868027/image_2_vkgwd6.jpg" alt="404 Page Not Found"
                className="w-100"
            />
        </div>
        <div className="header-tertiary text-white my-lg py-lg">Oopss..! We are lost, it seems..!</div>
        <div>
            <button className="btn btn-danger  my-lg"
                onClick={() => navigate(`/`)}
            >Lets get back! <span role={`img`}>😎</span></button>
        </div>
    </div>
}