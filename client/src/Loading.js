import Lottie from "lottie-react"
import loadingAnimation from "./assets/loadingAnimation.json"

const Loading = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-black">
            <Lottie animationData={loadingAnimation}/>
        </div>
    )
}

export default Loading;