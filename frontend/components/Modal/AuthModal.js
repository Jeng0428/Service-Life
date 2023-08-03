"use client";

import React, { useEffect, useRef, useState } from "react";
import { TabPanel } from "react-tabs";
import { Tab } from "react-tabs";
import { TabList } from "react-tabs";
import { Tabs } from "react-tabs";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";

import authApi from "../../utils/Api/auth.api";
import { useAuthContext } from "../../contexts/authContext";

function AuthModal({ displayAuth, toggleAuth }) {
  const [phoneNo, setPhoneNo] = useState("");
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const resendTimerRef = useRef(null);
  const [wholeDisable, setWholeDisble] = useState(false);
  const [disable, setDisable] = useState(true);
  const authContTextData = useAuthContext();
  const { mutate, isSuccess } = useMutation({
    mutationKey: "login",
    mutationFn: (data) => authApi.loginHandlerApi(data),
    onSuccess: (data) => {
      setResendTimer(60); // Set the timer value to 60 seconds
      toast.success(data.message);
      setDisable(() => false);
      setWholeDisble(false);
    },
    onError: (error) => {
      console.log(error);
      setWholeDisble(false);
      const message =
        error?.response?.data?.message || "Mobile Number does not exist";
      toast.error(message);
    },
  });
  useEffect(() => {
    if (isSuccess) {
      setResendTimer(60); // Set the timer value to 60 seconds
      // Start the timer countdown
      resendTimerRef.current = setInterval(() => {
        setResendTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(resendTimerRef.current);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    // Clear the timer interval when the component unmounts or OTP is verified
    return () => {
      clearInterval(resendTimerRef.current);
    };
  }, [isSuccess]);
  useEffect(() => {
    setDisable(true);
    setPhoneNo("");
  }, []);
  const { mutate: verifyOtp, isSuccess: isSuccess2 } = useMutation({
    mutationKey: "verifyOtpLogin",
    mutationFn: (data) => authApi.verifyOtpForLogin(data),
    onMutate: () => {
      setWholeDisble(true);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      authContTextData.setToken(data.token);
      authContTextData.setUser(data.user);
      localStorage.setItem("token", data.token);
      setWholeDisble(false);
      setDisable(true);

      setOtp("");
      toggleAuth();
    },

    onError: (error) => {
      setWholeDisble(false);
      const message = error?.response?.data?.message || "Otp is oncorrect";
      toast.error(message);
    },
  });

  const onSubmitForSendOtp = (e) => {
    e.preventDefault();
    if (otp === "") {
      mutate({ number: phoneNo });
      setWholeDisble(true);
    } else verifyOtp({ otp: otp, number: phoneNo });
  };

  const onChangeHandlerForPhoneNo = (e) => {
    setPhoneNo(e.target.value);
  };

  const onChangeHandlerOtp = (e) => {
    setOtp(e.target.value);
  };

  useEffect(() => {
    if (isSuccess) {
      setDisable(false);
    }
  }, [isSuccess]);

  return (
    <div
      className={
        displayAuth
          ? "modal loginRegisterModal show"
          : "modal loginRegisterModal"
      }
      id="loginRegisterModal"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <Tabs>
            <button type="button" className="close" onClick={toggleAuth}>
              <i className="bx bx-x"></i>
            </button>

            <ul className="nav nav-tabs" id="myTab">
              <TabList>
                <Tab className="nav-item">
                  <a className="nav-link" id="login-tab">
                    Login
                  </a>
                </Tab>
              </TabList>
            </ul>

            <div className="tab-content" id="myTabContent">
              <TabPanel>
                <div className="tab-pane fade show active" id="login">
                  <div className="miran-login">
                    <span className="sub-title">
                      <span>Phone Number</span>
                    </span>

                    <form onSubmit={onSubmitForSendOtp}>
                      {/*...............................................otp send............................................................................*/}

                      <div className="form-group">
                        <input
                          type="text"
                          value={phoneNo}
                          onChange={onChangeHandlerForPhoneNo}
                          readOnly={!disable || wholeDisable}
                          placeholder="Phone Number"
                          className="form-control"
                        />
                      </div>

                      <button type="submit" disabled={!disable || wholeDisable}>
                        Send OTP
                      </button>

                      {/*..........................................otp verify............................................................................*/}
                      <div className="form-group">
                        <input
                          type="Text"
                          value={otp}
                          onChange={onChangeHandlerOtp}
                          readOnly={disable || wholeDisable}
                          placeholder="OTP"
                          className="form-control"
                        />
                      </div>

                      <button
                        onClick={() => {
                          verifyOtp({ otp: otp, number: phoneNo });
                        }}
                        disabled={disable || wholeDisable}
                        type="submit"
                        className="disabled"
                      >
                        Login
                      </button>
                    </form>

                    <span className="dont-account">
                      Dont get OTP?{" "}
                      {resendTimer === 0 ? (
                        <button
                          className="btn"
                          onClick={() => mutate({ number: phoneNo })}
                          disabled={disable || wholeDisable}
                        >
                          Resend OTP
                        </button>
                      ) : (
                        <span>Resend OTP in {resendTimer} seconds</span>
                      )}
                    </span>
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

export default AuthModal;
