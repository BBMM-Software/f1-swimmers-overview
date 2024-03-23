import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonButton, IonIcon, IonItem, IonInput, IonRow } from "@ionic/react";
import "./Home.css";
import { add } from "ionicons/icons";
import React, { FormEventHandler, useEffect, useState } from "react";
import { useGlobal } from "../services/global.store";
import ModalForm from "../components/ModalForm/ModalForm";
import { EventS } from "../models/Event";
import SwimmerForm from "../components/SwimmerForm/SwimmerForm";
import _ from "lodash";

const Home: React.FC = () => {
	const [events, addEvent, removeEvent, updateEvent] = useGlobal((state) => [state.events, state.addEvent, state.removeEvent, state.updateEvent]);
	const [selectedEventId, setSelectedEventId] = useState<number | undefined>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState<EventS | undefined>();

	const getEventFromId = (e: EventS[], id: number | undefined) => e.find((el) => el.id == id);
	const getSelectedEventName = (e: EventS | undefined) => (e == undefined ? "none" : e.name);
	const addSeries = (event: EventS) => {
		const series = [
			...event.series,
			{
				id: event.series.length + 1,
				swimmers: _.range(0, 6).map((index) => ({ id: index, name: "", age: 0, team: "", lane: 0, time: ""})),
			},
		];
		setSelectedEvent(event);
		updateEvent({ ...event, series: series });
	};

    console.log("EVENTS", events);

	useEffect(() => {
		if (selectedEvent) {
			const myEvent = events.find((event) => event.id === selectedEventId);
			setSelectedEvent(myEvent);
			setSelectedEventId(myEvent?.id);
		}
	}, [events]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Swimmers Overview</IonTitle>
					<IonItem slot="end" lines="none">
						<IonButton fill="clear" onClick={() => setIsModalOpen(true)}>
							<IonIcon icon={add} />
						</IonButton>
						<IonSelect
							value={selectedEventId}
							placeholder="Select One"
							onIonChange={(e) => {
								setSelectedEventId(e.detail.value);
								setSelectedEvent(getEventFromId(events, e.detail.value));
							}}
							interface="popover"
						>
							{events.map((event) => (
								<IonSelectOption value={event.id}>{event.name}</IonSelectOption>
							))}
						</IonSelect>
					</IonItem>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<h1>Selected event is: {getSelectedEventName(selectedEvent)}</h1>
				{selectedEvent && (
					<div>
						<div>
							<IonRow className="ion-justify-content-around">
								<h3>Add Series</h3>
								<IonButton onClick={() => addSeries(selectedEvent)}>Add New Series</IonButton>
							</IonRow>
						</div>
						{selectedEvent.series.map((series) => (
							<div>
								<h4>
									Series {series.id} of {selectedEvent.series.length}
								</h4>
								<h3>Add Swimmer:</h3>

								{_.range(0, 6).map((index) => (
									<SwimmerForm initialSwimmer={series.swimmers[index]} eventId={selectedEventId} seriesId={series.id} index={index} />
								))}
							</div>
						))}
					</div>
				)}
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Blank</IonTitle>
					</IonToolbar>
				</IonHeader>
			</IonContent>
			<ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</IonPage>
	);
};

export default Home;
