// fast dev settings

//document.getElementById("diceGeneratorTab").click();
document.getElementById("characterSheetTab").click();

//document.getElementById("sheetTabName").click();
document.getElementById("actionTabName").click();

const splashLength = 0;

//------------------------- OUVERTURE -------------------------//
// Prévenir la cache du css
    document.addEventListener("DOMContentLoaded", function() {
      var version = Math.floor(Math.random() * 1000000);
      document.querySelectorAll('link[rel="stylesheet"]').forEach(function(link) {
          link.href += "?v=" + version;
      });
  });

  

////////// splash /////////
let animationRunning = true;

function animateD20Splash() {
  var scene = new THREE.Scene();
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("diceContainerSplash").appendChild(renderer.domElement);

  // Add ambient light to the scene
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Add directional light to the scene
  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  // Create materials for each face using the numbered textures
  const materials = [];
  for (let i = 1; i <= 20; i++) {
    const textureNumber = d20Mapping[i - 1];
    const texture = createNumberedTexture(textureNumber);
    materials.push(new THREE.MeshPhongMaterial({ map: texture, shininess: 1000 }));
  }

  // Create the d20 geometry and adjust UV mapping
  var d20Geometry = createD20Geometry(10); // Pass the desired size as an argument

  var d20Material = materials;

  // Create the d20 mesh and add it to the scene
  var d20Mesh = new THREE.Mesh(d20Geometry, d20Material);
  scene.add(d20Mesh);

  // Position the camera and d20 mesh
  camera.position.z = 20;
  d20Mesh.position.z = -10;

   // Animate the die by continuously rotating it
  function animateDie() {
    if (!animationRunning) return; // stop the animation loop

    d20Mesh.rotation.x += 0.03;
    d20Mesh.rotation.y += 0.03;

    renderer.render(scene, camera);
    requestAnimationFrame(animateDie);
  }

  // Call the animateDie function to start the animation loop
  animateDie();

}
window.addEventListener("DOMContentLoaded", () => {
  animateD20Splash();
  setTimeout(() => {
    const diceContainerSplash = document.getElementById("diceContainerSplash");
    if (diceContainerSplash) {
      diceContainerSplash.remove();
    }
    animationRunning = false;
  }, splashLength);
});

////////// countdown to local storage save /////////
/*
// Define the function that will be called every 10 seconds
function saveToLocalStorage() {
  saveCharacter('saveToLocalStorage'); // call your saveCharacter function
}

// Define the countdown timer function
function countdownTimer() {
  let seconds = 9;
  let timer = setInterval(() => {
    // Get the countdown div element
    const countdownDiv = document.getElementById("compteARebourd");

    // Update the text in the countdown div
    if (seconds > 1) {
      countdownDiv.innerText = `${seconds} s avant sauvegarde automatique`;
    } else {
      countdownDiv.innerText = `${seconds} s avant sauvegarde automatique`;
    }

    // Decrement the seconds counter
    seconds--;

    // If the timer reaches 0, reset seconds to 10 and restart the countdown
    if (seconds < 0) {
      clearInterval(timer);
      countdownDiv.innerText = "Sauvegarde réussie";
      seconds = 9;
      countdownTimer();
    }
  }, 1000);
}

// Call the countdownTimer function
countdownTimer();

// Call the saveToLocalStorage function every 10 seconds
setInterval(saveToLocalStorage, 10000);
*/


// Affiche l'année courante dans le footer
window.onload = function() {
  // get current year
  const currentYear = new Date().getFullYear();

  // update footer content with current year
  const footerContent = document.getElementById('footerContent');
  footerContent.innerHTML = `<p>©${currentYear} · Gaétan Lanthier · Conçu avec chat-GPT · Utilisation à vos risques · Vous aimez? 💰 bc1qay734rj64dgf585zanp84tt64akkjz3dwcx73c 🔒</p>`;
}

//----------- ONGLETS -----------//
                     
