const CardItem = ({item, index}) =>{
    return(
        <tr key={index} className='text-center'>
            <td>
                {item.id}
            </td>
            <td>{item.client_name}</td>
            <td>{item.client_email}</td>
            <td>
                {item.client_phone}
            </td>
            <td>
                {item.price}
            </td>
            <td>
                {item.TrackID}
            </td>
            <td>
                {item.TranID}
            </td>
            <td>
                {item.PaymentID}
            </td>
            <td>
                {item.invoice_id}
            </td>
            <td>
                {item?.createdAt?.split("T")[0]}
            </td>
            <td>
                {item.payment_type}
            </td>
        </tr>
    )
}
export default CardItem;