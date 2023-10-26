import { useDispatch, useSelector } from "react-redux";
import classes from "./HeroSheet.module.css";

import { RootState } from "../../store/store";
import { heroActions } from "../../store/hero-slice";

import List from "./List";

const HeroSheet = () => {
  const dispatch = useDispatch();

  const onChangeName = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch(heroActions.changeName({ name: event.currentTarget.value }));
  };

  const heroName: string = useSelector((state: RootState) => state.hero.name);

  return (
    <div className={classes.herosheet}>
      <div className={classes.column}>
        <div className={classes.wrapper}>
          <p className={classes.name}>NAME:&nbsp;</p>
          <input
            className={classes.input}
            type="text"
            maxLength={18}
            value={heroName}
            placeholder="input hero name"
            onChange={onChangeName}
          />
        </div>
        <List slice="attributes" />
        <div className={classes.divider}></div>
        <List slice="stats" />
      </div>
      <div className={classes.column}>
        <p className={classes.name}>SKILLS</p>
        <List slice="skills" />
      </div>
    </div>
  );
};

export default HeroSheet;
