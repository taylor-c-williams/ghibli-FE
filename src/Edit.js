import React, { Component } from 'react';
import { getCategories, editFilm, getFilm } from "./FetchUtils";

export default class Edit  extends Component {

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
        const film = await getFilm(this.props.match.params.id)
		this.setState({
			categories: categories,
			isLoading: false,
            ...film
		});
	};

	// Submit Handler
	handleSubmit = async (e) => {
		e.preventDefault();
		await editFilm(this.state);
		this.props.history.push("/");
	};

    render(){
        console.log(this.state)
        return (
            <div>
                Edit!!!!!!!!!
                <button>hellp</button>
            </div>
        )
    }
}
