import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Translate } from "../../../../Enums/Tranlate";
import ProjectsService from "../../../../../services/ProjectsService";


const AddProductsModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        cost: ""
    })
    const [loading, setLoading] = useState(false)
    const projectsService = new ProjectsService()
    const lang = useSelector(state=> state.auth.lang)


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
        //             setAddModal()
        //         }
        //     })
        // } else {
        //     projectsService.update(formData?.id, data)?.then(res=>{
        //         if(res && res?.status === 200){
        //             toast.success('Product Updated Successfully')
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
            <Modal.Title>{Translate[lang]?.edit} {Translate[lang]?.cost} {Translate[lang]?.project}</Modal.Title>
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
                                label={Translate[lang]?.cost}
                                type='number'
                                min={0}
                                placeholder={Translate[lang]?.cost}
                                bsSize="lg"
                                name='cost'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.cost}
                                onChange={(e) => setFormData({...formData, cost: e.target.value})}
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
                >{Translate[lang]?.edit}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default AddProductsModal;