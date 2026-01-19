'use client';

import { Component, ReactElement } from 'react';
import { useAlert } from '../hooks/useAlert';
import Title from '../components/Title';

function ScreenAPageContent() {
  const { AlertComponent } = useAlert({
    type: 'success',
    message: 'Tela A carregada com sucesso!',
  });

  return (
    <>
      {AlertComponent}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Tela A</h1>
        <p className="text-gray-600 dark:text-gray-400">
       Esta é uma página de teste para o hook useAlert.
        </p>
      </div>
    </>
  );
}

export default class ScreenAPage extends Component<{}, {}> {
  public render(): ReactElement {
    return <ScreenAPageContent />;
  }
}
