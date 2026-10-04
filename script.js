/* =========================================================
   AI ADAPTIVE PATIENT-CARE GLOVE
   DASHBOARD JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. DATA
   ========================================================= */

let patientData = JSON.parse(localStorage.getItem("patientData"));

if (!patientData) {
    patientData = {
        name: "Rahul Kumar",
        age: 28,
        condition: "Paralysis / Limited Hand Movement",

        heartRate: 76,
        spo2: 98,
        temperature: 36.7,
        bloodPressure: "120/80",

        request: "No request",
        requestTime: "--",

        emergency: false,
        emergencyCount: 0
    };

    localStorage.setItem(
        "patientData",
        JSON.stringify(patientData)
    );
}


let patients = JSON.parse(localStorage.getItem("patients"));

if (!patients) {

    patients = [
        {
            id: 1,
            name: "Rahul Kumar",
            age: 28,
            condition: "Paralysis / Limited Hand Movement"
        },
        {
            id: 2,
            name: "Ananya Sharma",
            age: 35,
            condition: "Spinal Cord Injury"
        },
        {
            id: 3,
            name: "Arjun Patel",
            age: 42,
            condition: "Stroke Recovery"
        }
    ];

    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );
}


let doctors = JSON.parse(localStorage.getItem("doctors"));

if (!doctors) {

    doctors = [
        {
            id: 1,
            name: "Dr. Priya Sharma",
            specialization: "Neurologist",
            phone: "+91 9876543210"
        },
        {
            id: 2,
            name: "Dr. Arjun Rao",
            specialization: "Emergency Physician",
            phone: "+91 9876543211"
        }
    ];

    localStorage.setItem(
        "doctors",
        JSON.stringify(doctors)
    );
}


let selectedPatientId =
    Number(localStorage.getItem("selectedPatientId")) || 1;

let selectedDoctorId =
    Number(localStorage.getItem("selectedDoctorId")) || 1;


/* =========================================================
   2. SAVE DATA
   ========================================================= */

function saveData() {

    localStorage.setItem(
        "patientData",
        JSON.stringify(patientData)
    );

    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );

    localStorage.setItem(
        "doctors",
        JSON.stringify(doctors)
    );

    localStorage.setItem(
        "selectedPatientId",
        selectedPatientId
    );

    localStorage.setItem(
        "selectedDoctorId",
        selectedDoctorId
    );
}


/* =========================================================
   3. INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    updateDashboard();
    updatePatients();
    updateDoctors();
    updateHealthMonitor();
    updateAlerts();
    updateReport();
    updateAIAnalysis();
    updateDoctorProfile();

    showSection("dashboard");

});


/* =========================================================
   4. NAVIGATION
   ========================================================= */

function showSection(sectionName) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(function (section) {
        section.style.display = "none";
    });


    const selectedSection =
        document.getElementById(sectionName);

    if (selectedSection) {
        selectedSection.style.display = "block";
    }


    const navItems =
        document.querySelectorAll(".nav-item");

    navItems.forEach(function (item) {
        item.classList.remove("active");
    });


    navItems.forEach(function (item) {

        const text =
            item.textContent
                .trim()
                .toLowerCase();

        if (text.includes(sectionName.toLowerCase())) {
            item.classList.add("active");
        }

    });

}


/* =========================================================
   5. GET CURRENT PATIENT
   ========================================================= */

function getCurrentPatient() {

    const patient =
        patients.find(function (p) {
            return Number(p.id) === Number(selectedPatientId);
        });

    if (patient) {
        return patient;
    }

    return patients[0];
}


/* =========================================================
   6. GET CURRENT DOCTOR
   ========================================================= */

function getCurrentDoctor() {

    const doctor =
        doctors.find(function (d) {
            return Number(d.id) === Number(selectedDoctorId);
        });

    if (doctor) {
        return doctor;
    }

    return doctors[0];
}


/* =========================================================
   7. UPDATE DASHBOARD
   ========================================================= */

