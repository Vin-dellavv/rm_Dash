import React from "react";
import type { JSX } from "react";

import { ConfigProvider, theme, Layout } from "antd";
import AsideMenu from "../Components/UI/AsideMenu/AsideMenu";
import MainContent from "../Components/UI/MainContent/MainContent";
import "./App.css";

const App = (): JSX.Element => {
	return (
		<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
			<Layout className="app__wrapper">
				<AsideMenu />
				<MainContent />
			</Layout>
		</ConfigProvider>
	);
};
export default App;
