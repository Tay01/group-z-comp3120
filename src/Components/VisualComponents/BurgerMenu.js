import React from 'react'

export default function BurgerMenu(props) {
    const useInlineCSS = false;

    if(!useInlineCSS){
        return (
            <div class="burgerMenu">
                <div className="burgerMenu__line burgerMenu__line--top"></div>
                <div className="burgerMenu__line burgerMenu__line--middle"></div>
                <div className="burgerMenu__line burgerMenu__line--bottom"></div>
            </div>
            )
    }else{
        return (
            <div class="burgerMenu" style={{position: "relative", top: "0", left: "0", width: "3em", height: "3em", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", padding: "0.5em", boxSizing: "border-box"}}>
                <div class="burgerMenu__line burgerMenu__line--top" style={{width: "100%", height: "5px", backgroundColor: "black"}}></div>
                <div class="burgerMenu__line burgerMenu__line--middle" style={{width: "100%", height: "5px", backgroundColor: "black"}}></div>
                <div class="burgerMenu__line burgerMenu__line--bottom" style={{width: "100%", height: "5px", backgroundColor: "black"}}></div>
            </div>
        )
    }

}
