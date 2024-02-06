import React, { useState, useRef, useReducer, useContext } from "react";
import Modal from "./Modal.jsx";
import { ThemeContext } from "../context/ThemeContext";
import audi from "../img/audi.webp";
import audi2 from "../img/audi2.webp";
import civic from "../img/civic.webp";
import ferrari from "../img/ferrari.webp";
import lambo from "../img/lambo.webp";
import mercedes from "../img/mercedies.webp";
import img1 from "../img/img1.webp";
import img2 from "../img/img2.webp";
import img3 from "../img/img3.webp";
import mustang from "../img/mustang.webp";
import "../styles/Gallery.css";

const Gallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const galleryContainerRef = useRef(null);

  const images = [
    { id: 1, url: audi, category: "car" },
    { id: 2, url: audi2, category: "car" },
    { id: 3, url: civic, category: "car" },
    { id: 4, url: ferrari, category: "car" },
    { id: 5, url: lambo, category: "car" },
    { id: 6, url: mercedes, category: "car" },
    { id: 7, url: mustang, category: "car" },
    { id: 8, url: img1, category: "nature" },
    { id: 9, url: img2, category: "nature" },
    { id: 10, url: img3, category: "nature" },
    { id: 11, url: audi, category: "car" },
    { id: 12, url: audi2, category: "car" },
    { id: 13, url: civic, category: "car" },
    { id: 14, url: ferrari, category: "car" },
    { id: 15, url: lambo, category: "car" },
    { id: 16, url: mercedes, category: "car" },
    { id: 17, url: mustang, category: "car" },
    { id: 18, url: img1, category: "nature" },
    { id: 19, url: img2, category: "nature" },
    { id: 20, url: img3, category: "nature" },
    { id: 21, url: audi, category: "car" },
    { id: 22, url: audi2, category: "car" },
    { id: 23, url: civic, category: "car" },
    { id: 24, url: ferrari, category: "car" },
    { id: 25, url: lambo, category: "car" },
    { id: 26, url: mercedes, category: "car" },
    { id: 27, url: mustang, category: "car" },
    { id: 28, url: img1, category: "nature" },
    { id: 29, url: img2, category: "nature" },
    { id: 30, url: img3, category: "nature" },
    { id: 31, url: audi, category: "car" },
    { id: 32, url: audi2, category: "car" },
    { id: 33, url: civic, category: "car" },
    { id: 34, url: ferrari, category: "car" },
    { id: 35, url: lambo, category: "car" },
    { id: 36, url: mercedes, category: "car" },
    { id: 37, url: mustang, category: "car" },
    { id: 38, url: img1, category: "nature" },
    { id: 39, url: img2, category: "nature" },
    { id: 40, url: img3, category: "nature" },
  ];

  const categories = [...new Set(images.map((image) => image.category))];

  const [filteredImages, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "FILTER_CATEGORY":
        return images.filter(
          (image) =>
            image.category === action.payload &&
            image.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case "SEARCH":
        return images.filter((image) =>
          image.category.toLowerCase().includes(action.payload)
        );
      case "REORDER_IMAGES":
        return action.payload;
      default:
        return state;
    }
  }, images);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handleDragStart = (e, image) => {
    e.dataTransfer.setData("application/json", JSON.stringify(image));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedImage = JSON.parse(e.dataTransfer.getData("application/json"));
    if (draggedImage) {
      const updatedImages = [...filteredImages];
      const targetIndex = updatedImages.findIndex(
        (image) => image.id === draggedImage.id
      );

      updatedImages.splice(targetIndex, 1);

      const newIndex = updatedImages.findIndex(
        (image) => image.order > draggedImage.order
      );
      updatedImages.splice(
        newIndex !== -1 ? newIndex : updatedImages.length,
        0,
        { ...draggedImage }
      );

      updatedImages.forEach((image, index) => {
        image.order = index + 1;
      });

      dispatch({ type: "REORDER_IMAGES", payload: updatedImages });
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setSelectedCategory(null);
    dispatch({ type: "SEARCH", payload: searchTerm });
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
    dispatch({ type: "FILTER_CATEGORY", payload: category });
  };

  const handleShowAll = () => {
    setSelectedCategory(null);
    setSearchTerm("");
    dispatch({ type: "SEARCH", payload: "" });
  };

  return (
    <div className={`page ${isDarkMode ? "dark-theme" : "light-theme"}`}>
      <h1>Interactive Photo Gallery</h1>
      <div>
        <div className="theme-toggle">
          <button onClick={toggleTheme}>{isDarkMode ? "Light" : "Dark"}</button>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by category..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="category-buttons flex mt-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`gallery-button ${
                category === selectedCategory ? "active" : ""
              }`}
            >
              {category}
            </button>
          ))}
          <button
            onClick={handleShowAll}
            className={`gallery-button ${!selectedCategory ? "active" : ""}`}
          >
            All
          </button>
        </div>

        <div
          ref={galleryContainerRef}
          className="gallery-container grid grid-cols-3 gap-4"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {filteredImages.map(({ id, url, category }) => (
            <div
              key={id}
              className="thumbnail cursor-pointer"
              onClick={() => handleThumbnailClick({ id, url, category })}
              onDragStart={(e) =>
                handleDragStart(e, { id, url, category, order: id })
              }
              draggable
            >
              <img
                src={url}
                alt={`Thumbnail ${id}`}
                className="w-full h-auto"
              />
            </div>
          ))}

          {modalOpen && selectedImage && (
            <Modal
              image={selectedImage}
              closeModal={() => setModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
