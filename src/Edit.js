import React, { Component } from "react";
import { getCategories, editFilm, getFilm } from "./FetchUtils";
import request from "superagent";

export default class Edit extends Component {
	state = {
		title: "",
		original_title_romanised: "",
		description: "",
		director: "",
		release_date: "",
		running_time: "",
		rt_score: "",
		categories: [],
		img: "",
		category_id: 1,
		owner_id: 1,
	};

	componentDidMount = async () => {
		const categories = await getCategories();
		const film = await getFilm(this.props.match.params.id);
		this.setState({
			categories: categories,
			isLoading: false,
			...film,
		});
	};

	// Submit Handler
	handleSubmit = async (e) => {
		e.preventDefault();
		await editFilm(this.props.match.params.id, this.state);
		this.props.history.push('/');
	};

	// Upload Handler
	handleImgChange = async (e) => {
		const data = new FormData();
		data.append("file", e.target.files[0]);
		data.append("upload_preset", "ghibli-preset");
		data.append("cloud_name", "ghibli-cloud");
		this.setState({ isLoading: true });
		const response = await request
			.post("https://api.cloudinary.com/v1_1/ghibli-cloud/image/upload")
			.send(data);
		this.setState({
			isLoading: false,
			img: response.body.url,
		});
	};

	render() {
		console.log(this.state);

		return (
			<div>

                {/* Render Current Film */}
				<div className="film">
					<p>{this.state.title}</p>
					<p>{this.state.original_title_romanised}</p>
					<img src={this.state.img} alt={this.state.title} />
					<p>Directed By: {this.state.director}</p>
					<p>
						Release Date: {this.state.release_date} | Running Time:{" "}
						{this.state.running_time} mins
					</p>
					<p>Rotten Tomatoes Score: {this.state.rt_score}</p>
					<p>Genre: {this.state.category}</p>
					<p>{this.state.description}</p>
				</div>

                {/* Edit Film Info */}
				<form onSubmit={this.handleSubmit}>
					<label>
						Title:
						<input
							onChange={(e) => this.setState({ title: e.target.value })}
							value = {this.state.title}
						/>
					</label>
					<label>
                     Image:
                     <input type="file" onChange={this.handleImgChange} />
                    </label>
                    <label>
                        Director:
                        <input
							onChange={(e) => this.setState({ director: e.target.value })}
							value = {this.state.director}
						/>
                    </label>            
                    <label>
                        Release Date:
                        <input type = "year"
							onChange={(e) => this.setState({ release_date: e.target.value })}
							value = {this.state.release_date}
						/>
                    </label>
                    <label>
                        Run Time:
                        <input type = "number"
							onChange={(e) => this.setState({ running_time: e.target.value })}
							value = {this.state.running_time}
						/>
                    </label>
                    <label>
                        Rating: 
                        <input type = "number"
							onChange={(e) => this.setState({ rt_score: e.target.value })}
                            value = {this.state.rt_score}
						/>

                    </label>
                    <label>
                        Genre:
                        <select
							onChange={(e) => this.setState({ category_id: e.target.value })}
							value = {this.state.title}
						>
                            {this.state.categories.map (category => 
                            <option
                            
                            key = {`${category.category} -${category.id}`}
                            value = {category.id}>
                                {category.category}
                             </option>)}
                             </select>
                    </label>
                    <label>
                        Description: 
                        <textarea
                            rows = "5" cols = "100"
							onChange={(e) => this.setState({ description: e.target.value })}
							value = {this.state.description}
						/>                    
                    </label>
                    <button disabled = {this.state.isLoading} >Save</button>
				</form>

                {/* Loading ...  */}
				{this.state.isLoading ? (
				<section className="loading">
					<h2> Loading ... </h2>
				</section>
			    ) : null}
                
			</div>
		);
	}
}
