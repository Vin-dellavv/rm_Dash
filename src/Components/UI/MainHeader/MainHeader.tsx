import React from "react";
import type { JSX } from "react";

import { Layout, Space } from "antd";
import SearchBar from "../SearchBar/SearchBar";
import type { MainHeaderProps } from "../../../Models/general.models";
import "./MainHeader.css";

const { Header } = Layout;

const MainHeader = ({ bkgCol }: MainHeaderProps): JSX.Element => {
	return (
		<Header className="header__wrapper" style={{ background: bkgCol }}>
			<Space direction="vertical" className="header__spacer">
				<SearchBar />
			</Space>
		</Header>
	);
};
export default MainHeader;
