import { IonCol, IonInput, IonItem, IonRow, IonCheckbox } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { useGlobal } from "../../services/global.store";
import _, { indexOf, isNumber } from "lodash";
import { Swimmer } from "../../models/Swimmer";

interface Props {
	initialSwimmer: Swimmer;
	eventId?: number;
	seriesId: number;
	index: number;
}

const SwimmerForm: React.FC<Props> = ({ initialSwimmer, eventId, seriesId, index: indexSwimmer }) => {
	const [updateEvent, events] = useGlobal((state) => [state.updateEvent, state.events]);

	const lane = useRef(null);
	const name = useRef(null);
	const age = useRef(null);
	const team = useRef(null);
	const time = useRef(null);
	const dq = useRef(null);

	useEffect(() => {
		if(!lane||!age||!team||!time){
			return;
		}
		lane.current.value = initialSwimmer.lane;
		name.current.value = initialSwimmer.name;
		age.current.value = initialSwimmer.age;
		team.current.value = initialSwimmer.team;
		time.current.value = initialSwimmer.time;
	}, []);

	const handleChange = () => {
		// console.log("DQ IS" + dq.current.checked);
		let laneValue = parseInt(lane.current.value);
		let nameValue = name.current.value;
		let ageValue = parseInt(age.current.value);
		let teamValue = team.current.value;
		let timeValue = parseFloat(time.current.value);
		let dqValue : boolean = dq.current.checked
		const event = events.find((event) => event.id === eventId);
		if (event) {
			let serie = event.series.find((serie) => serie.id === seriesId);
			if (serie) {
				let swimmers = serie.swimmers;
				const series = event.series.map((serie) => {
					if (serie.id === seriesId) {
						return {
							id: seriesId,
							swimmers: _.range(0, 6).map((index) => {
								if (indexSwimmer === index) {
									return { id: index, name: nameValue, age: ageValue, team: teamValue, lane: laneValue, time: timeValue, dq: dqValue };
								}
								return swimmers[index];
							}),
						};
					}

					return serie;
				});

				updateEvent({ ...event, series: series });
			}
		}
	};

	return (
		<form>
			<IonRow>
				<IonCol>
					<IonItem>
						<IonInput
							ref={lane}
							type="number"
							label="Lane"
							defaultValue={initialSwimmer.lane}
							onIonChange={(e) => {
								handleChange();
							}}
						/>
					</IonItem>
				</IonCol>
				<IonCol>
					<IonItem>
						<IonInput
							ref={name}
							defaultValue={initialSwimmer.name}
							label="Name"
							onIonChange={(e) => {
								handleChange();
							}}
						/>
					</IonItem>
				</IonCol>

				<IonCol>
					<IonItem>
						<IonInput
							ref={age}
							type="number"
							label="Age"
							defaultValue={initialSwimmer.age}
							onIonChange={(e) => {
								handleChange();
							}}
						/>
					</IonItem>
				</IonCol>

				<IonCol>
					<IonItem>
						<IonInput
							ref={team}
							defaultValue={initialSwimmer.team}
							label="Team"
							onIonChange={(e) => {
								handleChange();
							}}
						/>
					</IonItem>
				</IonCol>
				<IonCol>
					<IonItem>
						<IonInput
							ref={time}
							type="number"
							label="Time"
							defaultValue={initialSwimmer.time}
							onIonChange={(e) => {
								handleChange();
							}}
						/>
					</IonItem>
				</IonCol>
				<IonCol>
					<IonItem>
						<IonCheckbox
							ref={dq}
							checked={initialSwimmer.dq}
							onIonChange={(e) => {
								handleChange();
							}}
							labelPlacement="start">
							Disqualified
						</IonCheckbox>
					</IonItem>
				</IonCol>
			</IonRow>
		</form>
	);
};

export default SwimmerForm;
