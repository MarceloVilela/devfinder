import React, { ReactNode } from 'react';
import indicator from '../../assets/load.gif';

import './style.css';

interface ContainerProps {
  children: ReactNode;
  loading: boolean;
  className?: string;
  unstylized?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, loading, className, unstylized }) => {
  return (
    <main className={`${unstylized ? '' : 'container'} ${className}`}>
      {loading
        ? (
          <article className='loading-wrapper'>
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
