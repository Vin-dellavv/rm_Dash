import React, { useEffect, useState } from "react";
import type { JSX } from "react";
import { gql, useQuery } from "@apollo/client";

import { Empty } from "antd";
import Spinner from "../Components/UI/Spinner/Spinner";
import CharacterGrid from "../Components/CharacterGrid/CharacterGrid";
import type { CharacterLs } from "../Models/queries.model";
import "./Queries.css";

const GET_CHARACTERS_LIST = gql`
	query characters($page: Int!) {
		characters(page: $page) {
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
				type
				gender
				image
			}
		}
	}
`;

const Characters = (): JSX.Element => {
	const [allChara, setAllChara] = useState<CharacterLs>([]);
	const { loading, error, data, refetch } = useQuery(GET_CHARACTERS_LIST, {
		variables: { page: 1 }
	});

	// Refetch if multiple pages
	useEffect(() => {
		if (
			data?.characters?.info?.next &&
			!data.characters.info.next <= data.characters.info.pages
		) {
			refetch({ page: data.characters.info.next + 1 });
		}
	}, [data?.characters?.info]);
	// Store all results to show
	useEffect(() => {
		if (data?.characters?.results?.length) {
			setAllChara(prevSts => [...prevSts, ...data.characters.results]);
		}
	}, [data?.characters?.results]);

	if (loading) return <Spinner />;
	if (error) return <Empty description={error.message} />;

	const characterLs: CharacterLs = allChara;
	return <CharacterGrid characterLs={characterLs} />;
};
export default Characters;
