import React from "react";
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
});
const PdfExport: React.FC = () => {
    const [swimmers] = useGlobal(state => [state.rankedSwimmers]);

    return(
        <PDFViewer width="100%" height="100%">
            <Document>
                <Page size="A4" >
                    <View>
                        <Text style={styles.title}>Name of the event</Text>
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
                    {swimmers.map(swimmer => (
                        <View style={styles.table}>
                            <Text style={styles.tableElementShort}> {swimmer.place} </Text>
                            <Text style={styles.tableElementLong}> {swimmer.name} </Text>
                            <Text style={styles.tableElementShort}> {swimmer.age} </Text>
                            <Text style={styles.tableElementLong}> {swimmer.team} </Text>
                            <Text style={styles.tableElementShort}> {swimmer.time} </Text>
                        </View>
                    ))}
                </Page>
            </Document>

        </PDFViewer>
    )
}

export default PdfExport;