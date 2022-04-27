import React from 'react';
import styles from '../App.css';

export default function Item({ art }) {
  // console.log('image_id', art.image_id);

  return (
    <div className={styles['item']}>
      <h2 aria-label="name">{art.title}</h2>
      <p>{art.artist_title}</p>
      <img
        src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}
        alt={`${art.title} by ${art.artist}`}
      />
    </div>
  );
}
