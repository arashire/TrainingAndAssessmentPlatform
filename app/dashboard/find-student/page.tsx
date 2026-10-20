'use client';

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../../../firebase";
import { db } from "@/firebase";
import Link from 'next/link';

type Student = {
    id: string;
    name: string;
    studentId?: string;
    lastCoutse?: string;
};

export default function FindStudentPage() {
    const [ students, setStudents ] = useState<Student[]>([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const loadStudents = async () => {
            try {
                console.log('Loading students...')
                
                const snapshot = await getDocs(
                    collection(db, 'jcadTest')
                );
                
                console.log(
                    'Documents found:',
                    snapshot.docs.length
                );
                
                const data = snapshot.docs.map((doc) => {
                    console.log(
                        'User document:',
                        doc.id,
                        doc.data()
                    );

                    return {
                        id: doc.id,
                        ...(doc.data() as Omit<Student, 'id'>),
                    };
                });

                setStudents(data);
            } catch (error) {
                console.error(
                    'Error loading students:',
                    error
                );
            } finally {
                setLoading(false);
            }
        };
        loadStudents();
    }, []);
    
    if (loading) {
        return (
            <div className="p-6">
            Loading students...
            </div>
        );
    }

    return (
        <main className="p-6">
        <h1 className="text-3xl font-bold mb-6">
            Select Student
        </h1>

            {students.length === 0 ? (
                <p>No students found.</p>
            ) : (
                <div className="space-y-4">
                    {students.map((student) => (
                        <Link   
                            key={student.id}
                            href={`/dashboard/student-snapshot/${student.id}`}
                        >
            
                            <button className="w-full border rounded-xl p-4 text-left hover:bg-muted transition">
                                <div className="font-semibold">
                                    {student.name || 'Unnamed Student'}
                                </div>
                                
                                <div className="text-sm text-muted-foreground">
                                    {student.id}
                                </div>
                            </button>
                        </Link>
                ))}  
            </div>
        )}
    </main>
    );
}  