function openTab(evt, tabName) {
  var i, tabContent, tablinks;
  tabContent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function openTabCS(evt, tabName) {
  var i, tabContentCS, tablinksCS;
  tabContentCS = document.getElementsByClassName("tabContentCS");
  for (i = 0; i < tabContentCS.length; i++) {
    tabContentCS[i].style.display = "none";
  }
  tablinksCS = document.getElementsByClassName("tablinksCS");
  for (i = 0; i < tablinksCS.length; i++) {
    tablinksCS[i].className = tablinksCS[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "flex";
  evt.currentTarget.className += " active";
}

//------------------------- GÉNÉRATEUR DE DÉS -------------------------//

//----------- RESET -----------//
// Define click handler for reset button
  function handleReset(event) {
        // Reset modifier dropdown to default value
      modifier.value = 0;
      diceNumber.value = 1;


      // Reset le label_textbox
      document.getElementById("label_textbox").value = "";

  }

  // Get reference to reset button
  const resetButton = document.getElementById('reset_button');

  resetButton.addEventListener('click', handleReset);

//----------- SELECT -----------//

  // Populate modifier dropdown with values from -10 to 10
  const modifier = document.getElementById('modifier-select');
  for (let i = -10; i <= 10; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.text = i;
      modifier.appendChild(option);
  }

// Populate modifier dropdown with values from 1 to 20
const level_selector = document.getElementById('levelName');
for (let i = 1; i <= 20; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    level_selector.appendChild(option);
}


  // Set default value of select to 0 or 1
  modifier.value = 0;
  level_selector.value=1;


  
// Function to generate options for select boxes
function generateSelectedDiceNumbers() {
  var selectElement = document.getElementById('diceNumber');
  selectElement.innerHTML = ''; // Clear existing options
  
  for (var i = 1; i <= 20; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.text = i;
    selectElement.add(option);
  }
}

//----------- TOAST -----------//

  let toastCounter = 0;


  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `${message} <button class="close-toast" onclick="closeToast(this)">x</button>`;
    document.body.appendChild(toast);
      // Calculate the new bottom position based on toastCounter
    const bottomPosition = 20 + (toastCounter * (toast.offsetHeight + 60));
    toast.style.bottom = `${bottomPosition}px`;
      // Increase the toastCounter and display the toast
    toastCounter++;
    toast.style.display = 'block';
      // Hide the toast after 5 seconds
    setTimeout(() => {
      closeToast(toast.querySelector('.close-toast'));
    }, 5000);
  }
    function closeToast(closeButton) {
    if (closeButton) {
      closeButton.parentElement.style.opacity = 0;
      setTimeout(() => {
        closeButton.parentElement.remove();
        toastCounter--;
      }, 500);
    }
  }

//----------- DICE ROLLER -----------//

        // Talespire rollDice URL generator
  function rollDice(command) {
      const numberDie = document.getElementById('diceNumber').value;
      const diceType = command
      command = numberDie + command
      const modifierSelect = document.getElementById('modifier-select');
      const modifierValue = parseInt(modifierSelect.value);
      if (modifierValue > 0) {
          command += '+' + modifierValue;
      } else if (modifierValue === 0 || isNaN(modifierValue)) {
          // Do nothing
      } else {
          command += modifierValue;
      }
      // ajoute le libelé
      let custom_label = document.getElementById("label_textbox").value;
      if (custom_label !== "") {
          command = encodeURI(custom_label) + ":" + command;

      }

         // Send command to Talespire
         window.location.href = 'talespire://dice/' + command;

        //const toastMessage = 'Ça roule ' + 'talespire://dice/' + command + ' !';
        let toastMessage = `Ça roule `
        if (custom_label !== "") {
          toastMessage += `${custom_label} avec `;
        }
        toastMessage += `${numberDie} ${diceType}`;
        
        if (modifierValue !== 0) {
          toastMessage += ` et un bonus ${modifierValue}`;
        }
        
        // Show the toast
        showToast(toastMessage);
        //showToast('Ça roule ' + 'talespire://dice/' + command + ' !');
  }

//----------- SIDEBAR -----------//
// set hauteur du sidebar

function setSidebarHeight() {
  var sidebar = document.getElementById("sidebar");
  var mainContent = document.getElementById("main-content");
  var arrows = document.getElementById("arrows");

  sidebar.style.height = mainContent.offsetHeight + "px";
}

window.addEventListener('load', function () {
  setSidebarHeight();
  const sidebar = document.getElementById('sidebar');
  const arrow = document.getElementById('arrow');
});

window.addEventListener('resize', setSidebarHeight);

document.getElementById('diceGeneratorTab').addEventListener('click', setSidebarHeight);

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const arrow = document.getElementById('arrow');

  if (sidebar.style.right === '-280px') {
    sidebar.style.right = '0';
    arrow.style.right = '280px';
    arrow.innerHTML = '&#9654;';
  } else {
    sidebar.style.right = '-280px';
    arrow.style.right = '0';
    arrow.innerHTML = '&#9664;';
  }
}


document.getElementById('arrow').addEventListener('click', toggleSidebar);

  // write label from suggested list
function write_label(event) {
  const label_textbox = document.getElementById('label_textbox');
  label_textbox.value = event.target.textContent;
}

document.querySelectorAll('.name').forEach(name => {
  name.addEventListener('click', write_label);
});

//------------------------- FEUILLE DE PERSONNAGE -------------------------//
//----------- GESTION DE FICHIERS -----------//

function saveCharacter(saveTo) {
  const characterData = {
    abilities: {},
    description: {},
    apparence: {},
    skills: {},
    information: {},
    deathSaves: {
      success: [],
      failed: []
    },
    status: {},
    armorClassInfo:{}
    };

  for (const abilityId of ABILITY_NAMES) {
    const ability = document.getElementById(abilityId);
    const scoreValue = ability.querySelector(`#${abilityId}Score`).value;
    characterData.abilities[abilityId] = { Score: scoreValue };
  }

  for (const inputId of DESCRIPTION_INPUTS) {
    const inputElement = document.getElementById(inputId);
    if (inputElement.tagName === 'SELECT') {
      characterData.description[inputId] = inputElement.value;
    } else {
      characterData.description[inputId] = inputElement.value;
    }
  }

  for (const inputId of APPARENCE_INPUTS) {
    const inputElement = document.getElementById(inputId);
    characterData.apparence[inputId] = inputElement.value;
  }
  
  for (const skill of skillsName) {
    const skillSection = document.getElementById(`${skill.id}Skill`);
    const proficientInput = skillSection.querySelector(`#${skill.id}ProficientBonus`);
    const expertInput = skillSection.querySelector(`#${skill.id}ExpertBonus`);

    characterData.skills[skill.id] = {
      proficient: proficientInput.checked || false,
      expert: expertInput.checked || false
    };
  }

  for (const inputId of INFORMATION_INPUTS) {
    const inputElement = document.getElementById(inputId);
    const inputValue = inputElement.value || 0; // default to 0 if input is empty
    characterData.information[inputId] = inputValue;
  }

  const checkboxes = document.querySelectorAll('.checkbox-death-saving-throws');
  checkboxes.forEach((checkbox) => {
    if (checkbox.id.startsWith('success')) {
      characterData.deathSaves.success.push(checkbox.checked || false);
    } else if (checkbox.id.startsWith('failed')) {
      characterData.deathSaves.failed.push(checkbox.checked || false);
    }
  });

  // Save the advantage state
  const advantageButtons = document.querySelectorAll(".advantage-buttons");
  let advantageState = "";
  advantageButtons.forEach((button) => {
    if (button.classList.contains("activated-button")) {
      advantageState = button.id;
    }
  });
  characterData.information["avantage"] = advantageState;

/// Save status checkboxes
for (const status in statusIcons) {
  const statusCheckbox = document.getElementById(status);
  characterData.status[status] = statusCheckbox.checked || false;
}

/// Save armorclassinfo

characterData.armorClassInfo = {
  ability1: document.getElementById("abilityAdjustment1").value || " ",
  ability2: document.getElementById("abilityAdjustment2").value || " ",
  otherAdjustmentName: document.getElementById("otherArmorClassAdjustmentName").value || " ",
  otherAdjustmentValue: document.getElementById("otherArmorClassValue").value || "0",
  armorActive: document.getElementById("armorActiveCheckbox").checked || false,
  armorSelection: document.getElementById("armorSelection").value || " ",
  customArmorName: document.getElementById("customArmorName").value || " ",
  customArmorValue: document.getElementById("customArmorClassValue").value || "0",
  shieldActive1: document.getElementById("shieldActiveCheckbox1").checked || false,
  shieldSelection1: document.getElementById("shieldAndAccessoriesSelection1").value || " ",
  customShieldName1: document.getElementById("customShieldName1").value || " ",
  customShieldValue1: document.getElementById("customShieldClassValue1").value || "0",
  shieldActive2: document.getElementById("shieldActiveCheckbox2").checked || false,
  shieldSelection2: document.getElementById("shieldAndAccessoriesSelection2").value || " ",
  customShieldName2: document.getElementById("customShieldName2").value || " ",
  customShieldValue2: document.getElementById("customShieldClassValue2").value || "0"
};





  const jsonCharacterData = JSON.stringify(characterData, null, 2);

  // Check saveTo parameter and save data accordingly
  if (saveTo === 'saveToDisk') {
    const file = new Blob([jsonCharacterData], { type: "application/json" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = "character.json";
    downloadLink.click();
  } else if (saveTo === 'saveToLocalStorage') {
    localStorage.setItem('characterData', jsonCharacterData);
  } else {
    console.error('Invalid saveTo parameter.');
  }
}

function openCharacter(loadFrom) {
  function loadCharacterData(characterData) {

    const abilities = characterData["abilities"];
    const description = characterData["description"];
    const apparence = characterData["apparence"];
    const armorClassInfo = characterData.armorClassInfo;

    // Load abilities
    for (const abilityId in abilities) {
      if (abilities.hasOwnProperty(abilityId)) {
        const scoreValue = abilities[abilityId].Score;
        const ability = document.getElementById(abilityId);
        const scoreSelect = ability.querySelector(`#${abilityId}Score`);
        scoreSelect.value = scoreValue;
      }
    }

    // Load description
    for (const inputId of DESCRIPTION_INPUTS) {
      const inputElement = document.getElementById(inputId);
      const selectElement = inputElement.tagName === 'SELECT' ? inputElement : null;
      const customInputId = selectElement ? selectElement.dataset.customInput : null;

      if (description.hasOwnProperty(inputId)) {
        inputElement.value = description[inputId];
      }

      if (selectElement && customInputId) {
        selectElement.value = description.hasOwnProperty(inputId) ? description[inputId] : '';
        if (selectElement.value === 'custom') {
          document.getElementById(customInputId).value = description.hasOwnProperty(customInputId) ? description[customInputId] : '';
          document.getElementById(customInputId).style.display = 'block';
        } else {
          document.getElementById(customInputId).style.display = 'none';
        }
      }
    }

    // Load apparence
    for (const inputId in apparence) {
      if (apparence.hasOwnProperty(inputId)) {
        const inputElement = document.getElementById(inputId);
        inputElement.value = apparence[inputId];
      }
    }

    // Load skills
    const skills = characterData["skills"];
    for (const skill of skillsName) {
      const skillSection = document.getElementById(`${skill.id}Skill`);
      const proficientInput = skillSection.querySelector(`#${skill.id}ProficientBonus`);
      const expertInput = skillSection.querySelector(`#${skill.id}ExpertBonus`);

      if (skills.hasOwnProperty(skill.id)) {
        proficientInput.checked = skills[skill.id].proficient || false;
        expertInput.checked = skills[skill.id].expert || false;
      }
    }

    // Load information
    if (characterData.hasOwnProperty('information')) {
      for (const inputId of INFORMATION_INPUTS) {
        const inputElement = document.getElementById(inputId);
        if (characterData.information.hasOwnProperty(inputId)) {
          inputElement.value = characterData.information[inputId];
          if (inputId === "inspirationValue") {
            inputElement.innerText = inputElement.value === "oui" ? "Oui" : "Non";
          }
        }
      }
    }
    
    // Load death saves
    if (characterData.hasOwnProperty('deathSaves')) {
      const successCheckboxes = document.querySelectorAll('.checkbox-death-saving-throws[id^="success"]');
      characterData.deathSaves.success.forEach((value, index) => {
        if (index < successCheckboxes.length) {
          successCheckboxes[index].checked = value;
        }
      });

      const failedCheckboxes = document.querySelectorAll('.checkbox-death-saving-throws[id^="failed"]');
    characterData.deathSaves.failed.forEach((value, index) => {
    if (index < failedCheckboxes.length) {
    failedCheckboxes[index].checked = value;
    }
    });
    }
    
    // Load advantage state
    if (characterData.hasOwnProperty("information") && characterData.information.hasOwnProperty("avantage")) {
      const advantageButtons = document.querySelectorAll(".advantage-buttons");
      advantageButtons.forEach((button) => {
        if (button.id === characterData.information.avantage) {
          button.classList.add("activated-button");
        } else {
          button.classList.remove("activated-button");
        }
      });
    }

    // Load status checkboxes
    for (const status in statusIcons) {
      const statusCheckbox = document.getElementById(status);
      if (characterData.status.hasOwnProperty(status)) {
        statusCheckbox.checked = characterData.status[status];
      }
    }
    adjustStatusBar();

    // load armorclassinfo

    document.getElementById("abilityAdjustment1").value = armorClassInfo.ability1;
    document.getElementById("abilityAdjustment2").value = armorClassInfo.ability2;
    document.getElementById("otherArmorClassAdjustmentName").value = armorClassInfo.otherAdjustmentName;
    document.getElementById("otherArmorClassValue").value = armorClassInfo.otherAdjustmentValue;
    document.getElementById("armorActiveCheckbox").checked = armorClassInfo.armorActive;
    document.getElementById("armorSelection").value = armorClassInfo.armorSelection;
    document.getElementById("customArmorName").value = armorClassInfo.customArmorName;
    document.getElementById("customArmorClassValue").value = armorClassInfo.customArmorValue;
    document.getElementById("shieldActiveCheckbox1").checked = armorClassInfo.shieldActive1;
    document.getElementById("shieldAndAccessoriesSelection1").value = armorClassInfo.shieldSelection1;
    document.getElementById("customShieldName1").value = armorClassInfo.customShieldName1;
    document.getElementById("customShieldClassValue1").value = armorClassInfo.customShieldValue1;
    document.getElementById("shieldActiveCheckbox2").checked = armorClassInfo.shieldActive2;
    document.getElementById("shieldAndAccessoriesSelection2").value = armorClassInfo.shieldSelection2;
    document.getElementById("customShieldName2").value = armorClassInfo.customShieldName2;
    document.getElementById("customShieldClassValue2").value = armorClassInfo.customShieldValue2;

    selectChangedArmorClass(document.getElementById("armorSelection"), "customArmorContainer");
    selectChangedArmorClass(document.getElementById("shieldAndAccessoriesSelection1"), "customShieldContainer");
    selectChangedArmorClass(document.getElementById("shieldAndAccessoriesSelection2"), "customShieldContainer2");
    
    updateDependentElements();
} 

if (loadFrom === "loadFromDisk") {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";

  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const characterData = JSON.parse(e.target.result);
        loadCharacterData(characterData);
      } catch (error) {
        console.log(error);
        alert("uh-oh, J'ai un mauvais pressentiment");
      }
    };

    reader.readAsText(file);
  });

  input.click();
} else if (loadFrom === "loadFromLocalStorage") {
  try {
    const characterData = JSON.parse(localStorage.getItem("characterData"));
    if (!characterData) {
      throw new Error("No character data found in local storage");
    }
    loadCharacterData(characterData);
  } catch (error) {
    console.log(error);
    alert("uh-oh, J'ai un mauvais pressentiment");
  }
} else {
  console.error("Invalid loadFrom value provided");
}

}

function confirmReset() {
  ABILITY_NAMES.forEach((ability) => {
    const selectElement = document.getElementById(`${ability}Score`);
    selectElement.value = 10;
  });

  DESCRIPTION_INPUTS.forEach((inputId) => {
    const inputElement = document.getElementById(inputId);
    inputElement.value = ' ';
  });

  // Reset levelName to 1
  const levelNameElement = document.getElementById("levelName");
  levelNameElement.value = 1;

  APPARENCE_INPUTS.forEach((inputId) => {
    const inputElement = document.getElementById(inputId);
    inputElement.value = ' ';
  });

  // Reset skill checkboxes to false
  skillsName.forEach((skill) => {
    const skillSection = document.getElementById(`${skill.id}Skill`);
    const proficientInput = skillSection.querySelector(`#${skill.id}ProficientBonus`);
    const expertInput = skillSection.querySelector(`#${skill.id}ExpertBonus`);

    proficientInput.checked = false;
    expertInput.checked = false;
  });

  // Reset information
for (const inputId of INFORMATION_INPUTS) {
  const inputElement = document.getElementById(inputId);
  inputElement.value = inputId === "inspirationValue" ? "non" : 0;
  if (inputId === "inspirationValue") {
    inputElement.innerText = "Non";
  }
}
updateSpeedValues();


  //reset deathSaves here
 

  DEATHSAVE_INPUTS.forEach(inputId => {
    const inputElement = document.getElementById(inputId);
    inputElement.checked = false;
    inputElement.disabled = false;
  });

  // Disable the second and third checkboxes for success and failed
  document.getElementById("success2").disabled = true;
  document.getElementById("success3").disabled = true;
  document.getElementById("failed2").disabled = true;
  document.getElementById("failed3").disabled = true;

// Reset advantage state to Normal
setAdvantage('normal');


// Reset status checkboxes
for (const status in statusIcons) {
  const statusCheckbox = document.getElementById(status);
  statusCheckbox.checked = false;
}

///reset  armorclassinfo

  document.getElementById("abilityAdjustment1").value =  " ",
  document.getElementById("abilityAdjustment2").value = " ",
  document.getElementById("otherArmorClassAdjustmentName").value = " ",
  document.getElementById("otherArmorClassValue").value = "0",
  document.getElementById("armorActiveCheckbox").checked = false,
  document.getElementById("armorSelection").value = " ",
  document.getElementById("customArmorName").value = " ",
  document.getElementById("customArmorClassValue").value = "0",
  document.getElementById("shieldActiveCheckbox1").checked = false,
  document.getElementById("shieldAndAccessoriesSelection1").value = " ",
  document.getElementById("customShieldName1").value = " ",
  document.getElementById("customShieldClassValue1").value = "0",
  document.getElementById("shieldActiveCheckbox2").checked = false,
  document.getElementById("shieldAndAccessoriesSelection2").value = " ",
  document.getElementById("customShieldName2").value = " ",
  document.getElementById("customShieldClassValue2").value = "0"

  
updateDependentElements();
  //code continue here
  closePopup();
}

