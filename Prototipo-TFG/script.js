/* =========================================================
   Prototipo TFG - Concienciación en ciberseguridad
   Archivo: script.js
   Descripción: selección de perfil, escenarios, puntuación y navegación
   ========================================================= */

const profiles = {
    administracion: {
        name: "Administración",
        description: "Perfil orientado a gestión documental, comunicaciones internas, proveedores y uso cotidiano de herramientas corporativas."
    },
    rrhh: {
        name: "Recursos humanos",
        description: "Perfil orientado al tratamiento de datos de empleados, solicitudes internas, documentación sensible y comunicación con candidatos o departamentos."
    },
    comercial: {
        name: "Comercial / atención al cliente",
        description: "Perfil orientado a interacción con clientes, recepción de documentos externos, solicitudes urgentes y uso de canales de comunicación."
    },
    general: {
        name: "Usuario general de oficina",
        description: "Perfil general orientado a situaciones comunes de ciberseguridad en el entorno corporativo."
    }
};

const baseScenarios = [
    {
        title: "Actualización de credenciales por cambio de plataforma",
        risk: "Riesgo trabajado: phishing, robo de credenciales y presión por urgencia.",
        description: "Durante la mañana recibes un correo aparentemente enviado por el área de soporte interno. El mensaje informa de que la empresa está migrando el acceso a varias herramientas corporativas y que algunos usuarios deben confirmar sus credenciales antes de las 18:00 para evitar incidencias al día siguiente.\n\nEl correo está bien redactado, incluye el logotipo de la empresa y menciona una herramienta que realmente se utiliza en la organización. Además, indica que el proceso forma parte de una mejora de seguridad. El enlace incluido muestra el texto “Portal corporativo de verificación”, pero al pasar el cursor por encima se observa una dirección web parecida a la habitual, aunque con una pequeña diferencia en el dominio.",
        options: [
            { letter: "A", text: "Acceder al enlace y completar la verificación, ya que el correo parece corporativo y menciona una herramienta real.", points: 0, type: "unsafe" },
            { letter: "B", text: "Responder al correo solicitando confirmación al remitente antes de introducir las credenciales.", points: 5, type: "partial" },
            { letter: "C", text: "No acceder al enlace, comprobar la información por un canal corporativo conocido y notificar el correo sospechoso según el procedimiento interno.", points: 10, type: "optimal" },
            { letter: "D", text: "Reenviar el correo a varios compañeros para preguntar si ellos también han recibido el aviso.", points: 0, type: "unsafe" }
        ],
        feedback: {
            optimal: "La actuación más segura es no acceder al enlace, verificar la información por un canal corporativo conocido y notificar el correo sospechoso. Aunque el mensaje parece legítimo, contiene señales de riesgo: urgencia, solicitud relacionada con credenciales y una diferencia en el dominio del enlace.",
            partial: "Solicitar confirmación demuestra cierta prudencia, pero responder directamente al correo no es la mejor opción si el remitente puede estar suplantado o comprometido. Es preferible utilizar un canal conocido y fiable.",
            unsafe: "La actuación no es segura. Acceder al enlace o reenviar el correo puede aumentar el riesgo. En ataques de phishing, los mensajes pueden estar bien redactados, usar logotipos reales y hacer referencia a herramientas legítimas."
        }
    },
    {
        title: "Documento compartido por un proveedor habitual",
        risk: "Riesgo trabajado: suplantación de proveedor, enlaces externos y archivos potencialmente maliciosos.",
        description: "Recibes un correo de un proveedor con el que tu departamento trabaja habitualmente. El mensaje indica que se ha actualizado una documentación relacionada con una operación real que está en curso. El asunto, el tono del mensaje y la firma parecen coherentes con comunicaciones anteriores.\n\nEl proveedor explica que el archivo no puede adjuntarse por tamaño y facilita un enlace a una plataforma externa de almacenamiento. Al acceder al enlace, la página solicita iniciar sesión con la cuenta corporativa para descargar el documento. La dirección del remitente es muy similar a la habitual, pero no coincide exactamente con la que aparece en correos anteriores guardados.",
        options: [
            { letter: "A", text: "Iniciar sesión para descargar el documento, ya que el proveedor es conocido y la operación existe realmente.", points: 0, type: "unsafe" },
            { letter: "B", text: "Comprobar la dirección del remitente y contactar con el proveedor mediante un canal ya conocido antes de abrir o descargar el documento.", points: 10, type: "optimal" },
            { letter: "C", text: "Descargar el documento y pasarlo por el antivirus antes de abrirlo.", points: 5, type: "partial" },
            { letter: "D", text: "Pedir al proveedor que lo vuelva a enviar desde esa misma conversación, pero como archivo adjunto.", points: 5, type: "partial" }
        ],
        feedback: {
            optimal: "La opción más segura es comprobar el remitente y contactar con el proveedor mediante un canal conocido previamente. Aunque el contexto parezca real, podría tratarse de una suplantación o de una cuenta comprometida.",
            partial: "La actuación reduce parcialmente el riesgo, pero no lo gestiona por completo. Pasar un archivo por antivirus puede ayudar, pero no evita el robo de credenciales si la página de acceso es falsa. Pedir el documento como adjunto tampoco garantiza la legitimidad si se mantiene la comunicación dentro del mismo hilo sospechoso.",
            unsafe: "La decisión no es segura. Que el proveedor sea habitual o que la operación exista no garantiza que el correo sea legítimo. Antes de introducir credenciales o descargar documentos desde enlaces externos, es necesario verificar el origen."
        }
    },
    {
        title: "Solicitud interna de datos de empleados",
        risk: "Riesgo trabajado: ingeniería social, suplantación interna y protección de información sensible.",
        description: "A última hora de la tarde recibes un correo aparentemente enviado por una persona responsable de otro departamento. En el mensaje se solicita una lista actualizada de empleados de tu área, incluyendo nombre, correo corporativo, teléfono interno y puesto.\n\nLa persona que firma el correo existe realmente en la empresa y el mensaje no contiene enlaces ni archivos adjuntos. Sin embargo, la petición no hace referencia a ningún procedimiento formal, se solicita enviar la información directamente por correo electrónico y se insiste en que debe estar disponible antes de la mañana siguiente.",
        options: [
            { letter: "A", text: "Enviar la información solicitada, ya que procede aparentemente de una persona interna y no contiene enlaces sospechosos.", points: 0, type: "unsafe" },
            { letter: "B", text: "Enviar solo una parte de la información, eliminando los teléfonos internos para reducir el riesgo.", points: 5, type: "partial" },
            { letter: "C", text: "Responder al correo preguntando para qué se necesita exactamente la información y esperar respuesta.", points: 5, type: "partial" },
            { letter: "D", text: "Verificar la solicitud mediante los canales internos establecidos antes de compartir cualquier dato.", points: 10, type: "optimal" }
        ],
        feedback: {
            optimal: "La opción más segura es verificar la solicitud mediante los canales internos establecidos antes de enviar datos. Aunque el mensaje parezca proceder de una persona real, puede tratarse de una suplantación o de una petición no autorizada.",
            partial: "Reducir la cantidad de información o pedir más detalles puede parecer prudente, pero no resuelve el problema principal: la legitimidad de la solicitud no ha sido confirmada.",
            unsafe: "La actuación no es segura. La ingeniería social no siempre incluye enlaces, archivos o errores visibles. Enviar datos internos sin comprobar la legitimidad de la solicitud puede exponer información sensible."
        }
    },
    {
        title: "Uso de herramienta externa para convertir documentos",
        risk: "Riesgo trabajado: uso de servicios no autorizados, exposición de información y credenciales.",
        description: "Necesitas convertir rápidamente un documento de trabajo a otro formato para enviarlo antes de que termine la jornada. Buscas en Internet una herramienta online gratuita que parece profesional, utiliza HTTPS y permite convertir el archivo sin instalar ningún programa.\n\nEl documento no contiene contraseñas ni datos bancarios, pero sí incluye información interna de la empresa, nombres de clientes y detalles de una operación todavía no publicada. La herramienta no pertenece a la organización y no sabes si está aprobada por la empresa.",
        options: [
            { letter: "A", text: "No utilizar la herramienta externa y comprobar si existe una alternativa corporativa aprobada o consultar el procedimiento interno antes de subir el documento.", points: 10, type: "optimal" },
            { letter: "B", text: "Usar la herramienta sin crear cuenta, ya que así no se introducen credenciales corporativas.", points: 5, type: "partial" },
            { letter: "C", text: "Crear una cuenta con el correo corporativo, pero utilizando una contraseña completamente nueva y diferente.", points: 0, type: "unsafe" },
            { letter: "D", text: "Eliminar los datos más sensibles del documento y subirlo después a la herramienta externa.", points: 5, type: "partial" }
        ],
        feedback: {
            optimal: "La opción más segura es no utilizar una herramienta externa no aprobada para tratar documentos internos. Antes de subir documentos corporativos, debe comprobarse si existe una alternativa autorizada.",
            partial: "La actuación reduce parte del riesgo, pero sigue siendo insuficiente. El documento puede seguir conteniendo información interna o metadatos. El problema principal es que la herramienta no está validada.",
            unsafe: "La decisión no es segura. Crear una cuenta con el correo corporativo en una herramienta externa no autorizada puede exponer información de la empresa y generar riesgos adicionales."
        }
    }
];