function updateDashboard() {

    const patient =
        getCurrentPatient();

    if (!patient) return;


    /* Patient name */

    const patientName =
        document.getElementById("patientName");

    if (patientName) {
        patientName.textContent =
            patient.name;
    }


    /* Patient age */

    const patientAge =
        document.getElementById("patientAge");

    if (patientAge) {
        patientAge.textContent =
            patient.age + " years";
    }


    /* Patient condition */

    const patientCondition =
        document.getElementById("patientCondition");

    if (patientCondition) {
        patientCondition.textContent =
            patient.condition;
    }


    /* Heart rate */

    const heartRate =
        document.getElementById("heartRate");

    if (heartRate) {
        heartRate.textContent =
            patientData.heartRate;
    }


    /* SpO2 */

    const spo2 =
        document.getElementById("spo2");

    if (spo2) {
        spo2.textContent =
            patientData.spo2;
    }


    /* Temperature */

    const temperature =
        document.getElementById("temperature");

    if (temperature) {
        temperature.textContent =
            patientData.temperature.toFixed(1);
    }


    /* Blood pressure */

    const bloodPressure =
        document.getElementById("bloodPressure");

    if (bloodPressure) {
        bloodPressure.textContent =
            patientData.bloodPressure;
    }


    /* Request */

    const request =
        document.getElementById("patientRequest");

    if (request) {
        request.textContent =
            patientData.request;
    }


    const requestTime =
        document.getElementById("requestTime");

    if (requestTime) {
        requestTime.textContent =
            patientData.requestTime;
    }


    /* Emergency */

    updateEmergencyDisplay();

    updateAIAnalysis();
}


/* =========================================================
   8. PATIENTS
   ========================================================= */

