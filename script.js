/* =========================================================
   PATIENTCARE AI DASHBOARD
   Dynamic Patient + Doctor Management
========================================================= */


/* ================= DATA ================= */

let patients = JSON.parse(
    localStorage.getItem("patientCarePatients")
) || [
    {
        id: "P001",
        name: "John Doe",
        age: 42,
        condition: "Paralysis",
        glove: "Connected",
        heartRate: 72,
        spo2: 97,
        temperature: 36.5,
        bloodPressure: "118/76"
    }
];


let doctors = JSON.parse(
    localStorage.getItem("patientCareDoctors")
) || [
    {
        id: "D001",
        name: "Dr. Sarah Wilson",
        specialty: "Neurologist",
        email: "sarah.wilson@patientcare.com",
        department: "Neurology"
    }
];


let selectedPatientId =
    localStorage.getItem("selectedPatientId") ||
    patients[0]?.id ||
    null;


let selectedDoctorId =
    localStorage.getItem("selectedDoctorId") ||
    doctors[0]?.id ||
    null;


let patientData = null;


/* ================= INITIALIZATION ================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeDashboard();

    setupNavigation();

    setupForms();

    setupDoctorProfile();

    renderPatients();

    renderDoctors();

    loadSelectedPatient();

    updateDoctorHeader();

});


function initializeDashboard() {

    if (!selectedPatientId && patients.length > 0) {
        selectedPatientId = patients[0].id;
    }

    if (!selectedDoctorId && doctors.length > 0) {
        selectedDoctorId = doctors[0].id;
    }

    saveData();

}


/* ================= LOCAL STORAGE ================= */

function saveData() {

    localStorage.setItem(
        "patientCarePatients",
        JSON.stringify(patients)
    );

    localStorage.setItem(
        "patientCareDoctors",
        JSON.stringify(doctors)
    );

    if (selectedPatientId) {
        localStorage.setItem(
            "selectedPatientId",
            selectedPatientId
        );
    }

    if (selectedDoctorId) {
        localStorage.setItem(
            "selectedDoctorId",
            selectedDoctorId
        );
    }

}


/* ================= NAVIGATION ================= */

function setupNavigation() {

    const navItems =
        document.querySelectorAll(".nav-item");

    const pageSections =
        document.querySelectorAll(".page-section");


    navItems.forEach(function (item) {

        item.addEventListener("click", function (event) {

            event.preventDefault();

            navItems.forEach(function (nav) {
                nav.classList.remove("active");
            });

            item.classList.add("active");


            pageSections.forEach(function (section) {
                section.classList.remove(
                    "active-section"
                );
            });


            const sectionId =
                item.getAttribute("data-section");


            const selectedSection =
                document.getElementById(sectionId);


            if (selectedSection) {

                selectedSection.classList.add(
                    "active-section"
                );

            }


            updatePageHeader(sectionId);

            closeDoctorProfile();

        });

    });

}


function updatePageHeader(sectionId) {

    const titles = {

        dashboardSection: [
            "Dashboard",
            "AI-powered patient monitoring"
        ],

        patientsSection: [
            "Patients",
            "Manage registered patients"
        ],

        doctorsSection: [
            "Doctors",
            "Manage doctors and medical staff"
        ],

        healthSection: [
            "Health Monitor",
            "Real-time patient health monitoring"
        ],

        alertsSection: [
            "Alerts",
            "Emergency and health alerts"
        ],

        reportsSection: [
            "Reports",
            "Patient health reports"
        ],

        settingsSection: [
            "Settings",
            "Dashboard configuration"
        ]

    };


    const data = titles[sectionId];

    if (!data) return;


    document.getElementById("pageTitle")
        .textContent = data[0];

    document.getElementById("pageSubtitle")
        .textContent = data[1];

}


/* ================= PATIENT MANAGEMENT ================= */

