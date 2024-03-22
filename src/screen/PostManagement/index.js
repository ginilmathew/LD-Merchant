import { Box, Stack, Tooltip } from '@mui/material'
import React, { startTransition, useCallback, useEffect, useState } from 'react'
import CustomHeading from '../../components/common/CustomHeading'
import DataTable from '../../components/common/CustomTable';
import { ICONS } from '../../assets/ICONS';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletPost, getPost } from '../../api/post';
import moment from 'moment';
import { useSnackbar } from '../../hooks/SnackBarHook';
import { userStore } from '../../store/user';
import CustomDelete from '../../components/common/CustomDelete';
import CustomBackDrop from '../../components/common/CustomBackDrop';

const PostManagement = () => {


    const [_id, set_id] = useState(null);

    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data, isError, isLoading, isFetched, refetch } = useQuery(
        {
            queryKey: ['postList'],
            queryFn: getPost
        });


    const [List, setList] = useState([]);


    useEffect(() => {
        if (data?.data?.data) {
            setList(data?.data?.data)
        }
    }, [data?.data?.data])




    const OpenModal = useCallback((id) => {
        set_id(id)
        setOpen(true)
    }, [open])


    const CloseModal = useCallback(() => {
        setOpen(false)
    }, [open])

    const coloredOrderStatusCell = (params) => {
        const orderStatus = params?.row?.status;
        let color = 'black'; // Default color

        if (orderStatus === 'approved') {
            color = '#16af67';
        } else if (orderStatus === 'processing') {
            color = '#feb236';
        } else if (orderStatus === 'shipped') {
            color = 'blue';
        } else if (orderStatus === 'completed') {
            color = 'green';
        } else if (orderStatus === 'rejected') {
            color = '#af1616';
        } else if (orderStatus === 'pending') {
            color = "#af7c16"
        }
        return <div style={{ color }}>{orderStatus}</div>;
    };

    const columns = [
        {
            field: 'id',
            headerName: 'Post ID',
            width: 200,
            headerAlign: 'center',
            align: 'center',
        },

        {
            field: 'lastName',
            headerName: 'Created Date',
            headerAlign: 'center',
            width: 250,
            align: 'center',
            valueGetter: (params) => (moment(params.row.created_date).format('DD/MM/YYYY')),
        },
        // {
        //   field: 'age',
        //   headerName: 'Merchant Name',

        //   flex: 1,
        //   headerAlign: 'center',
        //   align: 'center',
        // },
        {
            field: 'title',
            headerName: 'Post Title',
            width: 250,
            headerAlign: 'center',
            align: 'center',

        },
        {
            field: 'total_participants',
            headerName: 'Total Participants',
            type: 'number',
            width: 200,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'deadline',
            headerName: 'Deadline',
            type: 'number',
            width: 250,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'agesdsf',
            headerName: 'Approval Status',
            type: 'number',
            width: 250,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => coloredOrderStatusCell(params),
        },


        {

            field: 'Action',
            headerName: 'Action',
            width: 250,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            disableColumnMenu: true,
            renderCell: ({ row }) => (
                <Stack alignItems={'center'} gap={1} direction={'row'}>
                    <Tooltip title={'view'}>
                        <ICONS.RemoveRedEyeIcon.component
                            onClick={() => navigateToView(row?.id)}
                            sx={ICONS.RemoveRedEyeIcon.sx}
                        />
                    </Tooltip>
                    <Tooltip title={'edit'}>
                        <ICONS.BorderColorIcon.component
                            onClick={() => navigateToEdit(row?.id)}
                            sx={ICONS.BorderColorIcon.sx} />
                    </Tooltip>
                    <Tooltip title={'delete'}>
                        <ICONS.DeleteIcon.component
                            onClick={() => OpenModal(row?.id)}
                            sx={ICONS.DeleteIcon.sx} />
                    </Tooltip>
                </Stack>
            ),
        }
    ];






    const navigateToEdit = useCallback((id) => {
        navigate(`/postEdit/${id}`, { state: 'Edit' })
    }, [navigate])
    const navigateToView = useCallback((id) => {
        navigate(`/postView/${id}`, { state: 'View' })
    }, [navigate])

    // const Delete = useCallback((id)=>{
    //   mutate(id)
    // },[])

    const navigateToAdd = useCallback((id) => {
        navigate('/postadd', { state: 'Add' })
    }, [navigate])


    const searchItem = useCallback((value) => {
        console.log({ value })
        let result = data?.data?.data?.filter((com) => com?.id.toString().toLowerCase().includes(value.toLowerCase())
            || com?.total_participants.toString().toLowerCase().includes(value.toLowerCase())

        )
        startTransition(() => {
            setList(result)
        })
    }, [List])

    return (
        <Box px={5} py={2}>
            <Box>
                <CustomHeading label={'Post Management'} buttonLabel={'Add Post'} onClick={navigateToAdd} setState={searchItem} />
            </Box>
            <Box mt={7}>
                <DataTable id={'id'} columns={columns} rows={List} />
            </Box>
            {open && <CustomDelete
                open={open}
                onClose={CloseModal}
                heading={'post'}
                paragraph={'post'}
                fun={deletPost}
                _id={_id}
                fetch={refetch} />}
            <CustomBackDrop loading={isLoading} />
        </Box>
    )
}

export default PostManagement