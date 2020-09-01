import React from 'react';
import indicator from '../assets/load.gif';

import './Container.css';

export default function Container({ children, loading, className }) {
  return (
    <main className={`container ${className}`}>
      {}
      {loading
        ? (
          <article>
            <img
              src={indicator}
              alt="Loading"
            />
          </article>
        )
        : (
          children
        )
      }
    </main>
  );
}
