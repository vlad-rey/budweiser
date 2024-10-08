"use client";

import { FunctionComponent } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { TextField, Button, Box, Typography } from "@mui/material";
import style from "./style.module.scss";
import { useQuery } from "@/services/useQuery";

interface LinksFormProps {
	prodUrl: string;
	devUrl: string;
}

const LinksForm: FunctionComponent<LinksFormProps> = (props) => {
	const { updatePageQuery } = useQuery();

	const formik = useFormik({
		initialValues: {
			prodUrl: props.prodUrl,
			devUrl: props.devUrl,
		},

		onSubmit: async (values) => {
			handleSetUrls(values.prodUrl, values.devUrl);
		},
	});

	const handleSetUrls = (prodUrl: string, devUrl: string) => {
		updatePageQuery({ prodUrl, devUrl }, false);
	};

	return (
		<Box className={style.section}>
			<form onSubmit={formik.handleSubmit}>
				<Typography variant="h6" gutterBottom>
					Prod URL:
				</Typography>
				<TextField
					fullWidth
					id="prodUrl"
					name="prodUrl"
					label="Production URL"
					variant="outlined"
					value={formik.values.prodUrl}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					required
					margin="normal"
				/>

				<Typography variant="h6" gutterBottom>
					Dev URL:
				</Typography>
				<TextField
					fullWidth
					id="devUrl"
					name="devUrl"
					label="Development URL"
					variant="outlined"
					value={formik.values.devUrl}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					required
					margin="normal"
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					sx={{ mt: 2 }}
				>
					Сравнить
				</Button>
			</form>
		</Box>
	);
};

export default LinksForm;