function showPopup() {
  const popup = document.getElementById('reset-popup');
  popup.style.display = 'flex';
}

function closePopup() {
  const popup = document.getElementById('reset-popup');
  popup.style.display = 'none';
}

function resetCharacter() {
  showPopup();
}

function adjustAllSkillBonuses() {
  skillsName.forEach(skill => {
    const skillId = skill.id;
    adjustSkillBonus(skillId);
  });
}

function updateAllAbilityModifiers() {
  ABILITY_NAMES.forEach(abilityName => {
    updateAbilityModifier(abilityName);
  });
}

function resetAllCustomList() {
  DESCRIPTION_INPUTS.forEach((inputId) => {
    const selectElement = document.getElementById(inputId);
    const customInputId = selectElement.dataset.customInput;

    if (selectElement.querySelector("option[value=custom]") || customInputId) {
      const customInputElement = document.getElementById(customInputId);
      customInputElement.style.display = "none";
    }
    if (selectElement.value === 'custom' && customInputId) {
      const customInputElement = document.getElementById(customInputId);
      customInputElement.style.display = "inline-flex";
    } else if (customInputId) {
      const customInputElement = document.getElementById(customInputId);
      customInputElement.style.display = "none";
    }
  });  
  
  const ARMOR_SHIELD_INPUTS = [
    {
      inputId: 'armorSelection',
      customInputId: 'customArmorName',
      customClassValueId: 'customArmorClassValue',
    },
    {
      inputId: 'shieldAndAccessoriesSelection1',
      customInputId: 'customShieldName1',
      customClassValueId: 'customShieldClassValue1',
    },
    {
      inputId: 'shieldAndAccessoriesSelection2',
      customInputId: 'customShieldName2',
      customClassValueId: 'customShieldClassValue2',
    },
  ];

  ARMOR_SHIELD_INPUTS.forEach(({ inputId, customInputId, customClassValueId }) => {
    const selectElement = document.getElementById(inputId);
  
    if (selectElement.querySelector("option[value=custom]") || customInputId) {
      const customInputElement = document.getElementById(customInputId);
      customInputElement.style.display = "none";
    }
    if (selectElement.value === 'custom' && customInputId) {
      const customInputElement = document.getElementById(customInputId);
      customInputElement.style.display = "inline-flex";
    } else {
      if (customInputId) {
        const customInputElement = document.getElementById(customInputId);
        customInputElement.style.display = "none";
      }
  
      // Reset and hide customClassValue elements
      if (customClassValueId) {
        const customClassValueElement = document.getElementById(customClassValueId);
        customClassValueElement.value = 0;
        customClassValueElement.style.display = "none";
      }
    }
  });
}
 



const successCheckboxes = document.querySelectorAll('.success-container .checkbox-death-saving-throws');
const failedCheckboxes = document.querySelectorAll('.failed-container .checkbox-death-saving-throws');

// Function to enable/disable the next checkbox in a container
function adjustCheckboxes(checkboxes) {
  checkboxes.forEach((checkbox, index) => {
    if (index === 0) {
      checkbox.disabled = checkboxes[1].checked;
    } else if (index === 1) {
      checkbox.disabled = checkboxes[2].checked || !checkboxes[0].checked;
    } else {
      checkbox.disabled = !checkboxes[index - 1].checked;
    }
  });
};

function adjustStatusBar() {
  const statusBar = document.getElementById("statusBar");
  statusBar.innerHTML = ""; // Clear the current content of the statusBar

  for (const [statusKey, statusValue] of Object.entries(statusIcons)) {
    const checkbox = document.getElementById(statusKey);
    if (checkbox && checkbox.checked) {
      const icon = document.createElement("span");
      icon.className = `iconify`;
      icon.setAttribute("data-icon", statusValue);
      icon.setAttribute("data-inline", "false");
      icon.style.fontSize = "24px"; // Set a default font size for the icons
      icon.style.marginRight = "8px"; // Add some space between the icons
      icon.title = statusValue.name_fr; // Set the French name as a tooltip on hover


      statusBar.appendChild(icon);
      icon.appendChild(document.createTextNode(statusValue.name_fr));

    }
  }
}




function updateDependentElements() {
  resetAllCustomList()
  updateCharacterClassAndLevel();
  updateProficiencyBonus();
  updateAllAbilityModifiers();
  adjustSavingThrows();
  adjustAllSkillBonuses();
  adjustInitiative();
  adjustCheckboxes(successCheckboxes);
  adjustCheckboxes(failedCheckboxes);
  updateSpeedValues();
  adjustStatusBar();
  adjustArmorClassValue();
  adjustAllAttacks();

  const characterNameInput = document.getElementById('characterName');
  characterTitle.textContent = characterNameInput.value;

}


//----------- AVANTAGES -----------//

function setAdvantage(buttonId) {
  const advantageButtons = ['disadvantage', 'normal', 'advantage'];

  for (const btnId of advantageButtons) {
    const button = document.getElementById(btnId);
    if (btnId === buttonId) {
      button.classList.add('activated-button');
    } else {
      button.classList.remove('activated-button');
    }
  }
}


//----------- FONCTIONS COMMUNES AUX SELECT -----------//


function selectChanged(selectElement,textboxID) {
  const textBoxInput = document.getElementById(textboxID);
  if (selectElement.value === 'custom') {
    textBoxInput.style.display = 'inline-flex';
  } else {
    textBoxInput.style.display = 'none';
  }
}


//----------- AFFICHE DU TOP-RIGHT INFO -----------//

const characterClassLevel = document.getElementById('characterClassClassAndLevel');
const characterClassInput = document.getElementById('className');
const characterLevelInput = document.getElementById('levelName');
const numberHitDiceInput = document.getElementById('numberHitDice');
const hitDiceTypeInput = document.getElementById('hitDiceType');

function updateCharacterClassAndLevel() {
  const className = characterClassInput.value;
  const level = characterLevelInput.value;
  characterClassLevel.textContent = `${className} niveau ${level}`;
  
  const classHitDice = classesHitDice.find(c => c.name === className);
  
  if (classHitDice) {
    hitDiceTypeInput.value = classHitDice.hitDice;
    numberHitDiceInput.value = level;
  } else {
    hitDiceTypeInput.value = 'd8';
    numberHitDiceInput.value = '0';
  }
}

characterClassInput.addEventListener('change', updateCharacterClassAndLevel);
characterLevelInput.addEventListener('change', updateCharacterClassAndLevel);
characterLevelInput.addEventListener('change', adjustAllSkillBonuses);

//----------- BONUS DE MAITRISE -----------//


const proficiency_bonus = document.getElementById('proficiencyBonusValue');

// Function to update proficiency bonus value based on selected level
function updateProficiencyBonus() {
  const level = parseInt(level_selector.value);
  const bonus = Math.ceil(level / 4) + 1;
  proficiency_bonus.textContent = '+' + bonus;
}

level_selector.addEventListener('change', updateProficiencyBonus);
level_selector.addEventListener('change', adjustAllSkillBonuses);

// Call update function initially to set default value
updateProficiencyBonus();

//----------- INITIATIVE -----------//


function adjustInitiative() {
  updateAbilityModifier("dexterity")
  const dexterityBonusScore = parseInt(document.getElementById("dexterityBonusScore").textContent);
  const otherInitiativeBonus = parseInt(document.getElementById("otherInitiativeBonus").value) || 0;
  const totalInitiativeBonus = dexterityBonusScore + otherInitiativeBonus;
  const initiativeBonusValue = totalInitiativeBonus >= 0 ? `+${totalInitiativeBonus}` : totalInitiativeBonus.toString();
  document.getElementById("initiativeBonusValue").textContent = initiativeBonusValue;
}


// Add event listeners to update initiative bonus whenever the dexterity score or other initiative bonus changes
document.getElementById("dexterityScore").addEventListener("input", adjustInitiative);
document.getElementById("otherInitiativeBonus").addEventListener("input", adjustInitiative);

function rollInitiative(initiativeName, initiativeBonus) {
  let commandBonus = '';
  let toastBonus = '';
  if (initiativeBonus !== '+0') {
    commandBonus = initiativeBonus;
    toastBonus = ` et un bonus de ${initiativeBonus}`;
  }
  const command = `${encodeURI(initiativeName)}:d20${commandBonus}`;
  const toastMessage = `Ça roule ${initiativeName} avec d20${toastBonus}`;

  // Send command to Talespire
  window.location.href = `talespire://dice/${command}`;

  // Show the toast
  showToast(toastMessage);
  //showToast(`talespire://dice/${command}`);
}


//----------- SAUVEGARDE CONTRE LA MORT -----------//

//--- ANIMATE 3D D20 ----//

function animateD20() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(400, 400);
  document.getElementById("diceWrapper").appendChild(renderer.domElement);

  // Add ambient light to the scene
  var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Add directional light to the scene
  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  // Create materials for each face using the numbered textures
  const materials = [];
  for (let i = 1; i <= 20; i++) {
    const textureNumber = d20Mapping[i - 1];
    const texture = createNumberedTexture(textureNumber);
    materials.push(new THREE.MeshPhongMaterial({ map: texture, shininess: 1000 }));
  }

  // Create the d20 geometry and adjust UV mapping
  var d20Geometry = createD20Geometry(10); // Pass the desired size as an argument

  var d20Material = materials;

  // Create the d20 mesh and add it to the scene
  var d20Mesh = new THREE.Mesh(d20Geometry, d20Material);
  scene.add(d20Mesh);

  // Position the camera and d20 mesh
  camera.position.z = 20;
  d20Mesh.position.z = -10;


  // Animate the die by continuously rotating it
  function animateDie() {
    d20Mesh.rotation.x += 0.01;
    d20Mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animateDie);
  }

  // Call the animateDie function to start the animation loop
  animateDie();

  // Show the d20Container
  d20RendererElement = renderer.domElement;
  showD20Container();
}

   
function createNumberedTexture(number) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  canvas.className = 'dice-canvas'; 


  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#C0C0C0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'black';
  ctx.font = '400px Roboto'; // Adjust the font size here
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(number, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return texture;
}

  function createD20Geometry(size) {
    const geometry = new THREE.IcosahedronGeometry(size, 0);
    geometry.faceVertexUvs[0] = [];

    geometry.faces.forEach((face, index) => {
      const textureIndex = d20Mapping[index] - 1;
      face.materialIndex = textureIndex;

      const uvA = new THREE.Vector2(0.5, 1);
      const uvB = new THREE.Vector2(0, 0.25);
      const uvC = new THREE.Vector2(1, 0.25);

      geometry.faceVertexUvs[0].push([uvA, uvB, uvC]);
    });

    geometry.uvsNeedUpdate = true;

    return geometry;
  }

  // ... IcosahedronGeometry code ...

  const d20Geometry = new THREE.IcosahedronGeometry(1, 0);
  const vertices = d20Geometry.vertices;
  const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);
  const faceVertices = [];

  for (let i = 0; i < icosahedronGeometry.faces.length; i++) {
    const face = icosahedronGeometry.faces[i];
    const a = icosahedronGeometry.vertices[face.a];
    const b = icosahedronGeometry.vertices[face.b];
    const c = icosahedronGeometry.vertices[face.c];
    faceVertices.push([a, b, c]);
  }

  const faceCenters = faceVertices.map(face => {
    const center = new THREE.Vector3();
    center.add(face[0]).add(face[1]).add(face[2]).divideScalar(3);
    return center;
  });

  const faceNormals = faceVertices.map(face => {
    const ab = new THREE.Vector3().subVectors(face[1], face[0]);
    const ac = new THREE.Vector3().subVectors(face[2], face[0]);
    return new THREE.Vector3().crossVectors(ab, ac).normalize();
  });

  const faceRotations = faceNormals.map(normal => {
    const quaternion = new THREE.Quaternion().setFromUnitVectors(normal, new THREE.Vector3(0, 1, 0));
    const euler = new THREE.Euler().setFromQuaternion(quaternion);
    return { x: euler.x, y: euler.y };
  });

