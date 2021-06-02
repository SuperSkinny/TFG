import React, { useRef, useEffect, useState } from "react";

function Countdown() {
    const [num, setNum] = useState(3)
    const [pause, setPause] = useState(false)
    let intervalRef = useRef()
    
    // const decreaseNum = () => setNum((prev) => prev - 1)

    const tick = () => {
   
        if (num === 0) {
            setPause(true)
            setTimeout( () => reset(), 2000)
        } else {
            setNum(num - 1);
        }
    };


    const reset = () => setNum(3);

    
    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    // useEffect(() => {
    //     setPause(false)
    //     intervalRef.current = setInterval(decreaseNum, 1000);
    
    //     return () => clearInterval(intervalRef.current);
    //   }, []);

    // const handleCountdown = () => {
    //     if(!pause || num <= 0) {
    //         clearInterval(intervalRef.current);
    //     } 
    //     else {
    //         intervalRef.current = setInterval(decreaseNum, 1000);
    //     }
    // }
    
    return(
        <div >
            <span className="cardResult">
                {num}
            </span>
        </div>
    )
}

export default Countdown
