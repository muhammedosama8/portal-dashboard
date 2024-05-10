const CardItem = ({item, index}) =>{
    return(
        <tr key={index} className='text-center'>
            <td>
                {item.id}
            </td>
            <td>{item.client_name}</td>
            <td>
                {item.country_code} {item.phone}
            </td>
            <td>
                {item.total_price}
            </td>
            <td>
                {item.payment.TrackID}
            </td>
            <td>
                {item.payment.TranID}
            </td>
        </tr>
    )
}
export default CardItem;