function showD20Container() {
  document.getElementById("d20Container").classList.remove("hidden");
}

let d20RendererElement = null;

function hideD20Container() {
  var container = document.getElementById("d20Container");
  var diceWrapper = document.getElementById("diceWrapper");
  if (d20RendererElement) {
    diceWrapper.removeChild(d20RendererElement);
    d20RendererElement = null;
  }
  container.classList.add("hidden");
}


//--- fin de ANIMATE 3D D20 ----//

document.addEventListener('DOMContentLoaded', () => {
  // loaded above Gestion fichier
  //const successCheckboxes = document.querySelectorAll('.success-container .checkbox-death-saving-throws');
  //const failedCheckboxes = document.querySelectorAll('.failed-container .checkbox-death-saving-throws');
  
  const resetButton1 = document.getElementById('resetDeathSavingThrowsButton');

  // Function to enable/disable the next checkbox in a container
  const updateCheckboxes = (checkboxes) => {
    checkboxes.forEach((checkbox, index) => {
      if (index === 0) {
        checkbox.disabled = checkboxes[1].checked;
      } else if (index === 1) {
        checkbox.disabled = checkboxes[2].checked || !checkboxes[0].checked;
      } else {
        checkbox.disabled = !checkboxes[index - 1].checked;
      }
    });
  };
  
  window.rollDeathSavingThrowsLocally = () => {
    const roll = Math.floor(Math.random() * 20) + 1; // Roll a d20

    hideD20Container();
    animateD20();
    updateButton(roll);

    if (roll === 20) {
      let checkedSuccess = 0;
      for (const checkbox of successCheckboxes) {
        if (!checkbox.checked) {
          checkbox.checked = true;
          checkedSuccess++;
          if (checkedSuccess === 2) break;
        }
      }
    } else if (roll === 1) {
      let checkedFailed = 0;
      for (const checkbox of failedCheckboxes) {
        if (!checkbox.checked) {
          checkbox.checked = true;
          checkedFailed++;
          if (checkedFailed === 2) break;
        }
      }
    } else if (roll >= 10) {
      for (const checkbox of successCheckboxes) {
        if (!checkbox.checked) {
          checkbox.checked = true;
          break;
        }
      }
    } else {
      for (const checkbox of failedCheckboxes) {
        if (!checkbox.checked) {
          checkbox.checked = true;
          break;
        }
      }
    }
  
    // Update enable/disable status of the checkboxes
    updateCheckboxes(successCheckboxes);
    updateCheckboxes(failedCheckboxes);
  
    if (successCheckboxes[2].checked) {
      console.log('alive');
      //alert('Votre état est stabilisé');
      document.getElementById("deadOrAlive").textContent = 'Votre état est stabilisé';
    } else if (failedCheckboxes[2].checked) {
      //alert('Vous êtes mort');
      console.log('dead');
      document.getElementById("deadOrAlive").textContent = 'Vous êtes mort';
    } else {
      document.getElementById("deadOrAlive").textContent = '';
      console.log("Shrödinger' cat");
    }

  };
  
  // Add event listeners to checkboxes
  successCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => updateCheckboxes(successCheckboxes));
  });

  failedCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => updateCheckboxes(failedCheckboxes));
  });

  // Add event listener to reset button
  resetButton1.addEventListener('click', () => {
    successCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
      checkbox.disabled = checkbox !== successCheckboxes[0];
    });

    failedCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
      checkbox.disabled = checkbox !== failedCheckboxes[0];
    });
  });
});

function updateButton(roll) {
  const button = document.getElementById('buttonDeathSaveRollResult');
  button.textContent = roll;

  if (roll < 10) {
    button.style.backgroundColor = 'red';
  } else if (roll === 20) {
    button.style.backgroundColor = 'limegreen'; // Flashy green
  } else if (roll === 1) {
    button.style.backgroundColor = 'orangered'; // Flashy red
  } else {
    button.style.backgroundColor = 'green';
  }
}

//----------- HABILETÉS -----------//

const characterTitle = document.getElementById('character-title');
  const characterNameInput = document.getElementById('characterName');

  characterNameInput.addEventListener('input', () => {
    characterTitle.textContent = characterNameInput.value;
  });


// Populate score dropdowns with values from 1 to 20
for (let i = 1; i <= 20; i++) {
  for (let j = 0; j < ABILITY_NAMES.length; j++) {
    const score_selector = document.getElementById(`${ABILITY_NAMES[j]}Score`);
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    score_selector.appendChild(option);
  }
}

// Loop through each ability name and set the default value to 10 for the corresponding select element
ABILITY_NAMES.forEach((ability) => {
  const selectElement = document.getElementById(`${ability}Score`);
  selectElement.value = 10;
});

// Calculate and update ability modifiers
function updateAbilityModifier(ability) {
  const score_selector = document.getElementById(`${ability}Score`);
  const modifier_p = document.getElementById(`${ability}BonusScore`);
  const score = parseInt(score_selector.value);
  let modifier = Math.floor((score - 10) / 2);

  modifier_p.textContent = modifier >= 0 ? `+${modifier}` : modifier;




// Display the modifier with a plus sign for positive values
  modifier_p.textContent = `${modifier >= 0 ? '+' : ''}${modifier}`;
}



function rollAbility(abilityName, diceType, bonus) {
  const command = `${encodeURI(abilityName)}:${diceType}${bonus}`;
  const toastMessage = `Ça roule ${abilityName} avec ${diceType} et un bonus ${bonus}`;

  // Send command to Talespire
  window.location.href = `talespire://dice/${command}`;

  // Show the toast
  showToast(toastMessage);
  //showToast(`talespire://dice/${command}`);
}



window.addEventListener('load', function() {
  generateSelectedDiceNumbers();
});

function adjustSavingThrows() {
  const proficiencyBonusElem = document.getElementById('proficiencyBonusValue').textContent;
  const proficiencyBonusValue = parseInt(proficiencyBonusElem, 10);
  const selectedClass = document.getElementById('className').value;
  const classSavingThrow = classSavingThrows.find((c) => c.className === selectedClass);
  const selectedSaves = classSavingThrow ? classSavingThrow.proficientSaves : [];
  const savingThrowElems = document.querySelectorAll('#savingThrows .subsection');

  savingThrowElems.forEach((el) => {
    const saveName = el.querySelector('h4').textContent;
    const isProficient = selectedSaves.includes(saveName);

    // Get the corresponding ability bonus
    const englishSaveName = {
      'Force': 'strength',
      'Dextérité': 'dexterity',
      'Constitution': 'constitution',
      'Intelligence': 'intelligence',
      'Sagesse': 'wisdom',
      'Charisme': 'charisma'
    }[saveName];
    const abilityBonus = document.getElementById(englishSaveName + 'BonusScore').textContent;
    const abilityBonusValue = parseInt(abilityBonus, 10);

    const saveButton = document.createElement('p');
    saveButton.classList.add('roundButton', 'save-modifier');
    const totalSaveBonus = isProficient ? proficiencyBonusValue + abilityBonusValue : abilityBonusValue;
    saveButton.textContent = (totalSaveBonus >= 0 ? '+' : '') + totalSaveBonus;

    // Add the id attribute to the new save button element
    const saveId = englishSaveName + "SaveValue";
    saveButton.setAttribute('id', saveId);

    // Copy the onclick attribute from the original element to the new one
    const originalSaveButton = el.querySelector('p');
    saveButton.setAttribute('onclick', originalSaveButton.getAttribute('onclick'));

    el.innerHTML = '';
    el.appendChild(document.createElement('h4')).textContent = saveName;
    el.appendChild(saveButton);

    // Call the applySaveButtonColors() function
    applySaveButtonColors();
  });
}

// add event listener to the className select element
const classNameSelect = document.getElementById('className');
classNameSelect.addEventListener('change', () => {
  adjustSavingThrows();
  applySaveButtonColors();
});

// add event listener to the levelName select element
const levelNameSelect = document.getElementById('levelName');
levelNameSelect.addEventListener('change', () => {
  adjustSavingThrows();
  applySaveButtonColors();
  adjustAllSkillBonuses();
});


function applySaveButtonColors() {
  const saveButtons = document.querySelectorAll('.save-modifier');
  
  saveButtons.forEach((button) => {
    switch (button.id) {
      case 'strengthSaveValue':
      case 'strengthBonusScore':
        button.style.backgroundColor = '#FFC107'; // amber
        break;
      case 'dexteritySaveValue':
      case 'dexterityBonusScore':
        button.style.backgroundColor = '#E91E63'; // pink
        break;
      case 'constitutionSaveValue':
      case 'constitutionBonusScore':
        button.style.backgroundColor = '#4CAF50'; // green
        break;
      case 'intelligenceSaveValue':
      case 'intelligenceBonusScore':
        button.style.backgroundColor = '#2196F3'; // blue
        break;
      case 'wisdomSaveValue':
      case 'wisdomBonusScore':
        button.style.backgroundColor = '#9C27B0'; // purple
        break;
      case 'charismaSaveValue':
      case 'charismaBonusScore':
        button.style.backgroundColor = '#f436cb'; // red
        break;
    }
  });
}


//----------- SAUVEGARDES -----------//


// get all the .roundButton elements within the #savingThrows element
const saveButtons = document.querySelectorAll('#savingThrows .roundButton');


function rollSave(saveName, saveBonus) {
  let commandBonus = '';
  let toastBonus = '';
  if (saveBonus !== '+0') {
    commandBonus = saveBonus;
    toastBonus = ` et un bonus de ${saveBonus}`;
  }
  const command = `${encodeURI("Sauvgarde " + saveName)}:d20${commandBonus}`;
  const toastMessage = `Ça roule Sauvegarde ${saveName} avec d20${toastBonus}`;

  // Send command to Talespire
  window.location.href = `talespire://dice/${command}`;

  // Show the toast
  showToast(toastMessage);
  //showToast(`talespire://dice/${command}`);
}


// Update ability modifiers when score dropdowns are changed
for (let i = 0; i < ABILITY_NAMES.length; i++) {
  const score_selector = document.getElementById(`${ABILITY_NAMES[i]}Score`);
  score_selector.addEventListener('change', () => {
    updateAbilityModifier(ABILITY_NAMES[i]);
    adjustAllSkillBonuses();
    adjustSavingThrows(); // Add the parentheses to call the function
  });
}

