"use client";

import { FunctionComponent } from "react";
import { Typography, List, ListItem, Box } from "@mui/material";
import { useQuery } from "@/services/useQuery";
import style from "./style.module.scss";
import LinksForm from "../Form";
import Link from "next/link";

interface NavigationProps {
	activeNav: string;
	prodUrl: string;
	devUrl: string;
}

const Navigation: FunctionComponent<NavigationProps> = (props) => {
	const { updatePageQuery } = useQuery();

	const handleSetUrls = (nav: string) => {
		updatePageQuery({ nav }, false);
	};

	return (
		<div className={style.wrapper}>
			<Box
				sx={{
					width: 500,
					paddingBottom: 2,
					cursor: "default",
				}}
			>
				<Typography
					variant="h6"
					component="div"
					sx={{
						padding: 2,
						textAlign: "left",
						backgroundColor: "#1976d2", // Цвет фона заголовка
						color: "white", // Цвет текста заголовка
					}}
				>
					Budweiser
				</Typography>
				<LinksForm prodUrl={props.prodUrl} devUrl={props.devUrl} />
				<List sx={{ padding: "20px 0" }}>
					{[
						"page-prod-code",
						"page-dev-code",
						"pages-differences-code",
						"pages-differences-html",
					].map((page) => (
						<ListItem
							key={page}
							component="button"
							onClick={() => handleSetUrls(page)}
							sx={{
								borderRadius: 1,
								paddingLeft: 2,
								paddingRight: 2,
								backgroundColor:
									props.activeNav === page ? "#e3f2fd" : "#f5f5f5",
								color: props.activeNav === page ? "#1976d2" : "inherit",
								"&:hover": {
									backgroundColor: "#e0e0e0", // Цвет фона при наведении
								},
								"&:active": {
									backgroundColor: "#bdbdbd", // Цвет фона при нажатии
								},
							}}
						>
							<Typography>
								{page.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())}
							</Typography>
						</ListItem>
					))}
					<ListItem
						component="button"
						sx={{
							borderRadius: 1,
							paddingLeft: 2,
							paddingRight: 2,
							backgroundColor: "#f5f5f5",
							color: "inherit",
							"&:hover": {
								backgroundColor: "#e0e0e0", // Цвет фона при наведении
							},
							"&:active": {
								backgroundColor: "#bdbdbd", // Цвет фона при нажатии
							},
						}}
					>
						<Typography>
							<Link href={props.devUrl || "#"} target="_blank">
								{props.devUrl}
							</Link>
						</Typography>
					</ListItem>
					<ListItem
						component="button"
						sx={{
							borderRadius: 1,
							paddingLeft: 2,
							paddingRight: 2,
							backgroundColor: "#f5f5f5",
							color: "inherit",
							"&:hover": {
								backgroundColor: "#e0e0e0", // Цвет фона при наведении
							},
							"&:active": {
								backgroundColor: "#bdbdbd", // Цвет фона при нажатии
							},
						}}
					>
						<Typography>
							<Link href={props.prodUrl || "#"} target="_blank">
								{props.prodUrl}
							</Link>
						</Typography>
					</ListItem>
				</List>
			</Box>
		</div>
	);
};

export default Navigation;
