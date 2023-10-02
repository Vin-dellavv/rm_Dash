import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { useSpeechRecognitionProps } from "../Models/general.models";

const useSpeechRecognition = ({
	qryTypeSel,
	setSrcVal,
	setSpchErr,
	setAllRes,
	handleSearch
}: useSpeechRecognitionProps) => {
	const navigate = useNavigate();
	const [isListening, setIsListening] = useState(false);
	const [recognition, setRecognition] = useState(
		new window.webkitSpeechRecognition()
	);

	const startListening = () => {
		// Run recording
		if (recognition && !isListening) recognition.start();
	};
	const stopListening = () => {
		// Stop recording
		if (recognition && isListening) recognition.stop();
	};

	useEffect(() => {
		if (!("webkitSpeechRecognition" in window)) {
			setSpchErr(() => ({
				prefix: "Speech Recognition Error",
				errorMsg: "Your voice recognition is disabled or unsupported"
			}));
			return;
		}
		// Init voice recording
		const recognitionInst = new window.webkitSpeechRecognition();
		// Options
		recognitionInst.lang = "en-US";
		/* @Properties - Default
		 * recognitionInst.grammars = speechRecognitionList;
		 * recognitionInst.continuous = false;
		 * recognitionInst.interimResults = false;
		 * recognitionInst.maxAlternatives = 1;
		 */

		// Notify recording start
		recognitionInst.onstart = () => setIsListening(true);
		// Elaboration recording
		recognitionInst.onresult = SpchEv => {
			const { results } = SpchEv;
			const { transcript } = results[0][0] || "";
			setSrcVal(transcript);
			handleSearch(transcript, qryTypeSel, setAllRes, navigate);
		};
		// Notify recording error
		recognitionInst.onerror = event => {
			setSpchErr(() => ({
				prefix: "Speech Recognition Error",
				errorMsg: event.error
			}));
			console.error("ERR: Speech Recognition - ", event.error);
		};
		// Notify recording end
		recognitionInst.onend = () => {
			recognitionInst.stop();
			setIsListening(false);
		};
		// set Instance in state
		setRecognition(recognitionInst);

		return () => {
			// Stop recording on clean-up
			recognitionInst.stop();
		};
	}, [handleSearch, qryTypeSel]);

	return {
		isListening,
		startListening,
		stopListening
	};
};

export default useSpeechRecognition;
