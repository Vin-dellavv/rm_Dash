import React, { useEffect, useState } from "react";
import type { JSX } from "react";
import { gql, useQuery } from "@apollo/client";

import { Empty } from "antd";
import Spinner from "../Components/UI/Spinner/Spinner";
import ResultListTable from "../Components/ResultListTable/ResultListTable";
import { ROUTES } from "../Models/general.models";
import type { LocationLs } from "../Models/queries.model";

const GET_LOCATIONS_LIST = gql`
	query locations($page: Int!) {
		locations(page: $page) {
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

const Locations = (): JSX.Element => {
	const [allPlaces, setAllPlaces] = useState<LocationLs>([]);
	const { loading, error, data, refetch } = useQuery(GET_LOCATIONS_LIST, {
		variables: { page: 1 }
	});

	// Refetch if multiple pages
	useEffect(() => {
		if (
			data?.locations?.info?.next &&
			!data.locations.info.next <= data.locations.info.pages
		) {
			refetch({ page: data.locations.info.next + 1 });
		}
	}, [data?.locations?.info]);
	// Store all results to show
	useEffect(() => {
		if (data?.locations?.results?.length) {
			setAllPlaces(prevSts => [...prevSts, ...data.locations.results]);
		}
	}, [data?.locations?.results]);

	if (loading) return <Spinner />;
	if (error) return <Empty description={error.message} />;

	const locationLs: LocationLs = allPlaces;

	return (
		<>
			<h2>Locations list</h2>
			<ResultListTable type={ROUTES.LOCATIONS} resultList={locationLs} />
		</>
	);
};
export default Locations;
