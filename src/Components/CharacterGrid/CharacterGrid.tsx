import React from "react";
import { JSX } from "react";

import { Grid, AutoSizer } from "react-virtualized";
import CharacterCard from "../CharacterCard/CharacterCard";
import type { CharacterLs } from "../../Models/queries.model";
import "./CharacterGrid.css";

const CharacterGrid = ({
	characterLs
}: {
	characterLs: CharacterLs;
}): JSX.Element => {
	const renderCell = ({ columnIndex, rowIndex, key, style }: any) => {
		const index = rowIndex * 3 + columnIndex;
		if (index < characterLs.length) {
			return (
				<div key={key} style={style}>
					<CharacterCard charData={characterLs[index]} />
				</div>
			);
		}
		return null;
	};

	return (
		<>
			<h2>Characters list</h2>
			<div className="char__grid">
				{/* FIXME awful responsive handling */}
				<AutoSizer>
					{({ height, width }) => (
						<Grid
							height={height}
							width={width}
							rowCount={Math.ceil(characterLs.length / 2)}
							columnCount={3}
							rowHeight={450}
							columnWidth={width / 3}
							cellRenderer={renderCell}
						/>
					)}
				</AutoSizer>
			</div>
		</>
	);
};
export default CharacterGrid;
