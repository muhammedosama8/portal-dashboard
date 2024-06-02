import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import DepartmentService from "../../../../services/DepartmentService";
import DeleteModal from "../../../common/DeleteModal";
import { Translate } from "../../../Enums/Tranlate";

const CardItem = ({item, setItem, index, setAddModal, setShouldUpdate}) =>{
    const [deleteModal, setDeleteModal] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const departmentService = new DepartmentService()

    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>
                {item?.name}
            </td>
            <td>{item.number_of_people}</td>
            <td>
                {(isExist('edit_departments') || isExist('delete_departments')) && <Dropdown>
                    <Dropdown.Toggle
                        className="light sharp i-false"
                    >
                        <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {isExist('edit_departments') && <Dropdown.Item onClick={()=> {
                            setItem(item)
                            setAddModal(true)
                        }}> {Translate[lang]?.edit}</Dropdown.Item>}
                        {isExist('delete_departments') && <Dropdown.Item onClick={()=> setDeleteModal(true)}>{Translate[lang]?.delete}</Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>}
            </td>
            {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={item?.name}
                      deletedItem={item}
                      modelService={departmentService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
                    />}
            </tr>
    )
}
export default CardItem;