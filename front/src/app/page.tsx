import Navigation from "@/modules/Navigation";
import style from "./page.module.scss";
import LinksForm from "@/modules/Form";
import { QueryProvider } from "@/services/useQuery";
import { getPagesContent } from "@/services/getPagesContent";
import ShowPageAsCode from "@/modules/ShowPageAsCode";
import { Inter } from "next/font/google";
import ShowDifferenesAsCode from "@/modules/ShowDifferenesAsCode";
import ShowPageAsHTML from "@/modules/ShowPageAsHTML";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export default async function Home({
	searchParams,
}: {
	searchParams: { prodUrl: string; devUrl: string; nav: string };
}) {
	const { prodUrl, devUrl, nav } = searchParams;

	const pagesContent = await getPagesContent({
		prodUrl,
		devUrl,
	});

	console.log(pagesContent.devHtml);

	return (
		<main className={`${inter.className} ${style.main}`}>
			<div className={style.wrapper}>
				<QueryProvider>
					<Navigation activeNav={nav} />
					<div className={style.content}>
						<h1>Сравнение HTML-страниц</h1>
						<LinksForm prodUrl={prodUrl} devUrl={devUrl} />
						{nav === "page-dev-code" && (
							<ShowPageAsCode content={pagesContent.devHtml || ""} />
						)}
						{nav === "page-prod-code" && (
							<ShowPageAsCode content={pagesContent.prodHtml || ""} />
						)}
						{nav === "pages-differences" && (
							<ShowDifferenesAsCode
								content_1={pagesContent.prodHtml || ""}
								content_2={pagesContent.devHtml || ""}
							/>
						)}
						{nav === "page-prod-html" && prodUrl && (
							<ShowPageAsHTML url={prodUrl} />
						)}
						{nav === "page-dev-html" && devUrl && (
							<ShowPageAsHTML url={devUrl} />
						)}
					</div>
				</QueryProvider>
			</div>
		</main>
	);
}
