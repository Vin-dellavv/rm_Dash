import React from "react";
import type { JSX } from "react";

import { Image, Space, Spin, theme } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import mortyLoader from "../../../Assets/Images/mortyLoader.png";
import "./Spinner.css";

const Spinner = (): JSX.Element => {
	const {
		token: { colorTextSecondary }
	} = theme.useToken();

	const spinnerIco = mortyLoader ? (
		<Image src={mortyLoader} alt="mortyloader" className="spinner__morty" />
	) : (
		<LoadingOutlined className="spinner__ico" spin />
	);

	return (
		<Space direction="vertical" className="spinner__wrapper">
			<Spin
				style={{ color: colorTextSecondary }}
				indicator={spinnerIco}
				size="large"
				tip="Loading..."
				className="spinner__spacer"
			>
				<div className="content" />
			</Spin>
		</Space>
	);
};
export default Spinner;
