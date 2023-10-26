import { useDispatch, useSelector } from "react-redux";
import classes from "./Submenu.module.css";

import store, { AppDispatch, RootState } from "../../store/store";
import { appActions } from "../../store/app-slice";
import {
  fetchHeroData,
  heroActions,
  saveHeroData,
} from "../../store/hero-slice";

import { Hero } from "../../models/types";
import { NOTIFICATIONS } from "../../models/constants";

const Submenu = (props: { isSaveMenu: boolean }) => {
  const { isSaveMenu } = props;
  const dispatch = useDispatch<AppDispatch>();
  const currentHero: Hero = useSelector((state: RootState) => state.hero);
  const heroName = useSelector((state: RootState) => state.hero.name);

  const onlineSaveHandler = () => {
    if (heroName !== "") {
      const payload = currentHero;
      dispatch(saveHeroData(payload));
      dispatch(appActions.showModal({ note: NOTIFICATIONS.saveSuccess }));
    } else {
      dispatch(appActions.showModal({ note: NOTIFICATIONS.saveWithNoName }));
    }
  };

  const localySaveHandler = () => {
    if (heroName !== "") {
      const saveJSONToFile = (filename: string, json: string): void => {
        const blob = new Blob([json], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.dispatchEvent(new MouseEvent("click"));
        window.URL.revokeObjectURL(url);
      };

      saveJSONToFile("Hero-" + currentHero.name, JSON.stringify(currentHero));
    } else {
      dispatch(appActions.showModal({ note: NOTIFICATIONS.saveWithNoName }));
    }
  };

  const onlineLoadHandler = () => {
    store.dispatch(fetchHeroData());

    dispatch(appActions.setHeroExist());
    dispatch(appActions.toggleMenu({ open: false }));
    dispatch(appActions.showModal({ note: NOTIFICATIONS.loadSuccess }));
  };

  const localyLoadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result) {
        const json = event.target.result as string;
        processJSON(json);
      }
    };

    reader.readAsText(file);

    dispatch(appActions.showModal({ note: NOTIFICATIONS.loadSuccess }));
  };

  const processJSON = (json: string): void => {
    try {
      const heroData = JSON.parse(json);

      dispatch(heroActions.createHero({ hero: heroData }));
      dispatch(appActions.setHeroExist());
      dispatch(appActions.toggleMenu({ open: false }));
    } catch (error) {
      console.error("Parsing error!", error);
    }
  };

  return (
    <div className={`${classes.dropdown} ${classes.save}`}>
      {isSaveMenu && (
        <>
          <button type="button" onClick={localySaveHandler}>
            LOCALY
          </button>
          <button type="button" onClick={onlineSaveHandler}>
            ONLINE
          </button>
        </>
      )}

      {!isSaveMenu && (
        <>
          <input
            id="input-file"
            className={classes.input}
            type="file"
            accept=".json"
            onChange={localyLoadHandler}
          />
          <label className={classes.label} htmlFor="input-file">
            LOCALY
          </label>
          <button type="button" onClick={onlineLoadHandler}>
            ONLINE
          </button>
        </>
      )}
    </div>
  );
};

export default Submenu;
