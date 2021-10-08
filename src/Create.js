import React, { Component } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { getCategories, createFilm } from "./FetchUtils";
import request from "superagent";

export default class Create extends Component {
    
	componentDidMount = async () => {
		const categories = await getCategories();
		this.setState({
			categories: categories,
			isLoading: false,
		});
	};

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

	// Submit Handler
	handleSubmit = async (e) => {
		e.preventDefault();
        console.log('i am submit', this.state)
		await createFilm(this.state);
		this.props.history.push("/");
	};

	// Upload Handler
	handleImgChange = async (e) => {
        const data = new FormData();
		data.append("file", e.target.files[0]);
		data.append("upload_preset", "ghibli-preset");
		data.append("cloud_name", "ghibli-cloud");
        console.log('i am image31')
        this.setState ({isLoading: true})
		const response = await request
			.post("https://api.cloudinary.com/v1_1/ghibli-cloud/image/upload")
			.send(data);
        console.log('i am image', response.body.url)
		this.setState({ 
            isLoading: false,
            img: response.body.url });

	};

	render() {

		return (
			<div>
				<Router>
					<header>
						<NavLink exact activeClassName="active-link" to="/">
							Home
						</NavLink>
						<NavLink exact activeClassName="active-link" to="/catalog">
							Catalog
						</NavLink>
						<NavLink exact activeClassName="active-link" to="/Edit">
							Edit
						</NavLink>
					</header>

					{/* Create Form */}
					<form onSubmit={this.handleSubmit}>
						<label>
							Title
							<input
								onChange={(e) => this.setState({ title: e.target.value })}
							/>
						</label>
						<label>
							Original title
							<input
								onChange={(e) =>
									this.setState({ original_title_romanised: e.target.value })
								}
							/>
						</label>
						<label>
							Director
							<input
								onChange={(e) => this.setState({ director: e.target.value })}
							/>
						</label>
						<label>
							Release Date
							<input
								type="number"
								onChange={(e) =>
									this.setState({ release_date: e.target.value })
								}
							/>
						</label>
						<label>
							Run time
							<input
								type="number"
								onChange={(e) =>
									this.setState({ running_time: e.target.value })
								}
							/>
						</label>
						<label>
							Rotten Tomatoes Score
							<input
								type="number"
								onChange={(e) => this.setState({ rt_score: e.target.value })}
							/>
						</label>
						<label>
							Category
							<select
								onChange={(e) => this.setState({ category_id: e.target.value })}
							>
								{this.state.categories.map((category) => (
									<option
										key={`${category.category_name}-${category.id}`}
										value={category.id}
									>
										{category.category}
									</option>
								))}
							</select>
						</label>
						<label>
							Image
							<input type="file" onChange={this.handleImgChange} />
							<button type="submit" value="submit" disabled = {this.state.isLoading}>
								Submit!
							</button>
						</label>
					</form>
				</Router>

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
