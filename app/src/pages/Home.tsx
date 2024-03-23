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
    IonToolbar
} from '@ionic/react';
import './Home.css';
import {add, arrowBack} from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import {useGlobal} from '../services/global.store';
import ModalForm from '../components/ModalForm/ModalForm';
import {EventS} from "../models/Event";

const Home: React.FC = () => {

    const [events, addEvent, removeEvent, updateEvent] = useGlobal(state => [state.events, state.addEvent, state.removeEvent, state.updateEvent]);
    const [selectedEventId, setSelectedEventId] = useState<number | undefined>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventS | undefined>();

    const getEventFromId = (e: EventS[], id: number | undefined) => e.find(el => el.id == id);
    const getSelectedEventName = (e: EventS | undefined) => e == undefined ? "none" : e.name;
    const addSeries = (event: EventS) => {
        const series = [...event.series, {id: event.series.length + 1, swimmers: []}];
        setSelectedEvent(event)
        updateEvent({...event, series: series})
    }

    const selectNone = () => {
        setSelectedEvent(undefined);
        setSelectedEventId(undefined);
    }

    useEffect(() => {
        if (selectedEvent) {
            const myEvent = events.find(event => event.id === selectedEventId)
            setSelectedEvent(myEvent)
            setSelectedEventId(myEvent?.id);
        }
    }, [events])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Swimmers Overview</IonTitle>
                    <IonItem slot="end" lines="none">
                        <IonButton fill="clear" onClick={() => setIsModalOpen(true)}>
                            <IonIcon icon={add}/>
                        </IonButton>
                        <IonSelect
                            value={selectedEventId}
                            placeholder="Select One"
                            onIonChange={e => {
                                setSelectedEventId(e.detail.value);
                                setSelectedEvent(getEventFromId(events, e.detail.value))
                            }
                            }
                            interface="popover"
                        >
                            {events.map(event => (
                                <IonSelectOption value={event.id}>{event.name}</IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {
                    selectedEvent &&
                    <div className="event-wrapper">
                        <IonButton onClick={() => {
                            selectNone()
                        }}>
                            <IonIcon icon={arrowBack}/>
                        </IonButton>
                        <h1>Selected event is: {getSelectedEventName(selectedEvent)}</h1>
                        <div>
                            <IonRow className="ion-justify-content-around">
                                <h3>Add Series</h3>
                                <IonButton onClick={() => addSeries(selectedEvent)}>Add New Series</IonButton>
                            </IonRow>
                        </div>
                        {selectedEvent.series.map(series => (
                            <div>
                                <h4>Series {series.id} of {selectedEvent.series.length}</h4>
                                <h3>Add Swimmer:</h3>
                                <form>
                                    <IonRow>
                                        <IonItem>
                                            <IonInput label="Lane"></IonInput>
                                        </IonItem>

                                        <IonItem>
                                            <IonInput label="Name"></IonInput>
                                        </IonItem>

                                        <IonItem>
                                            <IonInput label="Age"></IonInput>
                                        </IonItem>

                                        <IonItem>
                                            <IonInput label="Team"></IonInput>
                                        </IonItem>

                                        <IonItem>
                                            <IonInput label="Time"></IonInput>
                                        </IonItem>
                                    </IonRow>
                                </form>
                            </div>
                        ))}

                    </div>
                }
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Blank</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {
                    !selectedEvent &&
                    <div className="card-container">
                        <IonCard className="custom-card ion-text-center">
                            <IonCardHeader>
                                <IonCardTitle>Swimming Events</IonCardTitle>
                                <IonCardSubtitle>Please select an event from the list bellow or create a new
                                    one</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent class="card-content">
                                <IonCard color="light" className="content-card">
                                    {/* Each list item is now a card */}
                                    {events.map(event => (
                                        <IonCard className="list-item-card" button
                                                 onClick={() => {
                                                     setSelectedEventId(event.id);
                                                     setSelectedEvent(event)
                                                 }}>
                                            <IonCardHeader>
                                                <IonCardTitle>{event.name}</IonCardTitle>
                                            </IonCardHeader>
                                        </IonCard>
                                    ))}
                                </IonCard>
                                <div className="button-wrapper">
                                    <IonButton className="button" onClick={() => setIsModalOpen(true)}>Add new
                                        event</IonButton> {/* Add event button */}
                                </div>
                            </IonCardContent>

                        </IonCard>
                    </div>
                }
            </IonContent>
            <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </IonPage>
    );
};

export default Home;
