// Función para calcular la amplitud reflejada
function fresnelReflection(n1, n2, angle, polarization) {
    const angleRad = angle * Math.PI / 180;
    const sqrtTerm = Math.sqrt(1 - Math.pow((n1 / n2) * Math.sin(angleRad), 2));

    const rs = (n1 * Math.cos(angleRad) - n2 * sqrtTerm) /
               (n1 * Math.cos(angleRad) + n2 * sqrtTerm);
    const rp = (n2 * Math.cos(angleRad) - n1 * sqrtTerm) /
               (n2 * Math.cos(angleRad) + n1 * sqrtTerm);

    return polarization === 's' ? rs : rp;
}
// Función para calcular la irradiancia transmitida considerando los coeficientes de transmisión de Fresnel
function fresnelTransmission(n1, n2, angle, polarization) {
    const angleRad = angle * Math.PI / 180; // Convertir el ángulo a radianes

    // Calcular el ángulo de refracción usando la ley de Snell
    const sinInc = Math.sin(angleRad);
    const sinTrans = (n1 / n2) * sinInc;

    // Verificar si ocurre reflexión total interna
    if (sinTrans > 1) {
        return 0; // No hay transmisión en caso de reflexión total
    }

    const cosInc = Math.cos(angleRad);
    const cosTrans = Math.sqrt(1 - sinTrans * sinTrans);

    // Coeficientes de reflexión y transmisión para polarización S (transversal) y P (paralela)
    const rs = (n1 * cosInc - n2 * cosTrans) / (n1 * cosInc + n2 * cosTrans); // Coeficiente de reflexión S
    const rp = (n2 * cosInc - n1 * cosTrans) / (n2 * cosInc + n1 * cosTrans); // Coeficiente de reflexión P

    const ts = 1 - Math.pow(rs, 2); // Coeficiente de transmisión S
    const tp = 1 - Math.pow(rp, 2); // Coeficiente de transmisión P

    // La irradiancia transmitida es el cuadrado del coeficiente de transmisión, ponderado por los índices de refracción
    if (polarization === 's') {
        return ts * (n2 / n1);
    } else if (polarization === 'p') {
        return tp * (n2 / n1);
    } else {
        // Si la polarización no es válida, devolver 0
        return 0;
    }
}



// Función para calcular la fase de amplitud reflejada
function amplitudeReflectionPhase(n1, n2, angle) {
    const rs = fresnelReflection(n1, n2, angle, 's');
    const rp = fresnelReflection(n1, n2, angle, 'p');

    return {
        phaseS: Math.atan2(0, rs),
        phaseP: Math.atan2(0, rp),
    };
}

// Función para calcular la retardancia reflejada
function retardanceReflection(n1, n2, angle) {
    const rs = fresnelReflection(n1, n2, angle, 's');
    const rp = fresnelReflection(n1, n2, angle, 'p');

    const phaseRs = Math.atan2(0, rs); // Fase de Rs
    const phaseRp = Math.atan2(0, rp); // Fase de Rp

    return phaseRs - phaseRp; // Diferencia de fase (retardancia)
}

// Función para calcular la diatenuación reflejada
function diattenuationReflection(n1, n2, angle) {
    const R_s = Math.pow(fresnelReflection(n1, n2, angle, 's'), 2);
    const R_p = Math.pow(fresnelReflection(n1, n2, angle, 'p'), 2);
    return Math.abs(R_s - R_p) / (R_s + R_p);
}

// Función para calcular la amplitud reflejada - abs
function amplitudeReflectionAbs(n1, n2, angle) {
    const rs = fresnelReflection(n1, n2, angle, 's');
    const rp = fresnelReflection(n1, n2, angle, 'p');
    return {
        rsAbs: Math.abs(rs),
        rpAbs: Math.abs(rp),
    };
}

// Función para calcular la amplitud reflejada - real
function amplitudeReflectionReal(n1, n2, angle) {
    const rs = fresnelReflection(n1, n2, angle, 's');
    const rp = fresnelReflection(n1, n2, angle, 'p');
    return {
        rsReal: rs,
        rpReal: rp,
    };
}

// Función para calcular la amplitud reflejada - imaginaria
function amplitudeReflectionImaginary(n1, n2, angle) {
    const angleRad = angle * Math.PI / 180;

    // Parte real e imaginaria de rs y rp (solo implementa parte imaginaria aquí)
    const sqrtTerm = Math.sqrt(1 - Math.pow((n1 / n2) * Math.sin(angleRad), 2));
    const rsImag = 0; // Sin índice complejo, imaginaria de rs es 0
    const rpImag = 0; // Sin índice complejo, imaginaria de rp es 0

    
    return {
        rsImag: rsImag,
        rpImag: rpImag,
    };
}
// Función para calcular la retardancia transmitida
function retardanceTransmission(n1, n2, angle) {
    const ts = fresnelTransmission(n1, n2, angle, 's');
    const tp = fresnelTransmission(n1, n2, angle, 'p');

    const phaseTs = Math.atan2(0, ts); // Fase de Ts
    const phaseTp = Math.atan2(0, tp); // Fase de Tp

    return phaseTs - phaseTp; // Diferencia de fase (retardancia)
}