function renderPatients() {

    const container =
        document.getElementById("patientsList");

    container.innerHTML = "";


    if (patients.length === 0) {

        container.innerHTML = `
            <div class="empty-alert">
                No patients registered.
                Click <strong>+ Add Patient</strong> to add one.
            </div>
        `;

        return;
    }


    patients.forEach(function (patient, index) {

        const card = document.createElement("div");

        card.className = "person-card";


        card.innerHTML = `

            <div class="person-header">

                <div class="person-avatar">
                    👤
                </div>

                <div>
                    <h3>${escapeHTML(patient.name)}</h3>

                    <span class="id">
                        ${escapeHTML(patient.id)}
                    </span>
                </div>

            </div>


            <div class="person-details">

                <p>
                    Age:
                    <strong>${patient.age}</strong>
                </p>

                <p>
                    Condition:
                    <strong>
                        ${escapeHTML(patient.condition)}
                    </strong>
                </p>

                <p>
                    Glove:
                    <strong>
                        ${escapeHTML(patient.glove)}
                    </strong>
                </p>

                <p>
                    Heart Rate:
                    <strong>
                        ${patient.heartRate} BPM
                    </strong>
                </p>

            </div>


            <div class="person-actions">

                <button
                    class="view"
                    onclick="selectPatient('${patient.id}')"
                >
                    View
                </button>

                <button
                    onclick="editPatient(${index})"
                >
                    Edit
                </button>

                <button
                    class="delete"
                    onclick="deletePatient(${index})"
                >
                    Delete
                </button>

            </div>
        `;


        container.appendChild(card);

    });

}


function openPatientModal(index = null) {

    const modal =
        document.getElementById("patientModal");

    const title =
        document.getElementById("patientModalTitle");


    if (index === null) {

        title.textContent = "Add Patient";

        document.getElementById("editPatientIndex").value = "";

        document.getElementById("patientNameInput").value = "";

        document.getElementById("patientIdInput").value =
            generatePatientId();

        document.getElementById("patientAgeInput").value = "";

        document.getElementById("patientConditionInput").value =
            "Paralysis";

        document.getElementById("patientGloveInput").value =
            "Connected";

    } else {

        const patient = patients[index];

        title.textContent = "Edit Patient";

        document.getElementById("editPatientIndex").value =
            index;

        document.getElementById("patientNameInput").value =
            patient.name;

        document.getElementById("patientIdInput").value =
            patient.id;

        document.getElementById("patientAgeInput").value =
            patient.age;

        document.getElementById("patientConditionInput").value =
            patient.condition;

        document.getElementById("patientGloveInput").value =
            patient.glove;

    }


    modal.classList.add("show");

}


function closePatientModal() {

    document
        .getElementById("patientModal")
        .classList.remove("show");

}


function editPatient(index) {

    openPatientModal(index);

}


function deletePatient(index) {

    const patient = patients[index];


    if (!confirm(
        `Delete patient "${patient.name}"?`
    )) {
        return;
    }


    const deletedId = patient.id;


    patients.splice(index, 1);


    if (selectedPatientId === deletedId) {

        if (patients.length > 0) {

            selectedPatientId = patients[0].id;

        } else {

            selectedPatientId = null;

        }

    }


    saveData();

    renderPatients();

    loadSelectedPatient();

}


function selectPatient(patientId) {

    selectedPatientId = patientId;

    saveData();

    loadSelectedPatient();

    renderPatients();


    showSection("dashboardSection");

}


function loadSelectedPatient() {

    const patient =
        patients.find(function (item) {

            return item.id === selectedPatientId;

        });


    if (!patient) {

        patientData = null;

        return;

    }


    patientData = patient;


    updateDashboardPatient();

    updateDashboard();

    updateReport();

}


function updateDashboardPatient() {

    if (!patientData) return;


    document.getElementById(
        "dashboardPatientName"
    ).textContent = patientData.name;


    document.getElementById(
        "dashboardPatientId"
    ).textContent = patientData.id;


    document.getElementById(
        "dashboardPatientAge"
    ).textContent = patientData.age;


    document.getElementById(
        "dashboardPatientCondition"
    ).textContent = patientData.condition;


    document.getElementById(
        "monitorPatientName"
    ).textContent = patientData.name;


    document.getElementById(
        "reportPatientName"
    ).textContent = patientData.name;

}


