import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import AssetsService from "../../../../services/AssetsService";
import ProductsService from "../../../../services/ProjectsService";
import DeleteModal from "../../../common/DeleteModal";
import { Translate } from "../../../Enums/Tranlate";

const CardItem = ({item, setItem, index, setAddModal, setView, setShouldUpdate}) =>{
    const [deleteModal, setDeleteModal] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const assetsService = new AssetsService()

    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>
                {item?.name}
            </td>
            <td>
                {item?.serial_number || '-'}
            </td>
            <td>
                <div style={{display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '8px'}}>
                    {!!item?.asset_items?.length ? item?.asset_items?.map(item=>{
                        return <span className="badge bg-primary text-white">{item?.item}</span>
                    }) : '-'}
                </div>
            </td>
            <td>
                {item?.asset}
            </td>
            {isExist("view_custody") && <td>
                <i className="la la-eye cursor-pointer" 
                    onClick={()=> {
                        setItem(item)
                        setAddModal(true)
                        setView(true)
                    }} 
                    style={{
                        fontSize: '27px', 
                        color: '#666'
                    }}
                ></i>
            </td>}
            <td>
                {(isExist("edit_custody") || isExist("delete_custody") ) && <Dropdown>
                    <Dropdown.Toggle
                        className="light sharp i-false"
                    >
                        <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {isExist("edit_custody") && <Dropdown.Item onClick={()=> {
                            setItem(item)
                            setAddModal(true)
                        }}> {Translate[lang]?.edit}</Dropdown.Item>}
                        {isExist("delete_custody") && <Dropdown.Item onClick={()=> setDeleteModal(true)}>{Translate[lang]?.delete}</Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>}
            </td>
            {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={item?.name}
                      deletedItem={item}
                      modelService={assetsService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
                    />}
            </tr>
    )
}
export default CardItem;