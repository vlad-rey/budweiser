"use client";

import style from "./style.module.scss";
import { FunctionComponent, useMemo, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import DiffMatchPatch from "diff-match-patch";

interface ShowDifferencesAsCodeProps {
	content_1: string;
	content_2: string;
}

const ShowDifferencesAsCode: FunctionComponent<ShowDifferencesAsCodeProps> = (
	props
) => {
	const dmp = new DiffMatchPatch();

	// Сравниваем два HTML фрагмента и получаем патч
	const diffHtml = useMemo(() => {
		const diff = dmp.diff_main(props.content_1, props.content_2);
		dmp.diff_cleanupSemantic(diff); // Убираем незначительные изменения

		return diff
			.map(([operation, text]) => {
				// Добавляем перенос строки после каждого фрагмента контента
				const formattedText = text
					.replace(/(>)(<)/g, "$1\n$2") // Перенос после закрывающего тега перед новым тегом
					.replace(/"([^"]*)"/g, '"$1"\n') // Перенос после закрывающей кавычки
					.replace(/<(\/?\w+)([^>]*)>/g, "<$1$2>\n") // Перенос после названия тега
					.replace(/</g, "\n<") // Перенос перед открывающими тегами
					.replace(/>(?!\s*$)/g, ">\n"); // Перенос после закрывающего тега, исключая пустую строку

				if (operation === 1) {
					return `##added##${formattedText}###added###`;
				}
				if (operation === -1) {
					return `##deleted##${formattedText}###deleted###`;
				}
				return formattedText + "\n";
			})
			.join("");
	}, [props.content_1, props.content_2]);

	const [errorIds, setErrorIds] = useState<string[]>([]); // Список ID всех изменений
	const [currentErrorIndex, setCurrentErrorIndex] = useState<number>(0); // Индекс текущей ошибки

	// Функция для замены маркеров на HTML элементы после рендеринга
	useEffect(() => {
		const contentElement = document.getElementById("differeces");

		if (contentElement) {
			// Генерация уникальных ID
			let uniqueIdCounter = 0;
			const ids: string[] = [];

			const uniqueId = () => {
				uniqueIdCounter += 1;
				return `diff-${uniqueIdCounter}`;
			};

			contentElement.innerHTML = contentElement.innerHTML
				.replace(/##added##(.*?)###added###/g, (match, p1) => {
					const id = uniqueId();
					ids.push(id); // Добавляем id в массив ошибок
					return `<div class="added" id="${id}" style="display: inline;">${p1}</div>`;
				})
				.replace(/##deleted##(.*?)###deleted###/g, (match, p1) => {
					const id = uniqueId();
					ids.push(id); // Добавляем id в массив ошибок
					return `<div class="deleted" id="${id}" style="display: inline;">${p1}</div>`;
				});

			setErrorIds(ids); // Сохраняем все уникальные ID ошибок
		}
	}, [diffHtml]);

	// Функция для скролла к определённому элементу по его ID
	const scrollToError = (index: number) => {
		const element = document.getElementById(errorIds[index]);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	// Обработчики для кнопок "Вперёд" и "Назад"
	const handleNextError = () => {
		const newIndex = (currentErrorIndex + 1) % errorIds.length; // Циклический переход
		setCurrentErrorIndex(newIndex);
		scrollToError(newIndex);
	};

	const handlePrevError = () => {
		const newIndex =
			(currentErrorIndex - 1 + errorIds.length) % errorIds.length; // Циклический переход
		setCurrentErrorIndex(newIndex);
		scrollToError(newIndex);
	};

	return (
		<section className={style.section}>
			<div className={style.content} id="differeces">
				<SyntaxHighlighter
					language="html"
					wrapLines
					wrapLongLines
					showLineNumbers
				>
					{diffHtml}
				</SyntaxHighlighter>
			</div>

			{/* Кнопки навигации по ошибкам */}
			<button onClick={handlePrevError}>Назад</button>
			<button onClick={handleNextError}>Вперёд</button>
		</section>
	);
};

export default ShowDifferencesAsCode;
