import React, { Component } from 'react';
import { getCategories, createFilm } from './FetchUtils';
import  request from 'superagent';

export default class Create extends Component {

    componentDidMount = async () => {
        const categories = await getCategories()
        this.setState ({ 
			isLoading: false,
			categories : categories })
    }

	state = {
		title: '',
		original_title_romanised: '',
		description: '',
		director: '',
		release_date: '',
		running_time: '',
		rt_score: '',
        categories: [],
		img: '',
        category_id: 1,
        owner_id: 1,
		isLoading: true
	};

    // Submit Handler
    handleSubmit = async e => {
        e.preventDefault()
        await createFilm(this.state)
        this.props.history.push('/')
    }

    // Upload Handler
    handleImgChange = async (e) => {
        console.log(e.target.files[0])
        const data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('upload_preset', 'ghibli-preset');
        data.append('cloud_name','ghibli-cloud');

        const response = await request
            .post('https://api.cloudinary.com/v1_1/ghibli-cloud/image/upload')
            .send(data);
            this.setState({ 
				isLoading: false,
				img: response.body.url })
        }
       
	render() {
		console.log(this.state);
		return (
			<div className = "create">
				   {/* Create Form */}
					<form onSubmit={this.handleSubmit}>
						<label>
							Title
                            <input onChange = { (e) => this.setState ({title: e.target.value})} required />
                        </label>
                        <label>
                            Original title
                            <input onChange = {(e) => this.setState ({original_title_romanised: e.target.value})} required />
                        </label>
                        <label>
                            Director
                            <input onChange = {(e) => this.setState ({director: e.target.value})} required />
                        </label>
                        <label>
                            Release Year
                            <input type = "number" onChange = {(e) => this.setState ({release_date: e.target.value})} required/>
                        </label>
                        <label>
                            Run time (minutes)
                            <input type = "number" onChange = {(e) => this.setState ({running_time: e.target.value})} required />
                        </label>
                        <label>
                            Rating (/100)
                            <input type = "number" onChange = {(e) => this.setState ({rt_score: e.target.value})} required  />
                        </label>
                        <label>
                            Genre                            
                            <select className = "dropdown" onChange = {(e) => this.setState ({category_id: e.target.value})}>
                            {this.state.categories.map ( category =>
                                <option className = "dropdown-content"
                                 key = {`${category.category_name}-${category.id}`} value = { category.id } required >
                                     {category.category}                                
                                </option>)}
                            </select>                           
                        </label>
                        <label>
                            Description
                            <textarea
                            rows = "5" cols = "100"
							onChange={(e) => this.setState({ description: e.target.value })}/>
                        </label>
                        <label>
                            Upload Image
                            <input className = 'upload' type = 'file' onChange = {this.handleImgChange} required />
                        </label>
                        <label>
                            <button type="submit" value="submit" disabled = {this.state.isLoading}>Submit</button>
                        </label>                  
					</form>

									{/* Loading ...  */}
				{this.state.isLoading ? (
					<section className="loading">
						<h2> Uploading ... </h2>
					</section>
				) : null}
			</div>
		);
	}
}