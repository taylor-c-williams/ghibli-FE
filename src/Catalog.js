import React, { Component } from "react";
import { getAllFilms } from "./FetchUtils.js";
import { Link } from "react-router-dom";
import "./App.css";

export default class Catalog extends Component {
	state = {
		films: [],
		query: "",
		isLoading: true,
	};

	componentDidMount = async () => {
		const films = await getAllFilms();
		this.setState({
			films: films,
			isLoading: false,
		});
	};

	render() {
		console.log(this.state);
		const { films } = this.state;
		return (
			<div>
				{films.map(
					({
						id,
						title,
						original_title_romanised,
						img,
						description,
						director,
						release_date,
						running_time,
						rt_score,
						category,
					}) => (
						<div className="film">
							<Link to={`edit/${id}`} key={`${id}-${title}`}>
								<p>{title}</p>
								<p>{original_title_romanised}</p>
								<img src={img} alt={title} />
							</Link>
							<p>Directed By: {director}</p>
							<p>Release Date: {release_date} | Running Time: {running_time} mins</p>
							<p>Rotten Tomatoes Score: {rt_score}</p>
							<p>Genre: {category}</p>
							<p>{description}</p>
						</div>
					)
				)}

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
