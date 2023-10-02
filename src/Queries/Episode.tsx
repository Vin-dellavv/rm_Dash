import React from "react";
import type { JSX } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import { Descriptions, Empty } from "antd";
import CardCarousel from "../Components/CardCarousel/CardCarousel";
import type { Episode as EpisodeT } from "../Models/queries.model";
import Spinner from "../Components/UI/Spinner/Spinner";

const GET_EPISODE_BY_ID = gql`
	query episode($id: ID!) {
		episode(id: $id) {
			id
			name
			air_date
			episode
			characters {
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

const Episode = (): JSX.Element => {
	const { id } = useParams();
	const { loading, error, data } = useQuery(GET_EPISODE_BY_ID, {
		variables: { id }
	});

	if (loading) return <Spinner />;
	if (error) return <Empty description={error.message} />;

	const episodeSel: EpisodeT = data.episode;
	const { name, episode, air_date, created, characters } = episodeSel || {};
	// Mutate obj for antd expectations
	const episodeDescItems = [
		{
			key: "1",
			label: "Episode",
			children: episode
		},
		{
			key: "2",
			label: "Air date",
			children: air_date
		},
		{
			key: "3",
			label: "Created",
			children: format(new Date(created), "dd MMMM yy")
		}
	];

	return (
		<div className="episode__wrapper">
			<Descriptions title={name} layout="vertical" items={episodeDescItems} />
			<div className="episode__residents">
				<h4>Characters: </h4>
				<CardCarousel sliderData={characters} />
			</div>
		</div>
	);
};
export default Episode;
