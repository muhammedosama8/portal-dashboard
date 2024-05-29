const CardItem = ({item, index}) =>{
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
            </tr>
    )
}
export default CardItem;