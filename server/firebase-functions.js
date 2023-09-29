const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

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

const dataArray = [
    { sessionType: "morning", duration: 30 },
    { sessionType: "afternoon", duration: 40 },
    { sessionType: "evening", duration: 50 },
];

// Example usage
saveArrayToFirestoreSubcollection("someUserId", dataArray);
