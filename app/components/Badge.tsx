'use client';

import { Component, ReactElement } from 'react';

interface BadgeProps {
  label: string;
  type: 'nacional' | 'municipal' | 'estadual';
  className?: string;
}

export default class Badge extends Component<BadgeProps> {
  private getBadgeStyles(): string {
    const { type } = this.props;
    
    const styles = {
      nacional: 'bg-green-500 text-white',
      municipal: 'bg-yellow-400 text-black',
      estadual: 'bg-blue-500 text-white',
    };

    return styles[type] || styles.nacional;
  }

  public render(): ReactElement {
    const { label, className = '' } = this.props;
    const badgeStyles = this.getBadgeStyles();

    return (
      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${badgeStyles} ${className}`}>
        {label}
      </span>
    );
  }
}
