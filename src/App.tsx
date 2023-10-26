import { useSelector } from "react-redux";
import { RootState } from "./store/store";

import "./App.css";

import HeroSheet from "./components/HeroSheet/HeroSheet";
import Menu from "./components/Menu/Menu";
import ActionPanel from "./components/Game/ActionPanel";
import Modal from "./components/UI/Modal";

function App() {
  const isHeroExist = useSelector((state: RootState) => state.app.isHeroExist);

  return (
    <div className="App">
      <Menu />
      {isHeroExist && <HeroSheet />}
      {isHeroExist && <ActionPanel />}
      <Modal />
    </div>
  );
}

export default App;
