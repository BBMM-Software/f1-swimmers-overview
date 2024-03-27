import React, {useEffect} from "react";
import {PDFViewer, View, Text, Page, Document, StyleSheet} from "@react-pdf/renderer"
import {useGlobal} from "../services/global.store";

const styles = StyleSheet.create({
    table: {
        display: "flex",
        flexDirection: "row",
    },
    tableElementLong: {
        fontSize: "15px",
        padding: "2px",
        width: "35%",
        border: "1px solid black",
        textAlign: "center"
    },
    tableElementShort: {
        fontSize: "15px",
        padding: "2px",
        width: "15%",
        border: "1px solid black",
        textAlign: "center"
    },
    title: {
        textAlign: "center",
        paddingBottom: "10px",
        paddingTop: "10px"
    },
    tableElementShortRed: {
        color: "red",
        fontSize: "15px",
        padding: "2px",
        width: "15%",
        border: "1px solid black",
        textAlign: "center"
    },
});
const PdfExport: React.FC = () => {
    const [swimmers, selectedEvent] = useGlobal(state => [state.swimmers, state.selectedEvent]);

    let sortedSwimmers = swimmers;
    sortedSwimmers.sort((a, b) => {
        if (a.dq && !b.dq) return 1;
        if (!a.dq && b.dq) return -1;

        return a.time - b.time;
    });

    return(
        <PDFViewer width="100%" height="100%">
            <Document>
                <Page size="A4" >
                    <View>
                        <Text style={styles.title}>Event: {selectedEvent?.name}</Text>
                    </View>
                    {/*Table Header*/}
                    <View style={styles.table}>
                        <Text style={styles.tableElementShort}> Place </Text>
                        <Text style={styles.tableElementLong}> Name </Text>
                        <Text style={styles.tableElementShort}> Age </Text>
                        <Text style={styles.tableElementLong}> Team </Text>
                        <Text style={styles.tableElementShort}> Time(s) </Text>
                    </View>
                    {/*Table Content*/}
                    {sortedSwimmers.map((swimmer,index) => (
                        <View style={styles.table}>
                            <Text style={styles.tableElementShort}> {index+1} </Text>
                            <Text style={styles.tableElementLong}> {swimmer.name} </Text>
                            <Text style={styles.tableElementShort}> {swimmer.age} </Text>
                            <Text style={styles.tableElementLong}> {swimmer.team} </Text>
                            <Text style={!swimmer.dq ? styles.tableElementShort : styles.tableElementShortRed}> {swimmer.time} </Text>
                        </View>
                    ))}
                </Page>
            </Document>

        </PDFViewer>
    )
}

export default PdfExport;