const profileSpecificScenarios = {
    administracion: baseScenarios,
    general: baseScenarios,
    rrhh: [
        baseScenarios[0],
        {
            title: "Candidato que envía documentación adicional",
            risk: "Riesgo trabajado: archivos adjuntos, suplantación y malware.",
            description: "Recibes un correo de una persona que participa en un proceso de selección activo. El mensaje indica que adjunta documentación adicional solicitada en una entrevista previa. El nombre del candidato coincide con una candidatura real y el tono parece normal.\n\nEl correo incluye un archivo comprimido con varios documentos. El candidato explica que los ha agrupado para facilitar la revisión. Sin embargo, el mensaje procede de una dirección distinta a la usada anteriormente y el archivo tiene una extensión poco habitual.",
            options: [
                { letter: "A", text: "Abrir el archivo porque el candidato existe y la documentación está relacionada con un proceso real.", points: 0, type: "unsafe" },
                { letter: "B", text: "Reenviar el archivo al responsable del proceso para que decida si debe abrirse.", points: 0, type: "unsafe" },
                { letter: "C", text: "Verificar el envío por un canal conocido o mediante la plataforma oficial de selección antes de abrir el archivo.", points: 10, type: "optimal" },
                { letter: "D", text: "Guardar el archivo sin abrirlo y revisarlo más tarde con calma.", points: 5, type: "partial" }
            ],
            feedback: {
                optimal: "La opción más segura es verificar el envío antes de abrir el archivo. En recursos humanos es habitual recibir documentos externos, pero eso no elimina el riesgo de archivos maliciosos o suplantaciones.",
                partial: "Guardar el archivo sin abrirlo evita una acción inmediata peligrosa, pero no resuelve la verificación del origen ni la seguridad del documento.",
                unsafe: "La actuación no es segura. Que el candidato exista o el proceso sea real no garantiza que el archivo sea legítimo. Reenviar el adjunto también puede trasladar el riesgo a otra persona."
            }
        },
        {
            title: "Solicitud urgente de nóminas por parte de dirección",
            risk: "Riesgo trabajado: ingeniería social y protección de datos personales.",
            description: "Recibes un correo aparentemente enviado por una persona de dirección. El mensaje solicita un listado de nóminas y datos de contacto de varios empleados para preparar una reunión urgente. La persona existe en la empresa y el correo no contiene enlaces ni adjuntos.\n\nLa solicitud llega fuera del horario habitual, pide enviar los datos directamente por correo y utiliza un tono de urgencia. No se adjunta ninguna autorización ni se menciona el procedimiento interno habitual para este tipo de información.",
            options: [
                { letter: "A", text: "Enviar los datos solicitados porque la petición procede aparentemente de dirección.", points: 0, type: "unsafe" },
                { letter: "B", text: "Enviar únicamente los datos de contacto, evitando incluir importes de nómina.", points: 5, type: "partial" },
                { letter: "C", text: "Responder solicitando confirmación dentro del mismo hilo de correo.", points: 5, type: "partial" },
                { letter: "D", text: "Verificar la petición mediante los canales internos establecidos antes de compartir cualquier información.", points: 10, type: "optimal" }
            ],
            feedback: {
                optimal: "La información laboral y de nóminas es especialmente sensible. Debe compartirse solo si existe una solicitud legítima, una finalidad clara y un canal adecuado.",
                partial: "Reducir los datos enviados o pedir confirmación puede parecer prudente, pero la legitimidad de la solicitud no queda verificada si se sigue usando el mismo hilo sospechoso.",
                unsafe: "La actuación no es segura. Las solicitudes urgentes de información sensible son una técnica frecuente de ingeniería social."
            }
        },
        baseScenarios[3]
    ],
    comercial: [
        {
            title: "Cliente envía enlace a documentación contractual",
            risk: "Riesgo trabajado: enlaces externos, credenciales y suplantación.",
            description: "Un cliente con el que has hablado recientemente te envía un correo indicando que ha subido documentación contractual a una plataforma externa. El asunto coincide con una operación real y el mensaje mantiene un tono profesional.\n\nAl abrir el enlace, la página solicita iniciar sesión con la cuenta corporativa para visualizar los documentos. El dominio de la plataforma es parecido al nombre del cliente, pero no lo habías usado anteriormente.",
            options: [
                { letter: "A", text: "Iniciar sesión porque la operación existe y el cliente había avisado de que enviaría documentación.", points: 0, type: "unsafe" },
                { letter: "B", text: "Contactar con el cliente mediante un canal ya conocido antes de introducir credenciales o descargar documentos.", points: 10, type: "optimal" },
                { letter: "C", text: "Descargar la documentación y revisarla sin introducir datos adicionales.", points: 5, type: "partial" },
                { letter: "D", text: "Reenviar el enlace a un compañero para que intente abrirlo desde su equipo.", points: 0, type: "unsafe" }
            ],
            feedback: {
                optimal: "La opción más segura es verificar por un canal conocido. Que la operación sea real no garantiza que el enlace sea legítimo.",
                partial: "Descargar documentos sin verificar el origen sigue siendo arriesgado, aunque no se introduzcan nuevas credenciales.",
                unsafe: "La actuación no es segura. Introducir credenciales o reenviar enlaces sospechosos puede ampliar el impacto de un ataque."
            }
        },
        {
            title: "Solicitud urgente de cambio de cuenta bancaria",
            risk: "Riesgo trabajado: fraude, suplantación e ingeniería social.",
            description: "Recibes un correo de una persona que aparentemente trabaja en una empresa cliente. Solicita modificar con urgencia la cuenta bancaria asociada a una operación pendiente. El mensaje incluye datos reales de la operación y utiliza una firma corporativa similar a la habitual.\n\nLa dirección del remitente tiene una pequeña diferencia respecto a comunicaciones anteriores. Además, se insiste en que el cambio debe realizarse ese mismo día para evitar retrasos.",
            options: [
                { letter: "A", text: "Actualizar la información bancaria porque el mensaje incluye datos reales de la operación.", points: 0, type: "unsafe" },
                { letter: "B", text: "Responder pidiendo confirmación documental dentro del mismo hilo.", points: 5, type: "partial" },
                { letter: "C", text: "Verificar la solicitud mediante el procedimiento interno y un canal conocido del cliente antes de modificar cualquier dato.", points: 10, type: "optimal" },
                { letter: "D", text: "Reenviar la petición a administración para que ellos gestionen el cambio directamente.", points: 5, type: "partial" }
            ],
            feedback: {
                optimal: "La opción más segura es verificar mediante procedimiento interno y canal conocido. Las solicitudes urgentes de cambios bancarios pueden formar parte de fraudes muy creíbles.",
                partial: "Pedir confirmación o reenviar la solicitud puede parecer útil, pero no verifica suficientemente el origen si se mantiene el mismo canal sospechoso.",
                unsafe: "Actualizar datos sensibles sin verificación puede provocar un fraude económico o una exposición de información."
            }
        },
        {
            title: "Mensaje de chat de un supuesto cliente importante",
            risk: "Riesgo trabajado: ingeniería social y canales no oficiales.",
            description: "Recibes un mensaje por una aplicación de mensajería no corporativa. La persona afirma representar a un cliente importante y dice que necesita información comercial preliminar antes de cerrar una operación. Utiliza nombres reales de personas de tu empresa y menciona una reunión reciente.\n\nEl mensaje solicita que envíes una propuesta interna y varios datos de contacto para agilizar el proceso. La persona insiste en que no puede acceder al correo en ese momento.",
            options: [
                { letter: "A", text: "Enviar la información porque el cliente parece conocer detalles internos.", points: 0, type: "unsafe" },
                { letter: "B", text: "Pedirle que contacte por los canales oficiales o verificar internamente la identidad antes de compartir información.", points: 10, type: "optimal" },
                { letter: "C", text: "Enviar solo información general que no parezca sensible.", points: 5, type: "partial" },
                { letter: "D", text: "Responder preguntando cómo ha conseguido tu contacto.", points: 5, type: "partial" }
            ],
            feedback: {
                optimal: "La actuación adecuada es reconducir la comunicación a canales oficiales o verificar la identidad. Los atacantes pueden usar información real para generar confianza.",
                partial: "Enviar información aparentemente general o hacer preguntas puede no ser suficiente. La identidad y el canal siguen sin estar verificados.",
                unsafe: "Compartir información por canales no oficiales puede exponer datos internos y facilitar nuevos ataques de ingeniería social."
            }
        },
        baseScenarios[3]
    ]
};