/* ================= PATIENT FORM ================= */

function setupForms() {

    document
        .getElementById("patientForm")
        .addEventListener(
            "submit",
            savePatient
        );


    document
        .getElementById("doctorForm")
        .addEventListener(
            "submit",
            saveDoctor
        );

}


function savePatient(event) {

    event.preventDefault();


    const editIndex =
        document.getElementById(
            "editPatientIndex"
        ).value;


    let id =
        document.getElementById(
            "patientIdInput"
        ).value.trim();


    const name =
        document.getElementById(
            "patientNameInput"
        ).value.trim();


    const age =
        Number(
            document.getElementById(
                "patientAgeInput"
            ).value
        );


    const condition =
        document.getElementById(
            "patientConditionInput"
        ).value.trim();


    const glove =
        document.getElementById(
            "patientGloveInput"
        ).value;


    if (!id) {

        id = generatePatientId();

    }


    if (!name || !age || !condition) {

        alert("Please fill all required fields.");

        return;

    }


    const patient = {

        id: id,

        name: name,

        age: age,

        condition: condition,

        glove: glove,

        heartRate: 72,

        spo2: 97,

        temperature: 36.5,

        bloodPressure: "118/76"

    };


    if (editIndex === "") {

        patients.push(patient);

        selectedPatientId = id;

    } else {

        const oldPatient =
            patients[Number(editIndex)];


        patient.heartRate =
            oldPatient.heartRate;

        patient.spo2 =
            oldPatient.spo2;

        patient.temperature =
            oldPatient.temperature;

        patient.bloodPressure =
            oldPatient.bloodPressure;


        patients[Number(editIndex)] =
            patient;


        if (
            selectedPatientId === oldPatient.id
        ) {

            selectedPatientId = id;

        }

    }


    saveData();

    renderPatients();

    loadSelectedPatient();

    closePatientModal();

}


function generatePatientId() {

    let number = patients.length + 1;

    let id = "P" + String(number).padStart(3, "0");


    while (
        patients.some(function (patient) {
            return patient.id === id;
        })
    ) {

        number++;

        id = "P" +
            String(number).padStart(3, "0");

    }


    return id;

}


/* ================= DOCTOR MANAGEMENT ================= */

