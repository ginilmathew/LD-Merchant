import { Box, Stack, Tooltip } from '@mui/material'
import React, { useCallback } from 'react'
import CustomHeading from '../../components/common/CustomHeading'
import DataTable from '../../components/common/CustomTable';
import { ICONS } from '../../assets/ICONS';
import { useNavigate } from 'react-router-dom';

const PostManagement = () => {
  // const { modal, openModal, closeModal } = useModal();
  const navigate = useNavigate()

  const columns = [
    {
      field: 'id',
      headerName: 'Post ID',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },

    {
      field: 'lastName',
      headerName: 'Created Date',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'age',
      headerName: 'Merchant Name',

      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'fullName',
      headerName: 'Post Title',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'agesdf',
      headerName: 'Total Participants',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'adsgesdf',
      headerName: 'Deadline',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'agesdsf',
      headerName: 'Approval Status',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },

    {

      field: 'Action',
      headerName: 'Action',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <Stack alignItems={'center'} gap={1} direction={'row'}>
          <Tooltip title={'view'}>
            <ICONS.RemoveRedEyeIcon.component
              onClick={navigateToView}
              sx={ICONS.RemoveRedEyeIcon.sx}
            />
          </Tooltip>
          <Tooltip title={'edit'}>
            <ICONS.BorderColorIcon.component
              onClick={navigateToEdit}
              sx={ICONS.BorderColorIcon.sx} />
          </Tooltip>
        </Stack>
      ),
    }
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];


  const navigateToEdit = useCallback((id) => {
    navigate('/postEdit/irere', { state: 'Edit' })
  }, [])
  const navigateToView = useCallback((id) => {
    navigate('/postView/irere', { state: 'View' })
  }, [])
  const navigateToAdd = useCallback((id) => {
    navigate('/postadd', { state: 'Add' })
  }, [])


  return (
    <Box px={5} py={2}>
      <Box>
        <CustomHeading label={'Post Management'} buttonLabel={'Add Post'} onClick={navigateToAdd}/>
      </Box>
      <Box mt={7}>
        <DataTable id={'id'} columns={columns} rows={rows} />
      </Box>
    </Box>
  )
}

export default PostManagement