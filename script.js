function startAssistant() {
    document.getElementById("assistant").scrollIntoView({
        behavior: "smooth"
    });
}

function openProfileForm() {
    const assistant = document.getElementById("assistant");

        assistant.innerHTML = `
    <p class="section-label" data-i18n="personalizedSearch">
        PERSONALIZED SCHEME SEARCH
    </p>

    <h2 data-i18n="profileTitle">
        Tell Us About Yourself
    </h2>

    <p class="form-intro" data-i18n="profileIntro">
        Enter your details and our recommendation system
        will find government schemes that may be suitable for you.
    </p>

        <form id="profileForm">

            <div class="form-grid">

                <div class="form-group">
                    <label data-i18n="age">Age</label>
                    <input
                        type="number"
                        id="age"
                        placeholder="Enter your age"
                        data-i18n-placeholder="agePlaceholder"
                        min="1"
                        max="120"
                        required
                    >
                </div>

                <div class="form-group">
                    <label data-i18n="gender">Gender</label>

                    <select id="gender" required>
                        <option value="" data-i18n="selectGender">
                        Select gender
                        </option>
                        <option value="male" data-i18n="male">Male</option>
                        <option value="female" data-i18n="female">Female</option>
                        <option value="other" data-i18n="other">Other</option>
                    </select>
                </div>

                <div class="form-group">
                    <label data-i18n="state">State</label>

                    <select id="state" required>
                        <option value="" data-i18n="selectState">
                        Select your state
                        </option>
                        <option value="maharashtra" data-i18n="maharashtra">Maharashtra</option>
                        <option value="gujarat" data-i18n="gujarat">Gujarat</option>
                        <option value="madhya_pradesh" data-i18n="madhya_pradesh">Madhya Pradesh</option>
                        <option value="telangana" data-i18n="telangana">Telangana</option>
                        <option value="karnataka" data-i18n="karnataka">Karnataka</option>
                        <option value="rajasthan" data-i18n="rajasthan">Rajasthan</option>
                        <option value="delhi" data-i18n="delhi">Delhi</option>
                        <option value="uttar_pradesh" data-i18n="uttarPradesh">Uttar Pradesh</option>
<option value="bihar" data-i18n="bihar">Bihar</option>
<option value="other" data-i18n="other">Other</option>
                    </select>
                </div>

                <div class="form-group">
                    <label data-i18n="income">Annual Family Income</label>

                    <select id="income" required>
                        <option value="" data-i18n="selectIncome">
                        Select income range
                        </option>
                        <option value="low" data-i18n="lowIncome">Below ₹1 Lakh</option>
                        <option value="medium" data-i18n="mediumIncome">₹1 - ₹3 Lakh</option>
                        <option value="high" data-i18n="highIncome">₹3 - ₹5 Lakh</option>
                        <option value="veryhigh" data-i18n="veryHighIncome">Above ₹5 Lakh</option>
                    </select>
                </div>

                <div class="form-group">
                    <label data-i18n="occupation">Occupation</label>

                    <select id="occupation" required>
                    <option value="" data-i18n="selectOccupation">
                    Select occupation
                    </option>
<option value="student" data-i18n="student">Student</option>
<option value="farmer" data-i18n="farmer">Farmer</option>
<option value="employee" data-i18n="employee">Employee</option>
<option value="business" data-i18n="business">Business Owner</option>
<option value="unemployed" data-i18n="unemployed">Unemployed</option>
<option value="other" data-i18n="other">Other</option>
                    </select>
                </div>

                <div class="form-group">
                    <label data-i18n="category">Category</label>

                    <select id="category" required>
                    <option value="" data-i18n="selectCategory">
                    Select category
                    </option>
<option value="general" data-i18n="general">General</option>
<option value="obc" data-i18n="obc">OBC</option>
<option value="sc" data-i18n="sc">SC</option>
<option value="st" data-i18n="st">ST</option>
<option value="other" data-i18n="other">Other</option>
                    </select>
                </div>

            </div>

            <div class="checkbox-group">

                <label>
    <input type="checkbox" id="disability">
    <span data-i18n="disability">I am a person with disability</span>
</label>

            </div>
            <div class="voice-assistant-box">

   <button type="button" id="profileVoiceButton" class="voice-button" data-i18n="speakRequirements">
    🎤 Speak Your Requirements
</button>

    <p id="profileVoiceStatus" class="voice-status" data-i18n="voiceStatus">
    Click the microphone and tell us what you need.
</p>

    <p id="profileVoiceText" class="voice-text"></p>

</div>

<button type="submit" data-i18n="findSuitable">
    🔍 Find Suitable Schemes
</button>
<button type="button" id="saveProfileButton" class="save-profile-button" data-i18n="saveProfile">
    💾 Save My Profile
</button>

<button type="button" id="loadProfileButton" class="load-profile-button" data-i18n="loadProfile">
    👤 Load Saved Profile
</button>
 </form>

        <div id="results"></div>
    `;

    document
    .getElementById("profileForm")
    .addEventListener("submit", recommendSchemes);
    // Save the user's profile
document.getElementById("saveProfileButton").addEventListener("click", function () {

    const profile = {
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        state: document.getElementById("state").value,
        income: document.getElementById("income").value,
        occupation: document.getElementById("occupation").value,
        category: document.getElementById("category").value,
        disability: document.getElementById("disability").checked
    };

    localStorage.setItem(
        "schemeSaathiProfile",
        JSON.stringify(profile)
    );

    alert("Your profile has been saved successfully.");
});


// Load the saved profile
document.getElementById("loadProfileButton").addEventListener("click", function () {

    const savedProfile =
        localStorage.getItem("schemeSaathiProfile");

    if (!savedProfile) {
        alert("No saved profile was found.");
        return;
    }

    const profile = JSON.parse(savedProfile);

    document.getElementById("age").value = profile.age || "";
    document.getElementById("gender").value = profile.gender || "";
    document.getElementById("state").value = profile.state || "";
    document.getElementById("income").value = profile.income || "";
    document.getElementById("occupation").value = profile.occupation || "";
    document.getElementById("category").value = profile.category || "";
    document.getElementById("disability").checked =
        profile.disability || false;

    alert("Your saved profile has been loaded.");
});

// Apply the currently selected language to the newly created form
const currentLanguage =
    localStorage.getItem("schemeSaathiLanguage") || "en";

changeLanguage(currentLanguage);

initializeProfileVoice();

}


function recommendSchemes(event) {

    event.preventDefault();

    const age =
        Number(document.getElementById("age").value);

    const gender =
        document.getElementById("gender").value;

    const income =
        document.getElementById("income").value;

    const occupation =
        document.getElementById("occupation").value;

    const category =
        document.getElementById("category").value;

    const disability =
        document.getElementById("disability").checked;
       
        const state =
    document.getElementById("state").value;


    let schemes = [];


    /*
       STUDENT SCHEMES
    */

    if (occupation === "student") {

        schemes.push({
            name: "Post-Matric Scholarship",
            reason:
                "You selected student as your occupation. Scholarship schemes may support eligible students with educational expenses.",
            match: "High Match"
        });

    }


    /*
       FARMER SCHEMES
    */

    if (occupation === "farmer") {

        schemes.push({
            name: "PM-KISAN",
            reason:
                "You selected farmer as your occupation. PM-KISAN is designed to provide income support to eligible farmer families.",
            match: "High Match"
        });

        schemes.push({
            name: "Pradhan Mantri Fasal Bima Yojana",
            reason:
                "This scheme provides crop insurance support to eligible farmers against specified crop losses.",
            match: "Possible Match"
        });

    }


    /*
       LOW-INCOME HOUSEHOLDS
    */

    if (income === "low" || income === "medium") {

        schemes.push({
            name: "Ayushman Bharat - PM-JAY",
            reason:
                "Your selected income range may qualify you for certain government health-support programs, subject to official eligibility criteria.",
            match: "Possible Match"
        });

    }


    /*
       WOMEN
    */

    if (gender === "female") {

        schemes.push({
            name: "Women Welfare Schemes",
            reason:
                "You may be eligible for government programs designed to support women, depending on your location and other eligibility conditions.",
            match: "Possible Match"
        });

    }


    /*
       SC / ST / OBC
    */

    if (
        category === "sc" ||
        category === "st" ||
        category === "obc"
    ) {

        schemes.push({
            name: "Social Welfare & Scholarship Schemes",
            reason:
                "Your selected social category may make you eligible for specific scholarship and welfare programs.",
            match: "Possible Match"
        });

    }


    /*
       PERSON WITH DISABILITY
    */

    if (disability) {

        schemes.push({
            name: "Disability Welfare Schemes",
            reason:
                "You indicated that you are a person with disability. Government programs may provide support depending on disability type and eligibility.",
            match: "Possible Match"
        });

    }


    /*
       AGE BASED
    */

    if (age >= 60) {

        schemes.push({
            name: "Senior Citizen Welfare Schemes",
            reason:
                "Your age indicates that senior-citizen welfare programs may be relevant.",
            match: "Possible Match"
        });

    }

/*
    ADDITIONAL GOVERNMENT SCHEMES
*/

// Street vendors
if (occupation === "street vendor" || occupation === "vendor") {
    schemes.push({
        name: "Pradhan Mantri SVANidhi",
        reason:
            "You selected street-vendor related work. PM SVANidhi is designed to support eligible street vendors with working-capital assistance.",
        match: "High Match"
    });
}

// Business / self-employment
if (
    occupation === "business" ||
    occupation === "self-employed" ||
    occupation === "entrepreneur"
) {
    schemes.push({
        name: "Pradhan Mantri Mudra Yojana",
        reason:
            "Your occupation indicates business or self-employment. PM Mudra may provide institutional credit support to eligible micro and small business activities.",
        match: "High Match"
    });
}

// Women with lower income
if (gender === "female" && (income === "low" || income === "medium")) {
    schemes.push({
        name: "Pradhan Mantri Ujjwala Yojana",
        reason:
            "You selected female and a lower income range. Eligible adult women from qualifying households may be considered under PM Ujjwala.",
        match: "Possible Match"
    });
}

// Unorganised / eligible workers
if (
    occupation === "worker" ||
    occupation === "labour" ||
    occupation === "labor"
) {
    schemes.push({
        name: "Pradhan Mantri Shram Yogi Maandhan",
        reason:
            "Your occupation indicates worker-related employment. PM-SYM is intended for eligible workers in the unorganised sector who meet the applicable conditions.",
        match: "Possible Match"
    });
}

// Traditional artisans
if (
    occupation === "artisan" ||
    occupation === "craftsperson" ||
    occupation === "craftsman"
) {
    schemes.push({
        name: "PM Vishwakarma",
        reason:
            "Your occupation may fall within traditional artisan or craft work covered by PM Vishwakarma.",
        match: "High Match"
    });
}

// Skill development
if (
    occupation === "student" ||
    occupation === "unemployed" ||
    occupation === "job seeker"
) {
    schemes.push({
        name: "Pradhan Mantri Kaushal Vikas Yojana",
        reason:
            "Your profile indicates that skill development or vocational training may be relevant to you.",
        match: "Possible Match"
    });
}

// Housing support — currently based on lower income.
// We will add an Urban/Rural field later for more accurate matching.
if (income === "low") {
    schemes.push({
        name: "Pradhan Mantri Awas Yojana - Urban",
        reason:
            "Your selected income range may make you relevant for certain affordable-housing assistance categories. Final eligibility depends on the applicable PMAY-Urban criteria.",
        match: "Possible Match"
    });

    schemes.push({
        name: "Pradhan Mantri Awaas Yojana - Gramin",
        reason:

            "Your selected income range may make you relevant for certain rural-housing assistance categories. Final eligibility depends on the applicable PMAY-G criteria and beneficiary identification process.",
        match: "Possible Match"
    });
}

/*
   MAHARASHTRA STATE SCHEMES
*/

if (state === "maharashtra") {

    // Maharashtra health scheme
    schemes.push({
        name: "Mahatma Jyotirao Phule Jan Arogya Yojana",
        reason:
            "You selected Maharashtra as your state. This Maharashtra government health programme may be relevant to eligible beneficiaries, subject to the applicable government criteria.",
        match: "State Match"
    });

    // Maharashtra scholarship support
    if (occupation === "student") {

        schemes.push({
            name: "Maharashtra MahaDBT Scholarship Schemes",
            reason:
                "You selected Maharashtra as your state and student as your occupation. Maharashtra's MahaDBT portal provides multiple scholarship and education-support schemes, with eligibility depending on category, income, course and other criteria.",
            match: "State Match"
        });

    }
}

/*
   GUJARAT STATE SCHEMES
*/

// Gujarat Education Loan Scheme - Unreserved Category
if (
    state === "gujarat" &&
    occupation === "student" &&
    category === "general" &&
    (
        income === "low" ||
        income === "medium" ||
        income === "high"
    )
) {

    schemes.push({
        name: "Gujarat Education Loan Scheme",
        reason:
            "You selected Gujarat, student as your occupation and General category. The Gujarat Government provides an education-loan scheme for eligible Unreserved Category students, subject to the applicable income and scheme conditions.",
        match: "State Match",
        occupation: "student",
        category: "general"
    });

}

    /*
       IF NOTHING FOUND
    */

    if (schemes.length === 0) {

        schemes.push({
            name: "Explore Government Schemes",
            reason:
                "We could not identify a strong match from the information provided. Try checking additional government scheme databases.",
            match: "Explore"
        });

    }


    const userProfile = {
    age: age,
    gender: gender,
    income: income,
    occupation: occupation,
    category: category,
    disability: disability
};

schemes.forEach(function(scheme) {
    try {
        scheme.matchScore = calculateMatchScore(scheme, userProfile);
    } catch (error) {
        console.error("Match score error:", error);
        scheme.matchScore = 50;
    }
});

schemes.sort(function(a, b) {
    return b.matchScore - a.matchScore;
});

displayResults(schemes);

}


