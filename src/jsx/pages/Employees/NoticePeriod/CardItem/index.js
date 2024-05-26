import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import EmployeesService from "../../../../../services/EmployeesService";
import { Translate } from "../../../../Enums/Tranlate";
import CancellationResignationModal from "../CancellationResignationModal";

const CardItem = ({item, setItem, index, setResignationModal, setAddModal, setShouldUpdate}) =>{
    const [cancellationModal, setCancellationModal] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const employeesService = new EmployeesService()

    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>
                {item?.name}
            </td>
            <td>
                {item?.civil_id}
            </td>
            <td>{item.job_title}</td>
            <td>{item.department?.name}</td>
            <td>{item?.start_resignation_date?.split('T')[0] || '-'}</td>
            <td>{item?.end_resignation_date?.split('T')[0] || '-'}</td>
            <td>{item.start_date?.split('T')[0]}</td>
            {isExist("view_salaries") && <td>{item.salary}</td>}
            <td>{item.employee_assets?.length}</td>
            <td>
                {(isExist("edit_employees")) && <Dropdown>
                    <Dropdown.Toggle
                        className="light sharp i-false"
                    >
                        <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {isExist("edit_employees") && <Dropdown.Item onClick={()=> {
                            setItem(item)
                            setAddModal(true)
                        }}> {Translate[lang]?.edit}</Dropdown.Item>}
                        {isExist("edit_employees") && <Dropdown.Item onClick={()=> {
                            setItem(item)
                            setCancellationModal(true)
                        }}> {Translate[lang]?.cancellation_of_resignation}</Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>}
            </td>
            {cancellationModal && <CancellationResignationModal
                      open={cancellationModal}
                      name={item?.name}
                      deletedItem={item}
                      modelService={employeesService}
                      onCloseModal={setCancellationModal}
                      setShouldUpdate={setShouldUpdate}
                    />}
            </tr>
    )
}
export default CardItem;