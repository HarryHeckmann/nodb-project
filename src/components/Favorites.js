import React, { Component } from 'react';
import edit from './Images/edit_white.png';
import whiteDelete from './Images/white_delete.png'

import './Favorites.css'

 class Favorites extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className='favoriteCard'>
                <img src={this.props.hdurl} className='thumbnail' onClick={() => this.props.imageClick(this.props.id)}/>
                <div className='container'>
                    <h5>{this.props.title}</h5>
                    <h5>{this.props.date}</h5>
                    <div className='editDelete'>
                        <img className='editDeleteImage' src={edit} onClick={()=> this.props.displayEditForm(this.props.id)}/>
                        <img className='editDeleteImage' src={whiteDelete} onClick={()=> this.props.deleteFavorite(this.props.id)}/>
                    </div>
                </div>
            </div>
        )
    
    }
}

export default Favorites