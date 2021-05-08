import React, { useRef, useEffect, useState } from "react";

function Countdown() {
    const [num, setNum] = useState(10)
    const [pause, setPause] = useState(false)
    let intervalRef = useRef()
    
    const decreaseNum = () => setNum((prev) => prev - 1)

    useEffect(() => {
        setPause(false)
        intervalRef.current = setInterval(decreaseNum, 1000);
    
        return () => clearInterval(intervalRef.current);
      }, []);

    const handleCountdown = () => {
        if(!pause || num < 0) {
            clearInterval(intervalRef.current);
        } 
        else {
            intervalRef.current = setInterval(decreaseNum, 1000);
        }
    }
    
    return(
        <div onLoad = {handleCountdown}>
            {num}
        </div>
    )
}

export default Countdown