// Función para calcular la diatenuación transmitida
function diattenuationTransmission(n1, n2, angle) {
    const T_s = Math.pow(fresnelTransmission(n1, n2, angle, 's'), 2);
    const T_p = Math.pow(fresnelTransmission(n1, n2, angle, 'p'), 2);
    return Math.abs(T_s - T_p) / (T_s + T_p);
}
// Función para calcular la amplitud transmitida (absoluta)
function amplitudeTransmissionAbs(n1, n2, angle, polarization) {
    const angleRad = angle * Math.PI / 180; // Convertir el ángulo a radianes

    // Calcular el ángulo de refracción usando la ley de Snell
    const sinInc = Math.sin(angleRad);
    const sinTrans = (n1 / n2) * sinInc;

    // Verificar si ocurre reflexión total interna
    if (sinTrans > 1) {
        return 0; // No hay transmisión en caso de reflexión total interna
    }

    const cosInc = Math.cos(angleRad);
    const cosTrans = Math.sqrt(1 - sinTrans * sinTrans);

    // Coeficientes de transmisión para polarización S y P
    const ts = 2 * n1 * cosInc / (n1 * cosInc + n2 * cosTrans); // Coeficiente de transmisión S
    const tp = 2 * n1 * cosInc / (n2 * cosInc + n1 * cosTrans); // Coeficiente de transmisión P

    return polarization === 's' ? Math.abs(ts) : Math.abs(tp);
}

// Función para calcular la fase de la amplitud transmitida
function amplitudeTransmissionPhase(n1, n2, angle, polarization) {
    const angleRad = angle * Math.PI / 180; // Convertir el ángulo a radianes

    // Calcular el ángulo de refracción usando la ley de Snell
    const sinInc = Math.sin(angleRad);
    const sinTrans = (n1 / n2) * sinInc;

    // Verificar si ocurre reflexión total interna
    if (sinTrans > 1) {
        return NaN; // Fase indefinida en caso de reflexión total interna
    }

    const cosInc = Math.cos(angleRad);
    const cosTrans = Math.sqrt(1 - sinTrans * sinTrans);

    // Coeficientes de transmisión para polarización S y P (en forma compleja)
    const ts = (2 * n1 * cosInc) / (n1 * cosInc + n2 * cosTrans); // Coeficiente de transmisión S
    const tp = (2 * n1 * cosInc) / (n2 * cosInc + n1 * cosTrans); // Coeficiente de transmisión P

    // Calcular la fase (argumento del coeficiente complejo)
    const phaseS = Math.atan2(0, ts); // Fase de transmisión S
    const phaseP = Math.atan2(0, tp); // Fase de transmisión P

    return polarization === 's' ? phaseS : phaseP;
}

// Función para calcular la fase de amplitud transmitida
function phaseTransmission(n1, n2, angle) {
    const ts = fresnelTransmission(n1, n2, angle, 's');
    const tp = fresnelTransmission(n1, n2, angle, 'p');

    // Calculo de la fase de cada componente
    const phaseTs = Math.atan2(ts.imag, ts.real);  // Fase de Ts
    const phaseTp = Math.atan2(tp.imag, tp.real);  // Fase de Tp

    // Calculo de la diferencia de fase entre las componentes s y p
    return phaseTs - phaseTp;  // La diferencia de fase puede ser negativa
}

// Función para calcular la componente real de la amplitud transmitida
function amplitudeTransmissionReal(n1, n2, angle, polarization) {
    const angleRad = angle * Math.PI / 180;

    const sinInc = Math.sin(angleRad);
    const sinTrans = (n1 / n2) * sinInc;

    if (sinTrans > 1) {
        return NaN; // Reflexión total interna, no hay transmisión
    }

    const cosInc = Math.cos(angleRad);
    const cosTrans = Math.sqrt(1 - sinTrans * sinTrans);

    const ts = (2 * n1 * cosInc) / (n1 * cosInc + n2 * cosTrans); // Coeficiente de transmisión S
    const tp = (2 * n1 * cosInc) / (n2 * cosInc + n1 * cosTrans); // Coeficiente de transmisión P

    return polarization === 's' ? ts : tp; // Retornar el valor real
}

