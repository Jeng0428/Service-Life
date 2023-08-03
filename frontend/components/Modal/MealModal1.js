"use client";

import React, { useState } from "react";
import { TabPanel } from "react-tabs";
import { Tab } from "react-tabs";
import { TabList } from "react-tabs";
import { Tabs } from "react-tabs";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import cityApi from "../../utils/Api/city.api";
import useCities from "../../utils/Hooks/useCities";
import { toast } from "react-hot-toast";
import moment from 'moment-timezone';
import mealsApi from '../../utils/Api/meals.api';




function MealModal({ displayCM, toggleCM, mutate }) {
  // const [cityName, setCityName] = useState("");
    const { cities } = useCities();
  const [breakfast, setbreakfast] = useState([])
  const [lunch, setlunch] = useState([])
  const [Dinner, setDinner] = useState([])
  const[newbkfmeal , setnewbkfmeal] = useState("")
  const [newlunmeal, setnewlunmeal] = useState("")
  const [newdinmeal, setnewdinmeal] = useState("")
  const [cityid , setcityid]= useState("")
  const queryClient = useQueryClient();
  


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let datee = document.getElementById("dateinputid").value

        let date = moment(datee, 'YYYY-MM-DD').format('DD-MM-YYYY');
    const data = {
      cityid ,
      date,
     "breakfast": breakfast,
     "lunch": lunch,
     "dinner": Dinner
    }

    let result = await mealsApi.addmeals(data);
    console.log(result.status);
    if (result.status == true) {
       toast.success(result.message);
    }
    else if (result.status == false) {
      
       toast.error(result.message);
    }
    // console.log(data);

    // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const { mutate } = useMutation({
  //   mutationFn: (data) => mealsApi.addmeals(data),
  //   onSuccess: () => {
  //     toast.success(`Meals added successfully`);
      
  //   },
  //   onError: () => {
  //     const message = "Something went wrong try again later";
  //     toast.error(message);
  //   },
  // });
    // mutate({ name: cityName });
    // setCityName("");
    // toggleCM();
  };

  const onChnageHandler = (e) => {
    // setCityName(e.target.value);
  };
  const addbreakfastt = async () => {
     if (newbkfmeal === "") {
     return  toast.error("Please Enter any value");
    }
    setbreakfast([...breakfast, newbkfmeal])
    setnewbkfmeal("")
 
  }
  const addlunchh = async () => {
       if (newlunmeal === "") {
     return  toast.error("Please Enter any value");
    }
  
    setlunch([...lunch, newlunmeal])
    setnewlunmeal("")
 
  }
  const adddinnerr = async () => {
      if (newdinmeal === "") {
     return  toast.error("Please Enter any value");
    }
  
    setDinner([...Dinner, newdinmeal])
    setnewdinmeal("")
     
 
  }
  const addbreakfastmeal = (e) => {
    
   
    // console.log(e.target.value);
    setnewbkfmeal(e.target.value)
  }
   const addlunchmeal = (e) => {
    // console.log(e.target.value);
    setnewlunmeal(e.target.value)
  }
    const adddinnermeal = (e) => {
    // console.log(e.target.value);
    setnewdinmeal(e.target.value)
  }
  const citycheck = () => {
    // console.log(r);
    let Value = document.getElementById("cityselecttagid").value
   
    setcityid(Value)
  }
  

  return (
    <div
      className={
        displayCM ? "modal loginRegisterModal show" : "modal loginRegisterModal"
      }
      id="loginRegisterModal"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content Addmealcon">
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
              <TabList className="tablist_addmeals">
                <Tab className="nav-item">
                  <a className="nav-link" id="login-tab addmealhead">
                    Add Menu
                  </a>
                </Tab>
              </TabList>
            </ul>

            <div className="tab-content" id="myTabContent">
              <TabPanel>
                <div className="tab-pane fade show active" id="login">
                  <div className="miran-login">
                    <span className="sub-title">
                      <span>Add Menu</span>
                    </span>

                    <form
                      onSubmit={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      <div className="form-group">
                        <select
                          // type="text"
                          // onChange={onChnageHandler}
                          // value={cityName}
                          placeholder="add meal"
                          className="form-control select"
                          id='cityselecttagid'
                          onChange={() =>citycheck()}
                        >
                          <option selected disabled>Select City</option>
                          {
                            
                            cities.map((r, i) => {
                              return (<option key={i} value={r.id}>{r.name}</option>)
                             
                            })
                          }
                          </select>
                         
                        
                         <input
                          type="date"
                          // onChange={onChnageHandler}
                          // value={cityName}
                          placeholder="add meal"
                          className="form-control select"
                          id='dateinputid'
                        >
                          
                        </input>
                        <p>Add Breakfast</p>
                        <p>
                        {
                          breakfast?.map((r, i) => {
                            return (<span key={i} placeholder={r} id='breakfastsetmealid' className='input_addmeals'>{r}</span>);
                          })
                          
                          }
                          </p>
                        <input type='text' id='breakfastmealid' placeholder='add another meal' onChange={addbreakfastmeal} className='input_addmeals' value={newbkfmeal}></input>
                        <button type='button' className='addmealbtn' onClick={()=>addbreakfastt()}>Add</button>

                         <p>Add Lunch</p>
                        <p>
                        {
                          lunch?.map((r, i) => {
                            return (<span key={i} placeholder={r} id='breakfastsetmealid'>{r}</span>);
                          })
                          
                          }
                          </p>
                        <input type='text' id='breakfastmealid' placeholder='add another meal' onChange={addlunchmeal} className='input_addmeals' value={newlunmeal}></input>
                        <button type='button' className='addmealbtn' onClick={()=>addlunchh()}>Add</button>

                        <p>Add Dinner</p>
                        <p>
                        {
                          Dinner?.map((r, i) => {
                            return (<span key={i}  id='breakfastsetmealid'>{r}</span>);
                          })
                          
                          }
                          </p>
                        <input type='text' id='breakfastmealid' placeholder='add another meal' onChange={adddinnermeal} className='input_addmeals' value={newdinmeal}></input>
                        <button type='button' className='addmealbtn' onClick={()=>adddinnerr()}>Add</button>
                                             
                      </div>

                      <button
                        type="submit"
                        onClick={() => {
                          toggleCM(!displayCM);
                        }}
                      >
                        Add Meal
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

export default MealModal;
