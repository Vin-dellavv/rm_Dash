import React from "react";
import type { JSX } from "react";
import { gql, useQuery } from "@apollo/client";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

import { Descriptions, Empty } from "antd";
import Spinner from "../Components/UI/Spinner/Spinner";
import CardCarousel from "../Components/CardCarousel/CardCarousel";
import type { Location as locationT } from "../Models/queries.model";

const GET_LOCATION_BY_ID = gql`
	query location($id: ID!) {
		location(id: $id) {
			name
			type
			dimension
			residents {
				id
				name
				status
				species
				type
				gender
				image
			}
			created
		}
	}
`;

const Location = (): JSX.Element => {
	const { id } = useParams();
	const { loading, error, data } = useQuery(GET_LOCATION_BY_ID, {
		variables: { id }
	});

	if (loading) return <Spinner />;
	if (error) return <Empty description={error.message} />;

	const locationSel: locationT = data.location;
	const { name, type, created, dimension, residents } = locationSel || {};
	// Mutate obj for antd expectations
	const locationDescItems = [
		{
			key: "1",
			label: "Type",
			children: type
		},
		{
			key: "2",
			label: "Dimension",
			children: dimension
		},
		{
			key: "3",
			label: "Created",
			children: format(new Date(created), "dd MMMM yy")
		}
	];

	return (
		<div className="location__wrapper">
			<Descriptions title={name} layout="vertical" items={locationDescItems} />
			<div className="location__residents">
				<h4>Residents: </h4>
				<CardCarousel sliderData={residents} />
			</div>
		</div>
	);
};
export default Location;
