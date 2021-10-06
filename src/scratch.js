
   
//    Handlers 
//     handleInput = (e) => {
//         this.setState ({query: e.target.value})
//     }

//     handleSubmit = async (e) => {
//         e.preventDefault();
//         this.setState ({ currentPage: 1})        
//         await getAllFilms();
//     }

//     handleReset = async (e) => {
//          await this.setState ({ 
//             query: ''
//          })
//         await getAllFilms()
//     }
  
//     Search Input
//     <section className = "searchInput">
//     <form onSubmit={this.handleSubmit}>
//     <input className = "searchInput" onChange={this.handleInput} value = {this.state.query} />
//     <button className = "submitButton">Search!</button>
//     <button className = "resetButton" onClick={this.handleReset}>Reset!</button>
//     </form> 
// </section>



// Return Queries 
// export async function getQuery() {
//     const response = await request.get (`${query}`)
//     return response.body
// }