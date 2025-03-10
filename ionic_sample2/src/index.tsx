import { IonApp, IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// 必要な Ionic のスタイルをインポート
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

// Ionic の設定を初期化
setupIonicReact();

const items = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' },
  { id: 4, name: 'Grape' },
  { id: 5, name: 'Orange' }
];

// Home コンポーネント
const Home: React.FC = () => (
  <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Fruit List</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonList inset={true}>
        {items.map((item) => (
          <IonItem key={item.id}>{item.name}</IonItem>
        ))}
      </IonList>
    </IonContent>
  </IonApp>
);

// App コンポーネント
const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);

// React 18+ に対応
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
