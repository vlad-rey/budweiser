import Navigation from "@/modules/Navigation";
import styles from "./page.module.scss";
import LinksForm from "@/modules/Form";
import { QueryProvider } from "@/services/useQuery";
import { getPagesContent } from "@/services/getPagesContent";

// Отправить инфу с инпутов |||||||| DONE
// Получить конент страницы Html с бека и вывести
// Навигация для передвижения по ошибкам

export default async function Home({
	searchParams,
}: {
	searchParams: { prodUrl: string; devUrl: string };
}) {
	const { prodUrl, devUrl } = searchParams;
	const pagesContent = await getPagesContent({
		prodUrl,
		devUrl,
	});

	console.log(pagesContent);

	return (
		<main className={styles.main}>
			<Navigation />
			<div>
				<h1>Сравнение HTML-страниц</h1>
				<QueryProvider>
					<LinksForm prodUrl={prodUrl} devUrl={devUrl} />
				</QueryProvider>

				{/* <div
				dangerouslySetInnerHTML={{
					__html: pagesContent.devHtml?.toString() || "",
				}}
			/> */}
				<div>{pagesContent.devHtml?.toString()}</div>
			</div>
		</main>
	);
}
