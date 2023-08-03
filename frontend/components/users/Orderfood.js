import Link from "next/link";
import React, { useState,useMemo , useEffect } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { useAuthToken } from "../../contexts/authContext";
import cityApi from "../../utils/Api/city.api";
import useCities from "../../utils/Hooks/useCities";
import OrderFoodModal from "../Modal/OrderfoodModal";
import Loading from "../Shared/Loading";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, MenuItem, Tooltip, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import mealsApi from '../../utils/Api/meals.api';
import { useAuthContext } from "../../contexts/authContext";
import EditFoodModal from '../Modal/EditfoodModal';
import moment from 'moment-timezone';


function OrderFood() {
  const [displayCM, toggleCM] = useState(false);
    const [displayCMEdit, toggleCMEdit] = useState(false);
  const [displayCMnew, toggleCMnew] = useState(false);
  const [ selectedrow , setselectedrow] = useState({})
  const { cities, isLoading, isFetching } = useCities();
  const [ foodmenu , setfoodmenu] = useState({})
  const token = useAuthToken();
  const queryClient = useQueryClient();
  const authContextData = useAuthContext();
  const[residentid , setresidentid] = useState(null)
  // const [editstate , seteditstate ] = useState(false)
  const [tabledata, settabledata] = useState([])
  const { mutate: deleteCityById, isLoading: isLoading2 } = useMutation({
    mutationKey: ["deleteCityById"],
    mutationFn: (id) => {
      return cityApi.deleteCityById(id, token);
    },
    onSuccess: () => {
      toast.success(`City deleted Successfully`);
      queryClient.invalidateQueries(["getAllcities"]);
      refetch();
    },
  });
  const { mutate, isLoading: isLoading3 } = useMutation({
    mutationFn: (data) => cityApi.addNewCity(data, token),
    onSuccess: () => {
      toast.success(`City added successfully`);
      queryClient.invalidateQueries({ queryKey: ["getAllcities"] });
    },
    onError: () => {
      const message = "Something went wrong try again later";
      toast.error(message);
    },
  });
    // useEffect(() => {
    //     ResidentsData();
        
    // })
  
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
  
  const AllUserOrders = async () => {
    let userid = authContextData?.user?.id
    let data = {
      userid
    }
    try {
      await mealsApi
        .getuserorders(data)
        .then((res) => {
         
          settabledata(res?.data)
          
        })
        .catch((err) => {
          // console.log(err);
                const message = "Something went wrong try again later";
           toast.error(message);
        });

     
    } catch (error) {
      console.log("error while fetching data");
    }
  };
   useEffect(() => {
    AllUserOrders();
  
  }, []);
   const columns = useMemo(
    () => [
     {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableSorting: false,
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 140,
        enableEditing: false,
      },

      {
        accessorKey: "foodtype",
        header: "Foodtype",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "dish",
        header: "Dish",
        enableEditing: true,
        size: 80,
        Cell: ({ cell }) => (
            <Box
            component="span"
            
          >
            {cell.getValue()?.toLocaleString?.("en-US", {
              style: "currency",

              currency: "USD",

              minimumFractionDigits: 0,

              maximumFractionDigits: 0,
            })}
             </Box>
        )
      },
       {
        accessorKey: "quantity",
        header: "Quantity",
        enableEditing: true,
         size: 80,
         
      }
       
    ],
    []
  );

  const handleSaveRowEdits = () => {

  }
  const handleCancelRowEdits = () => {

  }
   const dateselected = async (date) => {
   
        let Date = moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');
        
        let data = {
            "Residentid": residentid,
             "date": Date
        }
        
      let datas = await mealsApi.getdishes(data);
   
      setfoodmenu(datas?.data[0]?.menu[0])
       
    

    }
  const editorderfn = (row) => {
    
    // seteditstate(true)
     dateselected(row._valuesCache?.date)
    
 
   
      toggleCMEdit(!displayCMEdit);
    
    setselectedrow(row)
    
  }
  ResidentsData()
  return (
    <>
      <div className="main-content d-flex flex-column">
        <div className="breadcrumb-area">
          <h1>Food Orders Management</h1>
          {/* <ol className="breadcrumb">
            <li className="item">
              <Link href="/admin">
                <a>Home</a>
              </Link>
            </li>
            <li className="item">
              <Link href="/admin">
                <a>Dashboard</a>
              </Link>
            </li>
            <li className="item">Add Meals</li>
          </ol> */}
        </div>

        {/*..........................city information............................................*/}

        <div className="add-listings-btn">
          <button
            type="submit"
            onClick={() => {
              toggleCM(!displayCM);
            }}
          >
            Order Food
          </button>
        </div>
         <MaterialReactTable
          state={{ isLoading }}
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 120,
            },
          }}
          columns={columns}
          data={tabledata}
          editingMode="modal" 
            enableColumnOrdering
             enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
         renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
               <IconButton onClick={() =>  editorderfn(row) }>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />

        {/*.................................... city List .........................................................*/}
        {isLoading || isLoading2 || isLoading3 || isFetching ? (
          <Loading />
              ) : (
        <>
            
        </>
        
        )}

        <div className="flex-grow-1"></div>

        <div className="copyrights-area">
          <div className="row align-items-center">
            <div className="col-lg-6 col-sm-6 col-md-6">
              <p>
                <i className="bx bx-copyright"></i> Indice All rights reserved
              </p>
            </div>

            <div className="col-lg-6 col-sm-6 col-md-6 text-right">
              <p>
                Designed by ❤️{" "}
                <a
                  href="https://envytheme.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  EnvyTheme
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*..........................CITY MODAL................................................. */}
      <OrderFoodModal displayCM={displayCM} mutate={mutate} toggleCM={toggleCM} />
      
      <EditFoodModal displayCM={displayCMEdit} toggleCM={toggleCMEdit} row={selectedrow } menu={foodmenu} />
     
    </>
  );
}

export default OrderFood;
