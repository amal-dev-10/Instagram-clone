import React from 'react'
import './ItemsIndicator.css'

type props = {
    selected: number,
    items: number
}

function ItemsIndicator(props: props) {
  return (
    <div className='itemsWrapper flexCenter'>
        {
            Array.from({length: props?.items || 0 }, (_, i) => i + 1).map((x, i:number)=>{
                return (
                    <span className={`item flexCenter ${props.selected === i ? 'selected': ''}`}></span>
                )
            })
        }
    </div>
  )
}

export default ItemsIndicator