//----------- SKILLS -----------//

function adjustSkillBonus(skillId) {
  const proficiencyBonusElement = document.getElementById('proficiencyBonusValue');
  const proficiencyBonus = parseInt(proficiencyBonusElement.textContent);

  const skillSubsection = document.getElementById(`${skillId}Skill`);
  const proficientInput = skillSubsection.querySelector(`#${skillId}ProficientBonus`);
  const expertInput = skillSubsection.querySelector(`#${skillId}ExpertBonus`);
  const skillValueDisplay = skillSubsection.querySelector('.roundButton');

  let newSkillBonus = 0;

  if (expertInput.checked) {
    newSkillBonus += proficiencyBonus * 2;
    proficientInput.checked = true;
  } else if (proficientInput.checked) {
    newSkillBonus += proficiencyBonus;
  }

  
  // Get the corresponding ability bonus
  const skillNameElement = skillSubsection.querySelector('h4');
  const skillName = skillNameElement.textContent.trim();
  const ability = abilitiesSkills.find(skill => skill.nom === skillName);
  if (ability) {
    const abilityName = ability.caracteristique;
    const englishSaveName = {
      'Force': 'strength',
      'Dextérité': 'dexterity',
      'Constitution': 'constitution',
      'Intelligence': 'intelligence',
      'Sagesse': 'wisdom',
      'Charisme': 'charisma'
    }[abilityName];
    const abilityBonus = document.getElementById(englishSaveName + 'BonusScore').textContent;
    newSkillBonus += parseInt(abilityBonus);
  }
  /*
  // Check class proficiency
  const classNameElement = document.getElementById('className');
  const className = classNameElement.value;
  const classSkill = classesSkills.find(skill => skill.id === skillId && skill.maitrise.includes(className));
  if (classSkill) {
    proficientInput.checked = true;
    newSkillBonus += proficiencyBonus;
    skillValueDisplay.textContent = `+${newSkillBonus}`;
  } 
    */

  skillValueDisplay.textContent = newSkillBonus > 0 ? `+${newSkillBonus}` : (newSkillBonus === 0 ? "+0" : newSkillBonus);
}


const abilityBonusElements = document.querySelectorAll('.ability-bonus');
abilityBonusElements.forEach(element => {
  element.addEventListener('change', () => {
    const skillSection = element.closest('.subsection');
    const skillId = skillSection.id.slice(0, -5); // remove "Skill" from the id
    adjustSkillBonus(skillId);
  });
});

function addCharacteristicsToSkills() {
  const skillSections = document.querySelectorAll('#skills .subsection');
  
  for (let i = 0; i < skillSections.length; i++) {
    const skillName = skillSections[i].querySelector('h4').textContent.trim();
    const ability = abilitiesSkills.find(skill => skill.nom === skillName);
    
    if (ability) {
      const characteristic = ability.caracteristique;
      const characteristicElement = document.createElement('p');
      characteristicElement.textContent = characteristic;
      skillSections[i].insertAdjacentElement('afterbegin', characteristicElement);
    }
  }
}

window.addEventListener('load', addCharacteristicsToSkills);


function createSkillSection(skill) {
  const subsection = document.createElement('div');
  subsection.id = `${skill.id}Skill`;
  subsection.classList.add('subsection');

  const h4 = document.createElement('h4');
  h4.textContent = skill.name;
  subsection.appendChild(h4);

  const p = document.createElement('p');
  p.id = `${skill.id}BonusValue`;
  p.className = 'roundButton skill-button ' + skill.id;
  p.className = 'roundButton';
  p.textContent = '+0';
  p.onclick = () => rollSkill(skill.name, p.textContent);
  subsection.appendChild(p);

  const skillCheckBoxes = document.createElement('div');
  skillCheckBoxes.className = 'skillCheckBoxes';
  subsection.appendChild(skillCheckBoxes);

  const proficientInput = document.createElement('input');
  proficientInput.type = 'checkbox';
  proficientInput.id = `${skill.id}ProficientBonus`;
  proficientInput.className = 'proficientBonus';
  proficientInput.name = `${skill.id}ProficientBonus`;
  proficientInput.checked = false;
  skillCheckBoxes.appendChild(proficientInput);

  const proficientLabel = document.createElement('label');
  proficientLabel.setAttribute('for', proficientInput.id);
  proficientLabel.textContent = 'Maîtrise';
  skillCheckBoxes.appendChild(proficientLabel);

  const expertInput = document.createElement('input');
  expertInput.type = 'checkbox';
  expertInput.id = `${skill.id}ExpertBonus`;
  expertInput.className = 'expertBonus';
  expertInput.name = `${skill.id}ExpertBonus`;
  skillCheckBoxes.appendChild(expertInput);

  const expertLabel = document.createElement('label');
  expertLabel.setAttribute('for', expertInput.id);
  expertLabel.textContent = 'Expert';
  expertInput.checked = false;
  skillCheckBoxes.appendChild(expertLabel);

  proficientInput.addEventListener('change', () => {
    adjustSkillBonus(skill.id);
  });
  
  expertInput.addEventListener('change', () => {
    adjustSkillBonus(skill.id);
  });

  return subsection;
}

function generateSkills() {
  const skillsSection = document.getElementById("skills");

  for (const skill of skillsName) {
    const skillSubsection = createSkillSection(skill);
    skillsSection.appendChild(skillSubsection);

    const proficientInput = skillSubsection.querySelector(`#${skill.id}ProficientBonus`);
    proficientInput.addEventListener('change', () => {
      adjustSkillBonus(skill.id);
    });

    const expertInput = skillSubsection.querySelector(`#${skill.id}ExpertBonus`);
    expertInput.addEventListener('change', () => {
      adjustSkillBonus(skill.id);
    });
  }
}

// Add an event listener to call generateSkills when the page loads
window.addEventListener('DOMContentLoaded', generateSkills);


function rollSkill(skillName, skillBonus) {
  let commandBonus = '';
  let toastBonus = '';
  if (skillBonus !== '+0') {
    commandBonus = skillBonus;
    toastBonus = ` et un bonus de ${skillBonus}`;
  }
  const command = `${encodeURI("Compétence " + skillName)}:d20${commandBonus}`;
  const toastMessage = `Ça roule Compétence ${skillName} avec d20${toastBonus}`;

  // Send command to Talespire
  window.location.href = `talespire://dice/${skillName}${command}`;

  // Show the toast
  //showToast(toastMessage);
  showToast(`talespire://dice/${command}`);
}


//----------- INSPIRATION -----------//


function toggleInspiration() {
  const button = document.getElementById('inspirationValue');
  const value = button.value;

  if (value === 'non') {
    button.textContent = 'Oui';
    button.value = 'oui';
    button.classList.remove('toggle-button-non');
    button.classList.add('toggle-button-oui');
  } else {
    button.textContent = 'Non';
    button.value = 'non';
    button.classList.remove('toggle-button-oui');
    button.classList.add('toggle-button-non');
  }
}


//----------- Déplacement speed vitesse -----------//

document.getElementById("speedValue").addEventListener("input", function() {
  const speedValue = this.value;
  const speedValueFeet = document.getElementById("speedValueFeet");
  const speedValueMeters = document.getElementById("speedValueMeters");

  if (speedValue === "" || isNaN(speedValue)) {
    speedValueFeet.value = "";
    speedValueMeters.value = "";
  } else {
    speedValueFeet.value = speedValue * 5;
    speedValueMeters.value = speedValue * 1.5;
  }
});

function updateSpeedValues() {
  const speedValueInput = document.getElementById('speedValue');
  const speedValueFeet = document.getElementById('speedValueFeet');
  const speedValueMeters = document.getElementById('speedValueMeters');

  if (speedValueInput.value <= 0) {
    speedValueInput.value = 0;
    speedValueFeet.value = '';
    speedValueMeters.value = '';
  } else {
    speedValueFeet.value = speedValueInput.value * 5;
    speedValueMeters.value = speedValueInput.value * 1.5;
  }
}

function adjustSpeed() {
  const speedValueInput = document.getElementById('speedValue');

  speedValueInput.addEventListener('input', () => {
    updateSpeedValues();
  });
}






//----------- DONS -----------//

// Sélectionner l'élément HTML où afficher le menu déroulant
const select = document.querySelector('#feats-select');
const featDetails = document.querySelector('#feat-details');


// Ajouter chaque don au menu déroulant
for (let i = 0; i < feats.length; i++) {
  const option = document.createElement('option');
  option.value = feats[i].nameFeats;
  option.text = feats[i].nameFeats;
  select.appendChild(option);
}

select.addEventListener('change', function() {
  featDetails.innerHTML = ''; // Clear existing details
  if (this.value === '') {
    return; // Do nothing if no feat is selected
  }

  const selectedFeat = feats.find(feat => feat.nameFeats === this.value);

  const nameElement = document.createElement('h3');
  nameElement.textContent = selectedFeat.nameFeats;
  featDetails.appendChild(nameElement);

  const labels = [
    { key: 'nameVoFeats', label: 'VO' },
    { key: 'prerequisiteFeats', label: 'Prérequis' },
    { key: 'descriptionFeats', label: 'Description' },
    { key: 'sourceFeats', label: 'Source' },
  ];

  for (const { key, label } of labels) {
    const labelElement = document.createElement('p');
    labelElement.innerHTML = `<strong>${label}:</strong> ${selectedFeat[key]}`;
    featDetails.appendChild(labelElement);
  }
});

//----------- SORTS spells -----------//

function generateSelectBoxes() {
  for (let level = 0; level <= 9; level++) {
    const selectBox = document.createElement("select");
    selectBox.setAttribute("class", "input-text");
    selectBox.setAttribute("name", `spells${level}`);

    const label = document.createElement("label");
    label.innerHTML = `Choisir un sort niveau ${level}`;

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = `Choisir un sort niveau ${level}`;
    selectBox.appendChild(defaultOption);

    const spellsForLevel = spells.filter((spell) => spell.Niv === level);

    for (const spell of spellsForLevel) {
      const option = document.createElement("option");
      option.value = spell.id;
      option.textContent = spell.Sort;
      selectBox.appendChild(option);
    }

    const subsection = document.getElementById(`level_${level}`);
    subsection.appendChild(label);
    subsection.appendChild(selectBox);

    const spellInfoContainer = document.createElement("div");
    spellInfoContainer.setAttribute("id", `spellInfo${level}`);
    subsection.appendChild(spellInfoContainer);

    selectBox.addEventListener("change", function () {
      const selectedSpell = spells.find((spell) => spell.id === this.value);
      displaySpellInfo(selectedSpell, `spellInfo${level}`);
    });
  }
}

function displaySpellInfo(spell, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (!spell) {
    return;
  }

  const spellName = document.createElement("h3");
  spellName.textContent = spell.Sort;
  container.appendChild(spellName);

  const keysToDisplay = [
    "VO",
    "École",
    "Incantation",
    "Concentration",
    "Rituel",
    "Description",
    "Source",
    "URL",
  ];

  for (const key of keysToDisplay) {
    if (spell[key]) {
      const pInfo = document.createElement("p");
      pInfo.innerHTML = `<strong>${key}:</strong> ${spell[key]}`;
      container.appendChild(pInfo);
    }
  }
}