function renderDoctors() {

    const container =
        document.getElementById("doctorsList");

    container.innerHTML = "";


    if (doctors.length === 0) {

        container.innerHTML = `
            <div class="empty-alert">
                No doctors registered.
                Click <strong>+ Add Doctor</strong> to add one.
            </div>
        `;

        return;

    }


    doctors.forEach(function (doctor, index) {

        const initials =
            getInitials(doctor.name);


        const card =
            document.createElement("div");


        card.className = "person-card";


        card.innerHTML = `

            <div class="person-header">

                <div class="person-avatar">
                    ${initials}
                </div>

                <div>

                    <h3>
                        ${escapeHTML(doctor.name)}
                    </h3>

                    <span class="id">
                        ${escapeHTML(doctor.id)}
                    </span>

                </div>

            </div>


            <div class="person-details">

                <p>
                    Specialty:
                    <strong>
                        ${escapeHTML(doctor.specialty)}
                    </strong>
                </p>

                <p>
                    Department:
                    <strong>
                        ${escapeHTML(doctor.department)}
                    </strong>
                </p>

                <p>
                    Email:
                    <strong>
                        ${escapeHTML(doctor.email)}
                    </strong>
                </p>

            </div>


            <div class="person-actions">

                <button
                    class="view"
                    onclick="selectDoctor('${doctor.id}')"
                >
                    Select
                </button>

                <button
                    onclick="editDoctor(${index})"
                >
                    Edit
                </button>

                <button
                    class="delete"
                    onclick="deleteDoctor(${index})"
                >
                    Delete
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


function openDoctorModal(index = null) {

    const modal =
        document.getElementById("doctorModal");


    const title =
        document.getElementById("doctorModalTitle");


    if (index === null) {

        title.textContent = "Add Doctor";

        document.getElementById(
            "editDoctorIndex"
        ).value = "";


        document.getElementById(
            "doctorNameInput"
        ).value = "";


        document.getElementById(
            "doctorIdInput"
        ).value = generateDoctorId();


        document.getElementById(
            "doctorSpecialtyInput"
        ).value = "";


        document.getElementById(
            "doctorEmailInput"
        ).value = "";


        document.getElementById(
            "doctorDepartmentInput"
        ).value = "";

    } else {

        const doctor = doctors[index];


        title.textContent = "Edit Doctor";


        document.getElementById(
            "editDoctorIndex"
        ).value = index;


        document.getElementById(
            "doctorNameInput"
        ).value = doctor.name;


        document.getElementById(
            "doctorIdInput"
        ).value = doctor.id;


        document.getElementById(
            "doctorSpecialtyInput"
        ).value = doctor.specialty;


        document.getElementById(
            "doctorEmailInput"
        ).value = doctor.email;


        document.getElementById(
            "doctorDepartmentInput"
        ).value = doctor.department;

    }


    modal.classList.add("show");

}


function closeDoctorModal() {

    document
        .getElementById("doctorModal")
        .classList.remove("show");

}


function saveDoctor(event) {

    event.preventDefault();


    const editIndex =
        document.getElementById(
            "editDoctorIndex"
        ).value;


    let id =
        document.getElementById(
            "doctorIdInput"
        ).value.trim();


    const name =
        document.getElementById(
            "doctorNameInput"
        ).value.trim();


    const specialty =
        document.getElementById(
            "doctorSpecialtyInput"
        ).value.trim();


    const email =
        document.getElementById(
            "doctorEmailInput"
        ).value.trim();


    const department =
        document.getElementById(
            "doctorDepartmentInput"
        ).value.trim();


    if (!id) {

        id = generateDoctorId();

    }


    if (
        !name ||
        !specialty ||
        !email ||
        !department
    ) {

        alert("Please fill all required fields.");

        return;

    }


    const doctor = {

        id: id,

        name: name,

        specialty: specialty,

        email: email,

        department: department

    };


    if (editIndex === "") {

        doctors.push(doctor);

        selectedDoctorId = id;

    } else {

        doctors[Number(editIndex)] = doctor;

        selectedDoctorId = id;

    }


    saveData();

    renderDoctors();

    updateDoctorHeader();

    closeDoctorModal();

}


function editDoctor(index) {

    openDoctorModal(index);

}


function deleteDoctor(index) {

    const doctor = doctors[index];


    if (!confirm(
        `Delete ${doctor.name}?`
    )) {

        return;

    }


    doctors.splice(index, 1);


    if (
        selectedDoctorId === doctor.id
    ) {

        selectedDoctorId =
            doctors.length > 0
                ? doctors[0].id
                : null;

    }


    saveData();

    renderDoctors();

    updateDoctorHeader();

}


function selectDoctor(doctorId) {

    selectedDoctorId = doctorId;

    saveData();

    updateDoctorHeader();

    alert("Doctor selected successfully.");

}


function updateDoctorHeader() {

    if (doctors.length === 0) {

        document.getElementById(
            "headerDoctorName"
        ).textContent = "No Doctor";


        return;

    }


    const doctor =
        doctors.find(function (item) {

            return item.id === selectedDoctorId;

        }) || doctors[0];


    selectedDoctorId = doctor.id;


    document.getElementById(
        "headerDoctorName"
    ).textContent = doctor.name;


    document.querySelector(
        ".doctor-profile small"
    ).textContent = doctor.specialty;


    document.querySelector(
        ".doctor-avatar"
    ).textContent = getInitials(
        doctor.name
    );


    document.getElementById(
        "popupDoctorName"
    ).textContent = doctor.name;


    document.getElementById(
        "popupDoctorSpecialty"
    ).textContent = doctor.specialty;


    document.getElementById(
        "popupDoctorEmail"
    ).textContent = doctor.email;

}


function generateDoctorId() {

    let number = doctors.length + 1;

    let id =
        "D" +
        String(number).padStart(3, "0");


    while (
        doctors.some(function (doctor) {
            return doctor.id === id;
        })
    ) {

        number++;

        id =
            "D" +
            String(number).padStart(3, "0");

    }


    return id;

}


/* ================= HEALTH MONITOR ================= */

function updateDashboard() {

    if (!patientData) return;


    document.getElementById(
        "heartRate"
    ).textContent =
        patientData.heartRate;


    document.getElementById(
        "spo2"
    ).textContent =
        patientData.spo2;


    document.getElementById(
        "temperature"
    ).textContent =
        Number(patientData.temperature).toFixed(1);


    document.getElementById(
        "bloodPressure"
    ).textContent =
        patientData.bloodPressure;


    document.getElementById(
        "monitorHeartRate"
    ).textContent =
        patientData.heartRate;


    document.getElementById(
        "monitorSpo2"
    ).textContent =
        patientData.spo2;


    document.getElementById(
        "monitorTemperature"
    ).textContent =
        Number(patientData.temperature).toFixed(1);


    document.getElementById(
        "monitorBloodPressure"
    ).textContent =
        patientData.bloodPressure;


    document.getElementById(
        "lastUpdated"
    ).textContent =
        "Updated just now";


    analyzePatient();

}


/* ================= AI ANALYSIS ================= */

function analyzePatient() {

    if (!patientData) return;


    const hr =
        Number(patientData.heartRate);

    const spo2 =
        Number(patientData.spo2);

    const temp =
        Number(patientData.temperature);


    let risk = "LOW";

    let status = "Stable";

    let recommendation =
        "AI recommends continuing normal monitoring.";


    if (
        hr > 120 ||
        hr < 45 ||
        spo2 < 90 ||
        temp > 39 ||
        temp < 35
    ) {

        risk = "HIGH";

        status = "Needs Attention";

        recommendation =
            "AI recommends immediate medical attention and checking the patient's condition.";

    }


    else if (
        hr > 100 ||
        hr < 55 ||
        spo2 < 94 ||
        temp > 37.5
    ) {

        risk = "MEDIUM";

        status = "Monitor";

        recommendation =
            "AI recommends closer monitoring of the patient's health values.";

    }


    document.getElementById(
        "aiRiskLevel"
    ).textContent =
        risk + " RISK";


    document.getElementById(
        "patientStatus"
    ).textContent =
        status;


    document.getElementById(
        "aiRecommendation"
    ).textContent =
        recommendation;


    const icon =
        document.getElementById(
            "aiStatusIcon"
        );


    const box =
        document.getElementById(
            "aiStatusBox"
        );


    if (risk === "HIGH") {

        icon.textContent = "!";

        icon.style.background = "#fee2e2";

        icon.style.color = "#dc2626";

        document.getElementById(
            "aiRiskLevel"
        ).style.color = "#dc2626";

    }

    else if (risk === "MEDIUM") {

        icon.textContent = "!";

        icon.style.background = "#fef3c7";

        icon.style.color = "#d97706";

        document.getElementById(
            "aiRiskLevel"
        ).style.color = "#d97706";

    }

    else {

        icon.textContent = "✓";

        icon.style.background = "#dcfce7";

        icon.style.color = "#16a34a";

        document.getElementById(
            "aiRiskLevel"
        ).style.color = "#16a34a";

    }

}


/* ================= GESTURES ================= */

function detectGesture(type) {

    const gestures = {

        water: {
            icon: "💧",
            name: "Water",
            meaning: "Patient needs water"
        },

        food: {
            icon: "🍎",
            name: "Food",
            meaning: "Patient needs food"
        },

        washroom: {
            icon: "🚻",
            name: "Washroom",
            meaning: "Patient needs assistance to use the washroom"
        },

        emergency: {
            icon: "🚨",
            name: "Emergency",
            meaning: "Patient requires immediate assistance"
        }

    };


    const gesture = gestures[type];


    if (!gesture) return;


    document.getElementById(
        "gestureIcon"
    ).textContent = gesture.icon;


    document.getElementById(
        "gestureName"
    ).textContent = gesture.name;


    document.getElementById(
        "gestureMeaning"
    ).textContent = gesture.meaning;


    document.getElementById(
        "gestureTime"
    ).textContent =
        "Detected at " +
        new Date().toLocaleTimeString();


    if (type === "water") {

        document.getElementById(
            "requestText"
        ).textContent =
            "Patient needs water";

    }

    else if (type === "food") {

        document.getElementById(
            "requestText"
        ).textContent =
            "Patient needs food";

    }

    else if (type === "washroom") {

        document.getElementById(
            "requestText"
        ).textContent =
            "Patient needs washroom assistance";

    }

    else if (type === "emergency") {

        triggerEmergency();

    }

}


/* ================= EMERGENCY ================= */

function triggerEmergency() {

    document.getElementById(
        "normalAlert"
    ).classList.add("hidden");


    document.getElementById(
        "emergencyAlert"
    ).classList.remove("hidden");


    document.getElementById(
        "resolveButton"
    ).classList.remove("hidden");


    document.getElementById(
        "alertCount"
    ).textContent = "1";


    document.getElementById(
        "notificationCount"
    ).textContent = "1";


    updateAlertsPage();


    alert(
        "🚨 EMERGENCY ALERT!\n\nPatient requires immediate assistance."
    );

}


function resolveEmergency() {

    document.getElementById(
        "normalAlert"
    ).classList.remove("hidden");


    document.getElementById(
        "emergencyAlert"
    ).classList.add("hidden");


    document.getElementById(
        "resolveButton"
    ).classList.add("hidden");


    document.getElementById(
        "alertCount"
    ).textContent = "0";


    document.getElementById(
        "notificationCount"
    ).textContent = "0";


    updateAlertsPage();

}


function updateAlertsPage() {

    const container =
        document.getElementById(
            "alertsList"
        );


    const emergencyVisible =
        !document.getElementById(
            "emergencyAlert"
        ).classList.contains("hidden");


    if (emergencyVisible) {

        container.innerHTML = `

            <div class="person-card">

                <h3 style="color:#dc2626;">
                    🚨 Emergency Alert
                </h3>

                <p style="margin-top:10px;">
                    Emergency gesture detected from
                    <strong>
                        ${patientData ? patientData.name : "Patient"}
                    </strong>.
                </p>

                <p style="margin-top:8px;">
                    Immediate assistance is required.
                </p>

            </div>

        `;

    } else {

        container.innerHTML = `

            <div class="empty-alert">
                ✓ No active alerts
            </div>

        `;

    }

}


/* ================= REQUEST ================= */

function acknowledgeRequest() {

    document.getElementById(
        "requestText"
    ).textContent =
        "Request acknowledged ✓";


    setTimeout(function () {

        if (
            document.getElementById(
                "requestText"
            )
        ) {

            document.getElementById(
                "requestText"
            ).textContent =
                "Patient needs water";

        }

    }, 3000);

}


/* ================= REPORT ================= */

function updateReport() {

    if (!patientData) return;


    document.getElementById(
        "reportPatientName"
    ).textContent =
        patientData.name;


    document.getElementById(
        "reportHeartRate"
    ).textContent =
        patientData.heartRate + " BPM";


    document.getElementById(
        "reportSpo2"
    ).textContent =
        patientData.spo2 + "%";


    document.getElementById(
        "reportTemperature"
    ).textContent =
        Number(patientData.temperature).toFixed(1) +
        " °C";


    document.getElementById(
        "reportBloodPressure"
    ).textContent =
        patientData.bloodPressure;

}


function generateReport() {

    if (!patientData) {

        alert("Please add a patient first.");

        return;

    }


    alert(
        "Health report generated for " +
        patientData.name +
        "."
    );

}


/* ================= DOCTOR POPUP ================= */

function setupDoctorProfile() {

    document
        .getElementById("doctorProfile")
        .addEventListener(
            "click",
            function () {

                document
                    .getElementById("doctorPopup")
                    .classList.add("show");

            }
        );

}


function closeDoctorProfile() {

    document
        .getElementById("doctorPopup")
        .classList.remove("show");

}


function goToDoctors() {

    closeDoctorProfile();

    showSection("doctorsSection");

}


/* ================= SHOW SECTION ================= */

function showSection(sectionId) {

    const navItems =
        document.querySelectorAll(".nav-item");

    const sections =
        document.querySelectorAll(".page-section");


    navItems.forEach(function (item) {

        item.classList.remove("active");


        if (
            item.getAttribute("data-section")
            === sectionId
        ) {

            item.classList.add("active");

        }

    });


    sections.forEach(function (section) {

        section.classList.remove(
            "active-section"
        );

    });


    const section =
        document.getElementById(sectionId);


    if (section) {

        section.classList.add(
            "active-section"
        );

    }


    updatePageHeader(sectionId);

}


/* ================= UTILITIES ================= */

function getInitials(name) {

    const parts =
        name.trim().split(" ");


    if (parts.length === 1) {

        return parts[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();

}


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ================= DEMO LIVE MONITORING ================= */

/*
   This simulates changing health values.

   Later we can replace this with actual
   ESP32 / sensor / API data.
*/

setInterval(function () {

    if (!patientData) return;


    const randomChange =
        Math.floor(Math.random() * 5) - 2;


    patientData.heartRate =
        Math.max(
            50,
            Math.min(
                110,
                patientData.heartRate +
                randomChange
            )
        );


    saveData();

    updateDashboard();
   /* =========================================================
   AI CAMERA HAND GESTURE DETECTION
   ========================================================= */

let cameraStream = null;
let handCamera = null;
let lastAIGesture = "";
let lastAIGestureTime = 0;


/* ================= START CAMERA ================= */

async function startCamera() {

    const video = document.getElementById("cameraVideo");

    if (!video) {
        console.error("Camera video element not found.");
        return;
    }

    try {

        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user",
                width: { ideal: 640 },
                height: { ideal: 480 }
            },
            audio: false
        });

        video.srcObject = cameraStream;

        await video.play();

        initializeHandAI();

        updateCameraResult(
            "✋",
            "Camera Active",
            "Show your hand in front of the camera.",
            0
        );

    } catch (error) {

        console.error("Camera error:", error);

        updateCameraResult(
            "⚠️",
            "Camera Error",
            "Please allow camera permission and try again.",
            0
        );

        alert(
            "Camera access was blocked.\n\n" +
            "Please allow camera permission in your browser."
        );
    }
}


/* ================= STOP CAMERA ================= */

function stopCamera() {

    if (cameraStream) {

        cameraStream.getTracks().forEach(function(track) {
            track.stop();
        });

        cameraStream = null;
    }

    if (handCamera) {
        handCamera.stop();
        handCamera = null;
    }

    const video = document.getElementById("cameraVideo");

    if (video) {
        video.srcObject = null;
    }

    updateCameraResult(
        "✋",
        "Camera Stopped",
        "Press Start Camera to begin detection.",
        0
    );
}


/* ================= INITIALIZE MEDIAPIPE ================= */

function initializeHandAI() {

    const video = document.getElementById("cameraVideo");

    if (!video) return;

    if (typeof Hands === "undefined") {

        updateCameraResult(
            "⚠️",
            "AI Library Error",
            "Hand detection library could not be loaded.",
            0
        );

        return;
    }

    const hands = new Hands({
        locateFile: function(file) {

            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;

        }
    });

    hands.setOptions({

        maxNumHands: 1,

        modelComplexity: 1,

        minDetectionConfidence: 0.6,

        minTrackingConfidence: 0.6

    });


    hands.onResults(processHandResults);


    handCamera = new Camera(video, {

        onFrame: async function() {

            await hands.send({
                image: video
            });

        },

        width: 640,
        height: 480

    });

    handCamera.start();
}


/* ================= PROCESS HAND RESULTS ================= */

function processHandResults(results) {

    if (!results.multiHandLandmarks ||
        results.multiHandLandmarks.length === 0) {

        updateCameraResult(
            "🔍",
            "No Hand Detected",
            "Place your hand clearly in front of the camera.",
            0
        );

        return;
    }


    const landmarks = results.multiHandLandmarks[0];

    const gesture = recognizeHandGesture(landmarks);


    if (!gesture) {

        updateCameraResult(
            "✋",
            "Unknown Gesture",
            "Try one of the supported hand gestures.",
            50
        );

        return;
    }


    updateCameraResult(
        gesture.icon,
        gesture.name,
        gesture.meaning,
        gesture.confidence
    );


    if (gesture.confidence >= 75) {

        handleAIGesture(gesture.type);

    }
}


/* ================= RECOGNIZE GESTURE ================= */

function recognizeHandGesture(landmarks) {

    const index = isFingerExtended(
        landmarks,
        8,
        6
    );

    const middle = isFingerExtended(
        landmarks,
        12,
        10
    );

    const ring = isFingerExtended(
        landmarks,
        16,
        14
    );

    const pinky = isFingerExtended(
        landmarks,
        20,
        18
    );

    const thumb = isThumbExtended(
        landmarks
    );


    /* OPEN PALM = WASHROOM */

    if (
        thumb &&
        index &&
        middle &&
        ring &&
        pinky
    ) {

        return {
            type: "washroom",
            icon: "🚻",
            name: "Washroom Request",
            meaning: "Patient is requesting to go to the washroom.",
            confidence: 92
        };

    }


    /* TWO FINGERS = EMERGENCY */

    if (
        index &&
        middle &&
        !ring &&
        !pinky
    ) {

        return {
            type: "emergency",
            icon: "🚨",
            name: "Emergency",
            meaning: "Patient has triggered an emergency request.",
            confidence: 90
        };

    }


    /* THUMB UP = WATER */

    if (
        thumb &&
        !index &&
        !middle &&
        !ring &&
        !pinky
    ) {

        return {
            type: "water",
            icon: "💧",
            name: "Water Request",
            meaning: "Patient is requesting water.",
            confidence: 88
        };

    }


    /* CLOSED FIST = FOOD */

    if (
        !thumb &&
        !index &&
        !middle &&
        !ring &&
        !pinky
    ) {

        return {
            type: "food",
            icon: "🍎",
            name: "Food Request",
            meaning: "Patient is requesting food.",
            confidence: 86
        };

    }


    return null;
}


/* ================= FINGER DETECTION ================= */

function isFingerExtended(landmarks, tipIndex, pipIndex) {

    const tip = landmarks[tipIndex];

    const pip = landmarks[pipIndex];

    return tip.y < pip.y;
}


/* ================= THUMB DETECTION ================= */

function isThumbExtended(landmarks) {

    const thumbTip = landmarks[4];

    const thumbIP = landmarks[3];

    const wrist = landmarks[0];

    const tipDistance = Math.abs(
        thumbTip.x - wrist.x
    );

    const ipDistance = Math.abs(
        thumbIP.x - wrist.x
    );

    return tipDistance > ipDistance + 0.04;
}


/* ================= UPDATE CAMERA RESULT ================= */

function updateCameraResult(
    icon,
    name,
    meaning,
    confidence
) {

    const iconElement =
        document.getElementById("cameraGestureIcon");

    const nameElement =
        document.getElementById("cameraGestureName");

    const meaningElement =
        document.getElementById("cameraGestureMeaning");

    const confidenceElement =
        document.getElementById("cameraConfidence");


    if (iconElement) {
        iconElement.textContent = icon;
    }

    if (nameElement) {
        nameElement.textContent = name;
    }

    if (meaningElement) {
        meaningElement.textContent = meaning;
    }

    if (confidenceElement) {
        confidenceElement.textContent =
            confidence + "%";
    }
}


/* ================= HANDLE AI GESTURE ================= */

function handleAIGesture(type) {

    const now = Date.now();


    /*
       Prevent the same gesture from triggering
       continuously every frame.
    */

    if (
        type === lastAIGesture &&
        now - lastAIGestureTime < 3000
    ) {

        return;

    }


    lastAIGesture = type;

    lastAIGestureTime = now;


    /*
       Use your existing dashboard gesture system.
    */

    if (typeof detectGesture === "function") {

        detectGesture(type);

    }

}

    updateReport();


}, 5000);
