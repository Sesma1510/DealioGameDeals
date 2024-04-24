import { useEffect, useState, useRef, useCallback } from "react";
import { Table } from "antd";
import { getInitialDeals, searchDeals } from "../../services/apiService";
import { Game } from "../../types/types";
import SearchComponent from "../Search/Search";
import { columns } from "./TableColumns";
import { Modal } from "../Modal/Modal";

const GameTable = () => {
  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [modalImageUrl, setModalImageUrl] = useState("");
  const hoverTimeoutRef = useRef<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: Element | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const loadDeals = async (pageNumber: number, searchQuery: string = "") => {
    setLoading(true);
    try {
      const newDeals = searchQuery
        ? await searchDeals({ title: searchQuery, pageNumber })
        : await getInitialDeals(pageNumber);

      setData((prevData: Game[]) => {
        const newData = [...prevData, ...newDeals];
        const uniqueData = Array.from(
          new Set(newData.map((deal) => deal.dealID)),
        ).map((id) => newData.find((deal) => deal.dealID === id));
        return uniqueData as Game[];
      });

      setHasMore(newDeals.length > 0);
    } catch (error) {
      console.error("Failed to fetch deals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeals(0, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (page !== 0) {
      loadDeals(page, searchQuery);
    }
  }, [page, searchQuery]);

  const handleSearch = (query: string) => {
    setData([]);
    setPage(0);
    setHasMore(true);
    setSearchQuery(query);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, record: Game) => {
    setModalImageUrl(record.thumb ?? "");
    updateModalPosition(e);
    setShowModal(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current) {
      modalRef.current.style.top = `${e.clientY + 10}px`;
      modalRef.current.style.left = `${e.clientX + 10}px`;
    }
  };

  const handleMouseLeave = () => {
    // Clear the timeout and close the modal when the mouse leaves the row
    if (hoverTimeoutRef.current !== null) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setShowModal(false);
  };

  const updateModalPosition = (e: React.MouseEvent<HTMLElement>) => {
    setModalPosition({
      left: e.clientX + 10,
      top: e.clientY + 10,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "0 10vw",
        backgroundColor: "bg-blue-baground",
      }}
    >
      <div style={{ width: "80vw", overflow: "auto" }}>
        <SearchComponent onSearch={handleSearch} />
        <Table
          columns={columns}
          dataSource={data}
          rowKey="dealID"
          pagination={false}
          loading={loading}
          onRow={(record) => ({
            onMouseEnter: (e) => handleMouseEnter(e, record),
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
          })}
        />
        {showModal && (
          <Modal
            imageUrl={modalImageUrl}
            show={showModal}
            onClose={handleCloseModal}
            top={modalPosition.top}
            left={modalPosition.left}
            modalRef={modalRef}
          />
        )}
        <div
          ref={lastElementRef}
          style={{ height: "20px", margin: "10px 0" }}
        />
      </div>
    </div>
  );
};

export default GameTable;
