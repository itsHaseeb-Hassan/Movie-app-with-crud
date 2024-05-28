import React from "react";
import Data from "../../constant/data.json";
import Table from "react-bootstrap/Table";
import Paginate from "../pagination/Paginate.jsx";
import { useGenreDataContext } from "../../context/ActiveGenreContext.jsx";

export default function MovieTable() {
  const [data, setData] = React.useState(Data);
  const [{ activeGenre }] = useGenreDataContext();
  const [order, setOrder] = React.useState("dsc");
  const [title, setTitle] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [bool, setBoll] = React.useState(false);
  const [errorMessage, setMessage] = React.useState("");
  const [moviesPerPage, setMoviesPerPage] = React.useState(3);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [editMovieId, setEditMovieId] = React.useState(null);

  // Add or update data in the table
  const handleData = () => {
    if (title !== "" && genre !== "" && stock !== "" && rate !== "") {
      if (editMovieId) {
        const updatedData = data.map((movie) =>
          movie._id === editMovieId
            ? { ...movie, title, genre: { _id: movie.genre._id, name: genre }, numberInStock: stock, dailyRentalRate: rate }
            : movie
        );
        setData(updatedData);
        setEditMovieId(null);
      } else {
        let Movie = {
          _id: Math.random(),
          title: title,
          genre: { _id: Math.random(), name: genre },
          numberInStock: stock,
          dailyRentalRate: rate,
        };
        setData([...data, Movie]);
      }
      setTitle("");
      setGenre("");
      setStock("");
      setRate("");
    } else {
      setMessage("Params can't be empty");
    }
  };

  // Select active genre
  const genreData = data.filter((movie) => {
    if (activeGenre._id === "1213") {
      return movie.genre.name !== activeGenre.name;
    }
    return movie.genre.name === activeGenre.name;
  });

  // Delete movie in the table
  const handleDelete = (id) => {
    const selectedData = data.filter((movie) => movie._id !== id);
    setData(selectedData);
  };

  // Update handler
  const updateHandler = (movie) => {
    setTitle(movie.title);
    setGenre(movie.genre.name);
    setStock(movie.numberInStock);
    setRate(movie.dailyRentalRate);
    setEditMovieId(movie._id);
    setBoll(true);
  };

  // Sort data on click on table heading
  const handleSort = (columnPath) => {
    setOrder(order === "dsc" ? "asc" : "dsc");
    const sortedData = [...data].sort((a, b) => {
      if (columnPath === "genre") {
        return order === "asc"
          ? a.genre.name.localeCompare(b.genre.name)
          : b.genre.name.localeCompare(a.genre.name);
      }
      return order === "asc" ? (a[columnPath] > b[columnPath] ? 1 : -1) : (a[columnPath] < b[columnPath] ? 1 : -1);
    });
    setData(sortedData);
  };

  // Pagination
  const startIndex = currentPage * moviesPerPage - moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const totalMovies = genreData.length;

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const movieToShow = genreData.slice(startIndex, endIndex);

  // Click this button to show the form
  const handleForm = (item) => {
    setBoll(item);
    if (!item) {
      setEditMovieId(null);
      setTitle("");
      setGenre("");
      setStock("");
      setRate("");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-5">
            <button className="btn btn-danger" onClick={() => handleForm(true)}>
              ADD DATA
            </button>
          </div>
        </div>
      </div>
      {bool && (
        <div className="container shadow-lg p-3 mb-5  section my-3 w-50">
          <div className="row">
            <div className="col-md-6 my-2">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-md-6 my-2">
              <input
                type="text"
                className="form-control"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </div>
            <div className="col-md-6 my-2">
              <input
                type="number"
                className="form-control"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="col-md-6 my-2">
              <input
                type="number"
                className="form-control"
                placeholder="Rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button className="btn btn-success w-50" onClick={handleData}>
                {editMovieId ? "Update Data" : "Add Data"}
              </button>
            </div>
          </div>
        </div>
      )}
      <p>{errorMessage}</p>
      {genreData.length === 0 ? (
        <p>No Movie in the Table</p>
      ) : (
        <div>
          <span>Show {genreData.length} Movies in the Table </span>
          <Table striped bordered hover size="sm" className="my-2">
            <thead className="text-center">
              <tr>
                <th onClick={() => handleSort("title")}>Title</th>
                <th onClick={() => handleSort("genre")}>Genre</th>
                <th onClick={() => handleSort("numberInStock")}>Stock</th>
                <th onClick={() => handleSort("dailyRentalRate")}>Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {movieToShow.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button className="btn btn-success" onClick={() => handleDelete(movie._id)}>
                      Delete
                    </button>
                    <button className="btn btn-info ms-2" onClick={() => updateHandler(movie)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            handlePaginate={handlePaginate}
            totalMovies={totalMovies}
            moviesPerPage={moviesPerPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
}
