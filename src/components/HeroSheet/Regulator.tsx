import React from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Regulator.module.css";

import { RootState } from "../../store/store";
import { heroActions } from "../../store/hero-slice";

import {
  Attributes,
  ParameterName,
  Skills,
  Dependencies,
  SliceName,
} from "../../models/types";
import { ATTRIBUTES_CAP, HERO_STATIC, MASTERY } from "../../models/constants";

const Regulator = React.memo(
  (props: { name: ParameterName; slice: SliceName }) => {
    const { name, slice } = props;
    const dispatch = useDispatch();

    const isSkills = String(slice) === "skills";

    const attributes = useSelector((state: RootState) => state.hero.attributes);
    const skills = useSelector((state: RootState) => state.hero.skills);

    const value = isSkills
      ? skills[name as keyof Skills]
      : attributes[name as keyof Attributes];

    const dependencyValue = isSkills
      ? attributes[
          HERO_STATIC.skills[name as keyof Dependencies][0] as keyof Attributes
        ]
      : ATTRIBUTES_CAP;

    const isCaped = (isSkills && value >= 5) || value >= dependencyValue;

    const increaceHandler = () => {
      isSkills
        ? dispatch(heroActions.trainSkill({ skill: name }))
        : dispatch(heroActions.changeAttrubute({ attribute: name, change: 1 }));
    };

    const decreaceHandler = () => {
      dispatch(heroActions.changeAttrubute({ attribute: name, change: -1 }));
    };

    return (
      <div className={classes.regulator}>
        {!isSkills && (
          <button
            type="button"
            className={classes.down}
            onClick={decreaceHandler}
            disabled={String(value) === "0"}
          ></button>
        )}
        <input
          className={`${classes.display} ${
            !isSkills ? classes.attributes : ""
          }`}
          type="text"
          tabIndex={-1}
          value={isSkills ? MASTERY[value] : value}
          readOnly
        />
        <button
          type="button"
          className={classes.up}
          onClick={increaceHandler}
          disabled={isCaped}
        ></button>
      </div>
    );
  }
);

export default Regulator;