let selectedProfileKey = "";
let activeScenarios = [];
let currentScenarioIndex = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const scenarioScreen = document.getElementById("scenario-screen");
const feedbackScreen = document.getElementById("feedback-screen");
const finalScreen = document.getElementById("final-screen");

const profileSelect = document.getElementById("profile-select");
const profileDescription = document.getElementById("profile-description");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

const scenarioCounter = document.getElementById("scenario-counter");
const scoreDisplay = document.getElementById("score-display");
const progressFill = document.getElementById("progress-fill");
const selectedProfileLabel = document.getElementById("selected-profile-label");
const riskLabel = document.getElementById("risk-label");
const scenarioTitle = document.getElementById("scenario-title");
const scenarioDescription = document.getElementById("scenario-description");
const optionsContainer = document.getElementById("options-container");

const feedbackResult = document.getElementById("feedback-result");
const feedbackText = document.getElementById("feedback-text");
const pointsEarned = document.getElementById("points-earned");
const updatedScore = document.getElementById("updated-score");

const finalScore = document.getElementById("final-score");
const finalProfileSummary = document.getElementById("final-profile-summary");
const finalMessage = document.getElementById("final-message");

function showScreen(screenToShow) {
    [startScreen, scenarioScreen, feedbackScreen, finalScreen].forEach((screen) => {
        screen.classList.remove("active");
    });
    screenToShow.classList.add("active");
}

