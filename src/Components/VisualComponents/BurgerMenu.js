import React from 'react'
import { state, useState } from 'react'

const BurgerMenu = React.forwardRef((props, ref) => {


        return (
          <div ref={ref} class="burgerMenu">
            <div className="burgerMenu__line burgerMenu__line--top "></div>
            <div className="burgerMenu__line burgerMenu__line--middle "></div>
            <div className="burgerMenu__line burgerMenu__line--bottom "></div>
          </div>
        );
    

})

export default BurgerMenu