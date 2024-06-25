const CardItem = ({item, index}) =>{
    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>
                {item?.name}
            </td>
            <td>{item?.job_title}</td>
            <td>{item?.department?.name}</td>
            <td>{item?.sick_leave}</td>
            </tr>
    )
}
export default CardItem;