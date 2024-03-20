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
import React from 'react';
import Store from 'electron-store'

const Home: React.FC = () => {

    const [selectedValue, setSelectedValue] = React.useState('');

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
                            <IonSelectOption>Event 1</IonSelectOption>
                            <IonSelectOption>Event 2</IonSelectOption>
                            <IonSelectOption>Event 3</IonSelectOption>
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
