import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import VacationsService from "../../../../services/ProjectsService";
import DeleteModal from "../../../common/DeleteModal";
import { Translate } from "../../../Enums/Tranlate";

const OnVacationCardItem = ({item, setItem, index, setAddModal, setShouldUpdate}) =>{
    const [deleteModal, setDeleteModal] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const vacationsService = new VacationsService()

    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>
                {item?.employee?.name}
            </td>
            <td>{item?.employee?.job_title}</td>
            <td>{item?.employee?.department?.name}</td>
            <td>{item?.departure_day ? item?.departure_day?.split('T')[0] : '-'}</td>
            <td>{item?.return_day ? item?.return_day?.split('T')[0] : '-'}</td>
            <td>{Translate[lang][item?.reason]}</td>
            <td>{Translate[lang][item?.type]}</td>
            <td>{item?.number_of_days || "-"}</td>
            <td>
                {/* {(isExist("edit_vacations") || isExist("delete_vacations")) && <Dropdown>
                    <Dropdown.Toggle
                        className="light sharp i-false"
                    >
                        <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {isExist("edit_vacations") && <Dropdown.Item onClick={()=> {
                            setItem(item)
                            setAddModal(true)
                        }}> {Translate[lang]?.edit}</Dropdown.Item>}
                        {isExist("delete_vacations") && <Dropdown.Item onClick={()=> setDeleteModal(true)}>{Translate[lang]?.delete}</Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>} */}
            </td>
            {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={item?.employee_name}
                      deletedItem={item}
                      modelService={vacationsService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
                    />}
            </tr>
    )
}
export default OnVacationCardItem;