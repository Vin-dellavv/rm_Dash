import React from "react";
import { JSX } from "react";

import { List } from "antd";
import CharacterCard from "../CharacterCard/CharacterCard";
import type { CharacterLs } from "../../Models/queries.model";
import "./CharacterGrid.css";

const { Item } = List;

const CharacterGrid = ({
	characterLs
}: {
	characterLs: CharacterLs;
}): JSX.Element => {
	return (
		<>
			<h2>Characters list</h2>
			<List // TODO add virtual list when antd implement it
				grid={{
					gutter: 16,
					xs: 1,
					sm: 1,
					md: 2,
					lg: 3,
					xl: 4,
					xxl: 6
				}}
				dataSource={characterLs}
				renderItem={item => (
					<Item>
						<CharacterCard charData={item} />
					</Item>
				)}
				className="charList"
			/>
		</>
	);
};
export default CharacterGrid;
