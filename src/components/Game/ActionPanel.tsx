import { useDispatch, useSelector } from "react-redux";

import classes from "./ActionPanel.module.css";

import { RootState } from "../../store/store";
import { heroActions } from "../../store/hero-slice";
import { appActions } from "../../store/app-slice";

import { NOTIFICATIONS } from "../../models/constants";

const ActionPanel = () => {
  const dispatch = useDispatch();
  const health = useSelector((state: RootState) => state.hero.stats.health);

  const fightHandler = () => {
    if (health.value > 1) {
      dispatch(heroActions.takeDamage());
    } else if (health.value === 1) {
      dispatch(appActions.showModal({ note: NOTIFICATIONS.heroDeath }));
      dispatch(heroActions.takeDamage());
      dispatch(appActions.setHeroDontExist());
      dispatch(appActions.toggleMenu({ open: true }));
    }
  };

  const restHandler = () => {
    if (health.value !== health.maxValue && health.value !== 0) {
      dispatch(heroActions.receiveHeal());
    }
  };

  return (
    <div className={classes.panel}>
      <button
        className={classes.fight}
        onClick={fightHandler}
        disabled={health.value === 0}
      >
        FIGHT
      </button>
      <button
        className={classes.rest}
        onClick={restHandler}
        disabled={health.value === 0}
      >
        REST
      </button>
    </div>
  );
};

export default ActionPanel;
