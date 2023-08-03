"use client";

import React, { useEffect, useState } from "react";
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
import { useAuthContext } from "../../contexts/authContext";






function OrderFoodModal({ displayCM, toggleCM, mutate }) {
  // const [cityName, setCityName] = useState("");
    const { cities } = useCities();
  const [breakfast, setbreakfast] = useState([])
  const [lunch, setlunch] = useState([])
  const [Dinner, setDinner] = useState([])
  const[newbkfmeal , setnewbkfmeal] = useState("")
  const [newlunmeal, setnewlunmeal] = useState("")
    const [newdinmeal, setnewdinmeal] = useState("")
    const[residentid , setresidentid] = useState(null)
    const [cityid, setcityid] = useState("")
    const [ foodmenu , setfoodmenu] = useState({})
    const [menuavailable , setmenuavailable] = useState(false)
    const [dinner, setdinner] = useState([]);
    const queryClient = useQueryClient();
    const authContextData = useAuthContext();
  
    useEffect(() => {
        ResidentsData();
  })
  
     const ResidentsData = async () => {
         try {
             let data = {
            userid : authContextData?.user
        }
             
      let datas = await mealsApi.getresident(data);
         
           
             setresidentid(datas.data.Residentid);
      
    } catch (error) {
      console.log("error while fetching data");
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       let datee = document.getElementById("dateinputid").value
     let breakfast = document.getElementById("bkfastselectid").value
      let BKcount = document.getElementById("bkfastcountid").value
       let lunch = document.getElementById("lunselectid").value
        let LKCount = document.getElementById("luncountid").value
         let Dinner = document.getElementById("dinselectid").value
          let DinCount = document.getElementById("dincountid").value
          


        let date = moment(datee, 'YYYY-MM-DD').format('DD-MM-YYYY');
    const data = {
      residentid ,
      date,
      userid : authContextData?.user.id,
      "breakfast": breakfast,
      "bkcount": BKcount,
      "lunch": lunch,
     "luncount":LKCount,
     "dinner": Dinner,
      "dincount": DinCount
    }
    
   
     console.log(data);
      let result = await mealsApi.adduserdishes(data);
      console.log(result);
    if (result.status == true) {
       toast.success(result.message);
    }
    else if (result.status == false) {
      
       toast.error(result.message);
    }
    } catch (error) {
      toast.error("Already Order available edit it for changes");
    }
   
    // let result = await mealsApi.adduserdishes(data);
    // console.log(result.status);
    // if (result.status == true) {
    //    toast.success(result.message);
    // }
    // else if (result.status == false) {
      
    //    toast.error(result.message);
    // }
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
    const dateselected = async () => {
        let datee = document.getElementById("dateinputid").value
      
        let date = moment(datee, 'YYYY-MM-DD').format('DD-MM-YYYY');
        
        let data = {
            "Residentid": residentid,
             "date":date
        }
        
      let datas = await mealsApi.getdishes(data);
      console.log(datas?.data[0]?.menu.length);
      
        // console.log(datas?.data[0]?.menu[0]);
      setfoodmenu(datas?.data[0]?.menu[0])
       
      if (datas?.data[0]?.menu.length < 1 || datas?.data[0]?.menu.length === undefined) {
        
        setmenuavailable(false)
      } else if (datas?.data[0]?.menu.length > 0) {
        setmenuavailable(true)
      }

    }
   
   
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
                <Tab className="nav-item addorderhead" >
                  <a className="nav-link" id="login-tab addorderhead">
                    Order Meal
                  </a>
                </Tab>
              </TabList>
            </ul>
    
            <div className="tab-content" id="myTabContent">
              {menuavailable ? (
                <p className='orderfooduserheadtrue'>Menu available for the selected date, Please Select Your Meals.</p>
              ) : <p className='orderfooduserhead'>Menu not available for selected date, Please Change date.</p> }
              
              <TabPanel>
                <div className="tab-pane fade show active" id="login">
                  <div className="miran-login">
                  

                    <form
                      onSubmit={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      <div className="form-group">
                        
                        
                         <input
                          type="date"
                          // onChange={onChnageHandler}
                          // value={cityName}
                          placeholder="add meal"
                          className="form-control select"
                                                  id='dateinputid'
                            onChange={dateselected}                      
                        >
                          
                        </input>
                        <p>Select Breakfast</p>
                         <select
                          // type="text"
                          // onChange={onChnageHandler}
                          // value={cityName}
                          placeholder="Select  Meal"
                          className="form-control select"
                           id='bkfastselectid'
                        //   id='cityselecttagid'
                        //   onChange={}
                        >
                          <option selected disabled>Select Breakfast</option>
                          {
                            
                            foodmenu?.breakfast?.map((r, i) => {
                              return (<option key={i} value={r}>{r}</option>)
                             
                            })
                          }
                        </select>
                        <p>Select Breakfast Count</p>
                        <input type='number' className='count_input' id='bkfastcountid' ></input>
                     

                                              <p>Select Lunch</p>
                         <select
                          // type="text"
                          // onChange={onChnageHandler}
                          // value={cityName}
                          placeholder="Select meal"
                          className="form-control select"
                          id='lunselectid'
                        //   id='cityselecttagid'
                        //   onChange={}
                        >
                          <option selected disabled>Select Lunch</option>
                          {
                            
                            foodmenu?.lunch?.map((r, i) => {
                              return (<option key={i} value={r}>{r}</option>)
                             
                            })
                          }
                        </select>
                                        <p>Select Lunch Count</p>
                        <input type='number' className='count_input' id='luncountid' ></input>
                                              <p>Add Dinner</p>
                         <select
                          // type="text"
                          // onChange={onChnageHandler}
                          // value={cityName}
                          placeholder="Select meal"
                          className="form-control select"
                          id='dinselectid'
                        //   onChange={}
                        >
                          <option selected disabled>Select Dinner</option>
                          {
                            
                            foodmenu?.dinner?.map((r, i) => {
                              return (<option key={i} value={r}>{r}</option>)
                             
                            })
                          }
                        </select>
                                        <p>Select Dinner Count</p>
                        <input type='number' className='count_input' id='dincountid' ></input>
                        {/* <p>
                        {
                          foodmenu?.breakfast?.map((r, i) => {
                            return (<input key={i} placeholder={r} id='breakfastmealid' className='input_addmeals'></input>);
                          })
                          
                          }
                          </p>
                        <input type='text' id='breakfastmealid' placeholder='add another meal' onChange={addbreakfastmeal} className='input_addmeals' value={newbkfmeal}></input>
                        <button type='button' className='addmealbtn' onClick={()=>addbreakfastt()}>Add</button> */}

                         {/* <p>Add Lunch</p>
                        <p>
                        {
                          lunch?.map((r, i) => {
                            return (<input key={i} placeholder={r} id='breakfastmealid'></input>);
                          })
                          
                          }
                          </p>
                        <input type='text' id='breakfastmealid' placeholder='add another meal' onChange={addlunchmeal} value={newlunmeal}></input>
                        <button type='button' className='addmealbtn' onClick={()=>addlunchh()}>Add</button>

                        <p>Add Dinner</p>
                        <p>
                        {
                          Dinner?.map((r, i) => {
                            return (<input key={i} placeholder={r} id='breakfastmealid'></input>);
                          })
                          
                          }
                          </p>
                        <input type='text' id='breakfastmealid' placeholder='add another meal' onChange={adddinnermeal} value={newdinmeal}></input>
                        <button type='button' className='addmealbtn' onClick={()=>adddinnerr()}>Add</button> */}
                                             
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

export default OrderFoodModal;
