import React from "react";
import type { JSX } from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

import { Button, Descriptions, Empty, Image } from "antd";
import Spinner from "../Components/UI/Spinner/Spinner";
import ResultListTable from "../Components/ResultListTable/ResultListTable";
import { LinkOutlined } from "@ant-design/icons";
import { ROUTES } from "../Models/general.models";
import type {
	Character as CharacterT,
	Location
} from "../Models/queries.model";
import "./Queries.css";

const { LOCATIONS } = ROUTES;

const ExtLink = ({ item }: { item: Location }) => {
	const navigate = useNavigate();
	const handleNavigate = (type: string, id: string) => {
		navigate(`/${type}/${id}`);
	};

	return (
		<>
			{item.name}{" "}
			<Button
				icon={<LinkOutlined />}
				type="link"
				onClick={() => handleNavigate(LOCATIONS, item.id)}
			></Button>
		</>
	);
};

const GET_CHARACTER_BY_ID = gql`
	query character($id: ID!) {
		character(id: $id) {
			name
			status
			species
			type
			gender
			image
			created
			origin {
				id
				name
			}
			location {
				id
				name
			}
			episode {
				id
				name
				air_date
				episode
			}
		}
	}
`;

const Character = (): JSX.Element => {
	const { id } = useParams();
	const { loading, error, data } = useQuery(GET_CHARACTER_BY_ID, {
		variables: { id }
	});

	if (loading) return <Spinner />;
	if (error) return <Empty description={error.message} />;

	const characterSel: CharacterT = data.character;
	const {
		name,
		status,
		species,
		type,
		gender,
		image,
		created,
		origin,
		location,
		episode
	} = characterSel || "-";
	// Parse into obj as antd expectations
	const characterDescItems = [
		{
			key: "1",
			label: "Status",
			children: status
		},
		{
			key: "2",
			label: "Species",
			children: species
		},
		{
			key: "3",
			label: "Type",
			children: type
		},
		{
			key: "4",
			label: "Gender",
			children: gender
		},
		{
			key: "5",
			label: "Origin",
			children:
				origin?.name && origin.name !== "unknown" ? (
					<ExtLink item={origin} />
				) : (
					"-"
				)
		},
		{
			key: "6",
			label: "Location",
			children:
				location?.name && location.name !== "unknown" ? (
					<ExtLink item={location} />
				) : (
					"-"
				)
		},
		{
			key: "7",
			label: "Created",
			children: format(new Date(created), "dd MMMM yy")
		}
	];

	return (
		<div className="character__wrapper">
			<picture>
				<Image
					src={image}
					width="200px"
					height="100%"
					alt={`character ${name}`}
					className="character__image"
				/>
			</picture>
			<Descriptions
				title={name}
				layout="vertical"
				items={characterDescItems}
				className="character__info"
			/>
			<div className="character__episodes">
				<h3>Episodes: </h3>
				<ResultListTable type={ROUTES.EPISODES} resultList={episode} />
			</div>
		</div>
	);
};
export default Character;
