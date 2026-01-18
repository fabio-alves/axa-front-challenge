'use client';

import { Component, ReactElement } from 'react';

interface TitleProps {
  text: string;
  className?: string;
}

export default class Title extends Component<TitleProps> {
  public render(): ReactElement {
    const { text, className = '' } = this.props;

    return (
      <h1 className={`text-2xl font-bold text-black dark:text-white ${className}`}>
        {text}
      </h1>
    );
  }
}
