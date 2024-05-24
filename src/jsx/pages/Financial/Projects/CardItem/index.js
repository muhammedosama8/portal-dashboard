import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductsService from "../../../../../services/ProjectsService";
import { Translate } from "../../../../Enums/Tranlate";

const CardItem = ({item, setItem, index, setAddModal}) =>{
    const lang = useSelector(state=> state.auth?.lang)

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
            <td>{item.client_name}</td>
            <td>{item.phone}</td>
            <td>{item?.price || '-'}</td>
            <td>
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
                        }}> {Translate[lang]?.edit} {Translate[lang]?.cost}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
            </tr>
    )
}
export default CardItem;