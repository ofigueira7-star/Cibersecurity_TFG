/* =========================================================
   Prototipo TFG - Concienciación en ciberseguridad
   Archivo: script.js
   Descripción: lógica de escenarios, puntuación y navegación
   ========================================================= */

/*
   Este prototipo representa de forma simplificada una metodología
   de entrenamiento basada en escenarios. No almacena datos personales
   ni utiliza backend o base de datos.
*/

const scenarios = [
    {
        title: "Actualización de credenciales por cambio de plataforma",
        risk: "Riesgo trabajado: phishing, robo de credenciales y presión por urgencia.",
        description:
            "Durante la mañana recibes un correo aparentemente enviado por el área de soporte interno. El mensaje informa de que la empresa está migrando el acceso a varias herramientas corporativas y que algunos usuarios deben confirmar sus credenciales antes de las 18:00 para evitar incidencias al día siguiente.\n\n" +
            "El correo está bien redactado, incluye el logotipo de la empresa y menciona una herramienta que realmente se utiliza en la organización. Además, indica que el proceso forma parte de una mejora de seguridad. El enlace incluido muestra el texto “Portal corporativo de verificación”, pero al pasar el cursor por encima se observa una dirección web parecida a la habitual, aunque con una pequeña diferencia en el dominio.",
        options: [
            {
                letter: "A",
                text: "Acceder al enlace y completar la verificación, ya que el correo parece corporativo y menciona una herramienta real.",
                points: 0,
                type: "unsafe"
            },
            {
                letter: "B",
                text: "Responder al correo solicitando confirmación al remitente antes de introducir las credenciales.",
                points: 5,
                type: "partial"
            },
            {
                letter: "C",
                text: "No acceder al enlace, comprobar la información por un canal corporativo conocido y notificar el correo sospechoso según el procedimiento interno.",
                points: 10,
                type: "optimal"
            },
            {
                letter: "D",
                text: "Reenviar el correo a varios compañeros para preguntar si ellos también han recibido el aviso.",
                points: 0,
                type: "unsafe"
            }
        ],
        feedback: {
            optimal:
                "La actuación más segura es no acceder al enlace, verificar la información por un canal corporativo conocido y notificar el correo sospechoso. Aunque el mensaje parece legítimo, contiene señales de riesgo: urgencia, solicitud relacionada con credenciales y una diferencia en el dominio del enlace. Verificar por una vía independiente reduce el riesgo de introducir datos en una página fraudulenta.",
            partial:
                "Solicitar confirmación demuestra cierta prudencia, pero responder directamente al correo no es la mejor opción si el remitente puede estar suplantado o comprometido. Es preferible utilizar un canal conocido y fiable, como el portal interno, el teléfono corporativo o el procedimiento establecido por la empresa.",
            unsafe:
                "La actuación no es segura. Acceder al enlace o reenviar el correo puede aumentar el riesgo. En ataques de phishing, los mensajes pueden estar bien redactados, usar logotipos reales y hacer referencia a herramientas legítimas. La clave es no interactuar con el enlace y verificar la solicitud por un canal oficial."
        }
    },
    {
        title: "Documento compartido por un proveedor habitual",
        risk: "Riesgo trabajado: suplantación de proveedor, enlaces externos y archivos potencialmente maliciosos.",
        description:
            "Recibes un correo de un proveedor con el que tu departamento trabaja habitualmente. El mensaje indica que se ha actualizado una documentación relacionada con una operación real que está en curso. El asunto, el tono del mensaje y la firma parecen coherentes con comunicaciones anteriores.\n\n" +
            "El proveedor explica que el archivo no puede adjuntarse por tamaño y facilita un enlace a una plataforma externa de almacenamiento. Al acceder al enlace, la página solicita iniciar sesión con la cuenta corporativa para descargar el documento. La dirección del remitente es muy similar a la habitual, pero no coincide exactamente con la que aparece en correos anteriores guardados.",
        options: [
            {
                letter: "A",
                text: "Iniciar sesión para descargar el documento, ya que el proveedor es conocido y la operación existe realmente.",
                points: 0,
                type: "unsafe"
            },
            {
                letter: "B",
                text: "Comprobar la dirección del remitente y contactar con el proveedor mediante un canal ya conocido antes de abrir o descargar el documento.",
                points: 10,
                type: "optimal"
            },
            {
                letter: "C",
                text: "Descargar el documento y pasarlo por el antivirus antes de abrirlo.",
                points: 5,
                type: "partial"
            },
            {
                letter: "D",
                text: "Pedir al proveedor que lo vuelva a enviar desde esa misma conversación, pero como archivo adjunto.",
                points: 5,
                type: "partial"
            }
        ],
        feedback: {
            optimal:
                "La opción más segura es comprobar el remitente y contactar con el proveedor mediante un canal conocido previamente. Aunque el contexto parezca real, podría tratarse de una suplantación o de una cuenta comprometida. La solicitud de inicio de sesión con credenciales corporativas en una plataforma externa es una señal de riesgo que debe verificarse antes de continuar.",
            partial:
                "La actuación reduce parcialmente el riesgo, pero no lo gestiona por completo. Pasar un archivo por antivirus puede ayudar, pero no evita el robo de credenciales si la página de acceso es falsa. Pedir el documento como adjunto tampoco garantiza la legitimidad si se mantiene la comunicación dentro del mismo hilo sospechoso. La verificación debe realizarse por un canal independiente y conocido.",
            unsafe:
                "La decisión no es segura. Que el proveedor sea habitual o que la operación exista no garantiza que el correo sea legítimo. Los atacantes pueden aprovechar información real para hacer más creíble el engaño. Antes de introducir credenciales o descargar documentos desde enlaces externos, es necesario verificar el origen por un canal fiable."
        }
    },
    {
        title: "Solicitud interna de datos de empleados",
        risk: "Riesgo trabajado: ingeniería social, suplantación interna y protección de información sensible.",
        description:
            "A última hora de la tarde recibes un correo aparentemente enviado por una persona responsable de otro departamento. En el mensaje se solicita una lista actualizada de empleados de tu área, incluyendo nombre, correo corporativo, teléfono interno y puesto. La solicitud se justifica indicando que la información se necesita para preparar una revisión organizativa que comenzará la semana siguiente.\n\n" +
            "La persona que firma el correo existe realmente en la empresa y el mensaje no contiene enlaces ni archivos adjuntos. Sin embargo, la petición no hace referencia a ningún procedimiento formal, se solicita enviar la información directamente por correo electrónico y se insiste en que debe estar disponible antes de la mañana siguiente.",
        options: [
            {
                letter: "A",
                text: "Enviar la información solicitada, ya que procede aparentemente de una persona interna y no contiene enlaces sospechosos.",
                points: 0,
                type: "unsafe"
            },
            {
                letter: "B",
                text: "Enviar solo una parte de la información, eliminando los teléfonos internos para reducir el riesgo.",
                points: 5,
                type: "partial"
            },
            {
                letter: "C",
                text: "Responder al correo preguntando para qué se necesita exactamente la información y esperar respuesta.",
                points: 5,
                type: "partial"
            },
            {
                letter: "D",
                text: "Verificar la solicitud mediante los canales internos establecidos antes de compartir cualquier dato.",
                points: 10,
                type: "optimal"
            }
        ],
        feedback: {
            optimal:
                "La opción más segura es verificar la solicitud mediante los canales internos establecidos antes de enviar datos. Aunque el mensaje parezca proceder de una persona real y no incluya enlaces sospechosos, puede tratarse de una suplantación o de una petición no autorizada. La información sobre empleados debe compartirse únicamente cuando exista una finalidad clara, un procedimiento adecuado y un canal seguro.",
            partial:
                "Reducir la cantidad de información o pedir más detalles puede parecer prudente, pero no resuelve el problema principal: la legitimidad de la solicitud no ha sido confirmada. Además, responder dentro del mismo hilo puede no ser seguro si el remitente está suplantado o si la cuenta ha sido comprometida. Antes de compartir información interna, debe verificarse la petición por un canal fiable.",
            unsafe:
                "La actuación no es segura. La ingeniería social no siempre incluye enlaces, archivos o errores visibles. A veces se basa en peticiones aparentemente normales, urgentes y procedentes de personas conocidas. Enviar datos internos sin comprobar la legitimidad de la solicitud puede exponer información sensible de la organización."
        }
    },
    {
        title: "Uso de herramienta externa para convertir documentos",
        risk: "Riesgo trabajado: uso de servicios no autorizados, exposición de información y credenciales.",
        description:
            "Necesitas convertir rápidamente un documento de trabajo a otro formato para enviarlo antes de que termine la jornada. Buscas en Internet una herramienta online gratuita que parece profesional, utiliza HTTPS y permite convertir el archivo sin instalar ningún programa. La página también ofrece crear una cuenta para guardar el historial de documentos procesados.\n\n" +
            "El documento no contiene contraseñas ni datos bancarios, pero sí incluye información interna de la empresa, nombres de clientes y detalles de una operación todavía no publicada. La herramienta no pertenece a la organización y no sabes si está aprobada por la empresa. En ese momento no encuentras una alternativa corporativa clara y tienes poco tiempo para completar la tarea.",
        options: [
            {
                letter: "A",
                text: "No utilizar la herramienta externa y comprobar si existe una alternativa corporativa aprobada o consultar el procedimiento interno antes de subir el documento.",
                points: 10,
                type: "optimal"
            },
            {
                letter: "B",
                text: "Usar la herramienta sin crear cuenta, ya que así no se introducen credenciales corporativas.",
                points: 5,
                type: "partial"
            },
            {
                letter: "C",
                text: "Crear una cuenta con el correo corporativo, pero utilizando una contraseña completamente nueva y diferente.",
                points: 0,
                type: "unsafe"
            },
            {
                letter: "D",
                text: "Eliminar los datos más sensibles del documento y subirlo después a la herramienta externa.",
                points: 5,
                type: "partial"
            }
        ],
        feedback: {
            optimal:
                "La opción más segura es no utilizar una herramienta externa no aprobada para tratar documentos internos. Aunque la página use HTTPS y parezca profesional, eso no garantiza que sea adecuada para procesar información de la empresa. Antes de subir documentos corporativos, debe comprobarse si existe una alternativa autorizada o un procedimiento interno para este tipo de tareas.",
            partial:
                "La actuación reduce parte del riesgo, pero sigue siendo insuficiente. No crear una cuenta evita introducir credenciales, y eliminar datos sensibles puede disminuir la exposición, pero el documento puede seguir conteniendo información interna o metadatos. El problema principal es que la herramienta no está validada por la organización.",
            unsafe:
                "La decisión no es segura. Crear una cuenta con el correo corporativo en una herramienta externa no autorizada puede exponer información de la empresa y generar riesgos adicionales. Aunque la contraseña sea diferente, el uso de servicios no aprobados para tratar documentos internos debe evitarse si no existe autorización previa."
        }
    }
];

