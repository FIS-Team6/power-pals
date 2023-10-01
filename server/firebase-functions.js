const {
    serverTimestamp,
    doc,
    set,
    setDoc,
    collection,
    Timestamp,
    addDoc,
    query,
    getDocs,
    where,
} = require("firebase/firestore");
import { auth, db } from "./firebase-config";

const saveArrayToFirestoreSubcollection = async (userId, dataArray) => {
    try {
        const userRef = db.collection("users").doc(userId);
        const subCollectionRef = userRef.collection("spelling"); // Hardcoded "spelling"

        const batch = db.batch();

        dataArray.forEach((dataObject) => {
            const docRef = subCollectionRef.doc();
            batch.set(docRef, dataObject);
        });

        await batch.commit();
        console.log(
            "Array of objects successfully saved to Firestore subcollection."
        );
    } catch (error) {
        console.error("Error saving array to Firestore: ", error);
    }
};

// *********** helpers ****************
export function timestampToDate(timestamp) {
    try {
        const date = new Date(timestamp * 1000); // Convert the timestamp to milliseconds
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    } catch (error) {
        console.error("Error converting timestamp to date:", error);
        return null;
    }
}

// ********** new assignment crud ****************

export const addAssignmentIdToUserCol = async (userId, assignmentId) => {
    try {
        const userRef = db.collection("users").doc(userId);
        const userDoc = await userRef.get();
        const user = userDoc.data();
        const newAssignments = [...user.assignments, assignmentId];
        await userRef.update({ assignments: newAssignments });
        console.log("Assignment ID successfully added to user collection.");
    } catch (error) {
        console.error("Error adding assignment ID to user collection: ", error);
    }
};

export const createNewAssignment = async (baseData, aiTaskArray) => {
    const createdAt = Timestamp.fromDate(new Date());
    try {
        console.log(baseData);
        console.log(aiTaskArray);
        const assignmentRef = collection(db, "assignments");
        const assignmentId = assignmentRef.id;
        const assignmentData = {
            ...baseData,
            id: assignmentId,
            aiTasks: aiTaskArray,
            createdAt: createdAt,
        };
        await addDoc(assignmentRef, assignmentData);
        console.log("Assignment successfully created.");
        return assignmentId;
    } catch (error) {
        console.error("Error creating assignment: ", error);
    }
};

export const getUserAssignments = async (uid) => {
    const assignments = [];
    try {
        // Create a query against the collection.
        const q = query(
            collection(db, "assignments"),
            where("uid", "==", uid)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            assignments.push(doc.data());
        });
    } catch (error) {
        console.error("Error fetching user assignments: ", error);
    }
    return assignments;
};
