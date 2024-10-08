interface GetPagesContentParams {
	prodUrl: string;
	devUrl: string;
}

export async function getPagesContent({
	prodUrl,
	devUrl,
}: GetPagesContentParams): Promise<{
	prodHtml: string | null;
	devHtml: string | null;
}> {
	console.log("sending getPagesContent");
	try {
		const response = await fetch("http://localhost:3001/get-pages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				prodUrl,
				devUrl,
			}),
		});

		const data = await response.json();
		console.log(`data: ${data}`);

		return {
			prodHtml: data.prodHtml || null,
			devHtml: data.devHtml || null,
		};
	} catch (error) {
		console.error("Ошибка:", error);
		return {
			prodHtml: null,
			devHtml: null,
		};
	}
}
