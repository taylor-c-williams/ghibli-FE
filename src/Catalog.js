import React, { Component } from 'react'
import { getAllFilms } from './FetchUtils.js'
import './App.css'

export default class Catalog extends Component {
    state = {
        filmList: [],
        query:'',
        isLoading: true
    }

    componentDidMount = async () => {
        // eslint-disable-next-line
      const films =  await getAllFilms()
      this.setState ({
        filmList: films,
        isLoading: false
        })
    }

    // Handlers 
    // handleInput = (e) => {
    //     this.setState ({query: e.target.value})
    // }

    // handleSubmit = async (e) => {
    //     e.preventDefault();
    //     this.setState ({ currentPage: 1})        
    //     await getAllFilms();
    // }

    // handleReset = async (e) => {
    //      await this.setState ({ 
    //         query: ''
    //      })
    //     await getAllFilms()
    // }
  
    render()
        {
         
            console.log(this.state)
        return (
            
            <div>
                {/* <section className = "searchInput">

                    <form onSubmit={this.handleSubmit}>
                    <input className = "searchInput" onChange={this.handleInput} value = {this.state.query} />
                    <button className = "submitButton">Search!</button>
                    <button className = "resetButton" onClick={this.handleReset}>Reset!</button>
                    </form> 
                </section>
                 */}

            {
            this.state.isLoading
            ?<section className = "loading"><h2> Loading ... </h2></section>
            : <img src = 'http://www.placekitten.com/200/200' alt="bingo" />
            }  
            </div>
        )
    }
}
