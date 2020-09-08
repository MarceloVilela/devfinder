import React, { ReactNode } from 'react';
import indicator from '../../assets/load.gif';

import './style.css';

interface ContainerProps {
  children: ReactNode;
  loading: boolean;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, loading, className }) => {
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

export default Container;