function displayResults(schemes) {

    const results =
        document.getElementById("results");


    let html = `

        <div class="results-header">

            <p class="section-label">
                PERSONALIZED RESULTS
            </p>

            <h2>
                Schemes You May Be Interested In
            </h2>

            <p>
                These are preliminary recommendations.
                Always verify eligibility on the official government portal.
            </p>

        </div>
<div class="scheme-search">
    <input
        type="text"
        id="schemeSearch"
        placeholder="🔎 Search government schemes..."
    >
</div>
        <div class="results-container">
    `;


    schemes.forEach(function(scheme) {

        html += `

            <div class="scheme-card">

                <div class="scheme-icon">
                    🏛️
                </div>

                <div class="scheme-content">

                    <span class="match">
                        ${scheme.match}
                    </span>

                    
                    <h3>
    ${scheme.name}
    <span class="match-score">
    ${scheme.matchScore || 0}%
    <span data-result-i18n="match">Match</span>
</span>
</h3>
<div class="recommendation-explanation">
<strong data-result-i18n="whyMatches">
    Why this matches you:
</strong>
    <p>${scheme.reason}</p>
</div>

<div class="recommendation-action">

    <button
        onclick="showSchemeInfo('${scheme.name}')"
        data-result-i18n="viewDetails">
        View Details →
    </button>

    <button
    type="button"
    class="compare-scheme-btn"
    data-result-i18n="compare"
    onclick="toggleSchemeComparison('${scheme.name}')">
    ⚖️ Compare
</button>
</div>

                </div>

            </div>

        `;

    });

 html +=
    '<div class="report-action">' +
        '<button class="download-report-btn" onclick="downloadRecommendationReport()">' +
            '📄 Download / Save Recommendation Report' +
        '</button>' +
    '</div>';

    results.innerHTML = html;
    // Apply the currently selected language to newly created results
const currentLanguage =
    localStorage.getItem("schemeSaathiLanguage") || "en";

changeLanguage(currentLanguage);

const searchInput = document.getElementById("schemeSearch");

searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase();

    const cards = document.querySelectorAll(".scheme-card");
    let visibleCards = 0;
 
    cards.forEach(function (card) {
        const schemeName = card.textContent.toLowerCase();

        if (schemeName.includes(searchText)) {
            card.style.display = "";
            visibleCards++;
        } else {
            card.style.display = "none";
        }
    });


let noResults = document.getElementById("noResultsMessage");

if (visibleCards === 0 && searchText !== "") {

    if (!noResults) {
        noResults = document.createElement("p");

        noResults.id = "noResultsMessage";

        noResults.textContent =
            "No government schemes found for your search.";

        noResults.style.textAlign = "center";
        noResults.style.padding = "30px";
        noResults.style.fontSize = "18px";
        noResults.style.fontWeight = "600";
        noResults.style.color = "#ffffff";

        const container = results.querySelector(".results-container");

        if (container) {
            container.appendChild(noResults);
        }
    }

} else if (noResults) {

    noResults.remove();

}

results.scrollIntoView({
    behavior: "smooth"
});

});
}
 function showSchemeInfo(name) {

    const schemeDetails = {

        "Mahatma Jyotirao Phule Jan Arogya Yojana": {
    icon: "🏥",
    title: "Mahatma Jyotirao Phule Jan Arogya Yojana",
    description:
        "A Maharashtra government health programme that provides healthcare support to eligible beneficiaries through participating hospitals.",
    benefits:
        "Eligible beneficiaries can receive healthcare services according to the applicable scheme rules and covered procedures.",
    eligibility:
        "Eligibility depends on the applicable Maharashtra government criteria, beneficiary category and other scheme requirements.",
    apply:
        "https://www.jeevandayee.gov.in/"
},

        "Maharashtra MahaDBT Scholarship Schemes": {
    icon: "🎓",
    title: "Maharashtra MahaDBT Scholarship Schemes",
    description:
        "Maharashtra's MahaDBT platform provides access to multiple government scholarship and education-support schemes for eligible students.",
    benefits:
        "Eligible students may receive scholarship or education-related financial assistance depending on the applicable scheme.",
    eligibility:
        "Eligibility varies by scholarship and may depend on factors such as category, family income, course, institution, domicile and other applicable conditions.",
    apply:
        "https://mahadbt.maharashtra.gov.in/"
},


        "Post-Matric Scholarship": {
            icon: "🎓",
            title: "Post-Matric Scholarship",
            description:
                "Scholarship support for eligible students studying after the matriculation level.",
            benefits:
                "Financial assistance may be available to eligible students for continuing their education.",
            eligibility:
                "Eligibility depends on the specific scholarship, social category, course, institution, income and other conditions.",
            apply:
                "https://scholarships.gov.in/"
        },

        "PM-KISAN": {
            icon: "🌾",
            title: "PM-KISAN Samman Nidhi",
            description:
                "A Central Sector scheme providing income support to eligible landholding farmer families.",
            benefits:
                "Eligible farmer families can receive ₹6,000 per year in three equal instalments, subject to scheme conditions.",
            eligibility:
                "Landholding farmer status and several exclusion conditions are considered. Final eligibility must be checked through the official PM-KISAN system.",
            apply:
                "https://pmkisan.gov.in/"
        },

        "Pradhan Mantri Fasal Bima Yojana": {
            icon: "🌱",
            title: "Pradhan Mantri Fasal Bima Yojana",
            description:
                "A crop insurance programme designed to provide financial protection to eligible farmers against specified crop losses.",
            benefits:
                "Provides insurance support against covered crop losses according to the applicable scheme rules.",
            eligibility:
                "Eligibility and coverage depend on crop, area, season, notified conditions and other applicable requirements.",
            apply:
                "https://pmfby.gov.in/"
        },

        "Ayushman Bharat - PM-JAY": {
            icon: "🏥",
            title: "Ayushman Bharat - PM-JAY",
            description:
                "A government health-support programme for eligible beneficiaries.",
            benefits:
                "Eligible beneficiaries can receive healthcare coverage according to the PM-JAY rules.",
            eligibility:
                "Eligibility is determined using the applicable government beneficiary database and scheme rules.",
            apply:
                "https://mera.pmjay.gov.in/"
        },

        "Women Welfare Schemes": {
            icon: "👩",
            title: "Women Welfare Schemes",
            description:
                "A category of government programmes designed to support women through different welfare and development initiatives.",
            benefits:
                "Benefits vary by scheme and may include financial, educational, livelihood or social support.",
            eligibility:
                "Eligibility depends on the individual scheme, state, age, income and other conditions.",
            apply:
                "https://www.myscheme.gov.in/"
        },

        "Social Welfare & Scholarship Schemes": {
            icon: "📚",
            title: "Social Welfare & Scholarship Schemes",
            description:
                "Government welfare and education programmes may be available for eligible SC, ST, OBC and other beneficiary groups.",
            benefits:
                "Benefits vary by scheme and can include scholarships, education support and welfare assistance.",
            eligibility:
                "Eligibility depends on the specific scheme, category, income, education and other conditions.",
            apply:
                "https://www.myscheme.gov.in/"
        },

        "Disability Welfare Schemes": {
            icon: "♿",
            title: "Disability Welfare Schemes",
            description:
                "Government programmes supporting eligible persons with disabilities.",
            benefits:
                "Benefits vary by programme and may include educational, financial and social support.",
            eligibility:
                "Eligibility depends on disability status, documentation, age, education, income and scheme-specific conditions.",
            apply:
                "https://www.myscheme.gov.in/"
        },

        "Senior Citizen Welfare Schemes": {
            icon: "👴",
            title: "Senior Citizen Welfare Schemes",
            description:
                "Government programmes that may provide support to eligible senior citizens.",
            benefits:
                "Benefits vary according to the particular senior-citizen welfare programme.",
            eligibility:
                "Eligibility depends on age, income, residence and the specific scheme requirements.",
            apply:
                "https://www.myscheme.gov.in/"
        },

        "Explore Government Schemes": {
            icon: "🔎",
            title: "Explore Government Schemes",
            description:
                "Search the official government scheme database for additional programmes.",
            benefits:
                "You can discover Central Government and State/UT schemes based on your profile.",
            eligibility:
                "Each scheme has its own eligibility requirements.",
            apply:
                "https://www.myscheme.gov.in/"
        },
            "Pradhan Mantri SVANidhi": {
            icon: "🛒",
            title: "Pradhan Mantri SVANidhi",
            description:
                "A government scheme that provides working-capital support to eligible street vendors.",
            benefits:
                "Eligible street vendors can receive working-capital loans in successive tranches, subject to the applicable scheme conditions and repayment requirements.",
            eligibility:
                "Generally intended for eligible street vendors covered by the applicable PM SVANidhi guidelines. Final eligibility should be verified on the official portal.",
            apply:
                "https://pmsvanidhi.mohua.gov.in/"
        },

        "Pradhan Mantri Mudra Yojana": {
            icon: "💼",
            title: "Pradhan Mantri Mudra Yojana",
            description:
                "A government credit scheme supporting eligible micro and small business activities through participating lending institutions.",
            benefits:
                "Provides access to institutional credit for eligible micro-enterprises and business activities, subject to applicable lending and scheme conditions.",
            eligibility:
                "Eligibility depends on the nature of the business, applicant and lending institution requirements. Final eligibility and loan terms should be verified before applying.",
            apply:
                "https://www.myscheme.gov.in/schemes/pmmy"
        },

        "Pradhan Mantri Awas Yojana - Urban": {
            icon: "🏠",
            title: "Pradhan Mantri Awas Yojana - Urban",
            description:
                "A housing programme supporting eligible beneficiaries in urban areas through applicable housing assistance mechanisms.",
            benefits:
                "Eligible beneficiaries may receive housing assistance under the applicable PMAY-Urban component and current guidelines.",
            eligibility:
                "Eligibility depends on the applicable PMAY-Urban component, household circumstances, income and other government criteria.",
            apply:
                "https://www.pmay-urban.gov.in/"
        },

        "Pradhan Mantri Awaas Yojana - Gramin": {
            icon: "🏡",
            title: "Pradhan Mantri Awaas Yojana - Gramin",
            description:
                "A rural housing programme intended to support eligible rural households in obtaining pucca housing with basic amenities.",
            benefits:
                "Eligible rural households may receive housing assistance according to the applicable PMAY-G guidelines.",
            eligibility:
                "Eligibility is determined using the applicable government criteria and beneficiary identification process. Final eligibility should be verified through the official system.",
            apply:
                  "https://pmayg.nic.in/"
        },

        "Pradhan Mantri Ujjwala Yojana": {
            icon: "🔥",
            title: "Pradhan Mantri Ujjwala Yojana",
            description:
                "A government programme providing LPG connections to eligible adult women from qualifying poor households.",
            benefits:
                "Eligible beneficiaries can receive assistance for an LPG connection according to the current PMUY provisions, including applicable connection support.",
            eligibility:
                "The current PMUY information specifies an adult woman aged 18 or above from a qualifying poor household, with no other LPG connection in the household, subject to the applicable criteria.",
            apply:
                "https://www.pmuy.gov.in/"
        },

        "Pradhan Mantri Shram Yogi Maandhan": {
            icon: "👷",
            title: "Pradhan Mantri Shram Yogi Maandhan",
            description:
                "A contributory pension scheme intended for eligible unorganised workers.",
            benefits:
                "Provides pension-related social-security support to eligible subscribers according to the scheme rules and contribution requirements.",
            eligibility:
                "Eligibility depends on age, occupation, income and other conditions prescribed under PM-SYM.",
            apply:
                "https://www.myscheme.gov.in/schemes/pm-sym"
        },

        "PM Vishwakarma": {
            icon: "🛠️",
            title: "PM Vishwakarma",
            description:
                "A government scheme supporting eligible artisans and craftspeople working in traditional trades.",
            benefits:
                "Eligible artisans may receive support such as recognition, skill development, toolkit assistance, credit-related support and other benefits according to the applicable scheme provisions.",
            eligibility:
                "Eligibility depends on the eligible traditional trade, age and other conditions specified under PM Vishwakarma.",
            apply:
                "https://www.pmvishwakarma.gov.in/"
        },

        "Pradhan Mantri Kaushal Vikas Yojana": {
            icon: "🎓",
            title: "Pradhan Mantri Kaushal Vikas Yojana",
            description:
                "A skill-development programme supporting eligible candidates through approved training and skill-related initiatives.",
            benefits:
                "Eligible candidates can access approved skill-development and training opportunities under applicable PMKVY components.",
            eligibility:
                "Eligibility varies according to the applicable training programme, candidate requirements and current scheme guidelines.",
            apply:
                "https://www.myscheme.gov.in/"
    },

"Gujarat Education Loan Scheme": {
    icon: "🎓",
    title: "Gujarat Education Loan Scheme",
    description:
        "An education loan assistance scheme of the Government of Gujarat for eligible Unreserved Category students pursuing higher education.",
    benefits:
        "Education loan assistance of up to ₹10 lakh, subject to the applicable Gujarat Government scheme conditions.",
    eligibility:
        "Eligible Unreserved Category students with family income below ₹6 lakh, subject to the applicable scheme guidelines.",
    apply:
        "https://sje.gujarat.gov.in/"
},


};

    const scheme = schemeDetails[name];

    if (!scheme) {
        alert(
            "Scheme information is currently unavailable. " +
            "Please check the official government scheme portal."
        );

        return;
    }


    const existingModal =
        document.getElementById("schemeModal");

    if (existingModal) {
        existingModal.remove();
    }


    const modal = document.createElement("div");

    modal.id = "schemeModal";

    modal.innerHTML = `

        <div class="modal-overlay"
             onclick="closeSchemeModal(event)">

            <div class="scheme-modal"
                 onclick="event.stopPropagation()">

                <button
                    class="modal-close"
                    onclick="closeSchemeModal()">
                    ×
                </button>

                <div class="modal-icon">
                    ${scheme.icon}
                </div>

            <span class="modal-label" data-i18n="detailGovernment">
    GOVERNMENT SCHEME
</span>

                <h2>
                    ${scheme.title}
                </h2>

                <p class="modal-description">
                    ${scheme.description}
                </p>

                <div class="detail-box">

                 <h3 data-i18n="benefits">🎁 Benefits</h3>

                    <p>
                        ${scheme.benefits}
                    </p>

                </div>


                <div class="detail-box">

                    <h3 data-i18n="eligibility">✅ Eligibility</h3>

                    <p>
                        ${scheme.eligibility}
                    </p>

                </div>


                <div class="official-note">

                    <strong data-i18n="important">
    Important:
</strong>

                    This recommendation is only a
                    preliminary match. Final eligibility
                    should always be verified on the
                    official government portal.

                </div>


                <a
                    class="apply-button"
                    href="${scheme.apply}"
                    target="_blank"
                    rel="noopener noreferrer">

                    <span data-i18n="officialPortal">
    Visit Official Portal →
</span>
                    
                </a>

            </div>

        </div>

    `;

    document.body.appendChild(modal);
   
    modal.scrollIntoView({
    behavior: "smooth",
    block: "center"
});
    
    const currentLanguage =
    localStorage.getItem("schemeSaathiLanguage") || "en";

changeLanguage(currentLanguage);

}

function closeSchemeModal(event) {

    // If the user clicks inside the modal content,
    // do not close the modal.
    if (
        event &&
        event.target &&
        event.target.classList.contains("scheme-modal")
    ) {
        return;
    }

    const modal = document.getElementById("schemeModal");

    if (modal) {
        modal.remove();
    }
}
// Calculate a preliminary match score for a government scheme
function calculateMatchScore(scheme, userProfile) {
    if (!scheme || !userProfile) {
        return 0;
    }

    let score = 0;
    let totalCriteria = 0;

    // Age matching
    if (
        scheme.ageMin !== undefined &&
        scheme.ageMax !== undefined &&
        userProfile.age !== undefined &&
        userProfile.age !== ""
    ) {
        totalCriteria++;

        if (
            Number(userProfile.age) >= Number(scheme.ageMin) &&
            Number(userProfile.age) <= Number(scheme.ageMax)
        ) {
            score++;
        }
    }

    // Gender matching
    if (scheme.gender && userProfile.gender) {
        totalCriteria++;

        if (
            scheme.gender.toLowerCase() ===
            userProfile.gender.toLowerCase()
        ) {
            score++;
        }
    }

    // Category matching
    if (scheme.category && userProfile.category) {
        totalCriteria++;

        if (
            scheme.category.toLowerCase() ===
            userProfile.category.toLowerCase()
        ) {
            score++;
        }
    }

    // Occupation matching
    if (scheme.occupation && userProfile.occupation) {
        totalCriteria++;

        if (
            scheme.occupation.toLowerCase() ===
            userProfile.occupation.toLowerCase()
        ) {
            score++;
        }
    }

    // Disability matching
    if (scheme.disability !== undefined) {
        totalCriteria++;

        if (
            Boolean(scheme.disability) ===
            Boolean(userProfile.disability)
        ) {
            score++;
        }
    }

    // Income-range matching
    if (scheme.income && userProfile.income) {
        totalCriteria++;

        if (
            scheme.income.toLowerCase() ===
            userProfile.income.toLowerCase()
        ) {
            score++;
        }
    }

    // Use the existing recommendation level when
    // detailed scheme criteria are not available.
    if (totalCriteria === 0) {
        if (scheme.match === "High Match") {
            return 90;
        }

        if (scheme.match === "Possible Match") {
            return 70;
        }

        if (scheme.match === "Explore") {
            return 40;
        }

        return 50;
    }

    return Math.round((score / totalCriteria) * 100);
}
// ===============================
// VOICE ASSISTANT
// ===============================