function updateProfileSelection() {
    selectedProfileKey = profileSelect.value;

    if (!selectedProfileKey) {
        profileDescription.textContent = "La selección de perfil no almacena datos personales. Solo sirve para adaptar los escenarios del prototipo.";
        startButton.disabled = true;
        return;
    }

    profileDescription.textContent = profiles[selectedProfileKey].description;
    startButton.disabled = false;
}

function startActivity() {
    if (!selectedProfileKey) {
        return;
    }

    activeScenarios = profileSpecificScenarios[selectedProfileKey];
    currentScenarioIndex = 0;
    score = 0;
    nextButton.textContent = "Siguiente escenario";
    renderScenario();
    showScreen(scenarioScreen);
}

function renderScenario() {
    const scenario = activeScenarios[currentScenarioIndex];
    const progressPercentage = (currentScenarioIndex / activeScenarios.length) * 100;

    scenarioCounter.textContent = `Escenario ${currentScenarioIndex + 1} de ${activeScenarios.length}`;
    scoreDisplay.textContent = `Puntuación: ${score}`;
    progressFill.style.width = `${progressPercentage}%`;

    selectedProfileLabel.textContent = `Perfil: ${profiles[selectedProfileKey].name}`;
    riskLabel.textContent = scenario.risk;
    scenarioTitle.textContent = scenario.title;
    scenarioDescription.textContent = scenario.description;
    optionsContainer.innerHTML = "";

    scenario.options.forEach((option) => {
        const button = document.createElement("button");
        button.className = "option-button";
        button.type = "button";
        button.innerHTML = `<span class="option-letter">${option.letter}</span>${option.text}`;
        button.addEventListener("click", () => handleAnswer(option));
        optionsContainer.appendChild(button);
    });
}

