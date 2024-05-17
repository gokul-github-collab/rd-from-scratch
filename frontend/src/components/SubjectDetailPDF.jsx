import { useEffect, useState } from 'react'
import api from '../api'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import React from 'react'


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
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
});


const SubjectDetailPDF = ({ sid }) => {
    const [subject, setSubject] = useState(null)


    useEffect(() => {
        getSubject(sid)

    }, [sid])


    const getSubject = (sid) => {
        api.get(`/api/subject/${sid}/`).
            then((res) => setSubject(res.data)).
            catch(err => toast.error(err))
    }

    return (
        <>

            <Document>
                <Page style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Subject Details</Text>

                        <View style={styles.section}>
                            <Text style={styles.text}>Name: {subject ? subject.name : ""}</Text>
                            <Text style={styles.text}>Course Code: {subject ? subject.course_code : ""}</Text>
                            <Text style={styles.text}>LTPC: {subject ? subject.ltpc : ""}</Text>
                            <Text style={styles.text}>Prerequisite: {subject ? subject.prerequisite : ""}</Text>
                            <Text style={styles.text}>External_mark: {subject ? subject.external_mark : ""}</Text>
                            <Text style={styles.text}>Internal_mark: {subject ? subject.internal_mark : ""}</Text>

                        </View>

                        <View style={styles.section}>
                            <Text style={styles.heading}>Course Outcome</Text>

                            {subject && subject.co && subject.co.map((co) => (

                                <>

                                    <Text style={styles.text}>Title: {co.title}</Text>

                                    <Text style={styles.text}>Description: {co.description}</Text>
                                    <Text style={styles.text}>U/ AP: {co.uap}</Text>
                                
                                </>
                            ))}

                        </View>

                    </View>
                </Page>
            </Document>


        </>
    )
}

export default SubjectDetailPDF