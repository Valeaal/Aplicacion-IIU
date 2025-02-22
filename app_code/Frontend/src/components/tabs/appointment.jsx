import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Carroussel from "../auxiliarComponents/appointment/carroussel";
import Tarjeta from "../auxiliarComponents/appointment/explicativeCard";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2';
import "../../styles/appointment.css";
import { getAllCitas, createCita } from "../../services/citaService";
import { getAllDiasCerrados } from "../../services/diasCerradosService";

export default function Appointment() {
    const navigate = useNavigate();
    const tokenString = sessionStorage.getItem('token');

    useEffect(() => {
        if (!tokenString) {
            navigate("/login");
        }
    }, [tokenString, navigate]);

    const decodedToken = tokenString ? jwtDecode(tokenString) : null;
    const idUsuario = decodedToken ? decodedToken.userId : null;

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tarjetaHeight, setTarjetaHeight] = useState("auto");
    const [bookedDates, setBookedDates] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const calendarRef = useRef(null);
    

    const fetchBookedDates = async () => {
        try {
            const citas = await getAllCitas();
            const dates = citas.map(cita => new Date(cita.fecha));
            const diasCerrados = await getAllDiasCerrados();
            dates.push(...diasCerrados.map(diaCerrado => new Date(diaCerrado.fecha)));
            setBookedDates(dates);
            console.log(dates);
        } catch (error) {
            console.error("Error fetching booked dates:", error);
        }
    };
    
    useEffect(() => {
        fetchBookedDates();
    }, []);

    useEffect(() => {
        if (calendarRef.current) {
            const calendarHeight = calendarRef.current.clientHeight;
            setTarjetaHeight(calendarHeight);
        }
    }, [selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const isDateBooked = ({ date, view }) => {
        if (view === 'month') {
            const isBooked = bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString());
            const isPastDate = date < new Date().setHours(0, 0, 0, 0);
            const isSunday = date.getDay() === 0;
            const isSaturday = date.getDay() === 6;
            return isBooked || isPastDate || isSunday || isSaturday;
        }
        return false;
    };

    const confirmAppointment = async () => {
        try {
            const formattedDate = selectedDate.toISOString();
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¿Quieres confirmar esta cita?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí, confirmar',
                cancelButtonText: 'Cancelar',
            });
            if (result.isConfirmed) {
                const cita = await createCita({ idUsuario, fecha: formattedDate, mensaje });
                if (cita) {
                    Swal.fire({
                        title: "¡Cita confirmada!",
                        text: "Cita para el día: " + selectedDate.toLocaleDateString(),
                        icon: "success"
                    });
                    navigate("/");
                }
            }
        } catch (error) {
            console.error("Error confirming appointment:", error);
            alert("Hubo un error al confirmar la cita. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <div className="home-container">
            <h1 tabIndex={0}>Concertar cita con administración</h1>
            <hr className="borde mt-0 mb-1" />

            <div aria-label="Fotografías del centro" className="align-items-center">
                <Carroussel />

                <div  aria-label="Espacio para pedir cita"  className="row mx-3 mx-lg-5 mt-4 d-flex">
                    <div  tabIndex={0}aria-label="Cartel informativo" className="col-bg-12 col-md-6 col-lg-8 mb-4">
                        <Tarjeta />
                    </div>

                    <div aria-label="Calendario para elegir un día" className="col-bg-12 col-md-6 col-lg-4 right-align mb-4">
                        <Calendar
                            ref={calendarRef}
                            onChange={handleDateChange}
                            value={selectedDate}
                            tileDisabled={isDateBooked}
                            minDate={new Date()}
                            maxDate={new Date(2030, 11, 31)}
                        />
                        <textarea
                            tabIndex={0}
                            id="mensaje"
                            value={mensaje}
                            onChange={(e) => setMensaje(e.target.value)}
                            placeholder="Escriba aquí el mensaje explicatorio que adjuntará a la cita"
                            className="form-control mt-3"
                        />
                        <button tabIndex={0} aria-label="Botón para confirmar la cita" onClick={confirmAppointment} className="btn btn-success mt-3">
                            Confirmar cita
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}
