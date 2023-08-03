import React, { useCallback, useMemo, useState , useEffect} from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, IconButton, MenuItem, Tooltip, Button } from '@mui/material';
import { data } from './makeData';
import { useQuery } from 'react-query';
import moment from 'moment-timezone';
import rentPaymentApi from '../../utils/Api/rentPayment.api.js';
import mealsApi from '../../utils/Api/meals.api';
import { useRouter } from 'next/router';
import { useAuthToken } from '../../contexts/authContext';
import FoodOrdersModal from '../Modal/FoodOrdersModal';
import cityApi from "../../utils/Api/city.api";
import useCities from "../../utils/Hooks/useCities";
import { MdCancel } from "react-icons/md";
import { ReactComponent as Loaderr } from '../../public/images/svg/loader.svg'



const FoodOrders = () => {
  const [tableData, setTableData] = useState(() => data);
  const router = useRouter();
   const { cities } = useCities();
    const token = useAuthToken();
  const [ordersdata, setordersdata] = useState({})
  const [countdata, setcountdata] = useState({})
  const [loading, setloading] = useState(false)
  const [fullorderdata , setfullorderdata] = useState({})
      const [showfullorder , setshowfullorder ] = useState(false)
     const [ residentsdata , setresidentsdata]= useState([])
    const [ ckdate , setckdate] = useState(new Date().toLocaleDateString())

 useEffect(() => {
   OrdersData();
  //  ordersdatas();
  },[]);

  const OrdersData = async () => {
      try {
           
        // let Date = moment(ckdate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        let datee = document.getElementById("dateinpfoodordersid").value
                let date = moment(datee, 'YYYY-MM-DD').format('DD-MM-YYYY');
        let cityId =document.getElementById("cityselecttagfdordersid").value 
        let data = {
               
          "date": date,
          "cityId": cityId,
        }
        setloading(true)
        let datas = await mealsApi.allfoodorders(data)
        setloading(false)
        setordersdata(datas.data)
        setcountdata(datas.countdata)
       
      } catch (error) {
        setloading(false)
      console.log('error while fetching data');
    }
  };

 
  const onChnageHandler = async () => {
    let datee = document.getElementById("dateinpfoodordersid").value
    
        let cityId =document.getElementById("cityselecttagfdordersid").value 
        let date = moment(datee, 'DD-MM-YYYY').format('YYYY-MM-DD');
        
    let data = {
          "date":datee,
            "cityId": cityId
             
        }
       
     let datas = await mealsApi.allfoodorders(data)
      
        setordersdata(datas.data)
        setcountdata(datas.countdata)

  }
  
  const Moreorderdetails = async(r) => {
    
    let datee = document.getElementById("dateinpfoodordersid").value
            // let date = moment(datee, 'DD-MM-YYYY').format('YYYY-MM-DD');
      let data = {
          "date":datee,
            "resId": r.id
             
    }
    let datas = await mealsApi.Orderbyresanddate(data)
    setfullorderdata(datas)
        document.getElementById("fullordermainconid").style.filter = "blur(5px)";
    setshowfullorder(true)
    console.log(fullorderdata)
  }  

  const cancelcrtemp = () => {
    document.getElementById("fullordermainconid").style.filter = "none";
    setshowfullorder(false)
  }
  // const ordersdatas = async () => {
    
  //   const finarray = [];
  //   const array = [];
  // //   const datass = await residentsdata?.map(async (r, i) => {
          
  // //     const data = await ordersdata.filter((x) => x.residentid === r.id)
      
  // //     return array.push(data)    
     
  // //   ),
  // //   finarray.push[array]
  // // }
       
  //   const datass = await residentsdata?.map(async (r, i) => {
  //     const data = await ordersdata.filter((x) => x.residentid === r.id)
  //      array.push(data) 
  //     // console.log(array);
  //   },
  //   // finarray.push[array]
  //   );
  //   setordersdata(array)
  //   // console.log(finarray);
  // }
  
  // setTimeout(ordersdatas(),2000)
  // const columns = useMemo(
  //   () => [
  //     {
  //       accessorKey: 'uid',
  //       header: 'ID',
  //       enableColumnOrdering: false,
  //       enableEditing: false, //disable editing on this column
  //       enableSorting: false,
  //       size: 80,
  //     },
  //     {
  //       accessorKey: 'user.name',
  //       header: 'User Name',
  //       size: 140,
  //       enableEditing: false,
  //     },

  //     {
  //       accessorKey: 'user.phoneNo',
  //       header: 'Phone No',
  //       enableEditing: false,
  //       size: 80,
  //     },
  //     {
  //       accessorKey: 'roomNo',
  //       header: 'Room No',
  //       enableEditing: false,
  //       size: 80,
  //     },

  //     {
  //       accessorKey: 'status',
  //       header: 'Status',
  //       enableEditing: false,
  //       size: 80,
  //       Cell: ({ cell }) => (
  //         <Box
  //           component='span'
  //           sx={(theme) => ({
  //             backgroundColor:
  //               cell.getValue() !== 'CREATED'
  //                 ? theme.palette.error.dark
  //                 : theme.palette.success.dark,

  //             borderRadius: '0.25rem',
  //             color: '#fff',
  //             maxWidth: '9ch',
  //             p: '0.25rem',
  //           })}
  //         >
  //           {cell.getValue()?.toLocaleString?.('en-US', {
  //             style: 'currency',

  //             currency: 'USD',

  //             minimumFractionDigits: 0,

  //             maximumFractionDigits: 0,
  //           })}
  //         </Box>
  //       ),
  //     },
  //     {
  //       accessorKey: 'availability.resident.name',
  //       header: 'Resident',
  //       enableEditing: false,
  //       size: 80,
  //     },
  //     {
  //       accessorKey: 'planId',
  //       header: 'Rezorpay Plan Id',
  //       size: 80,
  //     },
  //     {
  //       accessorKey: 'razorpayPaymentId',
  //       header: 'Rezorpay Payment Id',
  //       size: 80,
  //     },
  //   ],
  //   []
  // );
  // console.log(countdata);
  var curr = new Date();
curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);
 
  return (
    <>
      <div className='main-content d-flex flex-column' id="fullordermainconid">
        <div className='ordersselectcon'>
          <select
                          // type="text"
                          // onChange={onChnageHandler}
                          // value={cityName}
                          placeholder="add meal"
                          className="selectcitytagorders"
            id='cityselecttagfdordersid'
            
                          onChange={() =>onChnageHandler()}
                        >
                          {/* <option selected disabled>Select City</option> */}
                          {
                            
                            cities.map((r, i) => {
                              return (<option key={i} value={r.id}>{r.name}</option>)
                             
                            })
                          }
          </select>
           <input
            type="date"
            onChange={onChnageHandler}
            // value={cityName}
            placeholder="add meal"
            className="selectcitytagorders"
            id='dateinpfoodordersid'
            defaultValue={date}
                        >
                          
                        </input>
        </div>
        <div className='ordersdiscon'>
        {ordersdata && (
          ordersdata?.residentbreakfast?.map((r, i) => {
          
            return <>
              {!loading ?  
              <> 
              <div className='mealcountcon'>
                <h1 key={i}>{r.name}</h1>
                <div className='mealcountcontwo'>
                <div>
              <p>Breakfast</p>
              {countdata.Breakfastcount.map((r, i) => {
                return <>
                <h3>Dish : {r.dish}</h3>
                  <h4>Count: {r._sum.quantity}</h4>
                  </>
              })}
                </div>
                <div>
              <p>Lunch</p>
               {countdata.Lunchcount.map((r, i) => {
                return <>
                <h3>Dish :{r.dish}</h3>
                  <h4>Count: {r._sum.quantity}</h4>
                  </>
               })}
                </div>
                <div>
               <p>Dinner</p>
               {countdata.Dinnercount.map((r, i) => {
                return <>
                <h3>Dish :{r.dish}</h3>
                  <h4>Count: {r._sum.quantity}</h4>
                  </>
               })}
                  </div>
              {/* {
                countdata[0]?.map((r, i) => {
                   <h3>{r.dish}</h3>
                })
              } */}
             
                    </div>
                    <span className='moredetord_spn' onClick={()=>Moreorderdetails(r)}>More Details</span>
                  </div>
                  </> 
                : <Loaderr className="spinner" />}
            </>
            
          })
        )
          
          }
          {
            ordersdata?.residentbreakfast?.length === 0 && (
              <>
                <span className='spn_orders_not'>Order's Not Available</span>
              </>
            )
          }
          
        </div>
        

        
      </div>
      {showfullorder && (
          <>
            <div className='fullordercon'>
                 <div className="firstcon">
           
            <span className="fullorderhead">Full Order</span>
            <MdCancel className='canceliconn'
              style={{ color: "EA1E21", fontSize: "1.6em" }}
              onClick={() => cancelcrtemp()}
            />
            </div>
            <p>
              <span>1.</span><span>Breakfast</span>
              {showfullorder && (
                showfullorder.Breakfast?.map((r, i) => {
                  {
                    r.map((x, i) => {
                      console.log(x)
                      return (<>
                    <p>{x.dish}</p>
                    <p>{x.user.name}</p>
                    <p>{x.user?.RentPaymentSubcriptin[0]?.roomNo}</p>
                  </>)
                   }) 
                  }
                 
                }) )
              }
            </p>
            
           </div>
          </>
        )}
    </>
  );
};

export default FoodOrders;
