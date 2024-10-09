"use client";

import { FunctionComponent } from "react";
import { Typography, List, ListItem, Box } from "@mui/material";
import { useQuery } from "@/services/useQuery";
import style from "./style.module.scss";

interface NavigationProps {
	activeNav: string;
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
					backgroundColor: "#f5f5f5", // Цвет фона
					paddingTop: 2,
					paddingBottom: 2,
					height: "100vh",
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
				<List sx={{ padding: "20px 0" }}>
					{[
						"page-prod-html",
						"page-dev-html",
						"page-prod-code",
						"page-dev-code",
						"pages-differences",
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
				</List>
			</Box>
		</div>
	);
};

export default Navigation;
