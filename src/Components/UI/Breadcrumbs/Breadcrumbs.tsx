import React from "react";
import type { JSX } from "react";
import { useMatches, useNavigate } from "react-router-dom";

import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./Breadcrumbs.css";

const BreadCrumbs = (): JSX.Element => {
	const navigate = useNavigate();
	const matches = useMatches();
	// TODO use handle and crumb when fixed nested elemts
	const isHome = (crumb: string) => crumb === "/";
	const crumbLs = matches
		// Create ls for cmp
		.map(match => {
			const { pathname } = match;
			const splitPath = pathname.split("/");
			return {
				href: pathname,
				title: isHome(pathname) ? (
					<HomeOutlined />
				) : (
					splitPath[splitPath.length - 1]
				),
				onclick: () => navigate(pathname)
			};
		});

	return <Breadcrumb items={crumbLs} className="breadcrumbs__wrapper" />;
};
export default BreadCrumbs;
