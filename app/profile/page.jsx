'use client'
import React, {useState, useEffect} from "react";
import Completion from "../../components/DashboardComponents/Completion";
import { getUserAssignments } from "../../server/firebase-functions";
import { useUser } from "../../context/UserContext";
import UpdateProfileModal from "../../components/ProfileComponents/UpdateProfileModal";

export default function ProfilePage() {

    const { currentUser } = useUser();
    const [userAssignments, setUserAssignments] = useState([])

    useEffect(() => {
        const getUserAssignmentsData = async () => {
            try {
                const assignments = await getUserAssignments(currentUser.id)
                console.log(assignments)
                setUserAssignments(assignments)
            } catch(error) {
                console.error(error)
            }
        }
        getUserAssignmentsData()
 
    }, [])

    return (
       <main>
        <UpdateProfileModal />
            {/* <Completion />
            <div className="hero-content text-center text-neutral-content">
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" checked="checked" /> 
                    <div className="collapse-title text-xl font-medium">
                        Click to open this one and close others
                    </div>
                    <div className="collapse-content"> 
                        <p>hello</p>
                    </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" checked="checked"/> 
                    <div className="collapse-title text-xl font-medium">
                        Click to open this one and close others
                    </div>
                    <div className="collapse-content"> 
                        <p>hello</p>
                    </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" checked="checked"/> 
                    <div className="collapse-title text-xl font-medium">
                        Click to open this one and close others
                    </div>
                    <div className="collapse-content"> 
                        <p>hello</p>
                    </div>
                </div>
            </div> */}
       </main>
    )
}