function handleAnswer(selectedOption) {
    const scenario = activeScenarios[currentScenarioIndex];
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

    nextButton.textContent = currentScenarioIndex === activeScenarios.length - 1 ? "Ver resultado final" : "Siguiente escenario";
    progressFill.style.width = `${((currentScenarioIndex + 1) / activeScenarios.length) * 100}%`;

    showScreen(feedbackScreen);
}

function goToNextScenario() {
    currentScenarioIndex += 1;
    if (currentScenarioIndex < activeScenarios.length) {
        renderScenario();
        showScreen(scenarioScreen);
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    const maxScore = activeScenarios.length * 10;
    const percentage = Math.round((score / maxScore) * 100);

    finalScore.textContent = `${score} / ${maxScore}`;
    finalProfileSummary.textContent = `Perfil seleccionado: ${profiles[selectedProfileKey].name}.`;

    if (percentage >= 80) {
        finalMessage.textContent = "Resultado alto. Has identificado correctamente la mayoría de las situaciones de riesgo y has aplicado decisiones seguras de forma consistente.";
    } else if (percentage >= 50) {
        finalMessage.textContent = "Resultado intermedio. Has tomado algunas decisiones adecuadas, aunque todavía existen aspectos que conviene reforzar para mejorar la respuesta ante situaciones de riesgo.";
    } else {
        finalMessage.textContent = "Resultado inicial. El recorrido muestra que sería conveniente reforzar la formación mediante nuevos escenarios, explicaciones y prácticas guiadas.";
    }

    showScreen(finalScreen);
}

function restartActivity() {
    currentScenarioIndex = 0;
    score = 0;
    activeScenarios = [];
    selectedProfileKey = "";
    profileSelect.value = "";
    updateProfileSelection();
    nextButton.textContent = "Siguiente escenario";
    showScreen(startScreen);
}

profileSelect.addEventListener("change", updateProfileSelection);
startButton.addEventListener("click", startActivity);
nextButton.addEventListener("click", goToNextScenario);
restartButton.addEventListener("click", restartActivity);
