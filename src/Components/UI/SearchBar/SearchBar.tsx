import React, { useContext, useEffect, useState } from "react";
import type { JSX } from "react";
import { useNavigate } from "react-router-dom";
import useSpeechRecognition from "../../../Hooks/useSpeechRecognition";
import { SrcCTX } from "../MainContent/MainContent";

import { Select, Input, Button, notification } from "antd";
import {
	SearchOutlined,
	AudioOutlined,
	DeleteOutlined,
	LoadingOutlined
} from "@ant-design/icons";
import type { SearchedResults } from "../../../Models/queries.model";
import type {
	SelectQryTypeProps,
	SuffixProps
} from "../../../Models/general.models";
import "./SearchBar.css";

const { Option } = Select;
const { Search } = Input;

const Suffix = ({
	qryTypeSel,
	srcVal,
	setSrcVal
}: SuffixProps): JSX.Element => {
	const { setAllRes } = useContext(SrcCTX);
	const [api, contextHolder] = notification.useNotification();

	const [spchErr, setSpchErr] = useState({ prefix: "", errorMsg: "" });
	const { isListening, startListening, stopListening } = useSpeechRecognition({
		qryTypeSel,
		setSrcVal,
		setSpchErr,
		setAllRes,
		handleSearch
	});

	useEffect(() => {
		if (spchErr && Object.values(spchErr).filter(e => e).length) {
			api.error({
				message: spchErr.prefix,
				description: spchErr.errorMsg
			});
		}
	}, [spchErr]);

	return (
		<div className="suffix__wrapper">
			<Button
				type="link"
				className="suffix__btn"
				icon={
					isListening ? (
						<LoadingOutlined className="spaceBar__audio-logo" />
					) : (
						<AudioOutlined className="spaceBar__audio-logo" />
					)
				}
				onClick={!isListening ? startListening : stopListening}
			/>
			{!!srcVal?.length && (
				<Button
					type="link"
					className="suffix__btn"
					icon={<DeleteOutlined />}
					onClick={() => setSrcVal("")}
				/>
			)}
			{contextHolder}
		</div>
	);
};

const SelectQryType = ({ value, setter }: SelectQryTypeProps): JSX.Element => {
	return (
		<Select value={value} onChange={setter}>
			<Option value="characters">Characters</Option>
			<Option value="locations">Locations</Option>
			<Option value="episodes">Episodes</Option>
		</Select>
	);
};

const handleSearch = (
	value: string,
	qryTypeSel: string,
	cleanSrc: React.Dispatch<React.SetStateAction<SearchedResults>>,
	navTo: (url: string) => void
): void => {
	cleanSrc([]); // Clean-up search data
	navTo(`/${qryTypeSel}/searched/${value}`);
};

const SearchBar = (): JSX.Element => {
	const navigate = useNavigate();
	const { setAllRes } = useContext(SrcCTX);
	const [srcValue, setSrcValue] = useState("");
	const [qryTypeSel, setQryTypeSel] = useState("characters");

	const handleQryTypeChange = (event: string) => {
		// Clean-up input
		setSrcValue("");
		// Set Query Selected
		setQryTypeSel(event);
	};

	return (
		<Search
			value={srcValue}
			addonBefore={
				<SelectQryType value={qryTypeSel} setter={handleQryTypeChange} />
			}
			placeholder="Input search text"
			enterButton={
				<Button
					type="primary"
					icon={<SearchOutlined />}
					disabled={!srcValue.length}
				/>
			}
			size="middle"
			suffix={
				<Suffix
					qryTypeSel={qryTypeSel}
					srcVal={srcValue}
					setSrcVal={setSrcValue}
				/>
			}
			onChange={val => setSrcValue(val.target.value)}
			onSearch={() => handleSearch(srcValue, qryTypeSel, setAllRes, navigate)}
		/>
	);
};
export default SearchBar;
