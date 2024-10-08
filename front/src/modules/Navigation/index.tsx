import React from "react";
import { AppBar, Toolbar, Typography, List, ListItem } from "@mui/material";

const Navigation: React.FC = () => {
	return (
		<AppBar position="static">
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TabList onChange={handleChange} aria-label="lab API tabs example">
						<Tab label="Item One" value="1" />
						<Tab label="Item Two" value="2" />
						<Tab label="Item Three" value="3" />
					</TabList>
				</Box>
				<TabPanel value="1">Item One</TabPanel>
				<TabPanel value="2">Item Two</TabPanel>
				<TabPanel value="3">Item Three</TabPanel>
			</TabContext>
			<CustomTabPanel value={value} index={0}>
				Item One
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				Item Two
			</CustomTabPanel>
			<CustomTabPanel value={value} index={2}>
				Item Three
			</CustomTabPanel>
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
