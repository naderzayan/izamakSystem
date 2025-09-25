import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/_invitorsPage.scss";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useLocation } from "react-router-dom";
export default function InvitorsPage() {
    // const { partyId } = useParams();
    const location = useLocation();
    const [invitors, setInvitors] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [loading, setLoading] = useState(false);
    const baseUrl = "https://www.izemak.com/azimak/public/api";
    const partyId = location.state?.partyId;
    console.log(location.state);

    const fetchInvitors = async () => {
        let cancelled = false;
        setLoading(true);
        try {
            const res = await fetch(`https://www.izemak.com/azimak/public/api/party/${partyId}`);
            if (!res.ok) throw new Error("No Data Added");
            const data = await res.json();
            const arr = data?.data.members ?? [];
            if (!cancelled) setInvitors(arr);
        } catch (err) {
            console.log(err);
        } finally {
            if (!cancelled) setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!search) {
            fetchInvitors();
            return;
        }
        try {
            setLoading(true);
            const res = await fetch(`${baseUrl}/searchinvitor/${partyId}/${search}`);
            const data = await res.json();
            setInvitors(data.data || []);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredInvitors = invitors.filter((invitor) => (statusFilter === "All" ? true : invitor.status === statusFilter.toLowerCase()));

    useEffect(() => {
        fetchInvitors();
    }, [partyId]);

    return (
        <main className="invitorsPage">
            <header className="pageHeader">
                <div className="actions">
                    <div>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option>All</option>
                            <option>Invited</option>
                            <option>Rejected</option>
                            <option>Accepted</option>
                            <option>Faild</option>
                            <option>Arrived</option>
                        </select>
                    </div>
                    <div>
                        <Link to="/mainpartydata">
                            <img src="/logo.svg" alt="Logo" className="logo" />
                        </Link>
                    </div>
                    <div className="search">
                        <input type="text" placeholder="ادخل اسم المدعو" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
                        <button onClick={handleSearch}>بحث</button>
                    </div>
                </div>
            </header>

            {loading ? (
                <p className="loading">جاري تحميل البيانات...</p>
            ) : (
                <table className="invitorsTable">
                    <thead>
                        <tr>
                            <th>اسم المدعو</th>
                            <th>رقم الهاتف</th>
                            <th>الحالة</th>
                            <th>حذف وتعديل</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvitors.length > 0 ? (
                            filteredInvitors.map((invitor) => (
                                <tr key={invitor.id}>
                                    <td>{invitor.name}</td>
                                    <td>{invitor.phoneNumber}</td>
                                    <td>{invitor.status}</td>
                                    <td>
                                        <div className="icons">
                                            <button className="editBtn">
                                                <Link to='/updateinvitor'><FaUserEdit /></Link>
                                            </button>
                                            <button className="deleteBtn">
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="emptyRow">
                                    لا توجد بيانات
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </main>
    );
}
