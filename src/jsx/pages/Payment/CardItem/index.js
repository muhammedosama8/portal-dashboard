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
                {item?.name}
            </td>
            <td>{item.price}</td>
            <td>{item.client_name}</td>
            <td>{item.phone}</td>
            <td>
                {item?.payment_method ? <Button 
                    variant="secondary"
                    onClick={()=>{
                        setItem(item)
                        setAddModal(true)
                    }}
                    style={{
                        textTransform: 'capitalize'
                    }}
                >
                    {item?.payment_method}
                </Button> : '-'}
            </td>
            </tr>
    )
}
export default CardItem;