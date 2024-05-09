import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductsService from "../../../../services/ProjectsService";
import DeleteModal from "../../../common/DeleteModal";
import { Translate } from "../../../Enums/Tranlate";

const CardItem = ({item, setItem, index, setAddModal, setShouldUpdate}) =>{
    // const [deleteModal, setDeleteModal] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>
                {item?.project_name}
            </td>
            <td>{item.price}</td>
            <td>{item.client_name}</td>
            <td>{item.client_phone}</td>
            <td>
                <Button 
                    variant="outline-primary"
                    onClick={()=>{
                        setItem(item)
                        setAddModal(true)
                    }}
                >
                    {item?.payment || '-'}
                </Button>
            </td>
            {/* <td>
                <Dropdown>
                    <Dropdown.Toggle
                        className="light sharp i-false"
                    >
                        <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=> {
                            setItem(item)
                            setAddModal(true)
                        }}> {Translate[lang]?.edit}</Dropdown.Item>
                        <Dropdown.Item onClick={()=> setDeleteModal(true)}>{Translate[lang]?.delete}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td> */}
            {/* {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={item?.product_name}
                      deletedItem={item}
                      modelService={productsService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
                    />} */}
            </tr>
    )
}
export default CardItem;