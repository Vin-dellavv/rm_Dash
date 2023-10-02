import React from "react";
import type { JSX } from "react";

import { Image } from "antd";
import rickAndMortylogo from "../../../Assets/Images/rick-and-morty-logo.png";
import "./Logo.css";

const Logo = (): JSX.Element => {
	return (
		<div className="logo__wrapper">
			<Image src={rickAndMortylogo} />
		</div>
	);
};
export default Logo;
