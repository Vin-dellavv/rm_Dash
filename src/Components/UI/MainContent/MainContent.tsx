import React, { createContext, useState } from "react";
import type { JSX } from "react";
import { Outlet, useOutlet } from "react-router-dom";

import { Layout, theme, Image } from "antd";
import MainHeader from "../MainHeader/MainHeader";
import BreadCrumbs from "../Breadcrumbs/Breadcrumbs";
import MainFooter from "../Footer/Footer";
import rickAndMortyHome from "../../../Assets/Images/rick-and-morty-home.png";
import type { SearchedResults } from "../../../Models/queries.model";
import "./MainContent.css";

const { Content } = Layout;

type ContextSts = {
	allRes: SearchedResults;
	setAllRes: React.Dispatch<React.SetStateAction<SearchedResults>>;
};
export const SrcCTX = createContext<ContextSts>({} as ContextSts);

const Home = (): JSX.Element => (
	<main className="home__wrapper">
		<Image src={rickAndMortyHome} height="70vh" alt="home logo" />
	</main>
);

const MainContent = (): JSX.Element => {
	const isValidOutlet = useOutlet();
	const [allRes, setAllRes] = useState<SearchedResults>([]);

	const {
		token: { colorBgContainer }
	} = theme.useToken();

	return (
		<Layout>
			<SrcCTX.Provider value={{ allRes, setAllRes }}>
				<MainHeader bkgCol={colorBgContainer} />
				<Content className="main__wrapper ">
					<BreadCrumbs />
					<div
						className="main__content"
						style={{ background: colorBgContainer }}
					>
						{isValidOutlet ? <Outlet /> : <Home />}
					</div>
				</Content>
				<MainFooter />
			</SrcCTX.Provider>
		</Layout>
	);
};
export default MainContent;
