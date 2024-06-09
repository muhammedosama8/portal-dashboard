import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ProjectsService from "../../../../services/ProjectsService";
import { Translate } from "../../../Enums/Tranlate";

const StartDayModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const lang = useSelector(state=> state.auth.lang)
    const [formData, setFormData] = useState({
        start_day: ""
    })
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const projectsService = new ProjectsService()

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            // setFormData({
            //     id: item?.id,
            //     name: item?.name,
            // })
        }
    },[item])

    const submit = (e) =>{
        e.preventDefault();
        let data ={ 
            start_day: formData.start_day,
        }

        // if(isAdd){
        //     projectsService.create(data)?.then(res=>{
        //         if(res && res?.status === 201){
        //             toast.success('Project Added Successfully')
        //             setShouldUpdate(prev=> !prev)
        //             setAddModal()
        //         }
        //     })
        // } else {
        //     projectsService.update(formData?.id, data)?.then(res=>{
        //         if(res && res?.status === 200){
        //             toast.success('Project Updated Successfully')
        //             setShouldUpdate(prev=> !prev)
        //             setAddModal()
        //         }
        //     })
        // }
    }

    return(
        <Modal className={lang === 'en' ? "en fade addProduct" : "ar fade addProduct"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
            setAddModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{isAdd ? Translate[lang]?.add : Translate[lang]?.edit} {Translate[lang]?.start_day}</Modal.Title>
            <Button
                variant=""
                className="close"
                style={{right: lang === 'en' ? '0' : 'auto', left: lang === 'ar' ? '0' : 'auto'}}
                onClick={()=>{
                    setAddModal()
                }}
                >
                <span>&times;</span>
            </Button>
            </Modal.Header>
            <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.start_day}
                                type='date'
                                placeholder={Translate[lang]?.start_day}
                                bsSize="lg"
                                name='start_day'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.start_day}
                                onChange={(e) => setFormData({...formData, start_day: e.target.value})}
                            />
                        </Col>
                    </Row>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={setAddModal} variant="danger light">
            {Translate[lang]?.close}
            </Button>
            <Button 
                    variant="primary" 
                    type='submit'
                    disabled={loading}
                >{isAdd ? Translate[lang]?.add : Translate[lang]?.edit}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default StartDayModal;