const voiceButton = document.getElementById("voiceButton");
const voiceStatus = document.getElementById("voiceStatus");
const voiceText = document.getElementById("voiceText");

if (voiceButton && voiceStatus && voiceText) {

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        voiceButton.disabled = true;
        voiceStatus.textContent =
            "Voice recognition is not supported in this browser.";

    } else {

        const recognition = new SpeechRecognition();

        recognition.lang = "en-IN";
        recognition.continuous = false;
        recognition.interimResults = false;

        voiceButton.addEventListener("click", function () {

            voiceStatus.textContent = "🎙️ Listening... Please speak.";
            voiceText.textContent = "";

            try {
                recognition.start();
            } catch (error) {
                console.log("Voice recognition already running.");
            }

        });

        recognition.onresult = function (event) {

            const spokenText =
                event.results[0][0].transcript;

            voiceText.textContent =
                "You said: " + spokenText;

            voiceStatus.textContent =
                "✅ Voice captured successfully.";

            console.log("User said:", spokenText);
        };

        recognition.onerror = function (event) {

            console.log("Speech recognition error:", event.error);

            if (event.error === "not-allowed") {

                voiceStatus.textContent =
                    "❌ Microphone permission was denied.";

            } else {

                voiceStatus.textContent =
                    "❌ Could not hear you. Please try again.";
            }
        };

        recognition.onend = function () {

            if (voiceStatus.textContent.includes("Listening")) {
                voiceStatus.textContent =
                    "Click the microphone and try again.";
            }

        };
    }
}
// Profile form voice assistant
const profileVoiceButton = document.getElementById("profileVoiceButton");
const profileVoiceStatus = document.getElementById("profileVoiceStatus");
const profileVoiceText = document.getElementById("profileVoiceText");

