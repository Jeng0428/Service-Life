"use client";

import React from "react";
import { TabPanel } from "react-tabs";
import { Tab } from "react-tabs";
import { TabList } from "react-tabs";
import { Tabs } from "react-tabs";
import authApi from "../../utils/Api/auth.api";
import { useAuthContext, useAuthToken } from "../../contexts/authContext";
import { toast } from "react-hot-toast";

function ChnageProfilePicModal({ displayAM, toggleAM }) {
    const token = useAuthToken()
    const context = useAuthContext()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        toggleAM();
        try {
            const res = await authApi.updateProfilePic(token, formData)
            context.setUser(res)
            toast("Profile Pic Updated Successfullu")
        } catch (error) {
            toast.error("Something went wrong try again later")
            toggleAM();
        }
    };


    return (
        <div
            className={
                displayAM ? "modal loginRegisterModal show" : "modal loginRegisterModal"
            }
            id="loginRegisterModal"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <Tabs>
                        <button
                            type="button"
                            className="close"
                            onClick={() => {
                                toggleAM(!displayAM);
                            }}
                        >
                            <i className="bx bx-x"></i>
                        </button>

                        <ul className="nav nav-tabs" id="myTab">
                            <TabList>
                                <Tab className="nav-item">
                                    <a className="nav-link" id="login-tab">
                                        Chnage Profile Pic
                                    </a>
                                </Tab>
                            </TabList>
                        </ul>

                        <div className="tab-content" id="myTabContent">
                            <TabPanel>
                                <div className="tab-pane fade show active" id="login">
                                    <div className="miran-login">


                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <div className="form-group">
                                                    <input
                                                        type="file"
                                                        required={true}
                                                        name="profilePic"
                                                        accept="image/*"
                                                        placeholder="Aminites Name"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <button type="submit" onClick={() => toggleAM()}>Submit New Profile Photo</button>
                                        </form>
                                    </div>
                                </div>
                            </TabPanel>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default ChnageProfilePicModal;
