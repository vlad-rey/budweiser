import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import { fetchHtmlContent } from "./modules/fetchHtmlTs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function getHtmlContent(url: string): Promise<string> {
	if (!url) {
		throw new Error("URL не может быть undefined или пустым.");
	}

	console.log(`Загрузка HTML с ${url}.`);
	return await fetchHtmlContent(url);
}

app.post("/get-pages", async (req: Request, res: Response): Promise<void> => {
	const { prodUrl, devUrl } = req.body;

	console.log("Получен запрос на /get-pages.");
	console.log(`prodUrl: ${prodUrl}, devUrl: ${devUrl}`);

	if (!prodUrl || !devUrl) {
		console.warn("Оба URL должны быть указаны.");
		res.status(400).send("Оба URL должны быть указаны.");
		return;
	}

	try {
		console.log("Начинается загрузка HTML для production URL.");
		const prodHtml = await getHtmlContent(prodUrl);
		console.log("HTML для production URL загружен.");

		console.log("Начинается загрузка HTML для development URL.");
		const devHtml = await getHtmlContent(devUrl);
		console.log("HTML для development URL загружен.");

		res.send({ prodHtml, devHtml });
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Произошла ошибка: ${error.message}`);
		} else {
			console.error("Произошла ошибка: Неизвестный тип ошибки.");
		}
		res.status(500).send("Произошла ошибка");
	}
});

app.listen(port, () => {
	console.log(`Сервер запущен на http://localhost:${port}`);
});
