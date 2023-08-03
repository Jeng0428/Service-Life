"use client";

import React, { useState } from "react";
import { TabPanel } from "react-tabs";
import { Tab } from "react-tabs";
import { TabList } from "react-tabs";
import { Tabs } from "react-tabs";

function RoomTypeModal({ displayCTM, toggleCTM, mutate }) {
  const [roomTypeName, setRoomTypeName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ name: roomTypeName });
    toggleCTM();
  };

  const onChnageHandler = (e) => {
    setRoomTypeName(e.target.value);
  };

  return (
    <div
      className={
        displayCTM
          ? "modal loginRegisterModal show"
          : "modal loginRegisterModal"
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
                toggleCTM(!displayCTM);
              }}
            >
              <i className="bx bx-x"></i>
            </button>

            <ul className="nav nav-tabs" id="myTab">
              <TabList>
                <Tab className="nav-item">
                  <a className="nav-link" id="login-tab">
                    Add Room Type
                  </a>
                </Tab>
              </TabList>
            </ul>

            <div className="tab-content" id="myTabContent">
              <TabPanel>
                <div className="tab-pane fade show active" id="login">
                  <div className="miran-login">
                    <span className="sub-title">
                      <span>Add Room Type</span>
                    </span>

                    <form
                      onSubmit={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      <div className="form-group">
                        <input
                          type="text"
                          value={roomTypeName}
                          onChange={onChnageHandler}
                          placeholder="add Room type..."
                          className="form-control"
                        />
                      </div>

                      <button
                        type="submit"
                        onClick={() => {
                          toggleCTM(!displayCTM);
                        }}
                      >
                        Add Room type
                      </button>
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

export default RoomTypeModal;
