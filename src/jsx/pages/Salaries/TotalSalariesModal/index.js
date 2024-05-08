import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Select from "react-select";
import uploadImg from '../../../../images/upload-img.png';
import SalariesService from "../../../../services/SalariesService";
import { Translate } from "../../../Enums/Tranlate";
import Loader from "../../../common/Loader";
import BaseService from "../../../../services/BaseService";

const TotalSalariesModal = ({modal, setModal})=>{
    const [formData, setFormData] = useState({
        employee: '',
        salary: '',
    })
    const [employeesOptions, setEmployeesOptions] = useState([])
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const salariesService = new SalariesService()
    const lang = useSelector(state=> state.auth.lang)

    return(
        <Modal className={lang === 'en' ? "en fade addProduct" : "ar fade addProduct"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={modal} onHide={()=>{
            setModal()
            }}>
            <Modal.Header>
            <Modal.Title>{Translate[lang]?.total_salary}</Modal.Title>
            <Button
                variant=""
                className="close"
                style={{right: lang === 'en' ? '0' : 'auto', left: lang === 'ar' ? '0' : 'auto'}}
                onClick={()=>{
                    setModal()
                }}
                >
                <span>&times;</span>
            </Button>
            </Modal.Header>
            <Modal.Body>
                    <Row>
                       1000
                    </Row>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={setModal} variant="danger light">
            {Translate[lang]?.close}
            </Button>
            </Modal.Footer>
        </Modal>)
}

export default TotalSalariesModal;