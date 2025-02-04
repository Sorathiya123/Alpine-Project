import { useRouteError } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Button from "../Components/Button";
export default function ErrorPage() {
    const error = useRouteError();

    return (

        <><Navbar />
            <div className="flex h-[50vh] flex-col gap-y-20 items-center justify-center">
                <p style={{ color: "red", fontSize: "40px", textAlign: "center" }}>
                    {error.status == "404" ? "404 Page Not Found" : ` ${error}`}
                </p>
                <Button text={"Back To Home"} to="/" />
            </div>

        </>
    );
}