window.addEventListener("load", generateSelectBoxes);

function populateSpellCasterSelect() {
  const spellCasterSelect = document.getElementById('spellCasterSelect');
  spellCasters.forEach(spellCaster => {
    const option = document.createElement('option');
    option.value = spellCaster.name;
    option.text = spellCaster.name;
    spellCasterSelect.add(option);
  });
}

window.addEventListener("load", populateSpellCasterSelect);

//----------- Status -----------//

function generateStatusCheckboxes() {

  const statusContainer = document.getElementById("status");

  const statusList = document.createElement("ul");
  statusList.style.columns = "1";
  statusList.style.listStyleType = "none";
  statusList.style.margin = "0";
  statusList.style.padding = "0";
  
  const statusBar = document.getElementById("statusBar"); // get status bar element
  
  for (const [statusKey, statusValue] of Object.entries(characterStatus)) {
    const listItem = document.createElement("li");
    listItem.style.whiteSpace = "nowrap"; // Prevent text from wrapping to multiple lines

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = statusKey;
    checkbox.name = "status";
    
    const label = document.createElement("label");
    label.htmlFor = statusKey;
    label.title = statusValue.description_fr;
    label.style.display = "inline-flex"; // Use flex to align icon and text
    label.style.alignItems = "center"; // Align icon and text vertically

    const icon = document.createElement("span");
    icon.className = `iconify`;
    icon.setAttribute("data-icon", statusIcons[statusKey]);
    icon.setAttribute("data-inline", "false");
    icon.style.marginRight = "4px"; // Add some space between the icon and the text

    label.appendChild(icon);
    label.appendChild(document.createTextNode(statusValue.name_fr));
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    statusList.appendChild(listItem);
    
    checkbox.addEventListener('change', function() {
      const isChecked = this.checked;
      const iconCopy = icon.cloneNode(true);
      iconCopy.style.fontSize = "24px";
      iconCopy.title = characterStatus[statusKey].name_fr; // Set the French name as a tooltip on hover
      if (isChecked) {
        // add the icon to the status bar
        statusBar.appendChild(iconCopy);

      } else {
        // remove the icon from the status bar
        const iconsInStatusBar = statusBar.querySelectorAll(`[data-icon='${statusIcons[statusKey]}']`);
        for (let i = 0; i < iconsInStatusBar.length; i++) {
          if (iconsInStatusBar[i].parentNode === statusBar) {
            statusBar.removeChild(iconsInStatusBar[i]);
            break;
          }
        }
      }
    });
  }
  
  statusContainer.appendChild(statusList);
  
  return statusContainer;
}


document.addEventListener("DOMContentLoaded", () => {
  const statusContainer = generateStatusCheckboxes();
  const targetElement = document.getElementById("status");
  targetElement.parentNode.insertBefore(statusContainer, targetElement.nextSibling);
});

//----------- CLASSE D'ARMURE  -----------//

function populateArmorOptions() {
  const armorSelect = document.getElementById("armorSelection");

  // Add the default option
  const defaultOption = document.createElement("option");
  defaultOption.value = " ";
  defaultOption.textContent = "Choisir une armure";
  armorSelect.appendChild(defaultOption);

  // Add the armor options
  for (const armor of armors) {
    const armorOption = document.createElement("option");
    armorOption.value = armor.id;
    armorOption.textContent = armor.nom;
    armorSelect.appendChild(armorOption);
  }

  // Add the custom armor option
  const customOption = document.createElement("option");
  customOption.value = "custom";
  customOption.textContent = "Armure personnalisée";
  armorSelect.appendChild(customOption);
}

function selectChangedArmorClass(selectElement, containerID) {
  const container = document.getElementById(containerID);
  if (selectElement.value === 'custom') {
    container.style.display = 'flex';
  } else {
    container.style.display = 'none';
  }
}

function populateShieldAndAccessoriesOptions() {
  const shieldAndAccessoriesSelect = document.getElementById("shieldAndAccessoriesSelection1");

  // Add the default option
  const defaultOption = document.createElement("option");
  defaultOption.value = " ";
  defaultOption.textContent = "Choisir un bouclier ou un accessoire";
  shieldAndAccessoriesSelect.appendChild(defaultOption);

  // Add the shield and accessories options
  for (const item of shieldAndAccessories) {
    const itemOption = document.createElement("option");
    itemOption.value = item.id;
    itemOption.textContent = item.nom;
    shieldAndAccessoriesSelect.appendChild(itemOption);
  }

  // Add the custom shield option
  const customOption = document.createElement("option");
  customOption.value = "custom";
  customOption.textContent = "Bouclier personnalisé";
  shieldAndAccessoriesSelect.appendChild(customOption);
}

function populateShieldAndAccessoriesOptions2() {
  const shieldAndAccessoriesSelect = document.getElementById("shieldAndAccessoriesSelection2");

  // Add the default option
  const defaultOption = document.createElement("option");
  defaultOption.value = " ";
  defaultOption.textContent = "Choisir un bouclier ou un accessoire 2";
  shieldAndAccessoriesSelect.appendChild(defaultOption);

  // Add the shield and accessories options
  for (const item of shieldAndAccessories) {
    const itemOption = document.createElement("option");
    itemOption.value = item.id;
    itemOption.textContent = item.nom;
    shieldAndAccessoriesSelect.appendChild(itemOption);
  }

  // Add the custom shield option
  const customOption = document.createElement("option");
  customOption.value = "custom";
  customOption.textContent = "Bouclier personnalisé 2";
  shieldAndAccessoriesSelect.appendChild(customOption);
}

function displayDescription(selectElement, descriptionContainerID) {
  const descriptionContainer = document.getElementById(descriptionContainerID);
  if (selectElement.value !== " ") {
    descriptionContainer.style.display = 'block';
    descriptionContainer.textContent = selectElement.options[selectElement.selectedIndex].dataset.description;
  } else {
    descriptionContainer.style.display = 'none';
    descriptionContainer.textContent = "";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  populateArmorOptions();
  populateShieldAndAccessoriesOptions();
  populateShieldAndAccessoriesOptions2();

});

function adjustArmorClassValue() {
  const abilityBonusScoreMapping = {
    'strength': parseInt(strengthBonusScore.textContent),
    'dexterity': parseInt(dexterityBonusScore.textContent),
    'constitution': parseInt(constitutionBonusScore.textContent),
    'intelligence': parseInt(intelligenceBonusScore.textContent),
    'wisdom': parseInt(wisdomBonusScore.textContent),
    'charisma': parseInt(charismaBonusScore.textContent),
  };

  const base = 10;
  let totalArmorClass = base;

  totalArmorClass += abilityBonusScoreMapping[abilityAdjustment1.value] || 0;
  totalArmorClass += abilityBonusScoreMapping[abilityAdjustment2.value] || 0;
  totalArmorClass += validateBonusValue(otherArmorClassValue.value);

  if (armorActiveCheckbox.checked) {
    if (armorSelection.value === "custom") {
      totalArmorClass += validateBonusValue(customArmorClassValue.value);
    } else {
      const selectedArmor = armors.find(armor => armor.id === armorSelection.value);
      totalArmorClass += selectedArmor ? selectedArmor.armorClass - 10 : 0;
    }
  }

  if (shieldActiveCheckbox1.checked) {
    if (shieldAndAccessoriesSelection1.value === "custom") {
      totalArmorClass += validateBonusValue(customShieldClassValue1.value);
    } else {
      const selectedShield1 = shieldAndAccessories.find(shield => shield.id === shieldAndAccessoriesSelection1.value);
      totalArmorClass += selectedShield1 ? selectedShield1.armorClassAjustment : 0;
    }
  }

  if (shieldActiveCheckbox2.checked) {
    if (shieldAndAccessoriesSelection2.value === "custom") {
      totalArmorClass += validateBonusValue(customShieldClassValue2.value);
    } else {
      const selectedShield2 = shieldAndAccessories.find(shield => shield.id === shieldAndAccessoriesSelection2.value);
      totalArmorClass += selectedShield2 ? selectedShield2.armorClassAjustment : 0;
    }
  } 
  
  armorClassValue.value =  (totalArmorClass >= 0 ? '+' : '') + totalArmorClass;
}

function validateBonusValue(value) {
  value = parseInt(value);
  return value >= -10 && value <= 10 ? value : 0;
}

const strengthScore = document.getElementById('strengthScore');
const dexterityScore = document.getElementById('dexterityScore');
const constitutionScore = document.getElementById('constitutionScore');
const intelligenceScore = document.getElementById('intelligenceScore');
const wisdomScore = document.getElementById('wisdomScore');
const charismaScore = document.getElementById('charismaScore');

const abilityScores = [strengthScore, dexterityScore, constitutionScore, intelligenceScore, wisdomScore, charismaScore];

abilityScores.forEach((score) => {
  score.addEventListener('change', adjustArmorClassValue);
});

abilityAdjustment1.addEventListener('change', adjustArmorClassValue);
abilityAdjustment2.addEventListener('change', adjustArmorClassValue);
otherArmorClassValue.addEventListener('change', adjustArmorClassValue);
armorActiveCheckbox.addEventListener('change', adjustArmorClassValue);
armorSelection.addEventListener('change', adjustArmorClassValue);
customArmorClassValue.addEventListener('change', adjustArmorClassValue);
shieldActiveCheckbox1.addEventListener('change', adjustArmorClassValue);
shieldAndAccessoriesSelection1.addEventListener('change', adjustArmorClassValue);
customShieldClassValue1.addEventListener('change', adjustArmorClassValue);
shieldActiveCheckbox2.addEventListener('change', adjustArmorClassValue);
shieldAndAccessoriesSelection2.addEventListener('change', adjustArmorClassValue);
customShieldClassValue2.addEventListener('change', adjustArmorClassValue);


//----------- ATTAQUES-----------//

