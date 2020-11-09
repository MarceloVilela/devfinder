import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { useStyleSwitcher } from '../../hooks/styleSwitcher';

import { Wrapper } from './style';

const Footer: React.FC = () => {
  const { switchAlias, alias } = useStyleSwitcher();

  return (
    <Wrapper>
      <div>
        <div>
          <a
            href="https://github.com/marcelovilela/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub color="#fff" />
            /marcelovilela
          </a>
        </div>
        <div>
          <p onClick={() => switchAlias('')}>Tema {alias}</p>
        </div>
      </div>
    </Wrapper>
  );
}

export default Footer;
