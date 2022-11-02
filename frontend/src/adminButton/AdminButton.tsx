import { Button } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReplayIcon from '@mui/icons-material/Replay';
import * as React from 'react'
import axios from 'axios'

const theme = createTheme();

const columns: GridColDef[] = [
  { field: '_id', headerName: 'transactionId', width: 220 },
  {
    field: 'email',
    headerName: 'email',
    width: 150,
  },
  {
    field: 'state',
    headerName: 'state',
    width: 150,
  },
  {
    field: 'id',
    headerName: 'id',
    width: 110,
  },
  {
    field: 'name',
    headerName: 'Package Name',
    width: 110,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 110,
  },
  {
    field: 'createdAt',
    headerName: 'createdAt',
    width: 220,
    sortable: true,
  },
  // {
  //   field: 'updatedAt',
  //   headerName: 'updatedAt',
  //   width: 220,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];


export default function AdminButton() {
  const [rowQuery, setRowQuery] = React.useState([])
  const [selected, setSelected] = React.useState(null)

  // const handler = (e: any) => {
  //   if (selected) {
  //     axios({
  //       method: 'post',
  //       url: 'http://localhost:8000/transaction/pay',
  //       body: {
  //         transactionId: selected
  //       },
  //     }).then((data) => {
  //       setRowQuery(data.data.transactions)
  //       console.log(JSON.stringify(rowQuery))
  //     });
  //   }
  // }
  const handler = (e: any) => {
    axios({
      method: 'put',
      url: 'http://localhost:8000/transaction/pay',
      data: { transactionId: selected }
    }).then((data) => {

      console.log(JSON.stringify(data))
    });
  }
  const handlerGetTransactions = (e: any) => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/transaction',
    }).then((data) => {
      setRowQuery(data.data.transactions)
      console.log(JSON.stringify(rowQuery))
    });
  }
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={rowQuery}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row._id}
          onSelectionModelChange={(ids) => {
            console.log(`ids: ${JSON.stringify(ids)}`)
            if (ids)
              setSelected((ids as Array<any>)[0])
          }}
        />
        <Button variant="contained" color="success" onClick={handler}>
          Allow
        </Button>
        <Button >
          ---
        </Button>
        <Button variant="contained" color="success" onClick={handlerGetTransactions} startIcon={<ReplayIcon />}>
          Refetch
        </Button>
      </ThemeProvider>
    </Box>
  )
}