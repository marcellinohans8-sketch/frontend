import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import baseUrl from "../constant/BaseUrl";

export default function DeletePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteLawyer = async () => {
      try {
        await axios.delete(`${baseUrl}/lawyers/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        alert("Lawyer deleted");
        navigate("/our-legal");
      } catch (err) {
        alert(err.response?.data?.message);
        navigate("/our-legal"); // ← penting
      }
    };

    deleteLawyer();
  }, []);
  return <h1>Deleting...</h1>;
}
