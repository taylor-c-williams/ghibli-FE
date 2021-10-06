import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { getCategories } from './FetchUtils';

export default class Create extends Component {

    componentDidMount = async () => {
        const categories = await getCategories()
        this.setState ({ categories : categories })
    }

	state = {
		title: '',
		original_title_romanised: '',
		description: '',
		producer: '',
		director: '',
		release_date: '',
		running_time: '',
		rt_score: '',
        categories: [],
		img: '',
        category_id: 1
	};

    // Submit Handler


    // Upload Handler
	handleUpload = () => {
		let options = {
			cloud_name: 'ghibli-cloud',
			upload_preset: 'ghibli-preset',
			multiple: false,
			// cropping: true,
			resource_type: 'image',
		};
		window.cloudinary.openUploadWidget(options, (error, result) => {
			console.log(result);
			if (error) {
				console.error(error);
				return;
			}
			const image = result[0];
			this.setState({ img: image.url }); // or you can store publicId for easier transformations
		});
	};

	render() {
		console.log(this.state);
		return (
			<div>
				<Router>
					<header>
						<NavLink exact activeClassName='active-link' to='/'>
							Home
						</NavLink>
						<NavLink exact activeClassName='active-link' to='/catalog'>
							Catalog
						</NavLink>
						<NavLink exact activeClassName='active-link' to='/Edit'>
							Edit
						</NavLink>
					</header>
					<form onSubmit={this.handleSubmit}>
						<label>
							Title
                            <input  onChange = { (e) => this.setState ({title: e.target.value})} />
                        </label>
                        <label>
                            Original title
                            <input onChange = {(e) => this.setState ({original_title_romanised: e.target.value})} />
                        </label>
                        <label>
                            Director
                            <input onChange = {(e) => this.setState ({director: e.target.value})} />
                        </label>
                        <label>
                            Producer
                            <input onChange = {(e) => this.setState ({producer: e.target.value})} />
                        </label>
                        <label>
                            Release Date
                            <input onChange = {(e) => this.setState ({release_date: e.target.value})} />
                        </label>
                        <label>
                            Run time
                            <input onChange = {(e) => this.setState ({running_time: e.target.value})} />
                        </label>
                        <label>
                            Rotten Tomatoes Score
                            <input onChange = {(e) => this.setState ({rt_score: e.target.value})} />
                        </label>
                        <label>
                            Category
                            <select onChange = {(e) => this.setState ({category_id: e.target.value})}>
                            {this.state.categories.map ( category =>
                                <option
                                 key = {`${category.category_name}-${category.id}`} value = { category.id }>
                                     {category.category}                                 
                                </option>)}
                            </select>
                        </label>
                        <label>
                            Image
                            <input type = 'file' onChange = {this.handleImgChange} />
                            <button type ='button' onClick = {this.handleUpload} >Upload Image</button>
                        </label>                  
					</form>
				</Router>
			</div>
		);
	}
}
