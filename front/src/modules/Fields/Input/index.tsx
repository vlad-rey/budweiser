import style from "./style.module.scss";
import { FunctionComponent } from "react";

interface InputProps {}

const Input: FunctionComponent<InputProps> = (props) => {
	return <div className={style.wrapper}></div>;
};

export default Input;
