import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Translate } from "../../../../Enums/Tranlate";
import ProjectsService from "../../../../../services/ProjectsService";
import { Expenses } from "../../../../Enums/Expenses";
import { useLocation } from "react-router-dom";
import uploadImg from '../../../../../images/upload-img.png';
import Loader from "../../../../common/Loader";
import BaseService from "../../../../../services/BaseService";

const TotalRevenuesModal = ({modal, setModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState([
        {name: '', cost: "", img: ''}
    ])
    const projectsService = new ProjectsService()
    const location = useLocation()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(()=>{
        if(!!location?.state?.item){
            let item = location.state?.item
        }
    }, [])

    const submit = (e) =>{
        e.preventDefault();
        // let data ={ 
        //     item_no: formData?.item_no,
        //     name: formData?.name,
        //     price: formData?.price,
        //     code: formData?.code,
        //     barcode: formData?.barcode,
        //     image: formData?.image
        // }

        // if(isAdd){
        //     projectsService.create(data)?.then(res=>{
        //         if(res && res?.status === 201){
        //             toast.success('Product Added Successfully')
        //             setShouldUpdate(prev=> !prev)
        //             setModal()
        //         }
        //     })
        // } else {
        //     projectsService.update(formData?.id, data)?.then(res=>{
        //         if(res && res?.status === 200){
        //             toast.success('Product Updated Successfully')
        //             setShouldUpdate(prev=> !prev)
        //             setModal()
        //         }
        //     })
        // }
    }

    return(
        <Modal className={lang === 'en' ? "en fade addRevenues" : "ar fade addRevenues"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={modal} onHide={()=>{
            setModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{Translate[lang]?.total} {Translate[lang]?.revenues}</Modal.Title>
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
                    1000
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={setModal} variant="danger light">
            {Translate[lang]?.close}
            </Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default TotalRevenuesModal;