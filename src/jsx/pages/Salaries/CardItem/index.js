const CardItem = ({item, index}) =>{
    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>
                {item?.name}
            </td>
            <td>{item.salary}</td>
            </tr>
    )
}
export default CardItem;