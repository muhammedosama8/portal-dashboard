import { useState } from "react";
import DetailsModal from "../DetailsModal";

const CardItem = ({item, index}) =>{
    const [modal, setModal] = useState(false)
    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>
                {item?.name}
            </td>
            <td>{Number.parseFloat(item.salary).toFixed(3)}</td>
            <td>{Number.parseFloat(item.salary_after_deduction).toFixed(3)}</td>
            <td>
                <i 
                    className="la la-eye cursor-pointer"
                    onClick={()=> setModal(true)}
                ></i>
            </td>
            {modal && 
                <DetailsModal
                    modal={modal} 
                    setModal={()=> setModal(false)}
                    item={item}
                />
            }
        </tr>
    )
}
export default CardItem;