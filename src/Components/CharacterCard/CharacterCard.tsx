import React from "react";
import { JSX } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Image } from "antd";
import { ROUTES } from "../../Models/general.models";
import type { CharacterCardProps } from "../../Models/general.models";
import "./CharacterCard.css";

const { Meta } = Card;

const CharacterCard = ({ charData }: CharacterCardProps): JSX.Element => {
	const navigate = useNavigate();
	const { id, image, name, status, species, type, gender } = charData || {};

	const handleDetail = (idSel: string) =>
		navigate(`/${ROUTES.CHARACTERS}/${idSel}`);

	return (
		<Card
			key={id}
			hoverable
			className="character__card"
			cover={
				<Image
					src={image}
					width="200px"
					height="100%"
					alt={`character ${name}`}
				/>
			}
			onClick={() => handleDetail(id)}
		>
			<Meta
				title={name}
				description={
					<ul className="character__info">
						<li>
							<span>
								<strong>Status:</strong> {status}
							</span>
						</li>
						<li>
							<span>
								<strong>Species:</strong> {species}
							</span>
						</li>
						{type && (
							<li>
								<span>
									<strong>Type:</strong> {type}
								</span>
							</li>
						)}
						<li>
							<span>
								<strong>Gender:</strong> {gender}
							</span>
						</li>
					</ul>
				}
			/>
		</Card>
	);
};
export default CharacterCard;
