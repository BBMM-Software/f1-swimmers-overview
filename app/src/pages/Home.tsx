import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonItem
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import {add} from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useGlobal } from '../services/global.store';
import { EventS } from '../models/Event';

const Home: React.FC = () => {

    const [events, addEvent, removeEvent] = useGlobal(state => [state.events, state.addEvent, state.removeEvent]);
    const [selectedValue, setSelectedValue] = useState();

    useEffect(() => {
        const event: EventS = {name: "Event 1", series: [], id: "1" };
        addEvent(event);
    }, [])
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Swimmers Overview</IonTitle>
                    <IonItem slot="end" lines="none">
                        <IonButton fill="clear" onClick={() => {console.log("test")}}>
                            <IonIcon icon={add}/>
                        </IonButton>
                        <IonSelect
                            value={selectedValue}
                            placeholder="Select One"
                            onIonChange={e => setSelectedValue(e.detail.value)}
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
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Blank</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer/>
            </IonContent>
        </IonPage>
    );
};

export default Home;
