import { IonApp, IonButton, IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import $ from 'jquery';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// 必要な Ionic のスタイルをインポート
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

// Ionic の設定を初期化
setupIonicReact();

const Home: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
    { id: 4, name: 'Grape' },
    { id: 5, name: 'Orange' }
  ]);

  const fetchData = () => {
    const randomId = Math.floor(Math.random() * 100) + 1; // 1〜100 のランダム ID
    $.ajax({
      url: `https://jsonplaceholder.typicode.com/posts/${randomId}`,
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        setItems((prevItems) => {
          if (!prevItems.some((item) => item.id === data.id)) {
            return [...prevItems, { id: data.id, name: data.title }];
          }
          return prevItems;
        });
      },
      error: (xhr, status, error) => {
        console.error('AJAX Error:', status, error);
      }
    });
  };
  

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fruit List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={fetchData} expand="full">Fetch Data</IonButton>
        <IonList inset={true}>
          {items.map((item) => (
            <IonItem key={item.id}>{item.name}</IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonApp>
  );
};

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
