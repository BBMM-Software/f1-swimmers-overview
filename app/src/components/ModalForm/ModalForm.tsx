import { IonButton, IonContent, IonFooter, IonHeader, IonInput, IonLabel, IonList, IonModal, IonText, IonTitle, IonToolbar } from "@ionic/react";
import React, { useState } from "react";
import styles from './ModalForm.module.css'
import { useGlobal } from "../../services/global.store";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const ModalForm: React.FC<Props> = ({isOpen, onClose}) => {

    const [eventName, setEventName] = useState("");
    const [totalNumber, addEvent] = useGlobal(state => [state.totalNumber, state.addEvent])

    const handleSubmit = () => {
        addEvent({name: eventName, id: totalNumber + 1, series: []})
        onClose();
    }


    return (
        <IonModal className={styles.modal} isOpen={isOpen} onIonModalWillDismiss={() => onClose()}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add a new Event</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                    <IonInput
                        value={eventName}
                        onIonChange={(e) => {
                            if (e.target.value) {
                                setEventName(e.target.value.toString())
                            }
                        }}
                        type="text" 
                        fill="solid"
                        label="Name of the event"
                        labelPlacement="floating"
                    />
            </IonContent>
            <IonFooter style={{display: 'flex'}} className="ion-justify-content-end ion-padding">
                <IonButton onClick={() => handleSubmit()}>Create</IonButton>
            </IonFooter>
        </IonModal>
    )
}

export default ModalForm;