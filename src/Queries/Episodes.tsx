import React, { useEffect, useState } from "react";
import type { JSX } from "react";
import { gql, useQuery } from "@apollo/client";

import { Empty } from "antd";
import Spinner from "../Components/UI/Spinner/Spinner";
import ResultListTable from "../Components/ResultListTable/ResultListTable";
import { ROUTES } from "../Models/general.models";
import type { EpisodeLs } from "../Models/queries.model";

const GET_EPISODES_LIST = gql`
	query episodes($page: Int!) {
		episodes(page: $page) {
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

const Episodes = (): JSX.Element => {
	const [allEps, setAllEps] = useState<EpisodeLs>([]);
	const { loading, error, data, refetch } = useQuery(GET_EPISODES_LIST, {
		variables: { page: 1 }
	});

	// Refetch if multiple pages
	useEffect(() => {
		if (
			data?.episodes?.info?.next &&
			!data.episodes.info.next <= data.episodes.info.pages
		) {
			refetch({ page: data.episodes.info.next + 1 });
		}
	}, [data?.episodes?.info]);
	// Store all results to show
	useEffect(() => {
		if (data?.episodes?.results?.length) {
			setAllEps(prevSts => [...prevSts, ...data.episodes.results]);
		}
	}, [data?.episodes?.results]);

	if (loading) return <Spinner />;
	if (error) return <Empty description={error.message} />;

	const episodeLs: EpisodeLs = allEps;

	return (
		<div>
			<h2>Episodes list</h2>
			<ResultListTable type={ROUTES.EPISODES} resultList={episodeLs} />
		</div>
	);
};
export default Episodes;
