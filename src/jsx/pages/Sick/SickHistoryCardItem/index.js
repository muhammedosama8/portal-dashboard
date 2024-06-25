const SickHistoryCardItem = ({item, index}) =>{
    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>
                {item?.employee?.name}
            </td>
            <td>{item?.employee?.job_title}</td>
            <td>{item?.employee?.department?.name}</td>
            <td>{item?.departure_day ? item?.departure_day?.split('T')[0] : '-'}</td>
            <td>{item?.return_day ? item?.return_day?.split('T')[0] : '-'}</td>
            <td>{item?.reason}</td>
            <td>{item?.number_of_days || "-"}</td>
        </tr>
    )
}
export default SickHistoryCardItem;