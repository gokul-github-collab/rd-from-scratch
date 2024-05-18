import { useEffect, useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20, 
    },
    borderBox: {
        border: '5px solid #ccc',
        padding: 5, /* Add padding here for content spacing */
        width: 'calc(100% - 20px)', /* Adjust for border width */
        height: 'calc(100% - 20px)', /* Adjust for border width */
        marginTop: 'auto', /* Center content vertically */
        marginBottom: 'auto', /* Center content vertically */
        marginLeft: 'auto', /* Center content horizontally */
        marginRight: 'auto', /* Center content horizontally */
      },
    section: {
        marginBottom: 10,
    },
    heading: {
        fontSize: 18,
        marginBottom: 6,
    },
    text: {
        fontSize: 12,
        marginBottom: 4,
    },
    table: {
        display: "flex",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
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
    tableCell: {
        margin: 5,
        fontSize: 10,
    },
    borderBox: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        padding: 10,
    },
    flexRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#000",
        paddingVertical: 5,
    },
    flexCell: {
        flex: 1,
        textAlign: 'left',
        paddingHorizontal: 5,
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
            <Page style={styles.page}>
                <View style={styles.borderBox}>
                <View style={styles.section}>
                    <Text style={styles.heading}>Subject Details</Text>
                    <View style={styles.borderBox}>
                        <View style={styles.flexRow}>
                            <Text style={styles.flexCell}>Course Code:</Text>
                            <Text style={styles.flexCell}>{subject ? subject.course_code : ""}</Text>
                        </View>
                        <View style={styles.flexRow}>
                            <Text style={styles.flexCell}>Name:</Text>
                            <Text style={styles.flexCell}>{subject ? subject.name : ""}</Text>
                        </View>
                        <View style={styles.flexRow}>
                            <Text style={styles.flexCell}>LTPC:</Text>
                            <Text style={styles.flexCell}>{subject ? subject.ltpc : ""}</Text>
                        </View>
                        <View style={styles.flexRow}>
                            <Text style={styles.flexCell}>Prerequisite(s):</Text>
                            <Text style={styles.flexCell}>{subject ? subject.prerequisite : "Nil"}</Text>
                        </View>
                        <View style={styles.flexRow}>
                            <Text style={styles.flexCell}>External Mark:</Text>
                            <Text style={styles.flexCell}>{subject ? subject.external_mark : ""}</Text>
                        </View>
                        <View style={styles.flexRow}>
                            <Text style={styles.flexCell}>Internal Mark:</Text>
                            <Text style={styles.flexCell}>{subject ? subject.internal_mark : ""}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>Course Outcome</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Title</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Description</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>U/ AP</Text>
                            </View>
                        </View>
                        {subject && subject.co && subject.co.map((co, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{co.title}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{co.description}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{co.uap}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>Course Content</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Module</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Title</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Description</Text>
                            </View>
                        </View>
                        {subject && subject.cc && subject.cc.map((cc, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{cc.module}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{cc.title}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{cc.description}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>Text Books</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>S.no</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Book Name</Text>
                            </View>
                        </View>
                        {subject && subject.tb && subject.tb.map((tb, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{tb.sno}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{tb.name}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>Reference Books</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>S.no</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>Book Name</Text>
                            </View>
                        </View>
                        {subject && subject.rb && subject.rb.map((rb, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{rb.sno}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{rb.name}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>Web Reference</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>S.no</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>URL</Text>
                            </View>
                        </View>
                        {subject && subject.wr && subject.wr.map((wr, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{wr.sno}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{wr.url}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>Online Reference</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>S.no</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>URL</Text>
                            </View>
                        </View>
                        {subject && subject.oref && subject.oref.map((oref, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{oref.sno}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{oref.url}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                </View>
            </Page>
        </Document>
    )
}

export default SubjectDetailPDF
