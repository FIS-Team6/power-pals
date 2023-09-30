import { serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase-config";

const saveArrayToFirestoreSubcollection = async (userId, dataArray) => {
    try {
        const userRef = db.collection("users").doc(userId);
        const subCollectionRef = userRef.collection("spelling");  // Hardcoded "spelling"

        const batch = db.batch();

        dataArray.forEach((dataObject) => {
            const docRef = subCollectionRef.doc();
            batch.set(docRef, dataObject);
        });

        await batch.commit();
        console.log("Array of objects successfully saved to Firestore subcollection.");
    } catch (error) {
        console.error("Error saving array to Firestore: ", error);
    }
};

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
}

export const createNewAssignment = async (baseData, aiTaskArray) => {
    try {
        const assignmentRef = db.collection("assignments").doc();
        const assignmentId = assignmentRef.id;
        const assignmentData = {
            ...baseData,
            id: assignmentId,
            aiTasks: aiTaskArray,
            createdAt: serverTimestamp(),
        };
        await assignmentRef.set(assignmentData);
        console.log("Assignment successfully created.");
        return assignmentId;
    } catch (error) {
        console.error("Error creating assignment: ", error);
    }
}
