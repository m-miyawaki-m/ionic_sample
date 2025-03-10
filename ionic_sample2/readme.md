オフラインで Ionic React プロジェクトを作成する手順における **キャッシュの場所設定** についての追加説明を含めた流れを整理します。

---

### **🚀 オフラインで Ionic React プロジェクトを作成する手順（キャッシュの設定を含む）**

#### **1️⃣ プロジェクトディレクトリを作成**
新しい Ionic React プロジェクト用のディレクトリを作成し、その中に移動します。

```sh
mkdir C:\Development\ionic\new_ionic_project
cd C:\Development\ionic\new_ionic_project
```

#### **2️⃣ `ionic.config.json` を作成**
`ionic.config.json` ファイルを手動で作成し、Ionic プロジェクトの基本設定を行います。このファイルはプロジェクトのルートディレクトリに配置します。

```json
{
  "name": "ionic_sample",
  "integrations": {},
  "type": "react"
}
```

#### **3️⃣ `package.json` を作成**
次に、オフライン環境用に依存関係が記載された `package.json` を作成します。このファイルをプロジェクトディレクトリ内に配置します。

```json
{
  "name": "ionic_sample",
  "version": "1.0.0",
  "description": "Offline Ionic React Project",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "@capacitor/android": "file:../offline_packages/capacitor-android-7.0.1.tgz",
    "@capacitor/cli": "file:../offline_packages/capacitor-cli-7.0.1.tgz",
    "@capacitor/core": "file:../offline_packages/capacitor-core-7.0.1.tgz",
    "@ionic/react": "file:../offline_packages/ionic-react-8.4.3.tgz",
    "@ionic/react-router": "file:../offline_packages/ionic-react-router-8.4.3.tgz",
    "@types/react": "file:../offline_packages/types-react-18.3.18.tgz",
    "@types/react-dom": "file:../offline_packages/types-react-dom-18.3.5.tgz",
    "ajv": "^8.17.1",
    "ajv-keywords": "^5.1.0",
    "ionic": "file:../offline_packages/ionic-5.4.16.tgz",
    "react": "file:../offline_packages/react-18.3.1.tgz",
    "react-dom": "file:../offline_packages/react-dom-18.3.1.tgz",
    "react-router-dom": "file:../offline_packages/react-router-dom-6.15.0.tgz",
    "react-scripts": "file:../offline_packages/react-scripts-5.0.1.tgz",
    "ts-node": "file:../offline_packages/ts-node-10.9.2.tgz"
  },
  "devDependencies": {
    "@ionic/cli": "file:../offline_packages/ionic-cli-7.2.0.tgz",
    "typescript": "file:../offline_packages/typescript-5.8.2.tgz"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

#### **4️⃣ キャッシュの場所を設定する**

`npm` でオフラインインストールを行う際には、キャッシュの場所を指定することが重要です。キャッシュは、オフラインでインストールするパッケージを保管する場所です。以下の方法でキャッシュ場所を設定します。

- `npm` のキャッシュはデフォルトで **`~/.npm`** に保存されますが、キャッシュの場所を指定することもできます。
- オフラインインストール時に **`--cache` オプション** を指定して、特定のディレクトリにキャッシュを保存することができます。

例えば、以下のコマンドを使用してキャッシュの場所を **`offline_cache`** に指定します。

```sh
npm install --offline --legacy-peer-deps --cache ../npm_cache
```

これにより、`offline_cache` フォルダ内にキャッシュされたパッケージが保存され、以降のオフラインインストールに利用できます。

#### **5️⃣ 依存関係をインストール**

`package.json` の作成が終わったら、以下のコマンドを実行して、オフライン環境で依存関係をインストールします。

```sh
npm install --offline --legacy-peer-deps

```

これで、**`offline_packages`** フォルダ内の `.tgz` ファイルから依存関係がインストールされ、キャッシュは **`offline_cache`** に保存されます。

#### **6️⃣ `src` フォルダと基本的なファイルを作成**

`src` フォルダを作成し、基本的なファイル（`index.tsx` と `App.tsx`）を設定します。

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { IonApp, IonContent, IonHeader, IonItem, IonList, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
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
```

#### **7️⃣ `npm start` または `ionic serve` で動作確認**

すべての依存関係がインストールされたら、アプリを起動して動作確認を行います。

```sh
npm start
```

または

```sh
ionic serve
```

---

## **🎯 まとめ**

1. **`ionic.config.json` を手動で作成** して、Ionic プロジェクトを設定
2. **`package.json` を作成** して、オフライン環境に適した依存関係を指定
3. **`--cache` オプション** を使ってキャッシュの場所を指定
4. **`npm install --offline --legacy-peer-deps` で依存関係をインストール**
5. **`src` フォルダと基本的なファイル（`index.tsx`）を作成**
6. **`npm start` または `ionic serve` で動作確認**

これで、オフライン環境でも **Ionic React プロジェクト** をスムーズに作成して動作させることができます！