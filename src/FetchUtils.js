import request from "superagent";
import films from "./Catalog";
import { Link } from "react-router-dom";

const URL = "https://films-ghibli.herokuapp.com";
// const query = `${URL}/${this.props.query}/`

//Get all Films
export async function getAllFilms() {
	const response = await request.get(`${URL}/films/`);
	return response.body;
}

// Get Categories
export async function getCategories() {
	const response = await request.get(`${URL}/categories/`);
	return response.body;
}

//  Get Film by ID
export async function getFilm(id) {
	const response = await request.get(`${URL}/films/${id}`);
	return response.body;
}

// Filter by Rating

// Create Film
export async function createFilm(film) {
	const response = await request.post(`${URL}/films/`).send(film);
	return response.body;
}

// Edit Film
export async function editFilm(id, film) {
	const response = await request.put(`${URL}/films/${id}`).send(film);
	return response.body;
}

// Delete Film
export async function deleteFilm(id) {
	const response = await request.delete(`${URL}/films/${id}`);
	return response.body;
}