if (profileVoiceButton) {

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        profileVoiceButton.disabled = true;
        profileVoiceStatus.textContent =
            "Voice recognition is not supported in this browser.";

    } else {

        const profileRecognition = new SpeechRecognition();

        profileRecognition.lang = "en-IN";
        profileRecognition.continuous = false;
        profileRecognition.interimResults = false;

        profileVoiceButton.addEventListener("click", function () {

            profileVoiceStatus.textContent = "🎙️ Listening... Please speak.";
            profileVoiceText.textContent = "";

            try {
                profileRecognition.start();
            } catch (error) {
                console.log("Voice recognition already running.");
            }

        });

        profileRecognition.onresult = function (event) {

    const spokenText = event.results[0][0].transcript;

    profileVoiceText.textContent =
        "You said: " + spokenText;

    profileVoiceStatus.textContent =
        "✅ Requirement captured.";

    console.log("User said:", spokenText);


    // Convert spoken text to lowercase
    const text = spokenText.toLowerCase();


    // ---------- AGE ----------
    const ageMatch = text.match(/\bage\s*(?:is|of)?\s*(\d{1,3})\b/);

    if (ageMatch) {
        document.getElementById("age").value = ageMatch[1];
    }


    // ---------- GENDER ----------
    const genderSelect = document.getElementById("gender");

    if (genderSelect) {

        if (text.includes("male")) {
            selectOptionByText(genderSelect, "male");
        }

        else if (text.includes("female")) {
            selectOptionByText(genderSelect, "female");
        }
    }


    // ---------- STATE ----------
    const stateSelect = document.getElementById("state");

    if (stateSelect) {

        const states = [
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal"
        ];

        for (const state of states) {

            if (text.includes(state.toLowerCase())) {

                selectOptionByText(stateSelect, state);
                break;
            }
        }
    }


    // ---------- INCOME ----------
    const incomeSelect = document.getElementById("income");

    if (incomeSelect) {

        if (
            text.includes("below 1,00,000") ||
            text.includes("below 100000") ||
            text.includes("below one lakh") ||
            text.includes("less than one lakh") ||
            text.includes("less than 1 lakh")
        ) {

            selectOptionByText(
                incomeSelect,
                "Below ₹1 Lakh"
            );

        } else if (
            text.includes("1 lakh") ||
            text.includes("100000")
        ) {

            selectOptionByText(
                incomeSelect,
                "₹1 Lakh - ₹2.5 Lakh"
            );
        }
    }


    // ---------- OCCUPATION ----------
    const occupationSelect =
        document.getElementById("occupation");

    if (occupationSelect) {

        if (text.includes("student")) {

            selectOptionByText(
                occupationSelect,
                "Student"
            );

        } else if (text.includes("farmer")) {

            selectOptionByText(
                occupationSelect,
                "Farmer"
            );

        } else if (text.includes("employee")) {

            selectOptionByText(
                occupationSelect,
                "Employee"
            );

        } else if (text.includes("unemployed")) {

            selectOptionByText(
                occupationSelect,
                "Unemployed"
            );
        }
    }


    // ---------- CATEGORY ----------
    const categorySelect =
        document.getElementById("category");

    if (categorySelect) {

        if (text.includes("general")) {

            selectOptionByText(
                categorySelect,
                "General"
            );

        } else if (text.includes("obc")) {

            selectOptionByText(
                categorySelect,
                "OBC"
            );

        } else if (text.includes("sc")) {

            selectOptionByText(
                categorySelect,
                "SC"
            );

        } else if (text.includes("st")) {

            selectOptionByText(
                categorySelect,
                "ST"
            );
        }
    }


    // Allow the browser to update the form fields
    setTimeout(function () {

        const form =
            document.getElementById("profileForm");

        if (form) {

            // Automatically submit the completed profile
            form.requestSubmit();
        }

    }, 700);
};

        profileRecognition.onerror = function (event) {

            console.log("Speech recognition error:", event.error);

            if (event.error === "not-allowed") {

                profileVoiceStatus.textContent =
                    "❌ Microphone permission was denied.";

            } else {

                profileVoiceStatus.textContent =
                    "❌ Could not hear you. Please try again.";
            }
        };

        profileRecognition.onend = function () {

            if (profileVoiceStatus.textContent.includes("Listening")) {

                profileVoiceStatus.textContent =
                    "Click the microphone and try again.";
            }
        };
    }
}
function selectOptionByText(selectElement, searchText) {

    const options = selectElement.options;

    for (let i = 0; i < options.length; i++) {

        const optionText =
            options[i].textContent.trim().toLowerCase();

        const search =
            searchText.trim().toLowerCase();

        if (
            optionText === search ||
            optionText.includes(search) ||
            search.includes(optionText)
        ) {

            selectElement.selectedIndex = i;

            selectElement.dispatchEvent(
                new Event("change", { bubbles: true })
            );

            return true;
        }
    }

    console.log(
        "Option not found:",
        searchText
    );

    return false;
}
function downloadRecommendationReport() {

    const resultsSection = document.querySelector(".results-container");

    if (!resultsSection) {
        alert("No recommendation results are available.");
        return;
    }

    const reportWindow = window.open("", "_blank");

    if (!reportWindow) {
        alert("Please allow pop-ups in your browser to generate the report.");
        return;
    }

    reportWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Government Scheme Recommendation Report</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 40px;
                    color: #222;
                    background: #ffffff;
                }

                .report-header {
                    text-align: center;
                    border-bottom: 3px solid #333;
                    padding-bottom: 15px;
                    margin-bottom: 25px;
                }

                .report-header h1 {
                    margin: 0;
                    font-size: 28px;
                }

                .report-header p {
                    margin-top: 8px;
                    color: #555;
                }

                .scheme-card {
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    padding: 18px;
                    margin-bottom: 20px;
                    page-break-inside: avoid;
                }

                .scheme-card h3 {
                    margin-top: 8px;
                    font-size: 20px;
                }

                .match {
                    display: inline-block;
                    padding: 5px 10px;
                    border-radius: 5px;
                    background: #eeeeee;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .recommendation-explanation {
                    margin-top: 10px;
                }

                .recommendation-action,
                .report-action,
                .scheme-search {
                    display: none !important;
                }

                .report-footer {
                    margin-top: 35px;
                    padding-top: 15px;
                    border-top: 1px solid #ccc;
                    font-size: 13px;
                    color: #666;
                    text-align: center;
                }

                @media print {
                    body {
                        margin: 20px;
                    }
                }
            </style>
        </head>

        <body>

            <div class="report-header">
                <h1>Government Scheme Recommendation Report</h1>
                <p>Personalized recommendations generated by Government Scheme AI Assistant</p>
                <p>Generated on: ${new Date().toLocaleString()}</p>
            </div>

            ${resultsSection.innerHTML}

            <div class="report-footer">
                <p>
                    This report provides preliminary recommendations only.
                </p>
                <p>
                    Please verify eligibility and application details on the
                    official government portal before applying.
                </p>
            </div>

        </body>
        </html>
    `);

    reportWindow.document.close();

    reportWindow.onload = function () {
        reportWindow.focus();
        reportWindow.print();
    };
}
// ==========================================
// ==========================================
// SCHEME SAATHI - COMPLETE MULTI-LANGUAGE SYSTEM
// English | Hindi | Marathi
// ==========================================

const translations = {
    en: {
        navHome:"Home",
        navAbout:"About Us",
        navSchemes:"Schemes",
        navContact:"Contact",

        heroTagline:"AI-POWERED GOVERNMENT SCHEME ASSISTANT",
        heroTitle:"Find Government Schemes",
        heroTitleSpan:"Made for You",
        heroDescription:"Get personalized government scheme recommendations based on your age, income, occupation, location and other personal information.",
        findSchemes:"Find My Schemes →",

        heroCardTitle:"Smart Recommendations",
        aiDescription:"Smart recommendations for citizens",
        personalized:"✓ Personalized scheme matching",
        easyEligibility:"✓ Easy eligibility checking",
        governmentInfo:"✓ Government scheme information",

        aboutLabel:"ABOUT THE PROJECT",
        aboutTitle:"One Assistant. Many Government Benefits.",
        aboutText:"SchemeSaathi is an AI-powered assistant designed to help citizens discover government schemes that may be relevant to their personal profile.",

        profileTitle:"Tell Us About Yourself",
        profileDescription:"Enter your details and our recommendation system will find government schemes that may be suitable for you.",

        assistantLabel:"SCHEME ASSISTANT",
        assistantTitle:"Let's Find Schemes For You",
        assistantText:"Click below to start your personalized scheme search.",
        startProfile:"Start Profile →",

        voiceRequirements:"🎤 Speak Your Requirements",
        voiceStatus:"Click the microphone and tell us what you need.",

        whyLabel:"WHY SCHEMESAATHI?",
        whyTitle:"One Smart Place for Government Schemes",
        whyDescription:"SchemeSaathi helps citizens discover relevant government schemes through a simple, personalized and user-friendly process.",

        howLabel:"HOW IT WORKS",
        howTitle:"Simple. Smart. Personalized.",

        step1Title:"1. Create Your Profile",
        step1Text:"Enter basic information about yourself.",
        step2Title:"2. AI Analysis",
        step2Text:"The system analyzes your profile and eligibility.",
        step3Title:"3. Get Recommendations",
        step3Text:"Receive government schemes matched to your profile.",

        stepOneTitle:"Enter Your Details",
        stepOneText:"Provide basic information such as your age, occupation, income and other eligibility details.",
        stepTwoTitle:"AI Checks Your Profile",
        stepTwoText:"SchemeSaathi analyzes your information and compares it with available government scheme criteria.",
        stepThreeTitle:"Get Matching Schemes",
        stepThreeText:"Receive personalized scheme recommendations with matched percentages, benefits and eligibility details.",
        howDescription:"SchemeSaathi makes it easier to discover government schemes that may be relevant to you.",

        featureAI:"AI-Powered Recommendations",
        featureAIDescription:"Get scheme recommendations based on your profile, including age, occupation, income and other details.",
        featureMatching:"Personalized Matching",
        featureMatchingDescription:"Schemes are matched with your information and displayed with an easy-to-understand match percentage.",
        featureEligibility:"Eligibility Information",
        featureEligibilityDescription:"Understand the important eligibility conditions, benefits and other information before applying.",
        featurePortals:"Official Government Portals",
        featurePortalsDescription:"Access the official scheme portal directly from the recommendation details.",

        age:"Age",
        gender:"Gender",
        state:"State",
        income:"Annual Family Income",
        occupation:"Occupation",
        category:"Category",

        agePlaceholder:"Enter your age",
        genderPlaceholder:"Select gender",
        statePlaceholder:"Select your state",
        incomePlaceholder:"Select income range",
        occupationPlaceholder:"Select occupation",
        categoryPlaceholder:"Select category",

        disability:"I am a person with disability",

        selectGender:"Select gender",
        male:"Male",
        female:"Female",
        other:"Other",

        selectState:"Select your state",
        maharashtra:"Maharashtra",
        gujarat:"Gujarat",
        madhya_pradesh:"Madhya Pradesh",
        telangana:"Telangana",
        karnataka:"Karnataka",
        rajasthan:"Rajasthan",
        delhi:"Delhi",
        uttarPradesh:"Uttar Pradesh",
        bihar:"Bihar",

        selectIncome:"Select income range",
        lowIncome:"Below ₹1 Lakh",
        mediumIncome:"₹1 - ₹3 Lakh",
        highIncome:"₹3 - ₹5 Lakh",
        veryHighIncome:"Above ₹5 Lakh",

        selectOccupation:"Select occupation",
        student:"Student",
        farmer:"Farmer",
        employee:"Employee",
        business:"Business Owner",
        unemployed:"Unemployed",

        selectCategory:"Select category",
        general:"General",
        obc:"OBC",
        sc:"SC",
        st:"ST",

        personalizedSearch:"PERSONALIZED SCHEME SEARCH",
        profileIntro:"Enter your details and our recommendation system will find government schemes that may be suitable for you.",
personalizedRecommendations:"Personalized Recommendations",
personalizedRecommendationsDescription:"Get government scheme suggestions based on your personal profile, needs and eligibility.",
easyEligibilityCheck:"Easy Eligibility Check",
easyEligibilityCheckDescription:"Quickly understand which schemes you may be eligible for and what documents you may need.",
        speakRequirements:"🎤 Speak Your Requirements",
        findSuitable:"🔍 Find Suitable Schemes", 
        saveProfile:"💾 Save My Profile",
loadProfile:"👤 Load Saved Profile",

        resultsLabel:"PERSONALIZED RESULTS",
        resultsTitle:"Schemes You May Be Interested In",
        resultsIntro:"These are preliminary recommendations. Always verify eligibility on the official government portal.",
        schemeSearch:"🔎 Search government schemes...",
        match:"Match",
        whyMatches:"Why this matches you:",
        viewDetails:"View Details →",
        compare: "⚖️ Compare",

        downloadReport:"📄 Download / Save Recommendation Report",
        noResults:"No government schemes found for your search.",

        impactLabel:"SCHEMESAATHI AT A GLANCE",
        impactTitle:"Making Government Schemes Easier to Discover",
        impactDescription:"A simple digital assistant designed to help citizens discover schemes that may be relevant to their profile.",

        impactSchemes:"Government Schemes",
        impactSchemesText:"Scheme information available for different citizen needs.",
        impactCriteria:"Matching Criteria",
        impactCriteriaText:"Profile information used to calculate scheme relevance.",
        impactResults:"Personalized Results",
        impactResultsText:"Recommendations are generated according to the user's profile.",
        impactPortals:"Official Portals",
        impactPortalsText:"Users can visit the relevant official scheme portal.",

        faqLabel:"FAQ",
        faqTitle:"Frequently Asked Questions",
        faqDescription:"Find quick answers about SchemeSaathi and how it helps users discover government schemes.",

        faq1:"What is SchemeSaathi?",
        faq1a:"SchemeSaathi is an AI-powered government scheme assistant that helps citizens discover government schemes that may be relevant to their personal profile.",

        faq2:"How does SchemeSaathi recommend schemes?",
        faq2a:"SchemeSaathi uses information provided in the user's profile, such as age, occupation, category, income and other available criteria, to calculate a preliminary matching score for government schemes.",

        faq3:"What information is used for matching?",
        faq3a:"Depending on the scheme, the system can consider profile information such as age, gender, category, occupation, disability status and income.",

        faq4:"Does SchemeSaathi guarantee my eligibility?",
        faq4a:"No. The recommendations are preliminary and final eligibility must always be verified using the applicable official government scheme guidelines.",

        faq5:"Can I visit the official government portal?",
        faq5a:"Yes. Scheme details include a link to the relevant official government portal whenever an official link is available.",

        faq6:"Can I save my recommendation report?",
        faq6a:"Yes. After receiving recommendations, users can use the Download / Save Recommendation Report option to generate a printable report that can be saved as a PDF.",

        contactAssistant:"AI Assistant for Government Schemes",
        hackathon:"PO7 — Internal Hackathon 2026",
        footer:"© 2026 SchemeSaathi | Government Scheme AI Assistant",

        whyCard1:"AI-Based Recommendations",
        whyCard1Text:"SchemeSaathi analyzes the information provided by the user and suggests government schemes that may be relevant.",

        whyCard2:"Personalized Matching",
        whyCard2Text:"Get scheme recommendations based on your profile, eligibility details and selected requirements.",

        whyCard3:"Easy to Discover",
        whyCard3Text:"Search and explore government schemes through a simple, user-friendly interface.",

        whyCard4:"Official Portal Links",
        whyCard4Text:"Quickly access the official government portal to verify scheme details and eligibility.",

        secondWhyTitle:"One Smart Place for Government Schemes",
        secondWhyText:"SchemeSaathi helps citizens discover relevant government schemes through a simple, personalized and user-friendly process.",

        detailGovernment:"GOVERNMENT SCHEME",
        benefits:"🎁 Benefits",
        eligibility:"✅ Eligibility",
        important:"Important:",
        officialPortal:"Visit Official Portal →"
    },

    hi: {
        navHome:"होम",
        navAbout:"हमारे बारे में",
        navSchemes:"योजनाएं",
        navContact:"संपर्क",

        heroTagline:"एआई-संचालित सरकारी योजना सहायक",
        heroTitle:"अपने लिए सरकारी योजनाएं खोजें",
        heroTitleSpan:"आपके लिए बनाई गई",
        heroDescription:"अपनी आयु, आय, व्यवसाय, स्थान और अन्य व्यक्तिगत जानकारी के आधार पर व्यक्तिगत सरकारी योजना की सिफारिशें प्राप्त करें।",
        findSchemes:"मेरी योजनाएं खोजें →",

        heroCardTitle:"स्मार्ट सिफारिशें",
        aiDescription:"नागरिकों के लिए स्मार्ट योजना सिफारिशें",
        personalized:"✓ व्यक्तिगत योजना मिलान",
        easyEligibility:"✓ आसान पात्रता जांच",
        governmentInfo:"✓ सरकारी योजना की जानकारी",

        aboutLabel:"परियोजना के बारे में",
        aboutTitle:"एक सहायक। अनेक सरकारी लाभ।",
        aboutText:"SchemeSaathi एक एआई-संचालित सहायक है जो नागरिकों को उनकी व्यक्तिगत प्रोफ़ाइल के लिए उपयुक्त सरकारी योजनाएं खोजने में मदद करता है।",

        profileTitle:"अपने बारे में बताएं",
        profileDescription:"अपनी जानकारी दर्ज करें और हमारी सिफारिश प्रणाली आपके लिए उपयुक्त सरकारी योजनाएं खोजेगी।",

        assistantLabel:"योजना सहायक",
        assistantTitle:"आइए आपके लिए योजनाएं खोजें",
        assistantText:"व्यक्तिगत योजना खोज शुरू करने के लिए नीचे क्लिक करें।",
        startProfile:"प्रोफ़ाइल शुरू करें →",

        voiceRequirements:"🎤 अपनी आवश्यकता बताएं",
        voiceStatus:"माइक्रोफोन पर क्लिक करें और बताएं कि आपको क्या चाहिए।",

        whyLabel:"SCHEMESAATHI क्यों?",
        whyTitle:"सरकारी योजनाओं के लिए एक स्मार्ट स्थान",
        whyDescription:"SchemeSaathi सरल, व्यक्तिगत और उपयोगकर्ता-अनुकूल प्रक्रिया के माध्यम से नागरिकों को संबंधित सरकारी योजनाएं खोजने में मदद करता है।",

        howLabel:"यह कैसे काम करता है",
        howTitle:"सरल। स्मार्ट। व्यक्तिगत।",

        step1Title:"1. अपनी प्रोफ़ाइल बनाएं",
        step1Text:"अपने बारे में मूल जानकारी दर्ज करें.",
        step2Title:"2. एआई विश्लेषण",
        step2Text:"सिस्टम आपकी प्रोफ़ाइल और पात्रता का विश्लेषण करता है।",
        step3Title:"3. सिफारिशें प्राप्त करें",
        step3Text:"अपनी प्रोफ़ाइल से मेल खाने वाली सरकारी योजनाएं प्राप्त करें।",

        stepOneTitle:"अपनी जानकारी दर्ज करें",
        stepOneText:"अपनी आयु, व्यवसाय, आय और अन्य पात्रता संबंधी जानकारी दें।",
        stepTwoTitle:"एआई आपकी प्रोफ़ाइल जांचता है",
        stepTwoText:"SchemeSaathi आपकी जानकारी का विश्लेषण करके सरकारी योजनाओं के मानदंडों से तुलना करता है।",
        stepThreeTitle:"मेल खाने वाली योजनाएं प्राप्त करें",
        stepThreeText:"अपनी प्रोफ़ाइल के अनुसार व्यक्तिगत योजना सिफारिशें प्राप्त करें।",
        howDescription:"SchemeSaathi उन सरकारी योजनाओं को खोजने में आसान बनाता है जो आपके लिए प्रासंगिक हो सकती हैं।",

        featureAI:"एआई-संचालित सिफारिशें",
        featureAIDescription:"अपनी प्रोफ़ाइल, आयु, व्यवसाय, आय और अन्य विवरणों के आधार पर योजना सिफारिशें प्राप्त करें।",
        featureMatching:"व्यक्तिगत मिलान",
        featureMatchingDescription:"आपकी जानकारी के साथ योजनाओं का मिलान किया जाता है और आसान प्रतिशत में दिखाया जाता है।",
        featureEligibility:"पात्रता की जानकारी",
        featureEligibilityDescription:"आवेदन करने से पहले महत्वपूर्ण पात्रता शर्तों और लाभों को समझें।",
        featurePortals:"आधिकारिक सरकारी पोर्टल",
        featurePortalsDescription:"सिफारिश के विवरण से सीधे आधिकारिक योजना पोर्टल पर जाएं।",

        age:"आयु",
        gender:"लिंग",
        state:"राज्य",
        income:"वार्षिक पारिवारिक आय",
        occupation:"व्यवसाय",
        category:"श्रेणी",

        agePlaceholder:"अपनी आयु दर्ज करें",
        genderPlaceholder:"लिंग चुनें",
        statePlaceholder:"अपना राज्य चुनें",
        incomePlaceholder:"आय श्रेणी चुनें",
        occupationPlaceholder:"व्यवसाय चुनें",
        categoryPlaceholder:"श्रेणी चुनें",

        disability:"मैं दिव्यांग व्यक्ति हूं",

        selectGender:"लिंग चुनें",
        male:"पुरुष",
        female:"महिला",
        other:"अन्य",

        selectState:"अपना राज्य चुनें",
        maharashtra:"महाराष्ट्र",
        gujarat:"गुजरात",
        madhya_pradesh:"मध्य प्रदेश",
        telangana:"तेलंगाना",
        karnataka:"कर्नाटक",
        rajasthan:"राजस्थान",
        delhi:"दिल्ली",
        uttarPradesh:"उत्तर प्रदेश",
        bihar:"बिहार",

        selectIncome:"आय श्रेणी चुनें",
        lowIncome:"₹1 लाख से कम",
        mediumIncome:"₹1 - ₹3 लाख",
        highIncome:"₹3 - ₹5 लाख",
        veryHighIncome:"₹5 लाख से अधिक",

        selectOccupation:"व्यवसाय चुनें",
        student:"छात्र",
        farmer:"किसान",
        employee:"कर्मचारी",
        business:"व्यवसायी",
        unemployed:"बेरोजगार",

        selectCategory:"श्रेणी चुनें",
        general:"सामान्य",
        obc:"ओबीसी",
        sc:"एससी",
        st:"एसटी",

        personalizedSearch:"व्यक्तिगत योजना खोज",
        profileIntro:"अपनी जानकारी दर्ज करें और हमारी सिफारिश प्रणाली आपके लिए उपयुक्त सरकारी योजनाएं खोजेगी।",
        personalizedRecommendations:"व्यक्तिगत सिफारिशें",
personalizedRecommendationsDescription:"आपकी व्यक्तिगत जानकारी, आवश्यकताओं और पात्रता के आधार पर सरकारी योजनाओं के सुझाव प्राप्त करें।",
easyEligibilityCheck:"आसान पात्रता जांच",
easyEligibilityCheckDescription:"समझें कि आप किन योजनाओं के लिए पात्र हो सकते हैं और किन दस्तावेज़ों की आवश्यकता हो सकती है।",

        speakRequirements:"🎤 अपनी आवश्यकता बताएं",
        findSuitable:"🔍 उपयुक्त योजनाएं खोजें",
        saveProfile:"💾 मेरी प्रोफ़ाइल सेव करें",
loadProfile:"👤 सेव की गई प्रोफ़ाइल लोड करें",

        resultsLabel:"व्यक्तिगत परिणाम",
        resultsTitle:"वे योजनाएं जिनमें आपकी रुचि हो सकती है",
        resultsIntro:"ये प्रारंभिक सिफारिशें हैं। पात्रता की पुष्टि हमेशा आधिकारिक सरकारी पोर्टल पर करें।",
        schemeSearch:"🔎 सरकारी योजनाएं खोजें...",
        match:"मिलान",
        whyMatches:"यह आपके लिए क्यों उपयुक्त है:",
        viewDetails:"विवरण देखें →",
        compare: "⚖️ तुलना करें",

        downloadReport:"📄 सिफारिश रिपोर्ट डाउनलोड / सेव करें",
        noResults:"आपकी खोज के लिए कोई सरकारी योजना नहीं मिली।",

        impactLabel:"SCHEMESAATHI एक नज़र में",
        impactTitle:"सरकारी योजनाओं को खोजना आसान बनाना",
        impactDescription:"नागरिकों को उनकी प्रोफ़ाइल के अनुसार संबंधित योजनाएं खोजने में मदद करने वाला डिजिटल सहायक।",

        impactSchemes:"सरकारी योजनाएं",
        impactSchemesText:"विभिन्न नागरिक आवश्यकताओं के लिए योजना की जानकारी।",
        impactCriteria:"मिलान मानदंड",
        impactCriteriaText:"योजना की प्रासंगिकता निर्धारित करने के लिए प्रोफ़ाइल जानकारी।",
        impactResults:"व्यक्तिगत परिणाम",
        impactResultsText:"उपयोगकर्ता की प्रोफ़ाइल के अनुसार सिफारिशें तैयार की जाती हैं।",
        impactPortals:"आधिकारिक पोर्टल",
        impactPortalsText:"उपयोगकर्ता संबंधित आधिकारिक योजना पोर्टल पर जा सकते हैं।",

        faqLabel:"सामान्य प्रश्न",
        faqTitle:"अक्सर पूछे जाने वाले प्रश्न",
        faqDescription:"SchemeSaathi और सरकारी योजनाओं को खोजने के तरीके के बारे में त्वरित उत्तर प्राप्त करें।",

        faq1:"SchemeSaathi क्या है?",
        faq1a:"SchemeSaathi एक एआई-संचालित सरकारी योजना सहायक है जो नागरिकों को उनकी व्यक्तिगत प्रोफ़ाइल के लिए उपयुक्त सरकारी योजनाएं खोजने में मदद करता है।",

        faq2:"SchemeSaathi योजनाओं की सिफारिश कैसे करता है?",
        faq2a:"SchemeSaathi उपयोगकर्ता की प्रोफ़ाइल जैसे आयु, व्यवसाय, श्रेणी, आय और अन्य मानदंडों का उपयोग करके योजनाओं के लिए प्रारंभिक मिलान स्कोर निर्धारित करता है।",

        faq3:"मिलान के लिए कौन-सी जानकारी उपयोग की जाती है?",
        faq3a:"योजना के अनुसार आयु, लिंग, श्रेणी, व्यवसाय, दिव्यांगता की स्थिति और आय जैसी जानकारी का उपयोग किया जा सकता है।",

        faq4:"क्या SchemeSaathi मेरी पात्रता की गारंटी देता है?",
        faq4a:"नहीं। सिफारिशें केवल प्रारंभिक हैं। अंतिम पात्रता संबंधित आधिकारिक सरकारी योजना दिशानिर्देशों के अनुसार सत्यापित करनी चाहिए।",

        faq5:"क्या मैं आधिकारिक सरकारी पोर्टल पर जा सकता हूं?",
        faq5a:"हां। जब आधिकारिक लिंक उपलब्ध होता है, तो योजना विवरण में संबंधित सरकारी पोर्टल का लिंक दिया जाता है।",

        faq6:"क्या मैं अपनी सिफारिश रिपोर्ट सेव कर सकता हूं?",
        faq6a:"हां। सिफारिश प्राप्त करने के बाद Download / Save Recommendation Report विकल्प से रिपोर्ट को PDF के रूप में सेव किया जा सकता है।",

        contactAssistant:"सरकारी योजनाओं के लिए एआई सहायक",
        hackathon:"PO7 — आंतरिक हैकाथॉन 2026",
        footer:"© 2026 SchemeSaathi | सरकारी योजना एआई सहायक",

        whyCard1:"एआई-आधारित सिफारिशें",
        whyCard1Text:"SchemeSaathi उपयोगकर्ता द्वारा दी गई जानकारी का विश्लेषण करके संबंधित सरकारी योजनाओं का सुझाव देता है.",
        whyCard2:"व्यक्तिगत मिलान",
        whyCard2Text:"अपनी प्रोफ़ाइल और पात्रता विवरण के आधार पर योजना सिफारिशें प्राप्त करें।",
        whyCard3: "आसानी से खोजें",
        whyCard3Text: "सरकारी योजनाओं को एक सरल और उपयोगकर्ता-अनुकूल इंटरफेस के माध्यम से खोजें और देखें।",
        whyCard4:"आधिकारिक पोर्टल लिंक",
        whyCard4Text:"योजना की जानकारी और पात्रता सत्यापित करने के लिए आधिकारिक सरकारी पोर्टल पर जाएं।",

        secondWhyTitle:"सरकारी योजनाओं के लिए एक स्मार्ट स्थान",
        secondWhyText:"SchemeSaathi सरल, व्यक्तिगत और उपयोगकर्ता-अनुकूल प्रक्रिया के माध्यम से संबंधित सरकारी योजनाएं खोजने में मदद करता है।",

        detailGovernment:"सरकारी योजना",
        benefits:"🎁 लाभ",
        eligibility:"✅ पात्रता",
        important:"महत्वपूर्ण:",
        officialPortal:"आधिकारिक पोर्टल पर जाएं →"
    },

    mr: {
        navHome:"मुख्यपृष्ठ",
        navAbout:"आमच्याबद्दल",
        navSchemes:"योजना",
        navContact:"संपर्क",

        heroTagline:"एआय-सक्षम सरकारी योजना सहाय्यक",
        heroTitle:"सरकारी योजना शोधा",
        heroTitleSpan:"तुमच्यासाठी",
        heroDescription:"तुमचे वय, उत्पन्न, व्यवसाय, स्थान आणि इतर वैयक्तिक माहितीनुसार योग्य सरकारी योजनांच्या शिफारसी मिळवा.",
        findSchemes:"माझ्या योजना शोधा →",

        heroCardTitle:"स्मार्ट शिफारसी",
        aiDescription:"नागरिकांसाठी स्मार्ट योजना शिफारसी",
        personalized:"✓ वैयक्तिक योजना जुळवणी",
        easyEligibility:"✓ सोपी पात्रता तपासणी",
        governmentInfo:"✓ सरकारी योजनेची माहिती",

        aboutLabel:"प्रकल्पाबद्दल",
        aboutTitle:"एक सहाय्यक. अनेक सरकारी लाभ.",
        aboutText:"SchemeSaathi हे एआय-सक्षम सहाय्यक आहे जे नागरिकांना त्यांच्या वैयक्तिक प्रोफाइलसाठी संबंधित सरकारी योजना शोधण्यात मदत करते.",

        profileTitle:"तुमच्याबद्दल सांगा",
        profileDescription:"तुमची माहिती भरा आणि आमची शिफारस प्रणाली तुमच्यासाठी योग्य सरकारी योजना शोधेल.",

        assistantLabel:"योजना सहाय्यक",
        assistantTitle:"चला तुमच्यासाठी योजना शोधूया",
        assistantText:"वैयक्तिक योजना शोध सुरू करण्यासाठी खाली क्लिक करा.",
        startProfile:"प्रोफाइल सुरू करा →",

        voiceRequirements:"🎤 तुमची गरज सांगा",
        voiceStatus:"मायक्रोफोनवर क्लिक करा आणि तुम्हाला काय हवे आहे ते सांगा.",

        whyLabel:"SCHEMESAATHI का?",
        whyTitle:"सरकारी योजनांसाठी एक स्मार्ट ठिकाण",
        whyDescription:"SchemeSaathi सोप्या, वैयक्तिक आणि वापरण्यास सुलभ प्रक्रियेद्वारे नागरिकांना संबंधित सरकारी योजना शोधण्यात मदत करते.",

        howLabel:"हे कसे कार्य करते",
        howTitle:"सोपे. स्मार्ट. वैयक्तिक.",

        step1Title:"1. तुमचे प्रोफाइल तयार करा",
        step1Text:"तुमच्याबद्दल मूलभूत माहिती भरा.",
        step2Title:"2. एआय विश्लेषण",
        step2Text:"सिस्टम तुमच्या प्रोफाइलचे आणि पात्रतेचे विश्लेषण करते.",
        step3Title:"3. शिफारसी मिळवा",
        step3Text:"तुमच्या प्रोफाइलशी जुळणाऱ्या सरकारी योजना मिळवा.",

        stepOneTitle:"तुमची माहिती भरा",
        stepOneText:"तुमचे वय, व्यवसाय, उत्पन्न आणि इतर पात्रता तपशील द्या.",
        stepTwoTitle:"एआय तुमचे प्रोफाइल तपासते",
        stepTwoText:"SchemeSaathi तुमच्या माहितीचे विश्लेषण करून उपलब्ध सरकारी योजनांच्या निकषांशी तुलना करते.",
        stepThreeTitle:"जुळणाऱ्या योजना मिळवा",
        stepThreeText:"तुमच्या प्रोफाइलनुसार वैयक्तिक योजना शिफारसी मिळवा.",
        howDescription:"SchemeSaathi तुमच्यासाठी संबंधित सरकारी योजना शोधणे सोपे करते.",

        featureAI:"एआय-आधारित शिफारसी",
        featureAIDescription:"तुमच्या प्रोफाइल, वय, व्यवसाय, उत्पन्न आणि इतर तपशीलांनुसार योजना शिफारसी मिळवा.",
        featureMatching:"वैयक्तिक जुळवणी",
        featureMatchingDescription:"तुमच्या माहितीसोबत योजनांची जुळवणी केली जाते आणि समजण्यास सोप्या टक्केवारीत दाखवली जाते.",
        featureEligibility:"पात्रतेची माहिती",
        featureEligibilityDescription:"अर्ज करण्यापूर्वी महत्त्वाच्या पात्रता अटी आणि लाभ समजून घ्या.",
        featurePortals:"अधिकृत सरकारी पोर्टल",
        featurePortalsDescription:"शिफारस केलेल्या योजनेच्या तपशीलातून थेट अधिकृत पोर्टलवर जा.",

        age:"वय",
        gender:"लिंग",
        state:"राज्य",
        income:"वार्षिक कौटुंबिक उत्पन्न",
        occupation:"व्यवसाय",
        category:"प्रवर्ग",

        agePlaceholder:"तुमचे वय प्रविष्ट करा",
        genderPlaceholder:"लिंग निवडा",
        statePlaceholder:"तुमचे राज्य निवडा",
        incomePlaceholder:"उत्पन्न श्रेणी निवडा",
        occupationPlaceholder:"व्यवसाय निवडा",
        categoryPlaceholder:"प्रवर्ग निवडा",

        disability:"मी दिव्यांग व्यक्ती आहे",

        selectGender:"लिंग निवडा",
        male:"पुरुष",
        female:"महिला",
        other:"इतर",

        selectState:"तुमचे राज्य निवडा",
        maharashtra:"महाराष्ट्र",
        gujarat:"गुजरात",
        madhya_pradesh:"मध्य प्रदेश",
        telangana:"तेलंगणा",
        karnataka:"कर्नाटक",
        rajasthan:"राजस्थान",
        delhi:"दिल्ली",
        uttarPradesh:"उत्तर प्रदेश",
        bihar:"बिहार",

        selectIncome:"उत्पन्न श्रेणी निवडा",
        lowIncome:"₹1 लाखांपेक्षा कमी",
        mediumIncome:"₹1 - ₹3 लाख",
        highIncome:"₹3 - ₹5 लाख",
        veryHighIncome:"₹5 लाखांपेक्षा जास्त",

        selectOccupation:"व्यवसाय निवडा",
        student:"विद्यार्थी",
        farmer:"शेतकरी",
        employee:"कर्मचारी",
        business:"व्यवसाय मालक",
        unemployed:"बेरोजगार",

        selectCategory:"प्रवर्ग निवडा",
        general:"सामान्य",
        obc:"ओबीसी",
        sc:"एससी",
        st:"एसटी",

        personalizedSearch:"वैयक्तिक योजना शोध",
        profileIntro:"तुमची माहिती भरा आणि आमची शिफारस प्रणाली तुमच्यासाठी योग्य सरकारी योजना शोधेल.",
        personalizedRecommendations:"वैयक्तिक शिफारसी",
personalizedRecommendationsDescription:"तुमच्या वैयक्तिक माहिती, गरजा आणि पात्रतेच्या आधारे सरकारी योजनांचे सुझाव मिळवा.",
easyEligibilityCheck:"सोपे पात्रता तपासणी",
easyEligibilityCheckDescription:"तुम्ही कोणत्या योजनांसाठी पात्र असू शकता आणि कोणती कागदपत्रे आवश्यक असू शकतात हे पटकन समजून घ्या.",

        speakRequirements:"🎤 तुमची गरज सांगा",
        findSuitable:"🔍 योग्य योजना शोधा",
        saveProfile:"💾 माझी प्रोफाइल सेव करा",
loadProfile:"👤 सेव केलेली प्रोफाइल लोड करा",

        resultsLabel:"वैयक्तिक निकाल",
        resultsTitle:"तुमच्यासाठी उपयुक्त योजना",
        resultsIntro:"या प्राथमिक शिफारसी आहेत. पात्रता नेहमी अधिकृत सरकारी पोर्टलवर तपासा.",
        schemeSearch:"🔎 सरकारी योजना शोधा...",
        match:"जुळणी",
        whyMatches:"ही योजना तुमच्यासाठी का योग्य आहे:",
        viewDetails:"तपशील पहा →",
        compare: "⚖️ तुलना करा",

        downloadReport:"📄 शिफारस अहवाल डाउनलोड / सेव्ह करा",
        noResults:"तुमच्या शोधासाठी कोणतीही सरकारी योजना सापडली नाही.",

        impactLabel:"SCHEMESAATHI एका नजरेत",
        impactTitle:"सरकारी योजना शोधणे सोपे करणे",
        impactDescription:"नागरिकांना त्यांच्या प्रोफाइलनुसार संबंधित योजना शोधण्यात मदत करणारा डिजिटल सहाय्यक.",

        impactSchemes:"सरकारी योजना",
        impactSchemesText:"वेगवेगळ्या नागरिकांच्या गरजांसाठी योजना माहिती.",
        impactCriteria:"जुळणी निकष",
        impactCriteriaText:"योजनेची उपयुक्तता ठरवण्यासाठी वापरली जाणारी प्रोफाइल माहिती.",
        impactResults:"वैयक्तिक निकाल",
        impactResultsText:"वापरकर्त्याच्या प्रोफाइलनुसार शिफारसी तयार केल्या जातात.",
        impactPortals:"अधिकृत पोर्टल",
        impactPortalsText:"वापरकर्ते संबंधित अधिकृत सरकारी पोर्टलला भेट देऊ शकतात.",

        faqLabel:"सामान्य प्रश्न",
        faqTitle:"वारंवार विचारले जाणारे प्रश्न",
        faqDescription:"SchemeSaathi आणि सरकारी योजना शोधण्याबद्दल त्वरित उत्तरे मिळवा.",

        faq1:"SchemeSaathi म्हणजे काय?",
        faq1a:"SchemeSaathi हे एआय-आधारित सरकारी योजना सहाय्यक आहे जे नागरिकांना त्यांच्या वैयक्तिक प्रोफाइलसाठी संबंधित सरकारी योजना शोधण्यात मदत करते.",

        faq2:"SchemeSaathi योजनांची शिफारस कशी करते?",
        faq2a:"SchemeSaathi वापरकर्त्याचे वय, व्यवसाय, प्रवर्ग, उत्पन्न आणि इतर उपलब्ध निकषांचा वापर करून प्राथमिक जुळणी गुण मोजते.",

        faq3:"जुळणीसाठी कोणती माहिती वापरली जाते?",
        faq3a:"योजनेनुसार वय, लिंग, प्रवर्ग, व्यवसाय, दिव्यांगत्व स्थिती आणि उत्पन्न यांसारख्या माहितीचा विचार केला जाऊ शकतो.",

        faq4:"SchemeSaathi माझ्या पात्रतेची हमी देते का?",
        faq4a:"नाही. शिफारसी प्राथमिक आहेत. अंतिम पात्रता संबंधित अधिकृत सरकारी योजना मार्गदर्शक तत्त्वांनुसार तपासली पाहिजे.",

        faq5:"मी अधिकृत सरकारी पोर्टलला भेट देऊ शकतो का?",
        faq5a:"होय. अधिकृत लिंक उपलब्ध असल्यास योजना तपशीलात संबंधित सरकारी पोर्टलची लिंक दिली जाते.",

        faq6:"मी माझा शिफारस अहवाल सेव्ह करू शकतो का?",
        faq6a:"होय. शिफारसी मिळाल्यानंतर अहवाल डाउनलोड / सेव्ह पर्यायाने अहवाल PDF म्हणून सेव्ह करता येतो.",

        contactAssistant:"सरकारी योजनांसाठी एआय सहाय्यक",
        hackathon:"PO7 — अंतर्गत हॅकाथॉन 2026",
        footer:"© 2026 SchemeSaathi | सरकारी योजना एआय सहाय्यक",

        whyCard1:"एआय-आधारित शिफारसी",
        whyCard1Text:"SchemeSaathi वापरकर्त्याने दिलेल्या माहितीचे विश्लेषण करून संबंधित सरकारी योजनांचा सल्ला देते.",

        whyCard2:"वैयक्तिक जुळवणी",
        whyCard2Text:"तुमच्या प्रोफाइल, पात्रता तपशील आणि निवडलेल्या गरजांनुसार योजना शिफारसी मिळवा.",

        whyCard3:"शोधणे सोपे",
        whyCard3Text:"सोप्या आणि वापरण्यास सुलभ इंटरफेसद्वारे सरकारी योजना शोधा आणि पाहा.",

        whyCard4:"अधिकृत पोर्टल लिंक्स",
        whyCard4Text:"योजना तपशील आणि पात्रता पडताळण्यासाठी अधिकृत सरकारी पोर्टलवर त्वरीत जा.",

        secondWhyTitle:"सरकारी योजनांसाठी एक स्मार्ट ठिकाण",
        secondWhyText:"SchemeSaathi सोप्या, वैयक्तिक आणि वापरण्यास सुलभ प्रक्रियेद्वारे संबंधित सरकारी योजना शोधण्यात मदत करते.",

        detailGovernment:"सरकारी योजना",
        benefits:"🎁 लाभ",
        eligibility:"✅ पात्रता",
        important:"महत्त्वाचे:",
        officialPortal:"अधिकृत पोर्टलला भेट द्या →"
    }
};


// ==========================================
// CHANGE LANGUAGE
// ==========================================

// ==========================================
// CHANGE LANGUAGE
// ==========================================

function changeLanguage(language) {

    // Convert language names to language codes
    if (language === "English") {
        language = "en";
    }

    if (language === "Hindi") {
        language = "hi";
    }

    if (language === "Marathi") {
        language = "mr";
    }

    console.log("Applying language:", language);

    const selectedLanguage = translations[language];

    if (!selectedLanguage) {
        console.log("Language not found:", language);
        return;
    }

    // Change HTML language
    document.documentElement.lang = language;


    // ==========================================
    // NORMAL TEXT WITH data-i18n
    // ==========================================

    document.querySelectorAll("[data-i18n]").forEach(function(element) {

        const key = element.getAttribute("data-i18n");

        if (selectedLanguage[key] !== undefined) {
            element.textContent = selectedLanguage[key];
        }

    });


    // ==========================================
    // INPUT PLACEHOLDERS
    // ==========================================

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function(element) {

        const key =
            element.getAttribute("data-i18n-placeholder");

        if (selectedLanguage[key] !== undefined) {
            element.placeholder = selectedLanguage[key];
        }

    });


    // ==========================================
    // SELECT OPTIONS
    // ==========================================

    document.querySelectorAll("option[data-i18n]").forEach(function(option) {

        const key =
            option.getAttribute("data-i18n");

        if (selectedLanguage[key] !== undefined) {
            option.textContent = selectedLanguage[key];
        }

    });


    // ==========================================
    // PROFILE FORM
    // ==========================================

    const profileVoiceButton =
        document.getElementById("profileVoiceButton");

    if (
        profileVoiceButton &&
        selectedLanguage.speakRequirements !== undefined
    ) {
        profileVoiceButton.textContent =
            selectedLanguage.speakRequirements;
    }


    const profileVoiceStatus =
        document.getElementById("profileVoiceStatus");

    if (
        profileVoiceStatus &&
        selectedLanguage.voiceStatus !== undefined
    ) {
        profileVoiceStatus.textContent =
            selectedLanguage.voiceStatus;
    }


    const profileSubmitButton =
        document.querySelector(
            "#profileForm button[type='submit']"
        );

    if (
        profileSubmitButton &&
        selectedLanguage.findSuitable !== undefined
    ) {
        profileSubmitButton.textContent =
            selectedLanguage.findSuitable;
    }


    // ==========================================
    // RESULTS SECTION
    // ==========================================

    const resultsSection =
        document.getElementById("results");

    if (resultsSection) {

        const resultsLabel =
            resultsSection.querySelector(
                ".results-header .section-label"
            );

        const resultsTitle =
            resultsSection.querySelector(
                ".results-header h2"
            );

        const resultsIntro =
            resultsSection.querySelector(
                ".results-header > p:not(.section-label)"
            );

        const searchInput =
            document.getElementById("schemeSearch");


        if (
            resultsLabel &&
            selectedLanguage.resultsLabel !== undefined
        ) {
            resultsLabel.textContent =
                selectedLanguage.resultsLabel;
        }


        if (
            resultsTitle &&
            selectedLanguage.resultsTitle !== undefined
        ) {
            resultsTitle.textContent =
                selectedLanguage.resultsTitle;
        }


        if (
            resultsIntro &&
            selectedLanguage.resultsIntro !== undefined
        ) {
            resultsIntro.textContent =
                selectedLanguage.resultsIntro;
        }


        if (
            searchInput &&
            selectedLanguage.schemeSearch !== undefined
        ) {
            searchInput.placeholder =
                selectedLanguage.schemeSearch;
        }


        document.querySelectorAll(
            ".recommendation-explanation strong"
        ).forEach(function(element) {

            if (
                selectedLanguage.whyMatches !== undefined
            ) {
                element.textContent =
                    selectedLanguage.whyMatches;
            }

        });


        document.querySelectorAll(
            '.recommendation-action button[data-result-i18n="viewDetails"]'
        ).forEach(function(element) {

            if (
                selectedLanguage.viewDetails !== undefined
            ) {
                element.textContent =
                    selectedLanguage.viewDetails;
            }

        });

        document.querySelectorAll(
    '.recommendation-action button[data-result-i18n="compare"]'
).forEach(function(element) {

    if (
        selectedLanguage.compare !== undefined
    ) {
        element.textContent =
            selectedLanguage.compare;
    }

});


        const reportButton =
            document.querySelector(
                ".download-report-btn"
            );

        if (
            reportButton &&
            selectedLanguage.downloadReport !== undefined
        ) {
            reportButton.textContent =
                selectedLanguage.downloadReport;
        }


        const noResults =
            document.getElementById(
                "noResultsMessage"
            );

        if (
            noResults &&
            selectedLanguage.noResults !== undefined
        ) {
            noResults.textContent =
                selectedLanguage.noResults;
        }

    }


    // ==========================================
    // CONTACT SECTION
    // ==========================================

    const contact =
        document.getElementById("contact");

    if (contact) {

        const paragraphs =
            contact.querySelectorAll("p");

        if (
            paragraphs[0] &&
            selectedLanguage.contactAssistant !== undefined
        ) {
            paragraphs[0].textContent =
                selectedLanguage.contactAssistant;
        }

        if (
            paragraphs[1] &&
            selectedLanguage.hackathon !== undefined
        ) {
            paragraphs[1].textContent =
                selectedLanguage.hackathon;
        }

    }


    // ==========================================
    // FOOTER
    // ==========================================

    const footer =
        document.querySelector("footer p");

    if (
        footer &&
        selectedLanguage.footer !== undefined
    ) {
        footer.textContent =
            selectedLanguage.footer;
    }


    // ==========================================
    // FAQ SECTION
    // ==========================================

    const faq =
        document.querySelector(".faq-section");

    if (faq) {

        const faqLabel =
            faq.querySelector(".faq-heading span");

        const faqTitle =
            faq.querySelector(".faq-heading h2");

        const faqDescription =
            faq.querySelector(".faq-heading p");


        if (
            faqLabel &&
            selectedLanguage.faqLabel !== undefined
        ) {
            faqLabel.textContent =
                selectedLanguage.faqLabel;
        }


        if (
            faqTitle &&
            selectedLanguage.faqTitle !== undefined
        ) {
            faqTitle.textContent =
                selectedLanguage.faqTitle;
        }


        if (
            faqDescription &&
            selectedLanguage.faqDescription !== undefined
        ) {
            faqDescription.textContent =
                selectedLanguage.faqDescription;
        }


        const questions =
            faq.querySelectorAll(
                ".faq-item summary"
            );

        const answers =
            faq.querySelectorAll(
                ".faq-item p"
            );


        const faqQuestions = [
            selectedLanguage.faq1,
            selectedLanguage.faq2,
            selectedLanguage.faq3,
            selectedLanguage.faq4,
            selectedLanguage.faq5,
            selectedLanguage.faq6
        ];


        const faqAnswers = [
            selectedLanguage.faq1a,
            selectedLanguage.faq2a,
            selectedLanguage.faq3a,
            selectedLanguage.faq4a,
            selectedLanguage.faq5a,
            selectedLanguage.faq6a
        ];


        questions.forEach(
            function(element, index) {

                if (
                    element &&
                    faqQuestions[index] !== undefined
                ) {
                    element.textContent =
                        faqQuestions[index];
                }

            }
        );


        answers.forEach(
            function(element, index) {

                if (
                    element &&
                    faqAnswers[index] !== undefined
                ) {
                    element.textContent =
                        faqAnswers[index];
                }

            }
        );

    }


    // ==========================================
    // SCHEME DETAILS MODAL
    // ==========================================

    const modal =
        document.getElementById("schemeModal");

    if (modal) {

        const modalLabel =
            modal.querySelector(".modal-label");

        if (
            modalLabel &&
            selectedLanguage.detailGovernment !== undefined
        ) {
            modalLabel.textContent =
                selectedLanguage.detailGovernment;
        }


        const detailBoxes =
            modal.querySelectorAll(
                ".detail-box h3"
            );


        if (
            detailBoxes[0] &&
            selectedLanguage.benefits !== undefined
        ) {
            detailBoxes[0].textContent =
                selectedLanguage.benefits;
        }


        if (
            detailBoxes[1] &&
            selectedLanguage.eligibility !== undefined
        ) {
            detailBoxes[1].textContent =
                selectedLanguage.eligibility;
        }


        const important =
            modal.querySelector(
                ".official-note strong"
            );

        if (
            important &&
            selectedLanguage.important !== undefined
        ) {
            important.textContent =
                selectedLanguage.important;
        }


        const officialButton =
            modal.querySelector(
                ".apply-button"
            );

        if (
            officialButton &&
            selectedLanguage.officialPortal !== undefined
        ) {
            officialButton.textContent =
                selectedLanguage.officialPortal;
        }

    }


    // ==========================================
    // SAVE LANGUAGE
    // ==========================================

    localStorage.setItem(
        "schemeSaathiLanguage",
        language
    );


    // ==========================================
    // UPDATE LANGUAGE DROPDOWN
    // ==========================================

    const selector =
        document.getElementById(
            "languageSelector"
        );

    if (selector) {
        selector.value = language;
    }


    console.log(
        "Language changed successfully:",
        language
    );

}

// ==========================================
// INITIALIZE LANGUAGE SYSTEM
// ==========================================

function initializeLanguageSystem() {

    const selector =
        document.getElementById("languageSelector");

    if (!selector) {
        console.log("Language selector not found");
        return;
    }

    let savedLanguage =
        localStorage.getItem("schemeSaathiLanguage") || "en";

    if (!translations[savedLanguage]) {
        savedLanguage = "en";
    }

    selector.value = savedLanguage;

    // Apply language after complete page is loaded
    changeLanguage(savedLanguage);

    // Apply again shortly after loading
    // This catches dynamically rendered sections
    setTimeout(function () {
        changeLanguage(savedLanguage);
    }, 100);

    selector.addEventListener("change", function () {

        let selectedLanguage = this.value;

        if (selectedLanguage === "English") {
            selectedLanguage = "en";
        }

        if (selectedLanguage === "Hindi") {
            selectedLanguage = "hi";
        }

        if (selectedLanguage === "Marathi") {
            selectedLanguage = "mr";
        }

        localStorage.setItem(
            "schemeSaathiLanguage",
            selectedLanguage
        );

        changeLanguage(selectedLanguage);

        // Apply again after dynamic sections update
        setTimeout(function () {
            changeLanguage(selectedLanguage);
        }, 100);

    });

}

document.addEventListener(
    "DOMContentLoaded",
    initializeLanguageSystem
);

console.log(
    "SchemeSaathi multilingual system loaded successfully"
);


function addChatbotMessage(message, type) {

    const messageDiv = document.createElement("div");

    messageDiv.className =
        "chatbot-message " + type;

    messageDiv.innerHTML = message;

    chatbotMessages.appendChild(messageDiv);

    chatbotMessages.scrollTop =
        chatbotMessages.scrollHeight;
}
/* ==========================================
   SCHEME SAATHI MULTILINGUAL CHATBOT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const chatbotToggle =
        document.getElementById("chatbot-toggle");

    const chatbot =
        document.getElementById("chatbot");

    const chatbotClose =
        document.getElementById("chatbot-close");

    const chatbotInput =
        document.getElementById("chatbot-input");

    const chatbotSend =
        document.getElementById("chatbot-send");

    const chatbotMessages =
        document.getElementById("chatbot-messages");


    /* Check chatbot elements */

    if (
        !chatbotToggle ||
        !chatbot ||
        !chatbotClose ||
        !chatbotInput ||
        !chatbotSend ||
        !chatbotMessages
    ) {

        console.error(
            "SchemeSaathi chatbot elements not found."
        );

        return;
    }


    /* =========================
       OPEN CHATBOT
    ========================= */

    chatbotToggle.addEventListener(
        "click",
        function () {

            chatbot.classList.add("active");

            chatbotInput.focus();

        }
    );


    /* =========================
       CLOSE CHATBOT
    ========================= */

    chatbotClose.addEventListener(
        "click",
        function () {

            chatbot.classList.remove("active");

        }
    );


    /* =========================
       ADD CHAT MESSAGE
    ========================= */

    function addChatMessage(message, type) {

        const messageElement =
            document.createElement("div");

        messageElement.className =
            "chatbot-message " + type;

        messageElement.innerHTML =
            message;

        chatbotMessages.appendChild(
            messageElement
        );

        chatbotMessages.scrollTop =
            chatbotMessages.scrollHeight;
    }


    /* =========================
       GET CURRENT LANGUAGE
    ========================= */

    function getChatLanguage() {

        const savedLanguage =
            localStorage.getItem(
                "schemeSaathiLanguage"
            );

        if (
            savedLanguage === "hi" ||
            savedLanguage === "mr" ||
            savedLanguage === "en"
        ) {
            return savedLanguage;
        }

        return "en";
    }


    /* =========================
       CHATBOT RESPONSE
    ========================= */

    function getChatResponse(question) {

        const q =
            question.toLowerCase();

        const language =
            getChatLanguage();


        /* =================================
           HINDI
        ================================= */

        if (language === "hi") {


            /* STUDENT */

            if (
                q.includes("student") ||
                q.includes("scholarship") ||
                q.includes("छात्र") ||
                q.includes("छात्रवृत्ति") ||
                q.includes("विद्यार्थी") ||
                q.includes("शिष्यवृत्ति")
            ) {

                return `
                    🎓 <strong>छात्रों के लिए योजनाएं</strong><br><br>

                    छात्रों के लिए विभिन्न छात्रवृत्ति
                    और शिक्षा सहायता योजनाएं उपलब्ध
                    हो सकती हैं।

                    <br><br>

                    महाराष्ट्र के छात्रों के लिए
                    <strong>महाDBT छात्रवृत्ति योजनाएं</strong>
                    भी उपयोगी हो सकती हैं।

                    <br><br>

                    अंतिम पात्रता संबंधित सरकारी
                    नियमों पर निर्भर करती है।
                `;
            }


            /* MAHARASHTRA */

            if (
                q.includes("maharashtra") ||
                q.includes("महाराष्ट्र")
            ) {

                return `
                    📍 <strong>महाराष्ट्र की योजनाएं</strong><br><br>

                    SchemeSaathi महाराष्ट्र की राज्य
                    योजनाओं के साथ-साथ केंद्र सरकार
                    की योजनाओं की भी सिफारिश कर सकता है।

                    <br><br>

                    छात्रों के लिए
                    <strong>महाDBT छात्रवृत्ति योजनाएं</strong>
                    उपयोगी हो सकती हैं।
                `;
            }


            /* HEALTH */

            if (
                q.includes("health") ||
                q.includes("medical") ||
                q.includes("hospital") ||
                q.includes("स्वास्थ्य") ||
                q.includes("आरोग्य")
            ) {

                return `
                    🏥 <strong>स्वास्थ्य योजनाएं</strong><br><br>

                    पात्रता के आधार पर
                    <strong>आयुष्मान भारत - PM-JAY</strong>
                    और
                    <strong>महात्मा ज्योतिराव फुले जन आरोग्य योजना</strong>
                    जैसी योजनाएं स्वास्थ्य सहायता
                    प्रदान कर सकती हैं।

                    <br><br>

                    अंतिम पात्रता आधिकारिक सरकारी
                    पोर्टल पर सत्यापित करें।
                `;
            }


            /* FARMER */

            if (
                q.includes("farmer") ||
                q.includes("agriculture") ||
                q.includes("किसान") ||
                q.includes("कृषि") ||
                q.includes("शेतकरी")
            ) {

                return `
                    🌾 <strong>किसानों के लिए योजनाएं</strong><br><br>

                    पात्र किसानों के लिए
                    <strong>PM-KISAN</strong> और
                    <strong>प्रधानमंत्री फसल बीमा योजना</strong>
                    जैसी योजनाएं उपलब्ध हो सकती हैं।

                    <br><br>

                    अंतिम पात्रता आधिकारिक योजना
                    नियमों के अनुसार जांचें।
                `;
            }


            /* ELIGIBILITY */

            if (
                q.includes("eligible") ||
                q.includes("eligibility") ||
                q.includes("पात्र") ||
                q.includes("पात्रता") ||
                q.includes("योग्य")
            ) {

                return `
                    ✅ <strong>पात्रता</strong><br><br>

                    SchemeSaathi आपके प्रोफ़ाइल में
                    दी गई जानकारी के आधार पर प्रारंभिक
                    योजना सिफारिशें प्रदान करता है।

                    <br><br>

                    अंतिम पात्रता संबंधित सरकारी
                    योजना के आधिकारिक नियमों के अनुसार
                    निर्धारित होती है।
                `;
            }


            /* HOUSING */

            if (
                q.includes("housing") ||
                q.includes("house") ||
                q.includes("आवास") ||
                q.includes("घर")
            ) {

                return `
                    🏠 <strong>आवास योजनाएं</strong><br><br>

                    आपकी स्थिति और पात्रता के आधार पर
                    <strong>प्रधानमंत्री आवास योजना - शहरी</strong>
                    और
                    <strong>प्रधानमंत्री आवास योजना - ग्रामीण</strong>
                    उपयोगी हो सकती हैं।
                `;
            }


            /* DEFAULT */

            return `
                🤖 <strong>
                मैं सरकारी योजनाएं खोजने में आपकी मदद कर सकता हूँ।
                </strong>

                <br><br>

                आप पूछ सकते हैं:

                <br>• छात्रों के लिए कौन-सी योजनाएं हैं?
                <br>• महाराष्ट्र में कौन-सी योजनाएं उपलब्ध हैं?
                <br>• स्वास्थ्य के लिए कौन-सी योजनाएं हैं?
                <br>• किसानों के लिए कौन-सी योजनाएं हैं?
                <br>• मैं इस योजना के लिए पात्र क्यों हूँ?
            `;
        }


        /* =================================
           MARATHI
        ================================= */

        if (language === "mr") {


            /* STUDENT */

            if (
                q.includes("student") ||
                q.includes("scholarship") ||
                q.includes("विद्यार्थी") ||
                q.includes("छात्र") ||
                q.includes("शिष्यवृत्ती")
            ) {

                return `
                    🎓 <strong>विद्यार्थ्यांसाठी योजना</strong><br><br>

                    विद्यार्थ्यांसाठी विविध शिष्यवृत्ती
                    आणि शिक्षण सहाय्य योजना उपलब्ध
                    असू शकतात.

                    <br><br>

                    महाराष्ट्रातील विद्यार्थ्यांसाठी
                    <strong>महाDBT शिष्यवृत्ती योजना</strong>
                    उपयुक्त ठरू शकतात.

                    <br><br>

                    अंतिम पात्रता संबंधित सरकारी
                    नियमांवर अवलंबून असते.
                `;
            }


            /* MAHARASHTRA */

            if (
                q.includes("maharashtra") ||
                q.includes("महाराष्ट्र")
            ) {

                return `
                    📍 <strong>महाराष्ट्रातील योजना</strong><br><br>

                    SchemeSaathi महाराष्ट्राच्या राज्य
                    योजनांसोबत केंद्र सरकारच्या योजनांची
                    देखील शिफारस करू शकतो.

                    <br><br>

                    विद्यार्थ्यांसाठी
                    <strong>महाDBT शिष्यवृत्ती योजना</strong>
                    उपयुक्त ठरू शकतात.
                `;
            }


            /* HEALTH */

            if (
                q.includes("health") ||
                q.includes("medical") ||
                q.includes("hospital") ||
                q.includes("स्वास्थ्य") ||
                q.includes("आरोग्य")
            ) {

                return `
                    🏥 <strong>आरोग्य योजना</strong><br><br>

                    पात्रतेनुसार
                    <strong>आयुष्मान भारत - PM-JAY</strong>
                    आणि
                    <strong>महात्मा ज्योतिराव फुले जन आरोग्य योजना</strong>
                    यांसारख्या योजना आरोग्य सहाय्य
                    देऊ शकतात.

                    <br><br>

                    अंतिम पात्रता अधिकृत सरकारी
                    पोर्टलवर तपासा.
                `;
            }


            /* FARMER */

            if (
                q.includes("farmer") ||
                q.includes("agriculture") ||
                q.includes("किसान") ||
                q.includes("शेतकरी") ||
                q.includes("शेती")
            ) {

                return `
                    🌾 <strong>शेतकऱ्यांसाठी योजना</strong><br><br>

                    पात्र शेतकऱ्यांसाठी
                    <strong>PM-KISAN</strong> आणि
                    <strong>प्रधानमंत्री पीक विमा योजना</strong>
                    यांसारख्या योजना उपलब्ध असू शकतात.

                    <br><br>

                    अंतिम पात्रता अधिकृत योजना
                    नियमांनुसार तपासा.
                `;
            }


            /* ELIGIBILITY */

            if (
                q.includes("eligible") ||
                q.includes("eligibility") ||
                q.includes("पात्र") ||
                q.includes("पात्रता") ||
                q.includes("योग्य")
            ) {

                return `
                    ✅ <strong>पात्रता</strong><br><br>

                    SchemeSaathi तुमच्या प्रोफाइलमध्ये
                    दिलेल्या माहितीच्या आधारावर
                    प्राथमिक योजना शिफारसी देतो.

                    <br><br>

                    अंतिम पात्रता संबंधित सरकारी
                    योजनेच्या अधिकृत नियमांनुसार ठरते.
                `;
            }


            /* HOUSING */

            if (
                q.includes("housing") ||
                q.includes("house") ||
                q.includes("आवास") ||
                q.includes("घर")
            ) {

                return `
                    🏠 <strong>गृहनिर्माण योजना</strong><br><br>

                    तुमची परिस्थिती आणि पात्रतेनुसार
                    <strong>प्रधानमंत्री आवास योजना - शहरी</strong>
                    आणि
                    <strong>प्रधानमंत्री आवास योजना - ग्रामीण</strong>
                    उपयुक्त ठरू शकतात.
                `;
            }


            /* DEFAULT */

            return `
                🤖 <strong>
                मी तुम्हाला सरकारी योजना शोधण्यात मदत करू शकतो.
                </strong>

                <br><br>

                तुम्ही असे प्रश्न विचारू शकता:

                <br>• विद्यार्थ्यांसाठी कोणत्या योजना आहेत?
                <br>• महाराष्ट्रात कोणत्या योजना उपलब्ध आहेत?
                <br>• आरोग्यासाठी कोणत्या योजना आहेत?
                <br>• शेतकऱ्यांसाठी कोणत्या योजना आहेत?
                <br>• मी या योजनेसाठी पात्र का आहे?
            `;
        }


        /* =================================
           ENGLISH
        ================================= */


        /* STUDENT */

        if (
            q.includes("student") ||
            q.includes("scholarship")
        ) {

            return `
                🎓 <strong>Student Schemes</strong><br><br>

                Students may be eligible for scholarship
                and education-support schemes.

                <br><br>

                For Maharashtra students,
                <strong>MahaDBT scholarship schemes</strong>
                may also be relevant.

                <br><br>

                Final eligibility depends on the
                applicable government criteria.
            `;
        }


        /* MAHARASHTRA */

        if (
            q.includes("maharashtra")
        ) {

            return `
                📍 <strong>Maharashtra Schemes</strong><br><br>

                SchemeSaathi can recommend Maharashtra
                state schemes along with Central
                Government schemes.

                <br><br>

                For students, Maharashtra
                <strong>MahaDBT scholarship schemes</strong>
                may be relevant.
            `;
        }


        /* HEALTH */

        if (
            q.includes("health") ||
            q.includes("medical") ||
            q.includes("hospital")
        ) {

            return `
                🏥 <strong>Health Schemes</strong><br><br>

                Depending on eligibility,
                <strong>Ayushman Bharat - PM-JAY</strong>
                and
                <strong>Mahatma Jyotirao Phule Jan Arogya Yojana</strong>
                may provide healthcare support.

                <br><br>

                Final eligibility should always be
                verified through the official portal.
            `;
        }


        /* FARMER */

        if (
            q.includes("farmer") ||
            q.includes("agriculture")
        ) {

            return `
                🌾 <strong>Farmer Schemes</strong><br><br>

                Eligible farmers may be able to benefit
                from schemes such as
                <strong>PM-KISAN</strong> and
                <strong>Pradhan Mantri Fasal Bima Yojana</strong>.

                <br><br>

                Final eligibility should be verified
                through the official scheme portal.
            `;
        }


        /* ELIGIBILITY */

        if (
            q.includes("eligible") ||
            q.includes("eligibility")
        ) {

            return `
                ✅ <strong>Eligibility</strong><br><br>

                SchemeSaathi provides preliminary
                recommendations based on information
                entered in your profile.

                <br><br>

                Final eligibility must always be
                verified using the official government
                scheme rules.
            `;
        }


        /* HOUSING */

        if (
            q.includes("housing") ||
            q.includes("house")
        ) {

            return `
                🏠 <strong>Housing Schemes</strong><br><br>

                Pradhan Mantri Awas Yojana - Urban and
                Pradhan Mantri Awas Yojana - Gramin may
                be relevant depending on your situation
                and eligibility criteria.
            `;
        }


        /* DEFAULT */

        return `
            🤖 <strong>
            I can help you find government schemes.
            </strong>

            <br><br>

            Try asking:

            <br>• Which schemes are available for students?
            <br>• What schemes are available in Maharashtra?
            <br>• Which health schemes are available?
            <br>• What schemes are available for farmers?
            <br>• Why am I eligible?
        `;
    }


    /* =========================
       SEND MESSAGE
    ========================= */

    function sendMessage() {

        const question =
            chatbotInput.value.trim();

        if (question === "") {
            return;
        }


        /* USER MESSAGE */

        addChatMessage(
            question,
            "user"
        );


        chatbotInput.value = "";


        /* BOT RESPONSE */

        setTimeout(
            function () {

                const response =
                    getChatResponse(question);

                addChatMessage(
                    response,
                    "bot"
                );

            },
            400
        );
    }


    /* =========================
       SEND BUTTON
    ========================= */

    chatbotSend.addEventListener(
        "click",
        sendMessage
    );


    /* =========================
       ENTER KEY
    ========================= */

    chatbotInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                sendMessage();

            }

        }
    );

});
/* ==========================================
   CHATBOT VOICE INPUT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const voiceButton =
        document.getElementById("chatbot-voice");

    const chatbotInput =
        document.getElementById("chatbot-input");

    const chatbotSend =
        document.getElementById("chatbot-send");

    if (!voiceButton || !chatbotInput || !chatbotSend) {
        return;
    }

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        voiceButton.addEventListener(
            "click",
            function () {

                alert(
                    "Voice input is not supported in this browser. Please try Chrome or Edge."
                );

            }
        );

        return;
    }

    const recognition =
        new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    function getVoiceLanguage() {

        const language =
            localStorage.getItem(
                "schemeSaathiLanguage"
            ) || "en";

        if (language === "hi") {
            return "hi-IN";
        }

        if (language === "mr") {
            return "mr-IN";
        }

        return "en-IN";
    }


    voiceButton.addEventListener(
        "click",
        function () {

            try {

                recognition.lang =
                    getVoiceLanguage();

                voiceButton.classList.add(
                    "listening"
                );

                voiceButton.textContent = "🔴";

                recognition.start();

            } catch (error) {

                console.log(
                    "Voice recognition already running."
                );

            }

        }
    );


    recognition.onresult =
        function (event) {

            const transcript =
                event.results[0][0].transcript;

            chatbotInput.value =
                transcript;

            /*
               Automatically click the existing
               chatbot Send button.
            */

            setTimeout(function () {

                chatbotSend.click();

            }, 500);

        };


    recognition.onend =
        function () {

            voiceButton.classList.remove(
                "listening"
            );

            voiceButton.textContent = "🎤";

        };


    recognition.onerror =
        function (event) {

            voiceButton.classList.remove(
                "listening"
            )

            voiceButton.textContent = "🎤";

            console.log(
                "Voice recognition error:",
                event.error
            );

            if (event.error === "not-allowed") {

                alert(
                    "Microphone permission was denied. Please allow microphone access in your browser."
                );

            }

        };

});
/* ==========================================
   SCHEME COMPARISON
========================================== */

let selectedSchemesForComparison = [];


function toggleSchemeComparison(schemeName) {

    const index =
        selectedSchemesForComparison.indexOf(schemeName);

    if (index !== -1) {

        selectedSchemesForComparison.splice(index, 1);

        alert(
            schemeName +
            " removed from comparison."
        );

        return;
    }


    if (selectedSchemesForComparison.length >= 2) {

        alert(
            "You can compare only two schemes at a time."
        );

        return;
    }


    selectedSchemesForComparison.push(
        schemeName
    );


    if (
        selectedSchemesForComparison.length === 1
    ) {

        alert(
            "Scheme added for comparison. Select one more scheme."
        );

    }


    if (
        selectedSchemesForComparison.length === 2
    ) {

        openSchemeComparison();

    }

}


function openSchemeComparison() {

    if (
        selectedSchemesForComparison.length < 2
    ) {
        return;
    }


    const firstScheme =
        getComparisonSchemeDetails(
            selectedSchemesForComparison[0]
        );

    const secondScheme =
        getComparisonSchemeDetails(
            selectedSchemesForComparison[1]
        );


    if (!firstScheme || !secondScheme) {

        alert(
            "Comparison information is not available for one of the selected schemes."
        );

        return;
    }


    const existingModal =
        document.getElementById(
            "schemeComparisonModal"
        );


    if (existingModal) {
        existingModal.remove();
    }


    const modal =
        document.createElement("div");


    modal.id =
        "schemeComparisonModal";


    modal.innerHTML = `

        <div class="modal-overlay"
             onclick="closeSchemeComparison(event)">

            <div class="scheme-comparison-modal"
                 onclick="event.stopPropagation()">

                <button
                    class="modal-close"
                    onclick="closeSchemeComparison()">
                    ×
                </button>


                <div class="comparison-header">

                    <span class="modal-label">
                        SCHEME COMPARISON
                    </span>

                    <h2>
                        Compare Government Schemes
                    </h2>

                    <p>
                        Compare benefits, eligibility and
                        official application portals.
                    </p>

                </div>


                <div class="comparison-table-wrapper">

                    <table class="comparison-table">

                        <thead>

                            <tr>

                                <th>
                                    Feature
                                </th>

                                <th>
                                    ${firstScheme.icon}
                                    ${firstScheme.title}
                                </th>

                                <th>
                                    ${secondScheme.icon}
                                    ${secondScheme.title}
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            <tr>

                                <td>
                                    🎁 Benefits
                                </td>

                                <td>
                                    ${firstScheme.benefits}
                                </td>

                                <td>
                                    ${secondScheme.benefits}
                                </td>

                            </tr>


                            <tr>

                                <td>
                                    ✅ Eligibility
                                </td>

                                <td>
                                    ${firstScheme.eligibility}
                                </td>

                                <td>
                                    ${secondScheme.eligibility}
                                </td>

                            </tr>


                            <tr>

                                <td>
                                    📝 Description
                                </td>

                                <td>
                                    ${firstScheme.description}
                                </td>

                                <td>
                                    ${secondScheme.description}
                                </td>

                            </tr>


                            <tr>

                                <td>
                                    🌐 Official Portal
                                </td>

                                <td>

                                    <a
                                        href="${firstScheme.apply}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="comparison-portal-button">
                                        Visit Portal →
                                    </a>

                                </td>

                                <td>

                                    <a
                                        href="${secondScheme.apply}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="comparison-portal-button">
                                        Visit Portal →
                                    </a>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>


                <button
                    class="clear-comparison-button"
                    onclick="clearSchemeComparison()">

                    Clear Comparison

                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);

