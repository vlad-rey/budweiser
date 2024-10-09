import DiffMatchPatch from "diff-match-patch";
import style from "./style.module.scss";
import { FunctionComponent } from "react";

interface ShowDifferenesAsHTMLProps {
	content_1: string;
	content_2: string;
}

const ShowDifferenesAsHTML: FunctionComponent<ShowDifferenesAsHTMLProps> = (
	props
) => {
	return (
		<section className={style.section}>
			<div dangerouslySetInnerHTML={{ __html: "" }} />
		</section>
	);
};

export default ShowDifferenesAsHTML;
