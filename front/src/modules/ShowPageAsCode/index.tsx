import style from "./style.module.scss";
import { FunctionComponent } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface ShowPageAsCodeProps {
	content: string;
}

const ShowPageAsCode: FunctionComponent<ShowPageAsCodeProps> = (props) => {
	return (
		<section className={style.section}>
			<div className={style.content}>
				<SyntaxHighlighter
					language="html"
					wrapLines={true}
					wrapLongLines={true}
				>
					{props.content}
				</SyntaxHighlighter>
			</div>
		</section>
	);
};

export default ShowPageAsCode;
