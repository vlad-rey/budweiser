import style from "./style.module.scss";
import { FunctionComponent } from "react";

interface NavigationProps {}
const Navigation: FunctionComponent<NavigationProps> = (props) => {
	return (
		<div className={style.wrapper}>
			<button className="nav-button prev-button">Назад</button>
			<button className="nav-button next-button">Далее</button>
		</div>
	);
};
export default Navigation;
