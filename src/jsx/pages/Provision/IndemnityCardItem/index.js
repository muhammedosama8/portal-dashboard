const IndemnityCardItem = ({item, index}) =>{
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
            <td>{item?.start_date?.split('T')[0]}</td>
            <td>{item?.civil_id}</td>
            <td>{item?.accrued_leave}</td>
            <td>{item?.salary}</td>
            <td>{item?.dailyIndemnity}</td>
            <td>{item?.exceedingYearsIndemnity}</td>
            <td>{item?.first5YearsIndemnity}</td>
            <td>{item?.monthlyIndemnity}</td>
            <td>{item?.paidLeaveBalanceAmount}</td>
            <td>{item?.totalIndemnity}</td>
            </tr>
    )
}
export default IndemnityCardItem;