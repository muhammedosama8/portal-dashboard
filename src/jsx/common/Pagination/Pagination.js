import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Translate } from "../../Enums/Tranlate";
import "./style.scss";

const Pagination = ({
  setData,
  service,
  shouldUpdate,
  isDeleted,
  setHasData,
  setLoading,
  type,
  search,
  param
}) => {
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const lang = useSelector((state) => state.auth.lang);

  useEffect(() => {
    setLoading(true);
    let params = {
      offset: (page - 1) * 40,
      limit: 40,
      ...param
    };
    if (!!type) params["type"] = type;
    if (!!search) params["search"] = search;
    if (!!param?.year) params["year"] = param?.year;
    if (!!param?.month) params["month"] = param?.month;
    if (!!param?.type) params["type"] = param?.type;

    service?.getList({ ...params }).then((res) => {
      if (res?.status === 200) {
        setData([...res.data?.data?.data]);
        let total = Math.ceil(res.data?.data?.totalItems / 40);
        setTotalPages(total);
        if (res.data?.data?.totalItems > 0) {
          setHasData(1);
        } else {
          setHasData(0);
        }
      }
      setLoading(false);
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [page, shouldUpdate, search, param?.month, param?.year, param?.type]);

  useEffect(() => {
    setPage(1);
  }, [isDeleted, shouldUpdate]);

  if (totalPages > 1) {
    return (
      <Row className="pagination mt-3 px-2">
        <Col md={12} className="text-center">
          <div className="filter-pagination d-flex justify-content-between mt-3">
            <button
              className="previous-button"
              onClick={() => {
                setPage((prev) => parseInt(prev) - 1);
              }}
              disabled={parseInt(page) === 1}
            >
              {lang === "en" ? (
                <i className="la la-arrow-left"></i>
              ) : (
                <i className="la la-arrow-right"></i>
              )}{" "}
              {Translate[lang]?.previous}
            </button>
            <div className="d-flex" style={{ gap: "5px" }}>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                )?.map((num) => {
                  return (
                    <p
                      onClick={() => {
                        setPage(num);
                      }}
                      style={{
                        padding: "5px 10px",
                        margin: "0",
                        cursor: "pointer",
                        color:
                          parseInt(page) === parseInt(num)
                            ? "var(--primary)"
                            : "",
                      }}
                    >
                      {num}
                    </p>
                  );
                })}
            </div>
            <button
              className="next-button"
              onClick={() => {
                setPage((prev) => parseInt(prev) + 1);
              }}
              disabled={parseInt(page) === totalPages}
            >
              {Translate[lang]?.next}{" "}
              {lang === "en" ? (
                <i className="la la-arrow-right"></i>
              ) : (
                <i className="la la-arrow-left"></i>
              )}
            </button>
          </div>
        </Col>
      </Row>
    );
  }
};

export default Pagination;