modal.scrollIntoView({
    behavior: "smooth",
    block: "center"
});

}


function getComparisonSchemeDetails(name) {

    /*
       Use the same scheme information already
       used by the View Details feature.
    */

    const details = {

        "Post-Matric Scholarship": {
            icon: "🎓",
            title: "Post-Matric Scholarship",
            description:
                "Scholarship support for eligible students studying after the matriculation level.",
            benefits:
                "Financial assistance may be available to eligible students for continuing their education.",
            eligibility:
                "Eligibility depends on the specific scholarship, social category, course, institution, income and other conditions.",
            apply:
                "https://scholarships.gov.in/"
        },


        "PM-KISAN": {
            icon: "🌾",
            title: "PM-KISAN Samman Nidhi",
            description:
                "A Central Sector scheme providing income support to eligible landholding farmer families.",
            benefits:
                "Eligible farmer families can receive ₹6,000 per year in three equal instalments, subject to scheme conditions.",
            eligibility:
                "Landholding farmer status and applicable exclusion conditions are considered.",
            apply:
                "https://pmkisan.gov.in/"
        },


        "Pradhan Mantri Fasal Bima Yojana": {
            icon: "🌱",
            title: "Pradhan Mantri Fasal Bima Yojana",
            description:
                "A crop insurance programme designed to provide financial protection to eligible farmers against specified crop losses.",
            benefits:
                "Provides insurance support against covered crop losses according to the applicable scheme rules.",
            eligibility:
                "Eligibility and coverage depend on crop, area, season, notified conditions and other applicable requirements.",
            apply:
                "https://pmfby.gov.in/"
        },


        "Ayushman Bharat - PM-JAY": {
            icon: "🏥",
            title: "Ayushman Bharat - PM-JAY",
            description:
                "A government health-support programme for eligible beneficiaries.",
            benefits:
                "Eligible beneficiaries can receive healthcare coverage according to PM-JAY rules.",
            eligibility:
                "Eligibility is determined using the applicable government beneficiary database and scheme rules.",
            apply:
                "https://mera.pmjay.gov.in/"
        },


        "Mahatma Jyotirao Phule Jan Arogya Yojana": {
            icon: "🏥",
            title: "Mahatma Jyotirao Phule Jan Arogya Yojana",
            description:
                "A Maharashtra government health programme providing healthcare support to eligible beneficiaries.",
            benefits:
                "Eligible beneficiaries can receive healthcare services according to applicable scheme rules and covered procedures.",
            eligibility:
                "Eligibility depends on Maharashtra government criteria, beneficiary category and other scheme requirements.",
            apply:
                "https://www.jeevandayee.gov.in/"
        },


        "Maharashtra MahaDBT Scholarship Schemes": {
            icon: "🎓",
            title: "Maharashtra MahaDBT Scholarship Schemes",
            description:
                "Maharashtra's MahaDBT platform provides access to multiple government scholarship and education-support schemes.",
            benefits:
                "Eligible students may receive scholarship or education-related financial assistance depending on the applicable scheme.",
            eligibility:
                "Eligibility varies by scholarship and may depend on category, family income, course, institution, domicile and other conditions.",
            apply:
                "https://mahadbt.maharashtra.gov.in/"
        },


        "Women Welfare Schemes": {
            icon: "👩",
            title: "Women Welfare Schemes",
            description:
                "Government programmes designed to support women through different welfare and development initiatives.",
            benefits:
                "Benefits vary by scheme and may include financial, educational, livelihood or social support.",
            eligibility:
                "Eligibility depends on the individual scheme, state, age, income and other conditions.",
            apply:
                "https://www.myscheme.gov.in/"
        },


        "Social Welfare & Scholarship Schemes": {
            icon: "📚",
            title: "Social Welfare & Scholarship Schemes",
            description:
                "Government welfare and education programmes for eligible beneficiary groups.",
            benefits:
                "Benefits vary by scheme and can include scholarships, education support and welfare assistance.",
            eligibility:
                "Eligibility depends on the specific scheme, category, income, education and other conditions.",
            apply:
                "https://www.myscheme.gov.in/"
        },


        "Disability Welfare Schemes": {
            icon: "♿",
            title: "Disability Welfare Schemes",
            description:
                "Government programmes supporting eligible persons with disabilities.",
            benefits:
                "Benefits vary by programme and may include educational, financial and social support.",
            eligibility:
                "Eligibility depends on disability status, documentation, age, education, income and scheme-specific conditions.",
            apply:
                "https://www.myscheme.gov.in/"
        },


        "Senior Citizen Welfare Schemes": {
            icon: "👴",
            title: "Senior Citizen Welfare Schemes",
            description:
                "Government programmes that may provide support to eligible senior citizens.",
            benefits:
                "Benefits vary according to the particular senior-citizen welfare programme.",
            eligibility:
                "Eligibility depends on age, income, residence and specific scheme requirements.",
            apply:
                "https://www.myscheme.gov.in/"
        },


        "Pradhan Mantri SVANidhi": {
            icon: "🛒",
            title: "Pradhan Mantri SVANidhi",
            description:
                "A government scheme providing working-capital support to eligible street vendors.",
            benefits:
                "Eligible street vendors can receive working-capital loans subject to applicable conditions.",
            eligibility:
                "Eligibility depends on the applicable PM SVANidhi guidelines.",
            apply:
                "https://pmsvanidhi.mohua.gov.in/"
        },


        "Pradhan Mantri Mudra Yojana": {
            icon: "💼",
            title: "Pradhan Mantri Mudra Yojana",
            description:
                "A government credit scheme supporting eligible micro and small business activities.",
            benefits:
                "Provides access to institutional credit for eligible micro-enterprises and business activities.",
            eligibility:
                "Eligibility depends on the nature of the business, applicant and lending institution requirements.",
            apply:
                "https://www.myscheme.gov.in/schemes/pmmy"
        },


        "Pradhan Mantri Awas Yojana - Urban": {
            icon: "🏠",
            title: "Pradhan Mantri Awas Yojana - Urban",
            description:
                "A housing programme supporting eligible beneficiaries in urban areas.",
            benefits:
                "Eligible beneficiaries may receive housing assistance under applicable PMAY-Urban components.",
            eligibility:
                "Eligibility depends on the applicable PMAY-Urban component, household circumstances, income and government criteria.",
            apply:
                "https://www.pmay-urban.gov.in/"
        },


        "Pradhan Mantri Awaas Yojana - Gramin": {
            icon: "🏡",
            title: "Pradhan Mantri Awaas Yojana - Gramin",
            description:
                "A rural housing programme supporting eligible rural households.",
            benefits:
                "Eligible rural households may receive housing assistance according to applicable PMAY-G guidelines.",
            eligibility:
                "Eligibility is determined using applicable government criteria and beneficiary identification processes.",
            apply:
                "https://pmayg.nic.in/"
        },


        "Pradhan Mantri Ujjwala Yojana": {
            icon: "🔥",
            title: "Pradhan Mantri Ujjwala Yojana",
            description:
                "A government programme providing LPG connections to eligible adult women from qualifying households.",
            benefits:
                "Eligible beneficiaries can receive assistance for an LPG connection according to current PMUY provisions.",
            eligibility:
                "Eligibility depends on the applicable PMUY criteria.",
            apply:
                "https://www.pmuy.gov.in/"
        },


        "Pradhan Mantri Shram Yogi Maandhan": {
            icon: "👷",
            title: "Pradhan Mantri Shram Yogi Maandhan",
            description:
                "A contributory pension scheme intended for eligible unorganised workers.",
            benefits:
                "Provides pension-related social-security support according to scheme rules and contribution requirements.",
            eligibility:
                "Eligibility depends on age, occupation, income and other applicable conditions.",
            apply:
                "https://www.myscheme.gov.in/schemes/pm-sym"
        },


        "PM Vishwakarma": {
            icon: "🛠️",
            title: "PM Vishwakarma",
            description:
                "A government scheme supporting eligible artisans and craftspeople working in traditional trades.",
            benefits:
                "Eligible artisans may receive skill development, toolkit, credit-related and other support.",
            eligibility:
                "Eligibility depends on the eligible traditional trade, age and other scheme conditions.",
            apply:
                "https://www.pmvishwakarma.gov.in/"
        },


        "Pradhan Mantri Kaushal Vikas Yojana": {
            icon: "🎓",
            title: "Pradhan Mantri Kaushal Vikas Yojana",
            description:
                "A skill-development programme supporting eligible candidates through approved training initiatives.",
            benefits:
                "Eligible candidates can access approved skill-development and training opportunities.",
            eligibility:
                "Eligibility varies according to the applicable training programme and current guidelines.",
            apply:
                "https://www.myscheme.gov.in/"
        }

    };


    return details[name] || null;
}


