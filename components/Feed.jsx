"use client";

import React, { useState, useEffect } from "react";
import PromptQuestion from "./PromptQuestion";

const PromptQuestionList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptQuestion
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para indicar carga

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/question");
      const data = await response.json();
      setAllPosts(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setLoading(false); // Actualizar el estado de carga al finalizar
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    // Realizar búsqueda de manera inmediata
    const searchResult = filterPrompts(e.target.value);
    setSearchedResults(searchResult);
  };
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <input
          type="text"
          placeholder="Busca por Tag o por usuario"
          value={searchText}
          onChange={handleSearchChange}
          required
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          className="search_input peer"
        />
      </form>

      {/* Mostrar indicador de carga si está cargando */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        // Mostrar el feed solo si no está cargando
        <>
          {searchText ? (
            <PromptQuestionList
              data={searchedResults}
              handleTagClick={handleTagClick}
            />
          ) : (
            <PromptQuestionList
              data={allPosts}
              handleTagClick={handleTagClick}
            />
          )}
        </>
      )}
    </section>
  );
};

export default Feed;
