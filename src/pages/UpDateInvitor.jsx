import React from "react";
import "../style/_updateinvitor.scss";
import { Link } from "react-router";

export default function UpDateInvitor() {
    return (
        <main className="mainOfUpDateInvitor">
            <div>
                <Link to="/mainpartydata">
                    <img src="logo.svg" alt="" />
                </Link>
            </div>
            <h1>تعديل البيانات</h1>
            <form>
                <div className="details">
                    <label>الاسم</label>
                    <input type="text" />
                </div>
                <div className="details">
                    <label>رقم الهاتف</label>
                    <input type="text" />
                </div>
                <div className="details">
                    <label>عدد مرات القرائة</label>
                    <input type="text" />
                </div>
                    <label>الحالة</label>
                <div className="condition">
                    <select>
                        <option value="invited">invited</option>
                        <option value="accepted">accepted</option>
                        <option value="rejected">rejected</option>
                    </select>
                </div>
                <div className="submit">
                    <button type="submit">تعديل</button>
                </div>
            </form>
        </main>
    );
}
