import { useSelector } from "react-redux";
import classes from "./List.module.css";

import { RootState } from "../../store/store";

import Regulator from "./Regulator";
import {
  HeroSlices,
  ParameterName,
  SliceName,
  Stats,
} from "../../models/types";
import { HERO_STATIC } from "../../models/constants";

const List = (props: { slice: HeroSlices }) => {
  const heroObjectSlice = useSelector(
    (state: RootState) => state.hero[props.slice]
  );

  const isStats = "health" in heroObjectSlice;

  const list = Object.keys(HERO_STATIC[props.slice]);

  return (
    <ul className={classes.list}>
      {list.map((key) => (
        <li className={`${classes.line} ${classes[key]}`} key={key}>
          <p className={classes.name}>{key.toUpperCase()}</p>

          {!isStats && (
            <Regulator
              name={key as ParameterName}
              slice={props.slice as SliceName}
            />
          )}

          {isStats && (
            <div className={classes.indicators}>
              {heroObjectSlice[key as keyof Stats].value +
                `${
                  typeof heroObjectSlice[key as keyof Stats].maxValue ===
                  "number"
                    ? " /" + heroObjectSlice[key as keyof Stats].maxValue
                    : " %"
                }`}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
