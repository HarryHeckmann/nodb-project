import React, { Component } from 'react';
import axios from "axios";

import About from './About'
import Header from './Header'
import Favorites from './Favorites'
import EditFavorites from './EditFavorites'
import audio from './2001-theme.mp3'
import './Favorites.css'



class Main extends Component {
    constructor(){
      super()
      this.state = {
        imageOfTheDay: {},
        favorites: [],
        showEditForm: false,
        showFavorites: false,
        showFavoritesButton: true,
        editId: 0,
        isVideo: false
      }
      this.randomDate = this.randomDate.bind(this)
      this.saveToFavorites = this.saveToFavorites.bind(this)
      this.displayFavorites = this.displayFavorites.bind(this)
      this.displayEditForm = this.displayEditForm.bind(this)
      this.deleteFavorite = this.deleteFavorite.bind(this)
      this.imageClick = this.imageClick.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
    }
    onSubmit(t,d,e,id, event){
        event.preventDefault()
        let newValues ={
            title: t,
            date: d,
            explanation: e
        }
        if(t === ''){
            newValues.title = this.state.favorites[id].imageOfTheDay.title
        }
        if(d === ''){
            newValues.date = this.state.favorites[id].imageOfTheDay.date
        }
        if(e === ''){
            newValues.explanation = this.state.favorites[id].imageOfTheDay.explanation
        }
        axios
            .put('/api/update/'+id, {newValues})
            .then(response => {
                this.setState({favorites: response.data, showEditForm: !this.state.showEditForm})
            })  
              
    }
    imageClick(id){
        this.setState({imageOfTheDay: this.state.favorites[id].imageOfTheDay})  
    }

    deleteFavorite(id){
        axios
            .delete('/api/delete/'+id)
            .then(response => {
                this.setState({favorites: response.data})
        })
    }
    
    displayFavorites(){
        this.setState({showFavorites: !this.state.showFavorites})
        this.setState({showFavoritesButton: !this.state.showFavoritesButton})
        axios
            .get('/api/getfavorites/')
            .then(response => {
                this.setState({favorites: response.data})
            })
    }

    displayEditForm(id){
        this.setState({showEditForm: !this.state.showEditForm})
        this.setState({editId: id})
    }

    saveToFavorites(){
        const {imageOfTheDay} = this.state
        axios
           .post("/api/favorite", {imageOfTheDay})
           .then(response => {
             this.setState({favorites: response.data})
           })
        if(this.state.showFavoritesButton === true){
            this.setState({showFavorites: true})
            this.setState({showFavoritesButton: false})
        }  
    }

    randomDate(){
        axios
          .get("/api/nasaImage")
          .then(response => {
            this.setState({imageOfTheDay: response.data})
          })
      }
      componentDidMount(){
        this.setState({favorites: this.state.favorites})
        axios
            .get("/api/today/")
            .then(response =>{
                this.setState({imageOfTheDay: response.data})
        
        })
        
    }

    render(){ 
        console.log(process.env.REACT_APP_NASA_KEY)
        const {favorites} = this.state
        let image = this.state.imageOfTheDay.hdurl
        let backgroundImageStyle = {
          backgroundImage: 'url('+JSON.stringify(image)+')'
        }
        return (
          <div className="main" style={backgroundImageStyle}>
          <audio autoPlay='true' loop='true'>
            <source src={audio}/>
          </audio>
            <Header
                imageOfTheDay={this.state.imageOfTheDay}
                randomDate={this.randomDate}
                saveToFavorites={this.saveToFavorites}
            />
            <main id='big'>
                <div id={this.state.showFavoritesButton ? 'showFavorites': "hideFavorites"}>
                    <h3 
                        onClick={() => this.displayFavorites()}
                        >{this.state.showFavoritesButton ? "Show Favorites" : "Hide Favorites"}
                    </h3>
                </div>
                <div id='middle'>
                    <div className={this.state.showFavorites ? 'favoriteColumn' : 'favoriteColumnBlank'}>
                        {favorites.map((e, i) => (
                            <Favorites
                                favorites={this.state.favorites}    
                                key={i}
                                id={i}
                                copyright={favorites[i].imageOfTheDay.copyright}
                                date={favorites[i].imageOfTheDay.date}
                                explanation={favorites[i].imageOfTheDay.explanation}
                                hdurl={favorites[i].imageOfTheDay.hdurl}
                                title={favorites[i].imageOfTheDay.title}
                                displayEditForm={this.displayEditForm}
                                deleteFavorite={this.deleteFavorite}
                                imageOfTheDay={this.state.imageOfTheDay}
                                imageClick={this.imageClick}
                            />
                        ))}
                        
                    </div>
                    <EditFavorites
                            favorites={this.state.favorites}
                            editId={this.state.editId}
                            displayEditForm={this.displayEditForm}
                            showEditForm={this.state.showEditForm}
                            onSubmit={this.onSubmit}
                    />
                </div>
              <About
                imageOfTheDay={this.state.imageOfTheDay}
              />
            </main>
          </div>
        )
    }
}

export default Main