import { useState } from "react";
import { Badge, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import LeadService from "../../../../services/LeadService";
import DeleteModal from "../../../common/DeleteModal";
import { Translate } from "../../../Enums/Tranlate";

const CardItem = ({item, setItem, index, setAddModal, setShouldUpdate, setEditStatus}) =>{
    const [deleteModal, setDeleteModal] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const leadService = new LeadService()

    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>
                {item?.lead_name}
            </td>
            <td>{item.client_name}</td>
            <td>{item.client_phone}</td>
            <td>{item.client_email}</td>
            <td>{item.reference}</td>
            <td>
                {item?.lead_attachments?.map(att=>{
                    return <a key={att?.id} href={att?.url} className='mx-1' target='_blank'>
                        <i className="la la-file-pdf" style={{fontSize: '3rem'}}></i>
                    </a>
                })}
            </td>
            <td>
                <Badge 
                    className="cursor-pointer"
                    onClick={()=>{
                        if(!isExist('edit_leads')){
                            return
                        }
                        setEditStatus(true)
                        setItem(item)
                        setAddModal(true)
                    }}
                    style={{textTransform: 'capitalize'}}
                    variant={`${item?.status === 'new' ? 'primary' : item?.status === 'on Progress' ? 'warning' : item?.status === 'success' ? 'success' : 'danger'}`}
                >{item?.status}</Badge>
            </td>
            <td>
                {(isExist('edit_leads') || isExist("delete_leads")) &&<Dropdown>
                    <Dropdown.Toggle
                        className="light sharp i-false"
                    >
                        <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {isExist('edit_leads') && <Dropdown.Item onClick={()=> {
                            setEditStatus(false)
                            setItem(item)
                            setAddModal(true)
                        }}> {Translate[lang]?.edit}</Dropdown.Item>}
                        {isExist('delete_leads') && <Dropdown.Item onClick={()=> setDeleteModal(true)}>{Translate[lang]?.delete}</Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>}
            </td>
            {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={item?.lead_name}
                      deletedItem={item}
                      modelService={leadService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
                    />}
            </tr>
    )
}
export default CardItem;