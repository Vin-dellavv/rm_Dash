import React, { useEffect, useRef } from "react";
import type { JSX } from "react";

import CharacterCard from "../CharacterCard/CharacterCard";
import type { CarouselProps } from "antd";
import type { Character } from "../../Models/queries.model";
import type { CardCarouselProps } from "../../Models/general.models";
import "./cardCarousel.css";

const CarouselItem = ({ data }: { data: Character }): JSX.Element => {
	if (!data || !Object.keys(data)?.length) return <></>;

	return (
		<article className="carousel-item" id={`post-${data.id}`}>
			<CharacterCard charData={data} />
		</article>
	);
};

const Carousel = ({ children }: CarouselProps): JSX.Element => {
	const slider = useRef<HTMLDivElement | null>(null);

	const scroll = (ev: WheelEvent) => {
		ev.preventDefault();
		if (slider.current) {
			slider.current.scrollLeft += (ev.deltaY || ev.deltaX) * 0.4;
		}
	};
	useEffect(() => {
		if (slider.current) {
			slider.current.addEventListener("wheel", scroll);
		}
	});
	return (
		<div className="carousel">
			<div className="slider" ref={slider}>
				{children}
			</div>
		</div>
	);
};
Carousel.Item = CarouselItem;

const CardCarousel = ({ sliderData }: CardCarouselProps): JSX.Element => {
	const { Item } = Carousel;

	return (
		<Carousel>
			{sliderData.map((post, i) => (
				<Item key={i} data={post} />
			))}
		</Carousel>
	);
};
export default CardCarousel;
