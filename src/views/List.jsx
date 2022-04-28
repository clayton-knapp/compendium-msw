import React from 'react';
import { useState, useEffect } from 'react';
import Item from '../components/Item';
import styles from '../App.css';

export default function List() {
  // set state
  const [artList, setArtList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredArt, setFilteredArt] = useState([]);

  const isSearching = !!search.length;
  const noResults = isSearching && !filteredArt.length;

  function handleSearch(e) {
    setSearch(e.target.value);
    const results = artList.filter((art) =>
      art.title.toLowerCase().startsWith(e.target.value.toLowerCase().trim())
    );
    setFilteredArt(results);
    // console.log('filteredArt', filteredArt);
  }

  // useEffect
  useEffect(() => {
    async function getAndSetArt() {
      const resp = await fetch(
        `https://api.artic.edu/api/v1/artworks/search?fields=id,title,artist_title,image_id&limit=20`
      );
      const data = await resp.json();
      // console.log('data', data.results);
      setArtList(data.data);
      setLoading(false);
    }
    getAndSetArt();
  }, []);

  // console.log('artList', artList);

  return (
    <>
      <input
        placeholder="Find a piece of art"
        value={search}
        // onChange={(e) => {
        //   handleSearch(e);
        // }}
        onChange={handleSearch}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.list}>
          {(isSearching ? filteredArt : artList).map((art, i) => (
            <Item key={art.title + i} art={art} />
          ))}
        </div>
      )}
      {noResults && <p>No Results</p>}
    </>
  );
}
