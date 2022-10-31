import React, { useEffect } from 'react'

export default function Canvas(props) {
    useEffect(() => {
    
        const canvas = window.document.getElementById('canvas')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        canvas.style.position = 'absolute'
        canvas.style.pointerEvents = 'none'
        canvas.style.zIndex = 12;

        const ctx = canvas.getContext('2d')
        ctx.lineWidth = 0.3
        ctx.strokeStyle = "black"

        var keys = Object.keys(props.proxyState)

        window.addEventListener('mousemove', (e) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let offset = 0
            keys.forEach(key => {
                if (props.proxyState[key] && key != "markers") {
                    if (typeof props.proxyState[key] !== 'string') {
                        let keys2 = Object.keys(props.proxyState[key])
                        keys2.forEach(key2 => {
                            if (props.proxyState[key][key2]) {
                                offset+=10
                                ctx.fillText(key + ": " + props.proxyState[key][key2],e.clientX, e.clientY+offset)
                                ctx.stroke()
                            }
                        })
                    }else{
                        offset+=10
                    ctx.fillText(key + ": " + props.proxyState[key],e.clientX, e.clientY+offset)
                    ctx.stroke()
                    }
                }
                
            });
            
            console.log(props.proxyState.f)
            ctx.fillText("x: " + e.clientX + " y: " + e.clientY, e.clientX, e.clientY)
            ctx.stroke()
        })
    }, [])


  return (<canvas id="canvas"></canvas>);
}