function generateUUID() {
  const cryptoAvailable = typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function';
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (cryptoAvailable ? crypto.getRandomValues(new Uint8Array(1))[0] : Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

let attackUUIDs = [];

function generateAttackSection() {
  const attackUUID = generateUUID(); // Generate a new UUID
  attackUUIDs.push(attackUUID); // Add the new UUID to the attackUUIDs array

  const attackSection = document.createElement('div');
  attackSection.innerHTML = getAttackSectionHTML(attackUUID);
  const attackContainer = document.getElementById('attacksContainer'); // Replace 'attacksContainer' with the ID of your container
  attackContainer.appendChild(attackSection);
  
  createAttackSubsection(attackUUID);
}

function getAttackSectionHTML(attackUUID) {
  const attackAndDamageSection = `
  <div id="attackAndDamageValuesSubsection-${attackUUID}" class="subsection">
  <div id="attackAndDamage"class="container">
      <div class="wrapper attack-name-wrapper">
          <label for="attackName-${attackUUID}" id="attackNameLabel">Nom</label>
            <input type="text" id="attackName-${attackUUID}" name="attackName-${attackUUID}" value=" " class="input-text attack-name-input">
        </div>
        <div class="wrapper fixed-size-wrapper">
          <label for="attackValue-${attackUUID}" id="attackValueLabel">Attaque</label>
          <input type="text" id="attackValue-${attackUUID}" name="attackValue-${attackUUID}" class="roundButton" value="+0" readonly onclick="callRollAttack('${attackUUID}')"> 
        </div>
        <div class="wrapper fixed-size-wrapper">
          <label for="damage-${attackUUID}" id="damageLabel">Dégâts</label>
          <input type="text" id="damage-${attackUUID}" name="damage-${attackUUID}" class="rectangleButton" value=" " readonly onclick="callRollDamage('${attackUUID}')">
        </div>
    </div>
    <span class="arrow-icon arrow-icon-${attackUUID}">
      <span id="arrowIconify-${attackUUID}" class="iconify arrow-icon-${attackUUID}" data-icon="mdi:chevron-down" data-inline="false"></span>
    </span>
    <button id="removeAttack" class="remove-button" onclick="removeAttack('${attackUUID}')"><span class="iconify" data-icon="mdi:trash-can-outline"></span></button>
    <div id="attackAndDamageBonusSubsection-${attackUUID}" class="attack-subsection subsection hidden">
    <h4>Information supplémentaire</h4>
    <div id="damageSupplementContainer"class="container">
        <div class="wrapper">
          <label for="damageType-${attackUUID}" id="damageTypeLabel">Type de dégât</label>
          <select id="damageType-${attackUUID}" name="damageType-${attackUUID}" class="input-text input-damage-type">
                <option value=" ">Choisir</option>
                <option value="acid">Acide</option>
                <option value="bludgeoning">Contondant</option>
                <option value="cold">Froid</option>
                <option value="fire">Feu</option>
                <option value="force">Force</option>
                <option value="lightning">Foudre</option>
                <option value="necrotic">Nécrotique</option>
                <option value="piercing">Perforant</option>
                <option value="poison">Poison</option>
                <option value="psychic">Psychique</option>
                <option value="radiant">Radiant</option>
                <option value="slashing">Tranchant</option>
                <option value="thunder">Tonnerre</option>
            </select>
        </div>
        <div class="wrapper">
          <label for="attackNote-${attackUUID}" id="attackNoteLabel">Note</label>
          <input type="text" id="attackNote-${attackUUID}" name="attackNote-${attackUUID}" value="" class="input-text">
        </div>
    </div>
        <h4>Bonus d'attaques</h4>
        <div id="attackContainer"class="container">
            <div class="wrapper">
              <label for="attackAbilityAdjustment-${attackUUID}" id="attackAbilityAdjustmentLabel">Habileté</label>
              <select id="attackAbilityAdjustment-${attackUUID}" name="attackAbilityAdjustment-${attackUUID}" class="input-text">
                    <option value=" ">Choisir</option>
                    <option value="strength">Force</option>
                    <option value="dexterity">Dextérité</option>
                    <option value="constitution">Constitution</option>
                    <option value="intelligence">Intelligence</option>
                    <option value="wisdom">Sagesse</option>
                    <option value="charisma">Charisme</option>
                </select>
            </div>
            <div class="wrapper">
              <label for="otherAttackAdjustmentValue-${attackUUID}" id="otherAttackAdjustmentValueLabel">Bonus</label>
              <input type="number" id="otherAttackAdjustmentValue-${attackUUID}" name="otherAttackAdjustmentValue-${attackUUID}" class="input-text" min="-10" max="10" value="0">
            </div>
            <div class="wrapper">
              <label for="attackProficientCheckBox-${attackUUID}">Maîtrise</label>
              <input type="checkbox" id="attackProficientCheckBox-${attackUUID}" name="attackProficientCheckBox-${attackUUID}">
            </div>
        </div>
        <h4>Dégâts</h4>
        <div id="damageContainer" class="container">
            <div class="wrapper">
              <label for="damageDiceQuantity-${attackUUID}" id="damageDiceQuantityLabel">Quantité</label>
              <input type="number" id="damageDiceQuantity-${attackUUID}" name="damageDiceQuantity-${attackUUID}" class="input-text" min="1" max="10" value="1">
            </div>
            <div class="wrapper">
              <label for="damageHitDiceType-${attackUUID}" id="damageHitDiceTypeLabel">Type</label>
              <select id="damageHitDiceType-${attackUUID}" name="damageHitDiceType-${attackUUID}" class="input-text input-damageHitDiceType">
                    <option value="d4" selected class="input-damageHitDiceType">d4</option>
                    <option value="d6">d6</option>
                    <option value="d8">d8</option>
                    <option value="d10">d10</option>
                    <option value="d12">d12</option>
                    <option value="d20">d20</option>
                </select>
            </div>
        </div>
        <div id="damageAdjustmentContainer"class="container">
            <div class="wrapper">
              <label for="damageAbilityAdjustment-${attackUUID}" id="damageAbilityAdjustmentLabel">Habileté</label>
              <select id="damageAbilityAdjustment-${attackUUID}" name="damageAbilityAdjustment-${attackUUID}" class="input-text">
                    <option value=" ">Choisir</option>
                    <option value="strength">Force</option>
                    <option value="dexterity">Dextérité</option>
                    <option value="constitution">Constitution</option>
                    <option value="intelligence">Intelligence</option>
                    <option value="wisdom">Sagesse</option>
                    <option value="charisma">Charisme</option>
                </select>
            </div>
            <div class="wrapper">
              <label for="otherDamageAdjustmentValue-${attackUUID}" id="otherDamageAdjustmentValueLabel">Autre bonus</label>
              <input type="number" id="otherDamageAdjustmentValue-${attackUUID}" name="otherDamageAdjustmentValue-${attackUUID}" class="input-text" min="-10" max="10" value="0">
            </div>
        </div>
    </div>
</div>
 `;
 return attackAndDamageSection;

};

function createAttackSubsection(uuid) {
  const arrowIcon = document.querySelector(`.arrow-icon-${uuid}`);

  // Set the initial state and update the arrow icon
  updateArrowIcon(uuid);

  // Add a click event listener to change the state and update the arrow icon
  arrowIcon.addEventListener('click', () => {
    arrowIcon.classList.toggle('arrow-up');
    updateArrowIcon(uuid);
    toggleSubsectionVisibility(uuid);
  });

  function updateArrowIcon(uuid) {
    const arrowIconify = document.getElementById(`arrowIconify-${uuid}`);

    if (arrowIcon.classList.contains('arrow-up')) {
      arrowIconify.setAttribute('data-inline', 'false');
      arrowIconify.setAttribute('data-icon', 'mdi:chevron-up'); // Up arrow icon
    } else {
      arrowIconify.setAttribute('data-inline', 'false');
      arrowIconify.setAttribute('data-icon', 'mdi:chevron-down'); // Down arrow icon
    }
  }

  function toggleSubsectionVisibility(uuid) {
    const attackAndDamageBonusSubsection = document.getElementById(`attackAndDamageBonusSubsection-${uuid}`);

    attackAndDamageBonusSubsection.classList.toggle('hidden');
    updateArrowIcon(uuid);
  }
  setupUUIDListeners(uuid);
  adjustAllAttacks(); //because this is when the DOM is fully loaded.
};

function adjustAttack(uuid) {
  const attackValueElement = document.getElementById(`attackValue-${uuid}`);
  const damageElement = document.getElementById(`damage-${uuid}`);

  const attackAbilityAdjustmentElement = document.getElementById(`attackAbilityAdjustment-${uuid}`);
  const attackAbilityAdjustment = attackAbilityAdjustmentElement.value;
  const otherAttackAdjustmentValueElement = document.getElementById(`otherAttackAdjustmentValue-${uuid}`);
  const otherAttackAdjustmentValue =  parseInt(otherAttackAdjustmentValueElement.value, 10) || 0;
  const attackProficientCheckBoxElement = document.getElementById(`attackProficientCheckBox-${uuid}`);
  const attackProficientCheckBox = attackProficientCheckBoxElement ? attackProficientCheckBoxElement.checked : false;
  const damageDiceQuantityElement = document.getElementById(`damageDiceQuantity-${uuid}`);
  const damageDiceQuantity =  parseInt(damageDiceQuantityElement.value, 10) || 1;
  const damageHitDiceTypeElement = document.getElementById(`damageHitDiceType-${uuid}`);
  const damageHitDiceType = damageHitDiceTypeElement.value;
  const damageAbilityAdjustmentElement = document.getElementById(`damageAbilityAdjustment-${uuid}`);
  const damageAbilityAdjustment = damageAbilityAdjustmentElement.value;
  const otherDamageAdjustmentValueElement = document.getElementById(`otherDamageAdjustmentValue-${uuid}`);
  const otherDamageAdjustmentValue = parseInt(otherDamageAdjustmentValueElement.value, 10) || 0;

  const abilityBonusScoreMapping = {
    'strength': parseInt(document.getElementById('strengthBonusScore').textContent, 10),
    'dexterity': parseInt(document.getElementById('dexterityBonusScore').textContent, 10),
    'constitution': parseInt(document.getElementById('constitutionBonusScore').textContent, 10),
    'intelligence': parseInt(document.getElementById('intelligenceBonusScore').textContent, 10),
    'wisdom': parseInt(document.getElementById('wisdomBonusScore').textContent, 10),
    'charisma': parseInt(document.getElementById('charismaBonusScore').textContent, 10)
  };

  const proficiencyBonusValue = parseInt(document.getElementById('proficiencyBonusValue').textContent);

  // Calculate the attack value
  let attackAdjustment = 0;

  if (attackAbilityAdjustment !== ' ') {
    attackAdjustment += abilityBonusScoreMapping[attackAbilityAdjustment];
  }

  if (!isNaN(otherAttackAdjustmentValue) && otherAttackAdjustmentValue >= -10 && otherAttackAdjustmentValue <= 10) {
    attackAdjustment += otherAttackAdjustmentValue;
  }

  if (attackProficientCheckBox) {
    attackAdjustment += proficiencyBonusValue;
  }

  const damageDice = damageDiceQuantity.toString() + damageHitDiceType;
  
  let damageAdjustment = 0;

  if (damageAbilityAdjustment !== ' ') {
    damageAdjustment += abilityBonusScoreMapping[damageAbilityAdjustment];
  }

  if (!isNaN(otherDamageAdjustmentValue) && otherDamageAdjustmentValue >= -10 && otherDamageAdjustmentValue <= 10) {
    damageAdjustment += otherDamageAdjustmentValue;
  }

  attackValueElement.value = attackAdjustment >= 0 ? '+' + attackAdjustment : attackAdjustment;
  damageElement.value = damageDice + (damageAdjustment > 0 ? ' + ' + damageAdjustment : (damageAdjustment < 0 ? ' ' + damageAdjustment : ''));
}


function setupUUIDListeners(uuid) {
  const elementsToWatchWithUUID = [
    `attackAbilityAdjustment-${uuid}`,
    `otherAttackAdjustmentValue-${uuid}`,
    `attackProficientCheckBox-${uuid}`,
    `damageDiceQuantity-${uuid}`,
    `damageHitDiceType-${uuid}`,
    `damageAbilityAdjustment-${uuid}`,
    `otherDamageAdjustmentValue-${uuid}`
  ];

  const onElementChange = () => {
    adjustAttack([uuid]);
  };

  elementsToWatchWithUUID.forEach((elementId) => {
    const element = document.getElementById(elementId);
      element.removeEventListener('change', onElementChange);
      element.addEventListener('change', onElementChange);
  });
};

  function adjustAllAttacks() {
    if (attackUUIDs && attackUUIDs.length > 0) {
      attackUUIDs.forEach((uuid) => {
        adjustAttack(uuid);
      });
    }
  };

function callRollAttack(uuid) {
  const attackName = document.getElementById(`attackName-${uuid}`).value;
  const attackValue = document.getElementById(`attackValue-${uuid}`).value;
  rollAttack(attackName, attackValue);
};

function callRollDamage(uuid) {
  const attackName = document.getElementById(`attackName-${uuid}`).value;
  const damageType = document.getElementById(`damageType-${uuid}`).options[document.getElementById(`damageType-${uuid}`).selectedIndex].textContent;
  const damage = document.getElementById(`damage-${uuid}`).value;
  rollDamage(attackName, damageType, damage);
};

function rollAttack(attackName, attackValue) {
  let commandBonus = '';
  let toastBonus = '';
  if (attackValue !== '+0') {
    commandBonus = attackValue;
    toastBonus = ` et un bonus de ${attackValue}`;
  }
  const command = `${encodeURI('Attaque ' + attackName)}:d20${commandBonus}`;
  const toastMessage = `Ça roule Attaque ${attackName} avec d20${toastBonus}`;

  // Send command to Talespire
  window.location.href = `talespire://dice/${attackName}${command}`;

  // Show the toast
  showToast(toastMessage);
  //showToast(`talespire://dice/${command}`);
};

function rollDamage(attackName, damageType, damage) {
  let commandBonus = '';
  let toastBonus = '';
  if (damage !== 'Choisir') {
    commandBonus = damage;
    toastBonus = `${damage}`;
  }

  let command, toastMessage;
  if (damageType === "Choisir" || damageType === '') {
    command = `${encodeURI('Dégâts pour ' + attackName)}:d20${commandBonus}`;
    toastMessage = `Ça roule dégâts pour ${attackName} de ${toastBonus}`;
  } else {
    command = `${encodeURI('Dégâts de type ${damageType} pour ' + attackName)}:d20${commandBonus}`;
    toastMessage = `Ça roule dégâts de type ${damageType} pour ${attackName} de ${toastBonus}`;
  }

  // Send command to Talespire
  window.location.href = `talespire://dice/${attackName}${command}`;

  // Show the toast
  showToast(toastMessage);
  //showToast(`talespire://dice/${command}`);
};

function removeAttack(attackUUID) {
  const attackSection = document.getElementById(`attackAndDamageValuesSubsection-${attackUUID}`);
  attackSection.remove();

  // Remove the attackUUID from the attackUUIDs array
  attackUUIDs = attackUUIDs.filter(uuid => uuid !== attackUUID);
};

  
  const elementsToWatch = [
    ...ABILITY_NAMES.map((ability) => `${ability}Score`),
    'levelName',
  ];

// Add event listeners for each element in elementsToWatch
elementsToWatch.forEach((elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.addEventListener('change', () => {
      adjustAllAttacks();
    });
  } else {
    console.warn(`Element with ID '${elementId}' not found.`);
  }
});

//----------- RESSOURCES -----------//

let resourceUUIDs = [];

function generateResourceSection() {
  const resourceUUID  = generateUUID(); 
  resourceUUIDs.push(resourceUUID); 

  const resourceSection = document.createElement('div');
  resourceSection.innerHTML = getResourceSectionHTML(resourceUUID);
  const resourceContainer = document.getElementById('resourceContainer'); 
  resourceContainer.appendChild(resourceSection);

};

function getResourceSectionHTML(resourceUUID) {
//  nom, source, type source, descr
const resourceSection = `
<div id="resourceSubsection-${resourceUUID}" class="subsection">
  ${resourceUUID}
  <button id="removeResource" class="remove-button" onclick="removeResource('${resourceUUID}')"><span class="iconify" data-icon="mdi:trash-can-outline"></span></button>
</div>
`;
return resourceSection;

//rule checks

};

function adjustResource(resourceUUIDs) {
//court ou long repos
};

function removeResource(resourceUUID) {
  const resourceSection = document.getElementById(`resourceSubsection-${resourceUUID}`);
  resourceSection.remove();

  resourceUUIDs = resourceUUIDs.filter(uuid => uuid !== resourceUUID);
};



//----------- ATTRIBUTS (CAPACITÉs, features) -----------//

let featureUUIDs = [];

function generateFeatureSection() {
  const featureUUID  = generateUUID(); 
  featureUUIDs.push(featureUUID); 

  const featureSection = document.createElement('div');
  featureSection.innerHTML = getFeatureSectionHTML(featureUUID);
  const featureContainer = document.getElementById('featureContainer'); 
  featureContainer.appendChild(featureSection);

};

function getFeatureSectionHTML(featureUUID) {
//nom, total num , actuel num , sr check ou lr check
const featureSection = `
<div id="featureSubsection-${featureUUID}" class="subsection">
  ${featureUUID}
  <button id="removeFeature" class="remove-button" onclick="removeFeature('${featureUUID}')"><span class="iconify" data-icon="mdi:trash-can-outline"></span></button>
</div>
`;
return featureSection;

//rule checks

};

function adjustFeature(featureUUIDs) {
//court ou long repos
};

function removeFeature(featureUUID) {
  const featureSection = document.getElementById(`featureSubsection-${featureUUID}`);
  featureSection.remove();

  featureUUIDs = featureUUIDs.filter(uuid => uuid !== featureUUID);
};

//-----------EQUIPEMENT -----------//

let equipmentUUIDs = [];

function generateEquipmentSection() {
  const equipmentUUID  = generateUUID(); 
  equipmentUUIDs.push(equipmentUUID); 
  console.log(equipmentUUID);
  const equipmentSection = document.createElement('div');
  equipmentSection.innerHTML = getEquipmentSectionHTML(equipmentUUID);
  const equipmentContainer = document.getElementById('equipmentContainer'); 
  equipmentContainer.appendChild(equipmentSection);

};

function getEquipmentSectionHTML(equipmentUUID) {
//nom, total num , actuel num , sr check ou lr check
const equipmentSection = `
<div id="equipmentSubsection-${equipmentUUID}" class="subsection">
  ${equipmentUUID}
  <button id="removeEquipment" class="remove-button" onclick="removeEquipment('${equipmentUUID}')"><span class="iconify" data-icon="mdi:trash-can-outline"></span></button>
</div>
`;
return equipmentSection;

//rule checks

};

function adjustEquipment(equipmentUUIDs) {
//court ou long repos
};

function removeEquipment(equipmentUUID) {
  const equipmentSection = document.getElementById(`equipmentSubsection-${equipmentUUID}`);
  equipmentSection.remove();

  equipmentUUIDs = equipmentUUIDs.filter(uuid => uuid !== equipmentUUID);
};

//----------- TRESORS -----------//

let treasureUUIDs = [];

function generateTreasureSection() {
  const treasureUUID  = generateUUID(); 
  treasureUUIDs.push(treasureUUID); 

  const treasureSection = document.createElement('div');
  treasureSection.innerHTML = getTreasureSectionHTML(treasureUUID);
  const treasureContainer = document.getElementById('treasureContainer'); 
  treasureContainer.appendChild(treasureSection);

};

function getTreasureSectionHTML(treasureUUID) {
//nom, total num , actuel num , sr check ou lr check
const treasureSection = `
<div id="treasureSubsection-${treasureUUID}" class="subsection">
  ${treasureUUID}
  <button id="removeTreasure" class="remove-button" onclick="removeTreasure('${treasureUUID}')"><span class="iconify" data-icon="mdi:trash-can-outline"></span></button>
</div>
`;
return treasureSection;

//rule checks

};

function adjustTreasure(treasureUUIDs) {
//court ou long repos
};

function removeTreasure(treasureUUID) {
  const treasureSection = document.getElementById(`treasureSubsection-${treasureUUID}`);
  treasureSection.remove();

  treasureUUIDs = treasureUUIDs.filter(uuid => uuid !== treasureUUID);
};

//----------- LANGUE -----------//

let languageUUIDs = [];

function generateLanguageSection() {
  const languageUUID  = generateUUID(); 
  languageUUIDs.push(languageUUID); 

  const languageSection = document.createElement('div');
  languageSection.innerHTML = getLanguageSectionHTML(languageUUID);
  const languageContainer = document.getElementById('languageContainer'); 
  languageContainer.appendChild(languageSection);

};

function getLanguageSectionHTML(languageUUID) {
//nom, total num , actuel num , sr check ou lr check
const languageSection = `
<div id="languageSubsection-${languageUUID}" class="subsection">
  ${languageUUID}
  <button id="removeLanguage" class="remove-button" onclick="removeLanguage('${languageUUID}')"><span class="iconify" data-icon="mdi:trash-can-outline"></span></button>
</div>
`;
return languageSection;

//rule checks

};

function adjustLanguage(languageUUIDs) {
//court ou long repos
};

function removeLanguage(languageUUID) {
  const languageSection = document.getElementById(`languageSubsection-${languageUUID}`);
  languageSection.remove();

  languageUUIDs = languageUUIDs.filter(uuid => uuid !== languageUUID);
};

//----------- NOTES DIVERSES -----------//

let miscellaneousUUIDs = [];

function generateMiscellaneousSection() {
  const miscellaneousUUID  = generateUUID(); 
  miscellaneousUUIDs.push(miscellaneousUUID); 

  const miscellaneousSection = document.createElement('div');
  miscellaneousSection.innerHTML = getMiscellaneousSectionHTML(miscellaneousUUID);
  const miscellaneousContainer = document.getElementById('miscellaneousContainer'); 
  miscellaneousContainer.appendChild(miscellaneousSection);

};

function getMiscellaneousSectionHTML(miscellaneousUUID) {
//nom, total num , actuel num , sr check ou lr check
const miscellaneousSection = `
<div id="miscellaneousSubsection-${miscellaneousUUID}" class="subsection">
  ${miscellaneousUUID}
  <button id="removeMiscellaneous" class="remove-button" onclick="removeMiscellaneous('${miscellaneousUUID}')"><span class="iconify" data-icon="mdi:trash-can-outline"></span></button>
</div>
`;
return miscellaneousSection;

//rule checks

};

function adjustMiscellaneous(miscellaneousUUIDs) {
//court ou long repos
};

function removeMiscellaneous(miscellaneousUUID) {
  const miscellaneousSection = document.getElementById(`miscellaneousSubsection-${miscellaneousUUID}`);
  miscellaneousSection.remove();

  miscellaneousUUIDs = miscellaneousUUIDs.filter(uuid => uuid !== miscellaneousUUID);
};

//----------- EVENT LISTENER -----------//

const selectElements = document.querySelectorAll('select[data-custom-input]');
  
  selectElements.forEach((selectElement) => {
    const textboxID = selectElement.dataset.customInput;
    const textBoxInput = document.getElementById(textboxID);
    
    selectElement.addEventListener('change', () => {
      if (selectElement.value === 'custom') {
        textBoxInput.style.display = 'inline-flex';
      } else {
        textBoxInput.style.display = 'none';
      }
    });
  });

  document.getElementById("menu").addEventListener("click", function () {
    const menuContent = document.getElementById("menu-content");
    menuContent.style.display = menuContent.style.display === "block" ? "none" : "block";
  });