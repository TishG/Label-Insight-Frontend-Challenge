import React from 'react';

interface Props {
  title: string;
}

const Jumbotron: React.FC<Props> = ({ title }) => (
  <div className="Jumbotron bg-dark py-4 ">
    <h1 className="text-light text-center">{title}</h1>
  </div>
);

export default Jumbotron;
