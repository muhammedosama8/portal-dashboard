import { useSelector } from "react-redux";
import { Translate } from "./Tranlate";
import Select from "react-select";
import { useEffect, useState } from "react";

const YearDropDown = ({params, changeParams}) => {
    const [yearOptions, setYearOptions] = useState([])
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const years = [];
        for(let i = currentYear; i >= currentYear-5; i--){
            years.push({label: `${i}`, value: i})
        }
        setYearOptions([...years])
    },[lang])

    return <Select
        placeholder={Translate[lang]?.select}
        options={yearOptions}
        value={params?.year}
        onChange={(e) => changeParams(e, 'year')}
    />
}
export default YearDropDown;