let currentScenarioIndex = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const scenarioScreen = document.getElementById("scenario-screen");
const feedbackScreen = document.getElementById("feedback-screen");
const finalScreen = document.getElementById("final-screen");

const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

const scenarioCounter = document.getElementById("scenario-counter");
const scoreDisplay = document.getElementById("score-display");
const progressFill = document.getElementById("progress-fill");
const riskLabel = document.getElementById("risk-label");
const scenarioTitle = document.getElementById("scenario-title");
const scenarioDescription = document.getElementById("scenario-description");
const optionsContainer = document.getElementById("options-container");

const feedbackResult = document.getElementById("feedback-result");
const feedbackText = document.getElementById("feedback-text");
const pointsEarned = document.getElementById("points-earned");
const updatedScore = document.getElementById("updated-score");

const finalScore = document.getElementById("final-score");
const finalMessage = document.getElementById("final-message");

function showScreen(screenToShow) {
    const screens = [startScreen, scenarioScreen, feedbackScreen, finalScreen];

    screens.forEach((screen) => {
        screen.classList.remove("active");
    });

    screenToShow.classList.add("active");
}

function startActivity() {
    currentScenarioIndex = 0;
    score = 0;
    renderScenario();
    showScreen(scenarioScreen);
}

function renderScenario() {
    const scenario = scenarios[currentScenarioIndex];
    const progressPercentage = (currentScenarioIndex / scenarios.length) * 100;

    scenarioCounter.textContent = `Escenario ${currentScenarioIndex + 1} de ${scenarios.length}`;
    scoreDisplay.textContent = `Puntuación: ${score}`;
    progressFill.style.width = `${progressPercentage}%`;

    riskLabel.textContent = scenario.risk;
    scenarioTitle.textContent = scenario.title;
    scenarioDescription.textContent = scenario.description;

    optionsContainer.innerHTML = "";

    scenario.options.forEach((option) => {
        const button = document.createElement("button");
        button.className = "option-button";
        button.type = "button";
        button.innerHTML = `<span class="option-letter">${option.letter}</span>${option.text}`;

        button.addEventListener("click", () => {
            handleAnswer(option);
        });

        optionsContainer.appendChild(button);
    });
}

