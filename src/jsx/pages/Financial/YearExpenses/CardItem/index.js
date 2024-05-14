import { useState } from "react";
import { useSelector } from "react-redux";
import ProductsService from "../../../../../services/ProjectsService";

const CardItem = ({item, index}) =>{
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const productsService = new ProductsService()

    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>
                {item?.name}
            </td>
            <td>
                {item?.department}
            </td>
            <td>{item.client_name}</td>
            <td>{item.client_phone}</td>
            <td>{item?.cost || '-'}</td>
            </tr>
    )
}
export default CardItem;