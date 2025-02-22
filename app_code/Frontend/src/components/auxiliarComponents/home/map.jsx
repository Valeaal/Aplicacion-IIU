import React from 'react';

function Map() {
    const styleMap = {
        height: 200,
        border: "1px solid black",
        width: "100%"
    };

    return (
        <div role="region" aria-label="Mapa de ubicación de la Escuela Infantil Virgen Inmaculada">
            <iframe
                tabIndex={-1}
                title="Mapa de ubicación de la Escuela Infantil Virgen Inmaculada"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6203.910558021784!2d-5.354176031618551!3d36.15891263811876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0cc1d800a2cd5f%3A0x38a3d5577147ac4f!2sEscuela%20infantil%20Virgen%20Inmaculada!5e1!3m2!1sen!2ses!4v1713872469003!5m2!1sen!2ses"
                style={styleMap}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <p className="sr-only">La dirección de la Escuela Infantil Virgen Inmaculada es Calle Inmaculada Concepción, número 2, La Línea de la Concepción, Cádiz.</p>
        </div>
    );
}

export default Map;
