import './MainContent.css';
import React from "react";
import {useHistory} from "react-router-dom";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel} from "@ionic/react";

interface ContainerProps {
}

const MainContent: React.FC<ContainerProps> = () => {
    const history = useHistory();

    const handleItemClick = (path: string) => {
        history.push(path);
    };

    const handleAddEvent = () => {

    }

    return (
        <div className="card-container">
            <IonCard className="custom-card ion-text-center">
                <IonCardHeader>
                    <IonCardTitle>Swimming Events</IonCardTitle>
                    <IonCardSubtitle>Please select an event from the list bellow or create a new one</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent class="card-content">
                    <IonCard color="medium" className="content-card">
                        {/* Each list item is now a card */}
                        <IonCard className="list-item-card" button
                                 onClick={() => handleItemClick('/path-for-item')}>
                            <IonCardHeader>
                                <IonCardTitle>Swimming National Olympiad</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <div className="date-text">
                                    <IonLabel>14.10.2003</IonLabel>
                                </div>
                            </IonCardContent>
                        </IonCard>
                        <IonCard className="list-item-card" button
                                 onClick={() => handleItemClick('/path-for-item')}>
                            <IonCardHeader>
                                <IonCardTitle>Swimming National Olympiad</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <div className="date-text">
                                    <IonLabel>14.10.2003</IonLabel>
                                </div>
                            </IonCardContent>
                        </IonCard>
                        {/* Repeat for other items */}
                    </IonCard>
                    <div className="button-wrapper">
                    <IonButton className="button" onClick={() => handleAddEvent()}>Add new
                        event</IonButton> {/* Add event button */}
                    </div>
                    </IonCardContent>

            </IonCard>
        </div>
    );
};

export default MainContent;