import { PiSpinnerGapLight } from "react-icons/pi"

export default function Loading() {
    return (
        <div className="w-full flex justify-center mt-6">
            <PiSpinnerGapLight size={60} color="#fff" className="animate-spin" />
        </div>  
    )
}