function updatePatients() {

    const container =
        document.getElementById("patientsList");

    if (!container) return;


    container.innerHTML = "";


    patients.forEach(function (patient) {

        const card =
            document.createElement("div");

        card.className =
            "patient-card";


        card.innerHTML = `

            <div>
                <h3>${patient.name}</h3>

                <p>
                    Age: ${patient.age}
                </p>

                <p>
                    ${patient.condition}
                </p>
            </div>

            <div class="patient-actions">

                <button
                    class="primary-btn"
                    onclick="selectPatient(${patient.id})">
                    View
                </button>

                <button
                    class="secondary-btn"
                    onclick="deletePatient(${patient.id})">
                    Delete
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   SELECT PATIENT
   ========================================================= */

function selectPatient(id) {

    selectedPatientId =
        Number(id);


    const selected =
        patients.find(function (p) {
            return Number(p.id) === Number(id);
        });


    if (selected) {

        patientData.name =
            selected.name;

        patientData.age =
            selected.age;

        patientData.condition =
            selected.condition;

    }


    saveData();

    updateDashboard();
    updateHealthMonitor();
    updateReport();
    updateAIAnalysis();


    showSection("dashboard");

}


/* =========================================================
   ADD PATIENT
   ========================================================= */

function addPatient() {

    const name =
        prompt("Enter patient name:");

    if (!name) return;


    const age =
        prompt("Enter patient age:");

    if (!age) return;


    const condition =
        prompt("Enter patient condition:");

    if (!condition) return;


    const newPatient = {

        id:
            Date.now(),

        name:
            name,

        age:
            Number(age),

        condition:
            condition

    };


    patients.push(newPatient);

    saveData();

    updatePatients();

    alert(
        "Patient added successfully."
    );

}


/* =========================================================
   DELETE PATIENT
   ========================================================= */

function deletePatient(id) {

    if (patients.length <= 1) {

        alert(
            "At least one patient must remain."
        );

        return;
    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this patient?"
        );


    if (!confirmDelete) return;


    patients =
        patients.filter(function (patient) {

            return Number(patient.id)
                !== Number(id);

        });


    if (Number(selectedPatientId) === Number(id)) {

        selectedPatientId =
            patients[0].id;

        patientData.name =
            patients[0].name;

        patientData.age =
            patients[0].age;

        patientData.condition =
            patients[0].condition;
    }


    saveData();

    updatePatients();
    updateDashboard();
    updateHealthMonitor();
    updateReport();

}


/* =========================================================
   9. DOCTORS
   ========================================================= */

function updateDoctors() {

    const container =
        document.getElementById("doctorsList");

    if (!container) return;


    container.innerHTML = "";


    doctors.forEach(function (doctor) {

        const card =
            document.createElement("div");

        card.className =
            "doctor-card";


        card.innerHTML = `

            <div>

                <h3>
                    ${doctor.name}
                </h3>

                <p>
                    ${doctor.specialization}
                </p>

                <p>
                    ${doctor.phone}
                </p>

            </div>


            <div class="doctor-actions">

                <button
                    class="primary-btn"
                    onclick="selectDoctor(${doctor.id})">
                    Select
                </button>

                <button
                    class="secondary-btn"
                    onclick="deleteDoctor(${doctor.id})">
                    Delete
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   SELECT DOCTOR
   ========================================================= */

function selectDoctor(id) {

    selectedDoctorId =
        Number(id);

    saveData();

    updateDoctorProfile();

    alert(
        "Doctor selected successfully."
    );

}


/* =========================================================
   ADD DOCTOR
   ========================================================= */

function addDoctor() {

    const name =
        prompt("Enter doctor name:");

    if (!name) return;


    const specialization =
        prompt("Enter specialization:");

    if (!specialization) return;


    const phone =
        prompt("Enter phone number:");

    if (!phone) return;


    doctors.push({

        id:
            Date.now(),

        name:
            name,

        specialization:
            specialization,

        phone:
            phone

    });


    saveData();

    updateDoctors();

}


/* =========================================================
   DELETE DOCTOR
   ========================================================= */

function deleteDoctor(id) {

    if (doctors.length <= 1) {

        alert(
            "At least one doctor must remain."
        );

        return;
    }


    const confirmDelete =
        confirm(
            "Delete this doctor?"
        );


    if (!confirmDelete) return;


    doctors =
        doctors.filter(function (doctor) {

            return Number(doctor.id)
                !== Number(id);

        });


    if (Number(selectedDoctorId) === Number(id)) {

        selectedDoctorId =
            doctors[0].id;

    }


    saveData();

    updateDoctors();

    updateDoctorProfile();

}


/* =========================================================
   10. DOCTOR PROFILE
   ========================================================= */

function updateDoctorProfile() {

    const doctor =
        getCurrentDoctor();

    if (!doctor) return;


    const doctorName =
        document.getElementById("doctorName");

    if (doctorName) {

        doctorName.textContent =
            doctor.name;

    }


    const doctorSpecialization =
        document.getElementById(
            "doctorSpecialization"
        );

    if (doctorSpecialization) {

        doctorSpecialization.textContent =
            doctor.specialization;

    }

}


/* =========================================================
   11. HEALTH MONITOR
   ========================================================= */

function updateHealthMonitor() {

    const heart =
        document.getElementById(
            "monitorHeartRate"
        );

    if (heart) {

        heart.textContent =
            patientData.heartRate +
            " BPM";

    }


    const oxygen =
        document.getElementById(
            "monitorSpo2"
        );

    if (oxygen) {

        oxygen.textContent =
            patientData.spo2 +
            "%";

    }


    const temp =
        document.getElementById(
            "monitorTemperature"
        );

    if (temp) {

        temp.textContent =
            patientData.temperature.toFixed(1) +
            " °C";

    }


    const bp =
        document.getElementById(
            "monitorBloodPressure"
        );

    if (bp) {

        bp.textContent =
            patientData.bloodPressure;

    }

}


/* =========================================================
   12. AI PATIENT ANALYSIS
   ========================================================= */

function updateAIAnalysis() {

    let risk =
        "LOW";

    let recommendation =
        "Patient condition appears stable.";

    let className =
        "low";


    const hr =
        Number(patientData.heartRate);

    const oxygen =
        Number(patientData.spo2);

    const temp =
        Number(patientData.temperature);


    if (
        hr < 55 ||
        hr > 105 ||
        oxygen < 94 ||
        temp > 38 ||
        temp < 35
    ) {

        risk =
            "HIGH";

        recommendation =
            "Immediate medical attention may be required.";

        className =
            "high";

    }

    else if (
        hr < 60 ||
        hr > 100 ||
        oxygen < 96 ||
        temp > 37.5
    ) {

        risk =
            "MEDIUM";

        recommendation =
            "Continue monitoring the patient closely.";

        className =
            "medium";

    }


    const riskElement =
        document.getElementById(
            "aiRisk"
        );


    if (riskElement) {

        riskElement.textContent =
            risk;

        riskElement.className =
            className;

    }


    const recommendationElement =
        document.getElementById(
            "aiRecommendation"
        );


    if (recommendationElement) {

        recommendationElement.textContent =
            recommendation;

    }

}


/* =========================================================
   13. MANUAL GESTURE BUTTONS
   ========================================================= */

function detectGesture(gesture) {

    let message =
        "";

    let icon =
        "✋";


    if (gesture === "water") {

        message =
            "Patient needs water.";

        icon =
            "👍";

    }


    else if (gesture === "food") {

        message =
            "Patient needs food.";

        icon =
            "✊";

    }


    else if (gesture === "washroom") {

        message =
            "Patient needs assistance to use the washroom.";

        icon =
            "✋";

    }


    else if (gesture === "emergency") {

        message =
            "Emergency assistance required.";

        icon =
            "✌️";

        triggerEmergency();

    }


    patientData.request =
        message;

    patientData.requestTime =
        new Date().toLocaleTimeString();


    saveData();

    updateDashboard();


    const iconElement =
        document.getElementById(
            "cameraGestureIcon"
        );

    const nameElement =
        document.getElementById(
            "cameraGestureName"
        );

    const meaningElement =
        document.getElementById(
            "cameraGestureMeaning"
        );


    if (iconElement) {

        iconElement.textContent =
            icon;

    }


    if (nameElement) {

        nameElement.textContent =
            gesture.toUpperCase();

    }


    if (meaningElement) {

        meaningElement.textContent =
            message;

    }

}


/* =========================================================
   14. EMERGENCY
   ========================================================= */

function triggerEmergency() {

    patientData.emergency =
        true;

    patientData.emergencyCount =
        Number(patientData.emergencyCount || 0) + 1;


    patientData.request =
        "EMERGENCY ALERT";

    patientData.requestTime =
        new Date().toLocaleTimeString();


    saveData();

    updateEmergencyDisplay();
    updateAlerts();
    updateDashboard();


    alert(
        "🚨 EMERGENCY ALERT!\n\nPatient requires immediate assistance."
    );

}


/* =========================================================
   EMERGENCY DISPLAY
   ========================================================= */

function updateEmergencyDisplay() {

    const emergencyPanel =
        document.getElementById(
            "emergencyPanel"
        );


    const emergencyStatus =
        document.getElementById(
            "emergencyStatus"
        );


    const emergencyCount =
        document.getElementById(
            "emergencyCount"
        );


    if (emergencyCount) {

        emergencyCount.textContent =
            patientData.emergencyCount || 0;

    }


    if (patientData.emergency) {

        if (emergencyPanel) {

            emergencyPanel.classList.add(
                "emergency-active"
            );

        }


        if (emergencyStatus) {

            emergencyStatus.textContent =
                "🚨 EMERGENCY ACTIVE";

        }

    }

    else {

        if (emergencyPanel) {

            emergencyPanel.classList.remove(
                "emergency-active"
            );

        }


        if (emergencyStatus) {

            emergencyStatus.textContent =
                "No active emergency";

        }

    }

}


/* =========================================================
   RESOLVE EMERGENCY
   ========================================================= */

function resolveEmergency() {

    patientData.emergency =
        false;


    patientData.request =
        "No request";


    patientData.requestTime =
        new Date().toLocaleTimeString();


    saveData();

    updateDashboard();
    updateEmergencyDisplay();
    updateAlerts();

}


/* =========================================================
   15. ALERTS
   ========================================================= */

function updateAlerts() {

    const alertList =
        document.getElementById(
            "alertsList"
        );

    if (!alertList) return;


    alertList.innerHTML = "";


    if (patientData.emergency) {

        alertList.innerHTML = `

            <div class="alert-card emergency-alert">

                <h3>
                    🚨 Emergency Alert
                </h3>

                <p>
                    Patient requires immediate assistance.
                </p>

                <small>
                    ${patientData.requestTime}
                </small>

            </div>

        `;

    }

    else {

        alertList.innerHTML = `

            <div class="alert-card">

                <h3>
                    ✅ No Active Alerts
                </h3>

                <p>
                    Patient monitoring is normal.
                </p>

            </div>

        `;

    }

}


/* =========================================================
   16. PATIENT REQUEST
   ========================================================= */

function updatePatientRequest(request) {

    patientData.request =
        request;

    patientData.requestTime =
        new Date().toLocaleTimeString();


    saveData();

    updateDashboard();

}


/* =========================================================
   17. REPORT
   ========================================================= */

function updateReport() {

    const patient =
        getCurrentPatient();

    if (!patient) return;


    const reportPatient =
        document.getElementById(
            "reportPatientName"
        );

    if (reportPatient) {

        reportPatient.textContent =
            patient.name;

    }


    const reportHeart =
        document.getElementById(
            "reportHeartRate"
        );

    if (reportHeart) {

        reportHeart.textContent =
            patientData.heartRate +
            " BPM";

    }


    const reportSpo2 =
        document.getElementById(
            "reportSpo2"
        );

    if (reportSpo2) {

        reportSpo2.textContent =
            patientData.spo2 +
            "%";

    }


    const reportTemperature =
        document.getElementById(
            "reportTemperature"
        );

    if (reportTemperature) {

        reportTemperature.textContent =
            patientData.temperature.toFixed(1) +
            " °C";

    }


    const reportBP =
        document.getElementById(
            "reportBloodPressure"
        );

    if (reportBP) {

        reportBP.textContent =
            patientData.bloodPressure;

    }

}


/* =========================================================
   18. POPUP
   ========================================================= */

function openPopup(id) {

    const popup =
        document.getElementById(id);

    if (popup) {

        popup.style.display =
            "flex";

    }

}


function closePopup(id) {

    const popup =
        document.getElementById(id);

    if (popup) {

        popup.style.display =
            "none";

    }

}


/* =========================================================
   19. DEMO LIVE HEALTH MONITORING
   =========================================================

   IMPORTANT:
   This is only simulated data.

   In the real project:
   ESP32 + sensors
          ↓
      Backend/API
          ↓
      Dashboard
*/

setInterval(function () {

    if (!patientData) return;


    const randomChange =
        Math.floor(
            Math.random() * 5
        ) - 2;


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
    updateHealthMonitor();
    updateReport();
    updateAIAnalysis();

}, 5000);


/* =========================================================
   20. AI CAMERA HAND GESTURE DETECTION
   ========================================================= */

let cameraStream = null;

let handCamera = null;

let lastAIGesture = "";

let lastAIGestureTime = 0;

let emergencyTriggeredByCamera = false;


/* =========================================================
   START CAMERA
   ========================================================= */

async function startCamera() {

    const video =
        document.getElementById(
            "cameraVideo"
        );


    if (!video) {

        alert(
            "Camera video element was not found."
        );

        return;
    }


    try {

        cameraStream =
            await navigator.mediaDevices.getUserMedia({

                video: {
                    facingMode: "user"
                },

                audio: false

            });


        video.srcObject =
            cameraStream;


        await video.play();


        initializeHandDetection();


        alert(
            "Camera started.\n\nShow your hand clearly in front of the camera."
        );

    }

    catch (error) {

        console.error(
            "Camera error:",
            error
        );


        alert(
            "Unable to access the camera.\n\nPlease allow camera permission in your browser."
        );

    }

}


/* =========================================================
   STOP CAMERA
   ========================================================= */

function stopCamera() {

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(function (track) {

                track.stop();

            });

        cameraStream =
            null;

    }


    if (handCamera) {

        try {

            handCamera.stop();

        }

        catch (error) {

            console.log(error);

        }

        handCamera =
            null;

    }


    const video =
        document.getElementById(
            "cameraVideo"
        );


    if (video) {

        video.srcObject =
            null;

    }


    const nameElement =
        document.getElementById(
            "cameraGestureName"
        );


    const meaningElement =
        document.getElementById(
            "cameraGestureMeaning"
        );


    const confidenceElement =
        document.getElementById(
            "cameraConfidence"
        );


    if (nameElement) {

        nameElement.textContent =
            "Camera stopped";

    }


    if (meaningElement) {

        meaningElement.textContent =
            "Start the camera to detect a hand gesture.";

    }


    if (confidenceElement) {

        confidenceElement.textContent =
            "0%";

    }


    lastAIGesture =
        "";

    emergencyTriggeredByCamera =
        false;

}


/* =========================================================
   INITIALIZE MEDIAPIPE HAND DETECTION
   ========================================================= */

function initializeHandDetection() {

    if (
        typeof Hands === "undefined" ||
        typeof Camera === "undefined"
    ) {

        alert(
            "AI hand detection library could not be loaded.\n\nCheck your internet connection."
        );

        return;
    }


    const video =
        document.getElementById(
            "cameraVideo"
        );


    if (!video) return;


    handCamera =
        new Hands({

            locateFile:
                function (file) {

                    return (
                        "https://cdn.jsdelivr.net/npm/@mediapipe/hands/" +
                        file
                    );

                }

        });


    handCamera.setOptions({

        maxNumHands: 1,

        modelComplexity: 1,

        minDetectionConfidence: 0.6,

        minTrackingConfidence: 0.6

    });


    handCamera.onResults(
        processHandResults
    );


    const camera =
        new Camera(
            video,
            {

                onFrame:
                    async function () {

                        if (!handCamera) return;

                        await handCamera.send({
                            image: video
                        });

                    },

                width: 640,

                height: 480

            }
        );


    camera.start();

}


/* =========================================================
   PROCESS HAND RESULTS
   ========================================================= */

function processHandResults(results) {

    if (
        !results ||
        !results.multiHandLandmarks ||
        results.multiHandLandmarks.length === 0
    ) {

        updateCameraResult(
            "No hand detected",
            "Show your hand clearly in front of the camera.",
            "0%",
            "✋"
        );

        lastAIGesture =
            "";

        emergencyTriggeredByCamera =
            false;

        return;
    }


    const landmarks =
        results.multiHandLandmarks[0];


    const gesture =
        recognizeHandGesture(
            landmarks
        );


    if (!gesture) {

        updateCameraResult(
            "Unknown gesture",
            "Try one of the supported hand gestures.",
            "0%",
            "❓"
        );

        return;
    }


    let confidence =
        gesture.confidence;


    updateCameraResult(

        gesture.name,

        gesture.meaning,

        confidence + "%",

        gesture.icon

    );


    handleAIGesture(
        gesture.type
    );

}


/* =========================================================
   HAND GESTURE RECOGNITION
   ========================================================= */

function recognizeHandGesture(
    landmarks
) {

    const wrist =
        landmarks[0];


    const thumbTip =
        landmarks[4];

    const thumbIP =
        landmarks[3];


    const indexTip =
        landmarks[8];

    const indexPIP =
        landmarks[6];


    const middleTip =
        landmarks[12];

    const middlePIP =
        landmarks[10];


    const ringTip =
        landmarks[16];

    const ringPIP =
        landmarks[14];


    const pinkyTip =
        landmarks[20];

    const pinkyPIP =
        landmarks[18];


    const indexExtended =
        isFingerExtended(
            indexTip,
            indexPIP
        );


    const middleExtended =
        isFingerExtended(
            middleTip,
            middlePIP
        );


    const ringExtended =
        isFingerExtended(
            ringTip,
            ringPIP
        );


    const pinkyExtended =
        isFingerExtended(
            pinkyTip,
            pinkyPIP
        );


    const thumbExtended =
        isThumbExtended(
            wrist,
            thumbTip,
            thumbIP
        );


    const extendedCount =
        [
            indexExtended,
            middleExtended,
            ringExtended,
            pinkyExtended
        ]
        .filter(Boolean)
        .length;


    /* =====================================================
       OPEN PALM → WASHROOM
       ===================================================== */

    if (
        thumbExtended &&
        indexExtended &&
        middleExtended &&
        ringExtended &&
        pinkyExtended
    ) {

        return {

            type:
                "washroom",

            name:
                "Washroom",

            meaning:
                "Patient needs assistance to use the washroom.",

            icon:
                "✋",

            confidence:
                94

        };

    }


    /* =====================================================
       TWO FINGERS → EMERGENCY
       ===================================================== */

    if (
        indexExtended &&
        middleExtended &&
        !ringExtended &&
        !pinkyExtended
    ) {

        return {

            type:
                "emergency",

            name:
                "Emergency",

            meaning:
                "Emergency assistance required.",

            icon:
                "✌️",

            confidence:
                91

        };

    }


    /* =====================================================
       THUMB ONLY → WATER
       ===================================================== */

    if (
        thumbExtended &&
        !indexExtended &&
        !middleExtended &&
        !ringExtended &&
        !pinkyExtended
    ) {

        return {

            type:
                "water",

            name:
                "Water",

            meaning:
                "Patient needs water.",

            icon:
                "👍",

            confidence:
                90

        };

    }


    /* =====================================================
       FIST → FOOD
       ===================================================== */

    if (
        !thumbExtended &&
        extendedCount === 0
    ) {

        return {

            type:
                "food",

            name:
                "Food",

            meaning:
                "Patient needs food.",

            icon:
                "✊",

            confidence:
                88

        };

    }


    return null;

}


/* =========================================================
   FINGER EXTENSION
   ========================================================= */

function isFingerExtended(
    tip,
    pip
) {

    return (
        tip.y <
        pip.y
    );

}


/* =========================================================
   THUMB EXTENSION
   ========================================================= */

function isThumbExtended(
    wrist,
    thumbTip,
    thumbIP
) {

    const distanceTip =
        Math.sqrt(

            Math.pow(
                thumbTip.x -
                wrist.x,
                2
            )

            +

            Math.pow(
                thumbTip.y -
                wrist.y,
                2
            )

        );


    const distanceIP =
        Math.sqrt(

            Math.pow(
                thumbIP.x -
                wrist.x,
                2
            )

            +

            Math.pow(
                thumbIP.y -
                wrist.y,
                2
            )

        );


    return (
        distanceTip >
        distanceIP * 1.15
    );

}


/* =========================================================
   HANDLE AI GESTURE
   ========================================================= */

function handleAIGesture(
    gestureType
) {

    const now =
        Date.now();


    /*
       Prevent the same gesture from
       triggering continuously.
    */

    if (
        gestureType === lastAIGesture &&
        now - lastAIGestureTime < 3000
    ) {

        return;

    }


    /*
       Emergency should only trigger
       once until the user changes gesture.
    */

    if (
        gestureType === "emergency" &&
        emergencyTriggeredByCamera
    ) {

        return;

    }


    lastAIGesture =
        gestureType;


    lastAIGestureTime =
        now;


    if (
        gestureType === "emergency"
    ) {

        emergencyTriggeredByCamera =
            true;

    }

    else {

        emergencyTriggeredByCamera =
            false;

    }


    detectGesture(
        gestureType
    );

}


/* =========================================================
   UPDATE CAMERA RESULT
   ========================================================= */

function updateCameraResult(
    name,
    meaning,
    confidence,
    icon
) {

    const iconElement =
        document.getElementById(
            "cameraGestureIcon"
        );


    const nameElement =
        document.getElementById(
            "cameraGestureName"
        );


    const meaningElement =
        document.getElementById(
            "cameraGestureMeaning"
        );


    const confidenceElement =
        document.getElementById(
            "cameraConfidence"
        );


    if (iconElement) {

        iconElement.textContent =
            icon;

    }


    if (nameElement) {

        nameElement.textContent =
            name;

    }


    if (meaningElement) {

        meaningElement.textContent =
            meaning;

    }


    if (confidenceElement) {

        confidenceElement.textContent =
            confidence;

    }

}


/* =========================================================
   21. WINDOW CLICK
   Close popups when clicking outside
   ========================================================= */

window.addEventListener(
    "click",
    function (event) {

        const popups =
            document.querySelectorAll(
                ".popup, .modal"
            );


        popups.forEach(
            function (popup) {

                if (
                    event.target === popup
                ) {

                    popup.style.display =
                        "none";

                }

            }
        );

    }
);


/* =========================================================
   END OF SCRIPT
   ========================================================= */
