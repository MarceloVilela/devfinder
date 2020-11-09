import React, { ReactNode } from 'react';
import indicator from '../../assets/load.gif';

import { Main } from './style';

interface ContainerProps {
  children: ReactNode;
  loading: boolean;
  className?: string;
  unstylized?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, loading, className, unstylized }) => {
  return (
    <Main className={`${unstylized ? '' : 'container'} ${className}`}>
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
    </Main>
  );
}

export default Container;
