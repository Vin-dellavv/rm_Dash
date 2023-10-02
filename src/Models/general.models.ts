import type React from "react";
import type {
	Character,
	CharacterLs,
	Episode,
	Location,
	SearchedResults
} from "./queries.model";

export enum ROUTES {
	CHARACTERS = "characters",
	EPISODES = "episodes",
	LOCATIONS = "locations"
}

/** Cmps */
export type MainHeaderProps = {
	bkgCol: string;
};
export type SelectQryTypeProps = {
	value: string;
	setter: (val: string) => void;
};
export type SuffixProps = {
	qryTypeSel: string;
	srcVal: string;
	setSrcVal: (value: string) => void;
};
export type CharacterCardProps = {
	charData: Character;
};
export type CardCarouselProps = {
	sliderData: CharacterLs;
};
export type ResultListTableProps = {
	resultList: (Episode | Location)[];
	type: string;
};
export type useSpeechRecognitionProps = {
	qryTypeSel: string;
	setSrcVal: (val: string) => void;
	setSpchErr: React.Dispatch<
		React.SetStateAction<{
			prefix: string;
			errorMsg: string;
		}>
	>;
	setAllRes: React.Dispatch<React.SetStateAction<SearchedResults>>;
	handleSearch: (
		value: string,
		qryTypeSel: string,
		cleanSrc: React.Dispatch<React.SetStateAction<SearchedResults>>,
		navTo: (url: string) => void
	) => void;
};
