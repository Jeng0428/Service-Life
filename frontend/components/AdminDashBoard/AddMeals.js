import Link from "next/link";
import React, { useState ,useMemo , useEffect } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useMutation } from "react-query";
import { useAuthToken } from "../../contexts/authContext";
import cityApi from "../../utils/Api/city.api";
import useCities from "../../utils/Hooks/useCities";
import { Box, IconButton, MenuItem, Tooltip, Button } from "@mui/material";
import MealModal from "../Modal/MealModal1";
import Loading from "../Shared/Loading";
import MaterialReactTable from "material-react-table";
import mealsApi from '../../utils/Api/meals.api';
import moment from 'moment-timezone';
import { Delete, Edit } from "@mui/icons-material";

function AddMeals() {
  const [displayCM, toggleCM] = useState(false);
  const { cities, isLoading, isFetching } = useCities();
  const token = useAuthToken();
  const [tabledata, settabledata] = useState([])
  const [ menudata , setmenudata] = useState([])
  const queryClient = useQueryClient();
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

  const AllMenus = async () => {
    try {
      await mealsApi
        .getallmenus()
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
    AllMenus();
  
  }, []);

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    // console.log(values.id);
    const data = tabledata.filter(r => r.id === values.id)
    // console.log(data);
    const Breakfast = values.breakfast.split(',');
    const Lunch = values.lunch.split(',');
    const Dinner = values.dinner.split(',');
        let Date = moment(values.date, 'YYYY-MM-DD').format('DD-MM-YYYY');
    const datas = {
      "cityid": data[0].foodmenu.cityid,
      "date": Date,
      "breakfast": Breakfast,
     "lunch": Lunch,
     "dinner": Dinner
    }
    // console.log(datas);
    try {
       await mealsApi
        .updatemeals(datas)
        .then((res) => {
          toast.success(res.message);
          AllMenus()
          exitEditingMode()
          
        })
        .catch((err) => {
          // console.log(err);
                const message = "Something went wrong try again later";
           toast.error(message);
        });

     
    } catch (error) {
      console.log("error while fetching data");
    }
   }

  const handleCancelRowEdits = async ({ exitEditingMode }) => {
    // exitEditingMode();
      // setValidationErrors({});
  }
  
  const handleDeleteRow = async (row) => {
    console.log(row);
    const data = {
      Id: row.getValue("id")
      
    }
   
 try {
       await mealsApi
        .deletemenu(data)
        .then((res) => {
          toast.success(res.message);
          AllMenus()
          
        })
        .catch((err) => {
          // console.log(err);
                const message = "Something went wrong try again later";
           toast.error(message);
        });

     
    } catch (error) {
      console.log("error while fetching data");
    }

   

  }
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
        accessorKey: "foodmenu.city.name",
        header: "City Name",
        size: 140,
        enableEditing: false,
      },

      {
        accessorKey: "date",
        header: "Date",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "breakfast",
        header: "Breakfast",
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
        accessorKey: "lunch",
        header: "Lunch",
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
        accessorKey: "dinner",
        header: "Dinner",
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

      // {
      //   accessorKey: "status",
      //   header: "Lunch",
      //   enableEditing: false,
      //   size: 80,
      //   Cell: ({ cell }) => (
      //     <Box
      //       component="span"
      //       sx={(theme) => ({
      //         backgroundColor:
      //           cell.getValue() !== "CREATED"
      //             ? theme.palette.error.dark
      //             : theme.palette.success.dark,

      //         borderRadius: "0.25rem",
      //         color: "#fff",
      //         maxWidth: "9ch",
      //         p: "0.25rem",
      //       })}
      //     >
      //       {cell.getValue()?.toLocaleString?.("en-US", {
      //         style: "currency",

      //         currency: "USD",

      //         minimumFractionDigits: 0,

      //         maximumFractionDigits: 0,
      //       })}
      //     </Box>
      //   ),
      // },
      // {
      //   accessorKey: "availability.resident.name",
      //   header: "Resident",
      //   enableEditing: false,
      //   size: 80,
      // },
      // {
      //   accessorKey: "planId",
      //   header: "Rezorpay Plan Id",
      //   size: 80,
      // },
      // {
      //   accessorKey: "razorpayPaymentId",
      //   header: "Rezorpay Payment Id",
      //   size: 80,
      // },
    ],
    []
  );

  return (
    <>
      <div className="main-content d-flex flex-column">
        <div className="breadcrumb-area">
          <h1>Meal Management</h1>
          <ol className="breadcrumb">
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
          </ol>
        </div>

        {/*..........................city information............................................*/}

        <div className="add-listings-btn">
          <button
            type="submit"
            onClick={() => {
              toggleCM(!displayCM);
            }}
          >
            Add Menu
          </button>
        </div>
         {/* <div className="add-listings-btn">
          <button
            type="submit"
            onClick={() => {
              toggleCM(!displayCM);
            }}
          >
            Added Menus
          </button>
        </div> */}

        {/*.................................... city List .........................................................*/}
        {isLoading || isLoading2 || isLoading3 || isFetching ? (
          <Loading />
              ) : (
        <>
            
        </>
        
        )}
       
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
                <IconButton onClick={() => table.setEditingRow(row)}>
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
      <MealModal displayCM={displayCM} mutate={mutate} toggleCM={toggleCM} />
    </>
  );
}

export default AddMeals;
