import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Menu.module.css";

import { AppDispatch, RootState } from "../../store/store";
import { appActions } from "../../store/app-slice";
import { heroActions } from "../../store/hero-slice";

import Submenu from "./Submenu";
import { INITIAL_HERO_STATE } from "../../models/constants";

const Menu = () => {
  const [isLoadMenuOpen, setLoadMenuOpen] = useState(false);
  const [isSaveMenuOpen, setSaveMenuOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const isHeroExist = useSelector((state: RootState) => state.app.isHeroExist);
  const isMenuOpen = useSelector((state: RootState) => state.app.isMenuOpen);

  const newHeroHandler = () => {
    setSaveMenuOpen(false);
    setLoadMenuOpen(false);
    dispatch(appActions.toggleMenu({ open: false }));
    dispatch(appActions.setHeroExist());
    dispatch(
      heroActions.createHero({
        hero: INITIAL_HERO_STATE,
      })
    );
  };

  const openMenuHandler = () => {
    setSaveMenuOpen(false);
    setLoadMenuOpen(false);
    dispatch(appActions.toggleMenu({ open: !isMenuOpen }));
  };

  const loadMenuHandler = () => {
    setLoadMenuOpen(!isLoadMenuOpen);
    setSaveMenuOpen(false);
  };

  const saveMenuHandler = () => {
    setSaveMenuOpen(!isSaveMenuOpen);
    setLoadMenuOpen(false);
  };

  return (
    <div className={`${classes.menu} ${!isMenuOpen && classes.closed}`}>
      {isHeroExist && (
        <button
          className={classes.toggler}
          type="button"
          onClick={openMenuHandler}
        >
          MENU
        </button>
      )}
      <div className={classes.main}>
        <button type="button" onClick={newHeroHandler}>
          NEW&nbsp;HERO
        </button>
        <button type="button" onClick={loadMenuHandler}>
          LOAD&nbsp;HERO
        </button>
        {isLoadMenuOpen && <Submenu isSaveMenu={false} />}
        <button type="button" onClick={saveMenuHandler} disabled={!isHeroExist}>
          SAVE&nbsp;HERO
        </button>
        {isSaveMenuOpen && isHeroExist && <Submenu isSaveMenu={true} />}
      </div>
    </div>
  );
};

export default Menu;
