import React, { useState } from "react";
import type { JSX, Key, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import Logo from "../Logo/Logo";
import {
	DesktopOutlined,
	GlobalOutlined,
	TeamOutlined
} from "@ant-design/icons";
import { ROUTES } from "../../../Models/general.models";
import type { MenuInfo } from "rc-menu/lib/interface";

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
	label: ReactNode,
	key: Key,
	icon?: ReactNode,
	children?: MenuItem[]
): MenuItem => {
	return {
		key,
		icon,
		children,
		label
	};
};

const items: MenuItem[] = [
	getItem("Characters", ROUTES.CHARACTERS, <TeamOutlined />),
	getItem("Locations", ROUTES.LOCATIONS, <GlobalOutlined />),
	getItem("Episodes", ROUTES.EPISODES, <DesktopOutlined />)
	/*
	, [
		// ADD list
		getItem("Team 1", "6"),
		getItem("Team 2", "8")
	]
	 */
];

const AsideMenu = (): JSX.Element => {
	const [collapsed, setCollapsed] = useState(false);
	const navigate = useNavigate();

	const handleClick = ({ key }: MenuInfo): void => navigate(`/${key}`);

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={value => setCollapsed(value)}
		>
			<Logo />
			<Menu
				theme="dark"
				defaultSelectedKeys={["1"]}
				mode="inline"
				items={items}
				onClick={ev => handleClick(ev)}
			/>
		</Sider>
	);
};
export default AsideMenu;
