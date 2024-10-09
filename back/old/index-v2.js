const express = require("express");
require("dotenv").config();
const { fetchHtmlContent } = require("./fetchHtml");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function getHtmlContent(url) {
	if (!url) {
		throw new Error("URL не может быть undefined или пустым.");
	}

	console.log(`Загрузка HTML с ${url}.`);
	return await fetchHtmlContent(url);
}

app.post("/get-pages", async (req, res) => {
	const { prodUrl, devUrl } = req.body;

	console.log(`prodUrl: ${prodUrl}`, `devUrl: ${devUrl}`);

	if (!prodUrl || !devUrl) {
		return res.status(400).send("Оба URL должны быть указаны.");
	}

	try {
		const prodHtml = await getHtmlContent(prodUrl);
		const devHtml = await getHtmlContent(devUrl);

		res.send({ prodHtml, devHtml });
	} catch (error) {
		console.error(error);
		res.status(500).send("Произошла ошибка");
	}
});

app.listen(port, () => {
	console.log(`Сервер запущен на http://localhost:${port}`);
});
