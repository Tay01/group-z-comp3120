import React, { useEffect } from 'react'

export default function MenuSlider(props) {
    const sliderRef = React.useRef(null);
    const valueRef = React.useRef(null);
    
    useEffect(() => {


        const slider = sliderRef.current;
        const value = valueRef.current;

        slider.addEventListener('input', () => {
            value.innerHTML = slider.value;})

        slider.addEventListener('mouseup', () => {
            console.log("let go")
            props.releaseFn(slider.value)
        })


    })


  return (
    <div className="sliderComponent">
        <p className='sliderTitle'>{props.title}</p>
        <input ref={sliderRef} type="range" min={props.min} max={props.max} value={props.value} className="slider"/>
        <p ref={valueRef} className='sliderValue'></p><p>{props.units}</p>
    </div>
  )
}