function handleAnswer(selectedOption) {
    const scenario = scenarios[currentScenarioIndex];
    score += selectedOption.points;

    const resultLabels = {
        optimal: "Respuesta óptima",
        partial: "Respuesta parcialmente correcta",
        unsafe: "Respuesta insegura o insuficiente"
    };

    feedbackResult.className = `feedback-result ${selectedOption.type}`;
    feedbackResult.textContent = resultLabels[selectedOption.type];
    feedbackText.textContent = scenario.feedback[selectedOption.type];

    pointsEarned.textContent = `Puntos obtenidos: ${selectedOption.points}`;
    updatedScore.textContent = `Puntuación acumulada: ${score}`;

    if (currentScenarioIndex === scenarios.length - 1) {
        nextButton.textContent = "Ver resultado final";
    } else {
        nextButton.textContent = "Siguiente escenario";
    }

    const completedPercentage = ((currentScenarioIndex + 1) / scenarios.length) * 100;
    progressFill.style.width = `${completedPercentage}%`;

    showScreen(feedbackScreen);
}

function goToNextScenario() {
    currentScenarioIndex += 1;

    if (currentScenarioIndex < scenarios.length) {
        renderScenario();
        showScreen(scenarioScreen);
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    const maxScore = scenarios.length * 10;
    const percentage = Math.round((score / maxScore) * 100);

    finalScore.textContent = `${score} / ${maxScore}`;

    if (percentage >= 80) {
        finalMessage.textContent =
            "Resultado alto. Has identificado correctamente la mayoría de las situaciones de riesgo y has aplicado decisiones seguras de forma consistente.";
    } else if (percentage >= 50) {
        finalMessage.textContent =
            "Resultado intermedio. Has tomado algunas decisiones adecuadas, aunque todavía existen aspectos que conviene reforzar para mejorar la respuesta ante situaciones de riesgo.";
    } else {
        finalMessage.textContent =
            "Resultado inicial. El recorrido muestra que sería conveniente reforzar la formación mediante nuevos escenarios, explicaciones y prácticas guiadas.";
    }

    showScreen(finalScreen);
}

function restartActivity() {
    currentScenarioIndex = 0;
    score = 0;
    nextButton.textContent = "Siguiente escenario";
    showScreen(startScreen);
}

startButton.addEventListener("click", startActivity);
nextButton.addEventListener("click", goToNextScenario);
restartButton.addEventListener("click", restartActivity);
