import React from 'react'
interface styling {
    Height?: any;
    Width?: any;
    borderRadius?: any
    usePxWidth?: any
    margin?: any
}
const LazyLoading: React.FC<styling> = ({ Height, Width, borderRadius, usePxWidth, margin }) => {
    const style: React.CSSProperties = {
        height: Height + "px",
        width: usePxWidth ? Width + "px" : Width + "%",
        borderRadius: borderRadius + "%",
        border: "none",
        margin: margin
    };
    return (
        <div className='stripe-lazy mb-2' style={style}>

        </div >
    )
}

export default LazyLoading