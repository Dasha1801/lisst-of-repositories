import { useState } from 'react';
import InputField from './components/inputField/InputField';
import search from './assets/images/search.svg';
import githubLogo from './assets/images/github.svg';
import './App.scss';

function App() {
  const [value, setValue] = useState('');
  return (
    <header>
      <img src={githubLogo} alt="" className="logo" />
      <InputField
        placeholder="Введите название репозитория"
        value={value}
        onChange={setValue}
        name="search"
        iconName={search}
      />
    </header>
  );
}

export default App;
