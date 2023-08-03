"use client";

import React, { useState } from "react";
import { TabPanel } from "react-tabs";
import { Tab } from "react-tabs";
import { TabList } from "react-tabs";
import { Tabs } from "react-tabs";

function CityModal({ displayCM, toggleCM, mutate }) {
  const [cityName, setCityName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ name: cityName });
    setCityName("");
    toggleCM();
  };

  const onChnageHandler = (e) => {
    setCityName(e.target.value);
  };

  return (
    <div
      className={
        displayCM ? "modal loginRegisterModal show" : "modal loginRegisterModal"
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
                toggleCM(!displayCM);
              }}
            >
              <i className="bx bx-x"></i>
            </button>

            <ul className="nav nav-tabs" id="myTab">
              <TabList>
                <Tab className="nav-item">
                  <a className="nav-link" id="login-tab">
                    Add City
                  </a>
                </Tab>
              </TabList>
            </ul>

            <div className="tab-content" id="myTabContent">
              <TabPanel>
                <div className="tab-pane fade show active" id="login">
                  <div className="miran-login">
                    <span className="sub-title">
                      <span>Add City</span>
                    </span>

                    <form
                      onSubmit={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      <div className="form-group">
                        <input
                          type="text"
                          onChange={onChnageHandler}
                          value={cityName}
                          placeholder="add city"
                          className="form-control"
                        />
                      </div>

                      <button
                        type="submit"
                        onClick={() => {
                          toggleCM(!displayCM);
                        }}
                      >
                        Add City
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

export default CityModal;
