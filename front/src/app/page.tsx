import Navigation from "@/modules/Navigation";
import style from "./page.module.scss";
import { QueryProvider } from "@/services/useQuery";
import { getPagesContent } from "@/services/getPagesContent";
import ShowPageAsCode from "@/modules/ShowPageAsCode";
import { Inter } from "next/font/google";
import ShowDifferenesAsCode from "@/modules/ShowDifferenesAsCode";
import ShowDifferenesAsHTML from "@/modules/ShowDifferenesAsHTML";

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
	return (
		<main className={`${inter.className} ${style.main}`}>
			<div className={style.wrapper}>
				<QueryProvider>
					<Navigation activeNav={nav} prodUrl={prodUrl} devUrl={devUrl} />
					<div className={style.content}>
						{nav === "page-dev-code" && (
							<ShowPageAsCode content={pagesContent.devHtml || ""} />
						)}
						{nav === "page-prod-code" && (
							<ShowPageAsCode content={pagesContent.prodHtml || ""} />
						)}
						{nav === "pages-differences-code" && (
							<ShowDifferenesAsCode
								content_1={pagesContent.prodHtml || ""}
								content_2={pagesContent.devHtml || ""}
							/>
						)}
						{nav === "pages-differences-html" && (
							<ShowDifferenesAsHTML
								content_1={pagesContent.prodHtml || ""}
								content_2={pagesContent.devHtml || ""}
							/>
						)}
					</div>
				</QueryProvider>
			</div>
		</main>
	);
}
