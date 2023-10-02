import React from "react";
import { Navigate, RouteObject } from "react-router-dom";

import App from "./App/App";
import Characters from "./Queries/Characters";
import Character from "./Queries/Character";
import Episodes from "./Queries/Episodes";
import Episode from "./Queries/Episode";
import Locations from "./Queries/Locations";
import Location from "./Queries/Location";
import Searched from "./Queries/Searched";
import { ROUTES } from "./Models/general.models";

const { CHARACTERS, EPISODES, LOCATIONS } = ROUTES;

// Add new obj for new route
// TODO crumb in nested not work
const routes: RouteObject[] = [
	{
		path: "/",
		element: <App />,
		handle: {
			crumb: "Home"
		},
		children: [
			{
				path: CHARACTERS,
				children: [
					{
						index: true,
						element: <Characters />,
						handle: {
							crumb: CHARACTERS
						}
					},
					{
						path: `/${CHARACTERS}/:id`,
						element: <Character />,
						handle: {
							crumb: "/:id"
						}
					},
					{
						path: `/${CHARACTERS}/searched/:name`,
						element: <Searched />,
						handle: {
							crumb: "/searched/:name"
						}
					}
				]
			},
			{
				path: EPISODES,
				children: [
					{
						index: true,
						element: <Episodes />,
						handle: {
							crumb: EPISODES
						}
					},
					{
						path: `/${EPISODES}/:id`,
						element: <Episode />,
						handle: {
							crumb: "/:id"
						}
					},
					{
						path: `/${EPISODES}/searched/:name`,
						element: <Searched />,
						handle: {
							crumb: "/searched/:name"
						}
					}
				]
			},
			{
				path: LOCATIONS,
				children: [
					{
						index: true,
						element: <Locations />,
						handle: {
							crumb: LOCATIONS
						}
					},
					{
						path: `/${LOCATIONS}/:id`,
						element: <Location />,
						handle: {
							crumb: "/:id"
						}
					},
					{
						path: `/${LOCATIONS}/searched/:name`,
						element: <Searched />,
						handle: {
							crumb: "/searched/:name"
						}
					}
				]
			}
		]
	},
	{
		path: "*",
		element: <Navigate to="/" replace={true} />
	}
];
export { routes };
