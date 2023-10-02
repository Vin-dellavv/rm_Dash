import React from "react";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

import { Table } from "antd";
import { ROUTES } from "../../Models/general.models";
import type { Location, Episode } from "../../Models/queries.model";
import type { ResultListTableProps } from "../../Models/general.models";

const { LOCATIONS, EPISODES } = ROUTES;

const baseClmns = [
	{ title: "Id", dataIndex: "id", key: "id", width: 30 },
	{ title: "Name", dataIndex: "name", key: "name" }
];
const episodeClmns = [
	...baseClmns,
	{ title: "Air date", dataIndex: "air_date", key: "air_date" },
	{ title: "Episode code", dataIndex: "episode", key: "episode" }
];
const locationClmns = [
	...baseClmns,
	{ title: "Type", dataIndex: "type", key: "type" },
	{ title: "Dimension", dataIndex: "dimension", key: "dimension" }
];

const ResultListTable = ({
	resultList,
	type
}: ResultListTableProps): JSX.Element => {
	const navigate = useNavigate();

	const handleRowClick = (data: Episode | Location) => {
		const { id } = data;
		navigate(`/${type === LOCATIONS ? LOCATIONS : EPISODES}/${id}`);
	};

	return (
		<Table
			bordered={true}
			virtual
			columns={type === EPISODES ? episodeClmns : locationClmns}
			scroll={{ x: 500, y: 500 }}
			rowKey="id"
			dataSource={!resultList?.length ? [] : resultList}
			pagination={false}
			onRow={record => ({
				onClick: () => handleRowClick(record)
			})}
		/>
	);
};
export default ResultListTable;
