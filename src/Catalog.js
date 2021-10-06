import React, { Component } from 'react'
import FilmCollection from './Edit.js'
import request from 'superagent'
import './App.css'

export default class Catalog extends Component {
    state = {
        filmList: [],
        query:'',
        isLoading: false
    }

    componentDidMount = async () => {
        await  this.FilmFetch()
    }

    FilmFetch = async () => {
    await this.setState ({ isLoading : true 
    })
    const response = await request.get (`https://films-ghibli.herokuapp.com/films?title=${this.state.query}`)
    this.setState ({
    filmList: response.body.results,
    isLoading: false
    })
}

    // handleInput = (e) => {
    //     this.setState ({query: e.target.value})
    // }

    // handleSubmit = async (e) => {
    //     e.preventDefault();
    //     this.setState ({ currentPage: 1})        
    //     await this.FilmFetch();
    // }

    // handleReset = async (e) => {
    //      await this.setState ({ 
    //         query: ''
    //      })
    //     await this.FilmFetch()
    // }
  
    render()
        {
            console.log(this.state.filmList)
        return (
            <div>
                <section className = "searchInput">
                    {/* Search Input and Reset */}
                    <form onSubmit={this.handleSubmit}>
                    <input className = "searchInput" onChange={this.handleInput} />
                    <button className = "submitButton">Search!</button>
                    <button className = "resetButton" onClick={this.handleReset}>Reset!</button>
                    </form> 
                </section>
                

            {
            this.state.isLoading
            ?<section className = "loading"><h2> Loading ... </h2></section>
            : <FilmCollection films = {this.state.filmList} />
            }  
            </div>
        )
    }
}
