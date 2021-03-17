import React from 'react';

import { ReactComponent as Logo } from '../assets/icons/logo.svg';

const Header: React.FC<{ title: string }> = ({title}) => (
  <div className="p-1">
    <Logo></Logo>
    <h5 className="mt-4 mb-2">{title}</h5>
  </div>
);

export default Header;
