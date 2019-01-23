import React from 'react'
import './Header.css'

export default function Header (props){
    return (
            <header>
                <div id='buttons'>
                    <button
                        className='button'
                        onClick={() => props.saveToFavorites()}
                        >Save to Favorites
                    </button>
                </div>
                <h1 id='title'>TEST's Image of the Day</h1>
                <div id='buttons'>
                    <button 
                        className='button'
                        onClick={() => props.randomDate()}
                        >Random Date
                    </button>
                </div>
            </header>
    )
}