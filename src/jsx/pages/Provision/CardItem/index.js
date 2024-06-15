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
            <td>{item?.accrued_leave}</td>
            <td>{Number.parseFloat(item?.provision_KWD).toFixed(3) || '-'}</td>
            </tr>
    )
}
export default CardItem;