// Calculando la componente imaginaria de la amplitud transmitida
function getAmplitudTransmitidaImaginaria(nInc, nSub, angle) {
    // Fresnel para componente S y P (como ya lo has hecho antes)
    const ts = fresnelTransmission(nInc, nSub, angle, 's');
    const tp = fresnelTransmission(nInc, nSub, angle, 'p');

    // Extraer la parte imaginaria de las amplitudes transmitidas
    const imagTs = ts.imag;  // Parte imaginaria de Ts
    const imagTp = tp.imag;  // Parte imaginaria de Tp

    // La componente imaginaria total es la diferencia
    return imagTs - imagTp;  // Puede ser negativa
}

// Función para generar la gráfica
function generateGraph() {
    const nInc = parseFloat(document.getElementById('nInc').value);
    const nSub = parseFloat(document.getElementById('nSub').value);
    const calculoSeleccionado = document.getElementById('calculo').value;

    if (isNaN(nInc) || isNaN(nSub)) {
        alert('Por favor ingrese valores válidos para los índices de refracción.');
        return;
    }

    const angles = [];
    const results = { s: [], p: [] };

    for (let i = 0; i <= 90; i++) {
        angles.push(i);

        if (calculoSeleccionado === 'reflejada') {
            results.s.push(Math.pow(fresnelReflection(nInc, nSub, i, 's'), 2));
            results.p.push(Math.pow(fresnelReflection(nInc, nSub, i, 'p'), 2));
        } else if (calculoSeleccionado === 'amplitud-abs') {
            const amplitudes = amplitudeReflectionAbs(nInc, nSub, i);
            results.s.push(amplitudes.rsAbs);
            results.p.push(amplitudes.rpAbs);
        } else if (calculoSeleccionado === 'amplitud-real') {
            const amplitudes = amplitudeReflectionReal(nInc, nSub, i);
            results.s.push(amplitudes.rsReal);
            results.p.push(amplitudes.rpReal);
        } else if (calculoSeleccionado === 'amplitud-fase') {
            const phases = amplitudeReflectionPhase(nInc, nSub, i);
            results.s.push(phases.phaseS);
            results.p.push(phases.phaseP);
        } else if (calculoSeleccionado === 'atenuacion') {
            results.s.push(diattenuationReflection(nInc, nSub, i));
        } else if (calculoSeleccionado === 'retardancia') {
            results.s.push(retardanceReflection(nInc, nSub, i));
        } else if (calculoSeleccionado === 'amplitud-imaginaria') {
            const amplitudes = amplitudeReflectionImaginary(nInc, nSub, i);
            results.s.push(amplitudes.rsImag); // Parte imaginaria de S
            results.p.push(amplitudes.rpImag); // Parte imaginaria de P
        } else if (calculoSeleccionado === 'transmitida') {
            results.s.push(Math.pow(fresnelTransmission(nInc, nSub, i, 's'), 2));
            results.p.push(Math.pow(fresnelTransmission(nInc, nSub, i, 'p'), 2));
        } else if (calculoSeleccionado === 'diatenuacion-transmitida') {
            results.s.push(diattenuationTransmission(nInc, nSub, i));
        }else if (calculoSeleccionado === 'retardancia-transmitida') {
            results.s.push(retardanceTransmission(nInc, nSub, i));
        } else if (calculoSeleccionado === 'amplitud-transmitida-abs') {
            results.s.push(amplitudeTransmissionAbs(nInc, nSub, i, 's'));
            results.p.push(amplitudeTransmissionAbs(nInc, nSub, i, 'p'));
        } else if (calculoSeleccionado === 'fase-transmitida') {
            results.s.push(amplitudeTransmissionPhase(nInc, nSub, i, 's'));
            results.p.push(amplitudeTransmissionPhase(nInc, nSub, i, 'p'));
        } else if (calculoSeleccionado === 'amplitud-transmitida-real') {
            results.s.push(amplitudeTransmissionReal(nInc, nSub, i, 's'));
            results.p.push(amplitudeTransmissionReal(nInc, nSub, i, 'p'));
        } else if (calculo === "amplitud-imaginaria" || calculo === "amplitud-transmitida-imaginaria") {
            let imagValue = getAmplitudTransmitidaImaginaria(nInc, nSub, angleRad);
            xValues.push(angle);
            yValues.push(imagValue);
        }
        
        
        
    }

    const traces = [
        {
            x: angles,
            y: results.s,
            type: 'scatter',
            mode: 'lines',
            name: 'S-polarizada',
        },
        {
            x: angles,
            y: results.p,
            type: 'scatter',
            mode: 'lines',
            name: 'P-polarizada',
        },
    ];

    Plotly.newPlot('graph', traces);
}
