'use client';

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

// import { AreaGraph } from "@/features/overview/components/area-graph";
// import { BarGraph } from "@/features/overview/components/bar-graph";
// import { PieGraph } from "@/features/overview/components/pie-graph";

import { ChartAreaInteractive as AreaGraph } from "@/components/chart-area-interactive";
import { ChartBarDefault as BarGraph } from "@/components/chart-bar";
import { ChartPieDonutText as PieGraph } from "@/components/chart-pie-donut-text";

import { useParams } from "next/navigation";

type Student = {
    name?: string;
    lastCourse?: string;
    studentId?: string;
    [key: string]: unknown;
};

export default function StudentSnapshotPage () {
    const params = useParams();

    const studentId = params.studentId as string;

    const [student, setStudent] = 
        useState<Student | null>(null);
    
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        const loadStudent = async () => {
            try {
                console.log(
                    'Loading student',
                    studentId
                );

                const docRef = doc(
                    db,
                    'jcadTest',
                    studentId
                );

                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log(
                        'Student data:',
                        docSnap.data()
                    );

                    setStudent(
                        docSnap.data() as Student
                    );
            } else {
                console.log(
                    'Student document not found'
                );
            }
            } catch (error) {
                console.error(
                    'Error loading student:',
                    error
                );
            } finally {
                setLoading(false);
            }

        };

        loadStudent();
    }, [studentId]);
        
    if (loading) {
        return (
            <main className="p-6">
                Loading student snapshot...
            </main>
        );
    }

    if (!student) {
        return (
            <main className="p-6">
                <h1 className="text-2xl font-bold">
                    Student Not Found
                </h1>

                <p>
                    No Firestore document exists for:
                    {' '}
                    {studentId}
                </p>
            </main>
        );
    }
    return (
        <main className="p-6 space-y-6 overflow-y-auto">
            <h1 className="text-3xl font-bold">
                Student Snapshot
            </h1>

            {/*Student Info*/}
            <section className="border rounded-xl p-6">

                <div className="flex flex-col lg:flex-row gap-6">

                    <div className="w-40 h-40 rounded-lg bg-gray-200 flex items-center justify-center">
                        Avatar   
                    </div>

                    <div className="flex-1">

                        <h2 className="text-3xl font-bold mb-4">
                            {student.name}
                        </h2>

                        <p>
                            <strong>Student ID:</strong>{''}
                            {student.studentId}
                        </p>

                        <p>
                            <strong>Last Course:</strong>{''}
                            {student.lastCourse}
                        </p>

                        <div className="mt-4">
                            <AreaGraph />
                        </div>

                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">
                    Recent Analytics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="border rounded-xl p-4">
                        <BarGraph />
                    </div>

                    <div className="border rounded-xl p-4">
                        <PieGraph
                            title={student.name ?? "Student Poll"}
                            data={student}
                        />
                    </div>

                    <div className="border rounded-xl p-4">
                        <BarGraph />
                    </div>

                    <div className="border rounded-xl p-4">
                        <AreaGraph />
                    </div>

                </div>
            </section>
        </main>
    );
}

                     