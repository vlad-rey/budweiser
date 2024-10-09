"use client";

import style from "./style.module.scss";
import { FunctionComponent, useMemo, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import DiffMatchPatch from "diff-match-patch";
import tagsData from "@/data/html-tags-attributes.json";

interface ShowDifferencesAsCodeProps {
	content_1: string;
	content_2: string;
}

const ShowDifferencesAsCode: FunctionComponent<ShowDifferencesAsCodeProps> = (
	props
) => {
	const dmp = new DiffMatchPatch();

	// Функция для форматирования HTML с переносами строк
	const formatHtmlWithLineBreaks = (html: string) => {
		const { htmlTags, htmlAttributes } = tagsData;
	
		// Форматируем HTML, добавляя переносы
		let formattedHtml = html
			// Убираем пробелы перед открывающими и закрывающими тегами
			.replace(/\s*(<\/?[a-zA-Z]+[^>]*>)\s*/g, '$1') 
			// Заменяем открывающие и закрывающие теги на новые строки
			.replace(/(<\/?[a-zA-Z][^>]*>)/g, '\n$1') 
			// Заменяем атрибуты на новой строке, если они есть
			.replace(new RegExp(`(${htmlAttributes.join("|")})="([^"]*)"`, "g"), '\n  $1="$2"') 
			// Добавляем отступы для вложенных тегов
			.replace(/(\n\s*<)/g, '\n  <'); 
	
		// Удаляем лишние переносы в начале и конце строки
		formattedHtml = formattedHtml.trim();
	
		return formattedHtml;
	};
	


	// Сравниваем два HTML фрагмента и получаем патч
	const diffHtml = useMemo(() => {
		const diff = dmp.diff_main(props.content_1, props.content_2);
		dmp.diff_cleanupSemantic(diff); // Убираем незначительные изменения

		return diff
			.map(([operation, text]) => {
				const formattedText = formatHtmlWithLineBreaks(text); // Применяем форматирование

				if (operation === 1) {
					return `##added##${formattedText}###added###`;
				}
				if (operation === -1) {
					return `##deleted##${formattedText}###deleted###`;
				}
				return formattedText ;
			})
			.join("");
	}, [props.content_1, props.content_2]);

	const [errorIds, setErrorIds] = useState<string[]>([]); // Список ID всех изменений
	const [currentErrorIndex, setCurrentErrorIndex] = useState<number>(0); // Индекс текущей ошибки

	//TODO: костыль, чтобы не видеть диффы в ссылках 
	// Функция для замены маркеров на HTML элементы после рендеринга
	// useEffect(() => {
	// 	const contentElement = document.getElementById("differeces");
	
	// 	if (contentElement) {
	// 		// Генерация уникальных ID
	// 		let uniqueIdCounter = 0;
	// 		const ids: string[] = [];
	
	// 		const uniqueId = () => {
	// 			uniqueIdCounter += 1;
	// 			return `diff-${uniqueIdCounter}`;
	// 		};
	
	// 		// Регулярное выражение для проверки URL
	// 		const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/g; // Подходит для всех URL
	
	// 		// Удаляем все URL из содержимого перед сравнением
	// 		const cleanedContent = contentElement.innerHTML.replace(urlRegex, '[URL]');
	
	// 		contentElement.innerHTML = cleanedContent
	// 			.replace(/##added##(.*?)###added###/g, (match, p1) => {
	// 				// Игнорируем изменения, если текст содержит '[URL]'
	// 				if (p1.includes('[URL]')) {
	// 					return p1; // Вернуть текст без изменений
	// 				}
	// 				const id = uniqueId();
	// 				ids.push(id); // Добавляем id в массив ошибок
	// 				return `<div class="added" id="${id}" style="display: inline;">${p1}</div>`;
	// 			})
	// 			.replace(/##deleted##(.*?)###deleted###/g, (match, p1) => {
	// 				// Игнорируем изменения, если текст содержит '[URL]'
	// 				if (p1.includes('[URL]')) {
	// 					return p1; // Вернуть текст без изменений
	// 				}
	// 				const id = uniqueId();
	// 				ids.push(id); // Добавляем id в массив ошибок
	// 				return `<div class="deleted" id="${id}" style="display: inline;">${p1}</div>`;
	// 			});
	
	// 		setErrorIds(ids); // Сохраняем все уникальные ID ошибок
	// 	}
	// }, [diffHtml]);
	

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
