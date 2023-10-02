export type Character = {
	id: string;
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
	image: string;
	created: Date;
	episode: EpisodeLs;
	location: Location;
	origin: Location;
};
export type CharacterLs = Character[];

export type Episode = {
	id: string;
	name: string;
	air_date: string;
	episode: string;
	characters: Character[];
	created: Date;
};
export type EpisodeLs = Episode[];

export type Location = {
	id: string;
	name: string;
	type: string;
	dimension: string;
	residents: Character[];
	created: Date;
};
export type LocationLs = Location[];

export type SearchedResults = CharacterLs | EpisodeLs | LocationLs;
