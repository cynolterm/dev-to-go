import "./header.css";
import LoginButton from "./LoginButton";

function DevToGoHeader() {
    


    return(
        <div className="dev-to-go-header">
            <div></div>
            <h1>Developer To Go</h1>
            <div>
                <LoginButton></LoginButton>
            </div>
        </div>
    )
}

export default DevToGoHeader;