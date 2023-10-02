import React from "react";
import type { JSX } from "react";

import { Layout } from "antd";
import "./Footer.css";

const { Footer } = Layout;

const MainFooter = (): JSX.Element => {
	return (
		<Footer className="footer__wrapper">
			Mock project powered by Ant Design ©2023 Created by Ant UED
		</Footer>
	);
};
export default MainFooter;
