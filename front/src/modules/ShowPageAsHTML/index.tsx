"use client";

import { FunctionComponent, useEffect } from "react";
import style from "./style.module.scss";

interface ShowPageAsHTMLProps {
	url: string;
}

const ShowPageAsHTML: FunctionComponent<ShowPageAsHTMLProps> = (props) => {
	return (
		<section className={style.section}>
			{/* <div dangerouslySetInnerHTML={{ __html: props.content }} /> */}
			{/* <iframe
				src={props.url}
				style={{ width: "100%", height: "500px", border: "none" }}
				title="Embedded HTML"
			/> */}
		</section>
	);
};

export default ShowPageAsHTML;
