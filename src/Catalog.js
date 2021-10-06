import React, { Component } from 'react'
import { getAllFilms } from './FetchUtils.js'
import FilmCollection from './Edit.js'
import response from 'superagent'
import './App.css'

export default class Catalog extends Component {
    state = {
        filmList: [],
        query:'',
        isLoading: false
    }

    componentDidMount = async () => {
        // eslint-disable-next-line
      const films =  await getAllFilms()
      this.setState ({
        filmList: response.body,
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
            console.log(this.state)
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
