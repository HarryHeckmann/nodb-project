import React, { Component } from 'react';

import './EditFavorites.css'

export default class EditFavorites extends Component {
    constructor(props){
        super(props)
        this.state = {
            editTitle: '',
            editDate: '',
            editExplanation: ''
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(e){
        const name = e.target.name

        this.setState({[name]: e.target.value})
    }
    render(){
        if(this.props.showEditForm === true){        
            return(
                <div id={this.props.showEditForm ? 'edit' : 'blankEdit'}>
                    <form id='editForm'>
                        <div className='inputFields'><p className='formLabel'>Title:</p><textarea name='editTitle' className='textArea' onChange={(e) => this.onChange(e)}>{this.props.favorites[this.props.editId].imageOfTheDay.title}</textarea></div>
                        <div className='inputFields'><p className='formLabel'>Date:</p><textarea name='editDate' className='textArea' onChange={(e) => this.onChange(e)}>{this.props.favorites[this.props.editId].imageOfTheDay.date}</textarea></div>
                        <div className='inputFields' id='explanation'><p className='formLabel'>Explanation:</p>
                        <textarea name='editExplanation' className='textAreaExplanation' onChange={(e) => this.onChange(e)}>{this.props.favorites[this.props.editId].imageOfTheDay.explanation}</textarea></div>
                        <input id='submitButton' type='submit' onClick={(e) => this.props.onSubmit(this.state.editTitle, this.state.editDate, this.state.editExplanation, this.props.editId, e)}></input>
                    </form>
                </div>
            )
        }
        else {
            return(
                <div></div>
            )
        }
    }
}