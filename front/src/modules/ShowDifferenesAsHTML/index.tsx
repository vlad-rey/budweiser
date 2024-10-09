import ShowPageAsCode from "../ShowPageAsCode";
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
		<section>
			{/* <ShowPageAsCode content={markTextInHtml(props.content_1)} /> */}
			<div
				dangerouslySetInnerHTML={{ __html: markTextInHtml(props.content_1) }}
			/>
		</section>
	);
};

export default ShowDifferenesAsHTML;

function markTextInHtml(html: string): string {
	// Регулярное выражение для поиска содержимого между <body> и </body>
	const bodyRegex = /<body([^>]*)>([\s\S]*?)<\/body>/i;
	const bodyMatch = html.match(bodyRegex);

	if (bodyMatch) {
		// Вырезаем текст между <body> и </body>
		const bodyAttributes = bodyMatch[1]; // Сохраняем атрибуты
		const bodyContent = bodyMatch[2];

		// Обрабатываем текст внутри body
		const markedBodyContent = markTextInBody(bodyContent);

		// Вставляем обратно в исходный HTML с сохранением атрибутов
		return html.replace(
			bodyRegex,
			`<body${bodyAttributes}>${markedBodyContent}</body>`
		);
	}

	return html; // Возвращаем оригинальный HTML, если <body> не найден
}

function markTextInBody(bodyHtml: string): string {
	// Регулярное выражение для поиска текста вне <style> и <script>
	const regex =
		/(?:<style[^>]*>[\s\S]*?<\/style>|<script[^>]*>[\s\S]*?<\/script>|>([^<]+)<)/g;

	return bodyHtml.replace(regex, (match, text) => {
		// Если это текст, отмечаем его
		if (text) {
			const trimmedText = text.trim();
			return `>${
				trimmedText ? `##text-start##${trimmedText}###text-end###` : ""
			}<`;
		}
		// Возвращаем найденные <style> и <script> без изменений
		return match;
	});
}
