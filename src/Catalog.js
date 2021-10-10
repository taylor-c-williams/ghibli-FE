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
			<div className="catalog">
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
						<Link to={`edit/${id}`} key={`${id}-${title}`}>
							<div className="film">
								<span className="title">{title}</span>
								<span className="subtitle">{original_title_romanised}</span>
								<img src={img} alt={title} />
								<p>Directed By {director}</p>
								<section className="stats">							
									<p>{release_date}</p>
									<p>{running_time} mins</p>
									<p>Rating: {rt_score}/100</p>
									<p> {category}</p>
								</section>

								<section className="description">
									<p>{description}</p>
								</section>
							</div>
						</Link>
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
