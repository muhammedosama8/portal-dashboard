import { useState } from "react";
import { Badge, Button, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProjectsService from "../../../../services/ProjectsService";
import DeleteModal from "../../../common/DeleteModal";
import { Translate } from "../../../Enums/Tranlate";
import StartDayModal from "../StartDayModal";

const CardItem = ({item, setItem, index, setAddModal, setShouldUpdate}) =>{
    const [deleteModal, setDeleteModal] = useState(false)
    const [startDayModal, setStartDayModal] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const projectsService = new ProjectsService()

    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>
                {item?.name}
            </td>
            <td>
                {item?.department?.name}
            </td>
            <td>{item?.client_name}</td>
            <td>{item?.phone}</td>
            <td>{item?.client_email}</td>
            <td>{!!item.contract_date ? item.contract_date.split('T')[0] : '-'}</td>
            <td>{item?.price}</td>
            <td>{item?.maintenance}</td>
            <td>
                {item?.maintenance_start_date ? 
                    <span className="cursor-pointer" onClick={()=> setStartDayModal(true)}>{item?.maintenance_start_date?.split("T")[0]}</span> : 
                    <Button variant="primary" className='me-2 h-75' onClick={()=> setStartDayModal(true)}>
                        {Translate[lang].add} {Translate[lang].start_day}
                    </Button>}
            </td>
            <td>{item?.maintenance_end_date?.split("T")[0] || '-'}</td>
            <td>
                {item?.project_attachments?.length ? item?.project_attachments?.map(att=>{
                    return <a href={att.url} target='_blank' rel="noreferrer">
                        <i className="la la-file-pdf" style={{fontSize: '2.5rem'}}></i>
                    </a>
                }) : '-'}
                
            </td>
            <td>
                <Badge
                    variant={
                        item?.type === "existing_projects" ? "outline-success" : "outline-secondary"
                    }
                    >
                    {Translate[lang][item?.type] || '-'}
                </Badge>
            </td>
            <td>
                {(isExist('edit_projects') || isExist('delete_projects')) && <Dropdown>
                    <Dropdown.Toggle
                        className="light sharp i-false"
                    >
                        <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {isExist('edit_projects') && <Dropdown.Item onClick={()=> {
                            setItem(item)
                            setAddModal(true)
                        }}> {Translate[lang]?.edit}</Dropdown.Item>}
                        {isExist('delete_projects') && <Dropdown.Item onClick={()=> setDeleteModal(true)}>{Translate[lang]?.delete}</Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>}
            </td>
            {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={item?.name}
                      deletedItem={item}
                      modelService={projectsService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
            />}
            {startDayModal && 
                <StartDayModal
                    addModal={startDayModal}
                    item={item}
                    setAddModal={()=> setStartDayModal(false)}
                    setShouldUpdate={setShouldUpdate}
                />
            }
            </tr>
    )
}
export default CardItem;