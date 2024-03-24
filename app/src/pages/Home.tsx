import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonContent,
	IonHeader,
	IonIcon,
	IonInput,
	IonItem,
	IonPage,
	IonRow,
	IonSelect,
	IonSelectOption,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { add, arrowBack } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useGlobal } from "../services/global.store";
import ModalForm from "../components/ModalForm/ModalForm";
import { EventS } from "../models/Event";
import _ from "lodash";
import SwimmerForm from "../components/SwimmerForm/SwimmerForm";
import {Swimmer} from "../models/Swimmer";

const Home: React.FC = () => {
	const [events, addEvent, removeEvent, updateEvent, updateSwimmers, setSelectedEventGlobal] = useGlobal((state) => [state.events, state.addEvent, state.removeEvent, state.updateEvent, state.updateSwimmers, state.setSelectedEvent]);
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
				swimmers: _.range(0, 6).map((index) => ({ id: index, name: "", age: 0, team: "", lane: 0, time: "" })),
			},
		];
		setSelectedEvent(event);
		updateEvent({ ...event, series: series });
	};

	const exportToPdf = (e : EventS | undefined) => {
		if(!e){
			return;
		}
		const allSwimmersForSelectedEvent: Swimmer[] = e.series.flatMap(series => series.swimmers);
		const filledSwimmers = allSwimmersForSelectedEvent.filter(
            (swimmer) => swimmer.lane && swimmer.name && swimmer.age != 0 && swimmer.team
        );
		updateSwimmers(filledSwimmers)
		window.open("/pdfexport");
	};

	const selectNone = () => {
		setSelectedEvent(undefined);
		setSelectedEventId(undefined);
	};

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
								setSelectedEventGlobal(getEventFromId(events, e.detail.value));
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
			<IonContent fullscreen>
				{selectedEvent && (
					<div className="event-wrapper">
						<IonButton
							onClick={() => {
								selectNone();
							}}
						>
							<IonIcon icon={arrowBack} />
						</IonButton>
						<h1>Selected event is: {getSelectedEventName(selectedEvent)}</h1>
						{selectedEvent && (
							<div>
								<div>
									<IonRow className="ion-justify-content-around">
										<IonButton onClick={() => addSeries(selectedEvent)}>Add New Series</IonButton>
										<IonButton onClick={() => exportToPdf(selectedEvent)}>Export to PDF</IonButton>
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
					</div>
				)}
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Blank</IonTitle>
					</IonToolbar>
				</IonHeader>
				{!selectedEvent && (
					<div className="card-container">
						<IonCard className="custom-card ion-text-center">
							<IonCardHeader>
								<IonCardTitle>Swimming Events</IonCardTitle>
								<IonCardSubtitle>Please select an event from the list bellow or create a new one</IonCardSubtitle>
							</IonCardHeader>
							<IonCardContent class="card-content">
								<IonCard color="light" className="content-card">
									{/* Each list item is now a card */}
									{events.map((event) => (
										<IonCard
											className="list-item-card"
											button
											onClick={() => {
												setSelectedEventId(event.id);
												setSelectedEvent(event);
												setSelectedEventGlobal(event);
											}}
										>
											<IonCardHeader>
												<IonCardTitle>{event.name}</IonCardTitle>
											</IonCardHeader>
										</IonCard>
									))}
								</IonCard>
								<div className="button-wrapper">
									<IonButton className="button" onClick={() => setIsModalOpen(true)}>
										Add new event
									</IonButton>{" "}
									{/* Add event button */}
								</div>
							</IonCardContent>
						</IonCard>
					</div>
				)}
			</IonContent>
			<ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</IonPage>
	);
};

export default Home;
