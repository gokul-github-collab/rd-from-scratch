import { useEffect, useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
    body: {
        padding: 10,
        fontFamily: 'Helvetica',
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCol: {
        flex: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
    },
    tableColSno: {
        width: "20%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
    },
    tableCell: {
        margin: 5,
        fontSize: 10,
    },
    header: {
        backgroundColor: "#f2f2f2",
        padding: 5,
        fontWeight: "bold",
    },
    moduleHeader: {
        backgroundColor: "#f9f9f9",
        padding: 5,
        fontWeight: "bold",
    },
});

const SubjectDetailPDF = ({ sid }) => {
    const [subject, setSubject] = useState(null);

    useEffect(() => {
        getSubject(sid);
    }, [sid]);

    const getSubject = (sid) => {
        api.get(`/api/subject/${sid}/`)
            .then((res) => setSubject(res.data))
            .catch(err => toast.error(err));
    }

    return (
        <Document>
            <Page style={styles.body}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={[styles.tableCell, styles.header]}>Course Content:</Text>
                        </View>
                    </View>
                    {subject && subject.cc && subject.cc.map((cc, index) => (
                        <React.Fragment key={index}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={[styles.tableCell, styles.moduleHeader]}>
                                        Module {cc.module}: {cc.title} - {cc.hrs_pw}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{cc.description}</Text>
                                </View>
                            </View>
                        </React.Fragment>
                    ))}
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Total Hours(L): 45</Text>
                        </View>
                    </View>


                    {/* Text Book Reference  */}

                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={[styles.tableCell, styles.header]}>Text Book Reference</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColSno}>
                            <Text style={[styles.tableCell, styles.header]}>S.no</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={[styles.tableCell, styles.header]}>Text Book Name</Text>
                        </View>
                    </View>
                    {subject && subject.tb && subject.tb.map((tb, index) => (
                        <View style={styles.tableRow} key={index}>
                            <View style={styles.tableColSno}>
                                <Text style={styles.tableCell}>{tb.sno}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{tb.name}</Text>
                            </View>
                        </View>
                    ))}


                    {/* Reference Book */}

                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={[styles.tableCell, styles.header]}>Reference Book</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColSno}>
                            <Text style={[styles.tableCell, styles.header]}>S.no</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={[styles.tableCell, styles.header]}>Reference Book Name</Text>
                        </View>
                    </View>
                    {subject && subject.rb && subject.rb.map((rb, index) => (
                        <View style={styles.tableRow} key={index}>
                            <View style={styles.tableColSno}>
                                <Text style={styles.tableCell}>{rb.sno}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{rb.name}</Text>
                            </View>
                        </View>
                    ))}


                    {/* Web Reference  */}


                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={[styles.tableCell, styles.header]}>Website Reference</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColSno}>
                            <Text style={[styles.tableCell, styles.header]}>S.no</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={[styles.tableCell, styles.header]}>Website URL</Text>
                        </View>
                    </View>
                    {subject && subject.wr && subject.wr.map((wr, index) => (
                        <View style={styles.tableRow} key={index}>
                            <View style={styles.tableColSno}>
                                <Text style={styles.tableCell}>{wr.sno}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{wr.url}</Text>
                            </View>
                        </View>
                    ))}



                    {/* Online Reference */}


                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={[styles.tableCell, styles.header]}>Online Reference</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColSno}>
                            <Text style={[styles.tableCell, styles.header]}>S.no</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={[styles.tableCell, styles.header]}>Online Website URL</Text>
                        </View>
                    </View>
                    {subject && subject.oref && subject.oref.map((oref, index) => (
                        <View style={styles.tableRow} key={index}>
                            <View style={styles.tableColSno}>
                                <Text style={styles.tableCell}>{oref.sno}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{oref.url}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document >
    );
};

export default SubjectDetailPDF;
