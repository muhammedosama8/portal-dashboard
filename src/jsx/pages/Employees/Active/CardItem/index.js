import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import EmployeesService from "../../../../../services/EmployeesService";
import { Translate } from "../../../../Enums/Tranlate";
import DeleteModal from "../../DeleteModal";

const CardItem = ({item, setItem, index, setResignationModal, setAddModal, setShouldUpdate}) =>{
    const [deleteModal, setDeleteModal] = useState(false)
    const [type, setType] = useState('')
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
            <td>{item.personal_email}</td>
            <td>{item.company_email}</td>
            <td>{item.start_date?.split('T')[0]}</td>
            {isExist("view_salaries") && <td>{item.salary}</td>}
            <td>{item.employee_assets?.length}</td>
            <td>
                {item.employee_attach?.length > 0 ? item.employee_attach?.map((att=>(
                    <a href={att.url} target='_black' rel="noreferrer">
                        <i className="la la-file-pdf" style={{fontSize: '2.5rem'}}></i>
                    </a>
                ))) : '-'}
            </td>
            <td>
                {(isExist("edit_employees") && isExist("delete_employees")) && <Dropdown>
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
                            setResignationModal(true)
                        }}> {Translate[lang]?.resignation}</Dropdown.Item>}
                        {isExist("delete_employees") && <Dropdown.Item onClick={()=> {
                            setDeleteModal(true)
                            setType('delete')
                        }}>{Translate[lang]?.delete}</Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>}
            </td>
            {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={item?.name}
                      deletedItem={item}
                      modelService={employeesService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
                      type={type}
                    />}
            </tr>
    )
}
export default CardItem;