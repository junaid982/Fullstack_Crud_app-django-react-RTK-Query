import React, { useEffect, useState } from 'react'
import { Button, Input, Card, Table, Modal, message } from 'antd'


import { useGetAllRecordsQuery } from '../ApiCalls/services/apiHandler';
import { useRemoveRecordMutation } from '../ApiCalls/services/apiHandler';

const { Search } = Input;
const { confirm } = Modal;
const MainApp = () => {

    const [openModal, setOpenModal] = useState(false)

    const [allRecords, setAllRecords] = useState(null)

    // APi Call 
    const { data: allEmpRecords,
        isLoading: isLoadingAllEmpRecords,
        isSuccess: isSuccessAllEmpRecords,
        refetch: refetchAllEmpRecords
    } = useGetAllRecordsQuery()

    // Delete Api Call Handle 
    const [removeRecord] = useRemoveRecordMutation()

    useEffect(() => {
        fetchAPiData()
    }, [allEmpRecords, isSuccessAllEmpRecords])

    const fetchAPiData = () => {

        if (allEmpRecords && isSuccessAllEmpRecords) {
            setAllRecords(allEmpRecords)
        }

    }

    const onSearch = () => {
        console.log('Seach Clicked ')
    }

    // Table Columns

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'emp_name',
            key: 'emp_name',
        },
        {
            title: 'Email',
            dataIndex: 'emp_email',
            key: 'emp_email',
        },
        {
            title: 'Contact',
            dataIndex: 'emp_contact',
            key: 'emp_contact',
        },
        {
            title: 'Designation',
            dataIndex: 'emp_desig',
            key: 'emp_desig',
        },
        {
            title: 'Salary',
            dataIndex: 'emp_salary',
            key: 'emp_salary',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            render: ((text, record, index) => (
                <div>
                    <Button>Edit</Button>
                    <Button
                        style={{ color: 'red', marginLeft: '8px' }}
                        onClick={() => handleShowConfirm(record.id)}
                    >Delete</Button>
                </div>
            ))
        },


    ]

    const handleModalOpen = () => {
        setOpenModal(true)
    }

    const handleModalClose = () => {
        setOpenModal(false)
    }


    // Show Confirm Box
    const handleShowConfirm = (id) => {
        confirm({
            title: 'Do you want to delete this record?',
            onOk() {
                removeEmpRecord(id)
            },
            onCancel() {
                console.log('Operation Cancel')
            }
        })

    }

    // Call Api to remove this record 
    const removeEmpRecord = async (id) => {

        const response = await removeRecord(id)
        console.log("response :", response)
        if (response?.data) {
            refetchAllEmpRecords()
            message.success(response.data.message)

        }
        else if (response?.error) {
            message.error("Something Went wrong try again .")
        }

    }

    return (
        <div>
            <div className='main-container'
                style={{
                    width: '70%',
                    padding: '10px',
                    margin: '10px auto',
                    marginTop: '30px',
                    boxShadow: '2px 2px 8px gray',
                    borderRadius: '10px'
                }}
            >

                <Card>
                    <div className='header-container'
                        style={{
                            padding: '5px',
                            display: 'flex'
                        }}
                    >
                        <div className='left-section' style={{ flex: 1, padding: '10px' }}>
                            <Search
                                placeholder="input search text"
                                onSearch={onSearch}
                                enterButton
                            />

                        </div>

                        <div className='right-section' style={{ flex: 1, padding: '10px' }}>
                            <div style={{ textAlign: "right" }}>

                                <Button style={{ margin: "0px 8px" }} onClick={() => refetchAllEmpRecords()}>Reload</Button>

                                <Button onClick={handleModalOpen}>Add Record</Button>

                            </div>

                        </div>

                    </div>
                </Card>

                <div className='table-container'
                    style={{

                        padding: '5px',
                        marginTop: '30px'
                    }}
                >

                    <Table
                        dataSource={allRecords}
                        columns={columns}
                    />
                </div>

            </div>

            {/* ========= Add Record Modal ============ */}

            <Modal
                title='Add Record'
                open={openModal}
                onCancel={handleModalClose}
                footer={false}
            >

            </Modal>




        </div>
    )
}

export default MainApp
