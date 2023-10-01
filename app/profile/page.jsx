import React from "react";
import Completion from "../../components/DashboardComponents/Completion";

export default function ProfilePage() {
    return (
       <main>
            <Completion />
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
            </div>
       </main>
    )
}