function closeSchemeComparison(event) {

    if (
        event &&
        event.target &&
        event.target.classList.contains(
            "scheme-comparison-modal"
        )
    ) {
        return;
    }


    const modal =
        document.getElementById(
            "schemeComparisonModal"
        );


    if (modal) {
        modal.remove();
    }

}


function clearSchemeComparison() {

    selectedSchemesForComparison = [];


    const modal =
        document.getElementById(
            "schemeComparisonModal"
        );


    if (modal) {
        modal.remove();
    }

}
function initializeProfileVoice() {

    const profileVoiceButton =
        document.getElementById("profileVoiceButton");

    const profileVoiceStatus =
        document.getElementById("profileVoiceStatus");

    const profileVoiceText =
        document.getElementById("profileVoiceText");

    if (!profileVoiceButton) {
        console.log("Profile microphone button not found.");
        return;
    }

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        profileVoiceButton.disabled = true;

        if (profileVoiceStatus) {
            profileVoiceStatus.textContent =
                "Voice recognition is not supported in this browser.";
        }

        return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    const language =
        localStorage.getItem("schemeSaathiLanguage") || "en";

    if (language === "hi") {
        recognition.lang = "hi-IN";
    } else if (language === "mr") {
        recognition.lang = "mr-IN";
    } else {
        recognition.lang = "en-IN";
    }


    profileVoiceButton.onclick = function () {

        if (profileVoiceStatus) {
            profileVoiceStatus.textContent =
                "🎙️ Listening... Please speak.";
        }

        if (profileVoiceText) {
            profileVoiceText.textContent = "";
        }

        try {
            recognition.start();
        } catch (error) {
            console.log("Microphone already active.");
        }
    };


    recognition.onresult = function (event) {

        const spokenText =
            event.results[0][0].transcript;

        console.log("Profile voice:", spokenText);

        if (profileVoiceText) {
            profileVoiceText.textContent =
                "You said: " + spokenText;
        }

        if (profileVoiceStatus) {
            profileVoiceStatus.textContent =
                "✅ Requirement captured.";
        }

        const text =
            spokenText.toLowerCase();


        /* AGE */

        const ageMatch =
            text.match(/\b(\d{1,3})\s*(?:years?|yrs?)?\s*(?:old|age)?\b/);

        if (ageMatch) {

            const age =
                document.getElementById("age");

            if (age) {
                age.value = ageMatch[1];
            }
        }


        /* GENDER */

        const gender =
            document.getElementById("gender");

        if (gender) {

            if (
                text.includes("female") ||
                text.includes("woman") ||
                text.includes("girl")
            ) {

                gender.value = "female";

            } else if (
                text.includes("male") ||
                text.includes("man") ||
                text.includes("boy")
            ) {

                gender.value = "male";
            }
        }


        /* STATE */

        const state =
            document.getElementById("state");

        if (state) {

            const options =
                Array.from(state.options);

            const matchedState =
                options.find(function (option) {

                    return text.includes(
                        option.textContent.toLowerCase()
                    );

                });

            if (matchedState) {
                state.value = matchedState.value;
            }
        }


        /* INCOME */

        const income =
            document.getElementById("income");

        if (income) {

            const options =
                Array.from(income.options);

            const matchedIncome =
                options.find(function (option) {

                    const optionText =
                        option.textContent.toLowerCase();

                    return (
                        text.includes(optionText) ||
                        optionText.includes(text)
                    );

                });

            if (matchedIncome) {
                income.value = matchedIncome.value;
            }
        }


        /* OCCUPATION */

        const occupation =
            document.getElementById("occupation");

        if (occupation) {

            const occupationOptions =
                Array.from(occupation.options);

            let matchedOccupation = null;

            if (text.includes("student")) {

                matchedOccupation =
                    occupationOptions.find(option =>
                        option.textContent
                            .toLowerCase()
                            .includes("student")
                    );

            } else if (text.includes("farmer")) {

                matchedOccupation =
                    occupationOptions.find(option =>
                        option.textContent
                            .toLowerCase()
                            .includes("farmer")
                    );

            } else if (
                text.includes("business") ||
                text.includes("businessman") ||
                text.includes("businesswoman")
            ) {

                matchedOccupation =
                    occupationOptions.find(option =>
                        option.textContent
                            .toLowerCase()
                            .includes("business")
                    );

            } else if (
                text.includes("employee") ||
                text.includes("job")
            ) {

                matchedOccupation =
                    occupationOptions.find(option =>
                        option.textContent
                            .toLowerCase()
                            .includes("employee")
                    );

            } else if (
                text.includes("unemployed")
            ) {

                matchedOccupation =
                    occupationOptions.find(option =>
                        option.textContent
                            .toLowerCase()
                            .includes("unemployed")
                    );
            }

            if (matchedOccupation) {
                occupation.value =
                    matchedOccupation.value;
            }
        }


        /* CATEGORY */

        const category =
            document.getElementById("category");

        if (category) {

            const categoryOptions =
                Array.from(category.options);

            let matchedCategory = null;

            if (text.includes("general")) {

                matchedCategory =
                    categoryOptions.find(option =>
                        option.textContent
                            .toLowerCase()
                            .includes("general")
                    );

            } else if (text.includes("obc")) {

                matchedCategory =
                    categoryOptions.find(option =>
                        option.textContent
                            .toLowerCase()
                            .includes("obc")
                    );

            } else if (
                text.includes("scheduled caste") ||
                /\bsc\b/.test(text)
            ) {

                matchedCategory =
                    categoryOptions.find(option =>
                        option.textContent
                            .toLowerCase()
                            .includes("sc")
                    );

            } else if (
                text.includes("scheduled tribe") ||
                /\bst\b/.test(text)
            ) {

                matchedCategory =
                    categoryOptions.find(option =>
                        option.textContent
                            .toLowerCase()
                            .includes("st")
                    );
            }

            if (matchedCategory) {
                category.value =
                    matchedCategory.value;
            }
        }


        /* DISABILITY */

        const disability =
            document.getElementById("disability");

        if (disability) {

            if (
                text.includes("disabled") ||
                text.includes("disability") ||
                text.includes("divyang")
            ) {

                disability.checked = true;

            }
        }
    };


    recognition.onerror = function (event) {

        console.log(
            "Profile microphone error:",
            event.error
        );

        if (profileVoiceStatus) {

            if (event.error === "not-allowed") {

                profileVoiceStatus.textContent =
                    "❌ Microphone permission denied. Please allow microphone access.";

            } else {

                profileVoiceStatus.textContent =
                    "❌ Could not hear you. Please try again.";
            }
        }
    };


    recognition.onend = function () {

        if (
            profileVoiceStatus &&
            profileVoiceStatus.textContent.includes("Listening")
        ) {

            profileVoiceStatus.textContent =
                "Click the microphone and try again.";
        }
    };

}