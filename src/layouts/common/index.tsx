import * as React from 'react';
import './style.module.css';

interface IProps {
  header: React.ReactElement;
  body: React.ReactElement;
}

export const CommonLayout: React.SFC<IProps> = ({ header, body }) => {
  return (
    <div className="container">
      <div className="header">{header}</div>
      <div className="body">{body}</div>
    </div>
  );
};
