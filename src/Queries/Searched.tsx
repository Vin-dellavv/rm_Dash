import React, { useContext, useEffect } from "react";
import type { JSX } from "react";
import { useLocation, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { SrcCTX } from "../Components/UI/MainContent/MainContent";

import { Empty } from "antd";
import Spinner from "../Components/UI/Spinner/Spinner";
import CharacterGrid from "../Components/CharacterGrid/CharacterGrid";
import ResultListTable from "../Components/ResultListTable/ResultListTable";
import { ROUTES } from "../Models/general.models";
import type {
	SearchedResults,
	CharacterLs,
	EpisodeLs,
	LocationLs
} from "../Models/queries.model";

const { CHARACTERS, EPISODES, LOCATIONS } = ROUTES;

// Queries
const CHARACTERS_BY_NAME = gql`
	query characters($filter: FilterCharacter, $page: Int!) {
		characters(filter: $filter, page: $page) {
			info {
				count
				pages
				next
				prev
			}
			results {
				id
				name
				status
				species
				gender
				image
			}
		}
	}
`;
const EPISODES_BY_NAME = gql`
	query episodes($filter: FilterEpisode, $page: Int!) {
		episodes(filter: $filter, page: $page) {
			info {
				count
				pages
				next
				prev
			}
			results {
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
	}
`;
const LOCATIONS_BY_NAME = gql`
	query locations($filter: FilterLocation, $page: Int!) {
		locations(filter: $filter, page: $page) {
			info {
				count
				pages
				next
				prev
			}
			results {
				id
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
	}
`;

// Selector
const getQuerySel = (value: string) => {
	switch (value) {
		default:
		case CHARACTERS:
			return CHARACTERS_BY_NAME;
		case EPISODES:
			return EPISODES_BY_NAME;
		case LOCATIONS:
			return LOCATIONS_BY_NAME;
	}
};

const Searched = (): JSX.Element => {
	const { allRes, setAllRes } = useContext(SrcCTX);
	const { name } = useParams();
	const { pathname } = useLocation();
	const [, pathRoot] = pathname.split("/", 2);

	const { loading, error, data, refetch } = useQuery(getQuerySel(pathRoot), {
		variables: { filter: { name }, page: 1 }
	});

	useEffect(() => {
		if (
			data?.[pathRoot]?.info?.next &&
			!data[pathRoot].info.next <= data[pathRoot].info.pages
		) {
			refetch({ page: data[pathRoot].info.next + 1 });
		}
	}, [data?.[pathRoot]?.info]);
	useEffect(() => {
		if (data?.[pathRoot]?.results?.length) {
			setAllRes(prevSts => [...prevSts, ...data[pathRoot].results]);
		}
	}, [data?.[pathRoot]?.results]);

	if (loading) return <Spinner />;
	if (error) return <Empty description={error.message} />;

	const queryResults: SearchedResults = allRes;

	const renderResults = () => {
		switch (pathRoot) {
			case CHARACTERS:
				return <CharacterGrid characterLs={queryResults as CharacterLs} />;
			case EPISODES:
				return (
					<ResultListTable
						type={pathRoot}
						resultList={queryResults as EpisodeLs}
					/>
				);
			case LOCATIONS:
				return (
					<ResultListTable
						type={pathRoot}
						resultList={queryResults as LocationLs}
					/>
				);
			default:
				return <Empty />;
		}
	};

	return renderResults();
};
export default Searched;
