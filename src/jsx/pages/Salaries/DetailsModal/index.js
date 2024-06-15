import { Button, Modal, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import { Translate } from "../../../Enums/Tranlate";

const DetailsModal = ({modal, setModal, item})=>{
    const lang = useSelector(state=> state.auth.lang)

    return(
        <Modal className={lang === 'en' ? "en fade addProduct" : "ar fade addProduct"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={modal} onHide={()=>{
            setModal()
            }}>
            <Modal.Header>
            <Modal.Title>{Translate[lang]?.details} {item?.name}</Modal.Title>
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
                    <Row className="my-4">
                            <div className="col-6">
                                <label>{Translate[lang].deduction}</label>
                                <p>{item?.deduction}</p>
                            </div>
                            <div className="col-6">
                                <label>{Translate[lang].unpaid_vacation}</label>
                                <p>{item?.unpaid_vacation}</p>
                            </div>
                    </Row>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={setModal} variant="danger light">
            {Translate[lang]?.close}
            </Button>
            </Modal.Footer>
        </Modal>)
}

export default DetailsModal;