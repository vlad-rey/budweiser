import React from "react";
import { AppBar, Toolbar, Typography, List, ListItem } from "@mui/material";

const Navigation: React.FC = () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div">
					Navigation
				</Typography>
				<List sx={{ display: "flex", flexDirection: "row", padding: 0 }}>
					<ListItem>
						<Typography>Page Prod HTML</Typography>
					</ListItem>
					<ListItem>
						<Typography>Page Dev HTML</Typography>
					</ListItem>
					<ListItem>
						<Typography>Page Prod Code</Typography>
					</ListItem>
					<ListItem>
						<Typography>Page Dev Code</Typography>
					</ListItem>
					<ListItem>
						<Typography>Pages Differences</Typography>
					</ListItem>
				</List>
			</Toolbar>
		</AppBar>
	);
};

export default Navigation;
