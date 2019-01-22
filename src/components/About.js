import React from 'react'

import './About.css'

export default function About(props){
    const {copyright, date, explanation, title, url} = props.imageOfTheDay
    // console.log(url.replace('https://apod.nasa.gov/apod/image/', ''))
  
    return (
        <div id='imageInfo'>
            <pre><strong>Title:</strong> {title}      <strong>Date:</strong> {date}</pre>
            <p><strong>Explanation:</strong> {explanation}</p>
            <pre><strong>Copyright:</strong> {copyright}      <strong>HD URL:</strong><a id ='link' target='blank' href={url} download>{url}</a></pre>
        </div>
    )
}