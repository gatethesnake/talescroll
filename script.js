// fast dev settings

document.getElementById("sheetTabName").click();
//document.getElementById("actionTabName").click()
//document.getElementById("spellTabName").click();
//document.getElementById("featTabName").click();
//document.getElementById("equipmentTabName").click();
//document.getElementById("descriptionTabName").click();
//document.getElementById("diceGeneratorTabName").click();

const splashLength = 2500;

//------------------------- OUVERTURE -------------------------//
// Prévenir la cache du css
document.addEventListener("DOMContentLoaded", function () {
  var version = Math.floor(Math.random() * 1000000);
  document.querySelectorAll('link[rel="stylesheet"]').forEach(function (link) {
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

window.addEventListener('load', function () {
  populateRaceDropdown();

  // get current year
  const currentYear = new Date().getFullYear();

  // update footer content with current year
  const footerContent = document.getElementById('footerContent');
  footerContent.innerHTML = `<p>©${currentYear} · Gaétan Lanthier · Conçu avec chat-GPT · Utilisation à vos risques · Vous aimez? 💰 bc1qay734rj64dgf585zanp84tt64akkjz3dwcx73c 🔒</p>`;
});

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
  document.getElementById(tabName).style.display = "flex";
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
function handleReset() {
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
level_selector.value = 1;

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
    command = encodeURI(removeAccents(custom_label)) + ":" + command;

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
    armorClassInfo: {},
    attackInfo: {},
    resourceInfo: {},
    featureInfo: {},
    equipmentInfo: {},
    treasureInfo: {},
    languageInfo: {},
    miscellaneousInfo: {},
    moneyInfo: {},
    featInfo: {},
    spellAttackInfo: {},
    spellLevelInfo: {},
    spellBookInfo: {}
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

  // Save Attacks info 

  function getAttackInfoByUUID(uuid) {
    return {
      attackName: document.getElementById(`attackName-${uuid}`).value || " ",
      damageType: document.getElementById(`damageType-${uuid}`).value || " ",
      attackNote: document.getElementById(`attackNote-${uuid}`).value || " ",
      attackAbilityAdjustment: document.getElementById(`attackAbilityAdjustment-${uuid}`).value || " ",
      otherAttackAdjustmentValue: document.getElementById(`otherAttackAdjustmentValue-${uuid}`).value || "0",
      attackProficientCheckBox: document.getElementById(`attackProficientCheckBox-${uuid}`)?.checked || false,
      damageDiceQuantity: document.getElementById(`damageDiceQuantity-${uuid}`).value || "0",
      damageHitDiceType: document.getElementById(`damageHitDiceType-${uuid}`).value || " ",
      damageAbilityAdjustment: document.getElementById(`damageAbilityAdjustment-${uuid}`).value || " ",
      otherDamageAdjustmentValue: document.getElementById(`otherDamageAdjustmentValue-${uuid}`).value || "0"
    };
  }

  attackUUIDs.forEach((uuid) => {
    characterData.attackInfo[uuid] = getAttackInfoByUUID(uuid);
  });

  /// Save resourceInfo 
  function getResourceInfoByUUID(uuid) {

    return {
      resourceName: document.getElementById(`resourceName-${uuid}`).value || " ",
      resourceMax: document.getElementById(`resourceMax-${uuid}`).value || "0",
      resourceActual: document.getElementById(`resourceActual-${uuid}`).value || "0",
      longRestSwitch: document.getElementById(`longRestSwitch-${uuid}`)?.checked || false,
      shortRestSwitch: document.getElementById(`shortRestSwitch-${uuid}`)?.checked || false,
    };
  }

  resourceUUIDs.forEach((uuid) => {
    characterData.resourceInfo[uuid] = getResourceInfoByUUID(uuid);
  });

  /// Save featureInfo 
  function getFeatureInfoByUUID(uuid) {
    return {
      featureName: document.getElementById(`featureName-${uuid}`).value || " ",
      featureSource: document.getElementById(`featureSource-${uuid}`).value || " ",
      featureType: document.getElementById(`featureType-${uuid}`).value || " ",
      featureDescription: document.getElementById(`featureDescription-${uuid}`).value || " "

    };
  }
  featureUUIDs.forEach((uuid) => {
    characterData.featureInfo[uuid] = getFeatureInfoByUUID(uuid);
  });

  /// Save equipmentInfo 
  function getEquipmentInfoByUUID(uuid) {
    return {
      equipmentName: document.getElementById(`equipmentName-${uuid}`).value || " ",
      equipmentQuantity: document.getElementById(`equipmentQuantity-${uuid}`).value || "0",
      equipmentWeight: document.getElementById(`equipmentWeight-${uuid}`).value || "0",
      equipmentActive: document.getElementById(`equipmentActive-${uuid}`)?.checked || false,
      equipmentOrigin: document.getElementById(`equipmentOrigin-${uuid}`).value || " ",

    };
  }
  equipmentUUIDs.forEach((uuid) => {
    characterData.equipmentInfo[uuid] = getEquipmentInfoByUUID(uuid);
  });

  /// Save treasureInfo 
  function getTreasureInfoByUUID(uuid) {
    return {
      treasureName: document.getElementById(`treasureName-${uuid}`).value || " ",
      treasureQuantity: document.getElementById(`treasureQuantity-${uuid}`).value || "0",
      treasureValue: document.getElementById(`treasureValue-${uuid}`).value || "0",
      treasureOrigin: document.getElementById(`treasureOrigin-${uuid}`).value || " "
    };
  }
  treasureUUIDs.forEach((uuid) => {
    characterData.treasureInfo[uuid] = getTreasureInfoByUUID(uuid);
  });

  /// Save languageInfo 
  function getLanguageInfoByUUID(uuid) {

    return {
      languageName: document.getElementById(`languageName-${uuid}`).value || " ",
      languageSpoken: document.getElementById(`languageSpoken-${uuid}`)?.checked || false,
      languageWritten: document.getElementById(`languageWritten-${uuid}`)?.checked || false
    };
  }

  languageUUIDs.forEach((uuid) => {
    characterData.languageInfo[uuid] = getLanguageInfoByUUID(uuid);
  });

  /// Save miscellaneousInfo 
  function getMiscellaneousInfoByUUID(uuid) {
    return {
      miscellaneousDescription: document.getElementById(`miscellaneousDescription-${uuid}`).value || " ",
      miscellaneousName: document.getElementById(`miscellaneousName-${uuid}`).value || " "
    };
  }
  miscellaneousUUIDs.forEach((uuid) => {
    characterData.miscellaneousInfo[uuid] = getMiscellaneousInfoByUUID(uuid);
  });

  /// Save featInfo 
  function getFeatInfoByUUID(uuid) {
    return {
      featName: document.getElementById(`featName-${uuid}`).value || " "
    };
  }

  // Save feats data
  featUUIDs.forEach((uuid) => {
    characterData.featInfo[uuid] = getFeatInfoByUUID(uuid);
  });


  // Save money values
  for (const currencyKey of Object.keys(fondorCurrencies)) {
    const input = document.getElementById(`money-${currencyKey}`);
    characterData.moneyInfo[currencyKey] = parseInt(input.value, 10);
  }

  // Save spellAttack info

  characterData.spellAttackInfo = {
    spellCastingAbilitySelect: document.getElementById("spellCastingAbilitySelect").value || " ",
    otherDcSpellBonus: document.getElementById("otherDcSpellBonus").value || "0",
    otherSpellAttackBonus: document.getElementById("otherSpellAttackBonus").value || "0"
  };

  // save spellbook info

  for (let i = 0; i <= 9; i++) {
    characterData.spellLevelInfo[i] = {
      maximum: document.getElementById(`spellMax-${i}`).value || "0",
      actual: document.getElementById(`spellActual-${i}`).value || "0 "
    };

    characterData.spellBookInfo[i] = {};

    spellUUIDs.filter(spell => spell.level === i).forEach(spell => {
      const spellUUID = spell.uuid;
      characterData.spellBookInfo[i][spellUUID] = {
        name: document.getElementById(`spellName-${spellUUID}`).value || " ",
        nameVO: document.getElementById(`spellNameVO-${spellUUID}`).value || " ",
        school: document.getElementById(`spellEcole-${spellUUID}`).value || " ",
        incantation: document.getElementById(`spellIncantation-${spellUUID}`).value || " ",
        concentration: document.getElementById(`spellConcentration-${spellUUID}`).checked || false,
        ritual: document.getElementById(`spellRituel-${spellUUID}`).checked || false,
        description: document.getElementById(`spellDescription-${spellUUID}`).value || " ",
        source: document.getElementById(`spellSource-${spellUUID}`).value || " ",
        url: document.getElementById(`spellURL-${spellUUID}`).value || " ",
        ready: document.getElementById(`spellReady-${spellUUID}`).checked || false,
        components: {
          verbal: document.getElementById(`spellComposantesVerbales-${spellUUID}`).checked || false,
          somatic: document.getElementById(`spellComposantesSomatiques-${spellUUID}`).checked || false,
          material: document.getElementById(`spellComposantesMaterielles-${spellUUID}`).checked || false
        },
        duration: document.getElementById(`spellDuree-${spellUUID}`).value || " ",
        range: document.getElementById(`spellPortee-${spellUUID}`).value || " ",
        areaOfEffect: document.getElementById(`spellZoneEffet-${spellUUID}`).value || " ",
        target: document.getElementById(`spellCible-${spellUUID}`).value || " "
      };
    });
  }

  // Saving to file or to localstorage

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
    const attackInfo = characterData.attackInfo;
    const resourceInfo = characterData.resourceInfo;
    const equipmentInfo = characterData.equipmentInfo;
    const treasureInfo = characterData.treasureInfo;
    const featureInfo = characterData.featureInfo;
    const languageInfo = characterData.languageInfo;
    const miscellaneousInfo = characterData.miscellaneousInfo;
    const moneyInfo = characterData.moneyInfo;
    const featInfo = characterData.featInfo;
    const spellAttackInfo = characterData.spellAttackInfo;
    const spellLevelInfo = characterData.spellLevelInfo;
    const spellBookInfo = characterData.spellBookInfo;

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
          if (inputId === "inspirationValue") {
            inputElement.checked = characterData.information[inputId] === "oui";
          } else {
            inputElement.value = characterData.information[inputId];
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

    selectChangedContainer(document.getElementById("armorSelection"), "customArmorContainer");
    selectChangedContainer(document.getElementById("shieldAndAccessoriesSelection1"), "customShieldContainer");
    selectChangedContainer(document.getElementById("shieldAndAccessoriesSelection2"), "customShieldContainer2");

    // load attacks info
    removeAllAttacks();

    function loadAttackInfo(attack, uuid) {
      document.getElementById(`attackName-${uuid}`).value = attack.attackName;
      document.getElementById(`damageType-${uuid}`).value = attack.damageType;
      document.getElementById(`attackNote-${uuid}`).value = attack.attackNote;
      document.getElementById(`attackAbilityAdjustment-${uuid}`).value = attack.attackAbilityAdjustment;
      document.getElementById(`otherAttackAdjustmentValue-${uuid}`).value = attack.otherAttackAdjustmentValue;
      document.getElementById(`attackProficientCheckBox-${uuid}`).checked = attack.attackProficientCheckBox;
      document.getElementById(`damageDiceQuantity-${uuid}`).value = attack.damageDiceQuantity;
      document.getElementById(`damageHitDiceType-${uuid}`).value = attack.damageHitDiceType;
      document.getElementById(`damageAbilityAdjustment-${uuid}`).value = attack.damageAbilityAdjustment;
      document.getElementById(`otherDamageAdjustmentValue-${uuid}`).value = attack.otherDamageAdjustmentValue;
    }

    function generateAllAttackSections(attackInfo) {
      Object.keys(attackInfo).forEach((uuid) => {
        generateAttackSection(uuid);
      });
    }

    function loadAllAttackInfo(attackInfo) {
      Object.keys(attackInfo).forEach((uuid) => {
        const attack = attackInfo[uuid];
        loadAttackInfo(attack, uuid);
      });
    }

    generateAllAttackSections(attackInfo);
    loadAllAttackInfo(attackInfo);

    // load resources info

    function loadResourceInfo(resource, uuid) {

      document.getElementById(`resourceName-${uuid}`).value = resource.resourceName;
      document.getElementById(`resourceMax-${uuid}`).value = resource.resourceMax;
      document.getElementById(`resourceActual-${uuid}`).value = resource.resourceActual;
      document.getElementById(`longRestSwitch-${uuid}`).checked = resource.longRestSwitch;
      document.getElementById(`shortRestSwitch-${uuid}`).checked = resource.shortRestSwitch;
    }

    function generateAllResourceSections(resourceInfo) {
      Object.keys(resourceInfo).forEach((uuid) => {
        generateResourceSection(uuid)
      });
    }

    function loadAllResourceInfo(resourceInfo) {
      Object.keys(resourceInfo).forEach((uuid) => {
        const resource = resourceInfo[uuid];
        loadResourceInfo(resource, uuid);
      });
    }

    removeAllResources();
    generateAllResourceSections(resourceInfo);
    loadAllResourceInfo(resourceInfo);

    // Load feature info
    function loadFeatureInfo(feature, uuid) {
      document.getElementById(`featureName-${uuid}`).value = feature.featureName;
      document.getElementById(`featureSource-${uuid}`).value = feature.featureSource;
      document.getElementById(`featureType-${uuid}`).value = feature.featureType;
      document.getElementById(`featureDescription-${uuid}`).value = feature.featureDescription;
    }

    function generateAllFeatureSections(featureInfo) {
      Object.keys(featureInfo).forEach((uuid) => {
        generateFeatureSection(uuid);
      });
    }

    function loadAllFeatureInfo(featureInfo) {
      Object.keys(featureInfo).forEach((uuid) => {
        const feature = featureInfo[uuid];
        loadFeatureInfo(feature, uuid);
      });
    }

    removeAllFeatures();
    generateAllFeatureSections(featureInfo);
    loadAllFeatureInfo(featureInfo);

    // load equipment info

    function loadEquipmentInfo(equipment, uuid) {
      document.getElementById(`equipmentName-${uuid}`).value = equipment.equipmentName;
      document.getElementById(`equipmentQuantity-${uuid}`).value = equipment.equipmentQuantity;
      document.getElementById(`equipmentWeight-${uuid}`).value = equipment.equipmentWeight;
      document.getElementById(`equipmentActive-${uuid}`).checked = equipment.equipmentActive;
      document.getElementById(`equipmentOrigin-${uuid}`).value = equipment.equipmentOrigin;
    }

    function generateAllEquipmentSections(equipmentInfo) {
      Object.keys(equipmentInfo).forEach((uuid) => {
        generateEquipmentSection(uuid);
      });
    }

    function loadAllEquipmentInfo(equipmentInfo) {
      Object.keys(equipmentInfo).forEach((uuid) => {
        const equipment = equipmentInfo[uuid];
        loadEquipmentInfo(equipment, uuid);
      });
    }

    removeAllEquipments();
    generateAllEquipmentSections(equipmentInfo);
    loadAllEquipmentInfo(equipmentInfo);

    // Load treasure info
    function loadTreasureInfo(treasure, uuid) {
      document.getElementById(`treasureName-${uuid}`).value = treasure.treasureName;
      document.getElementById(`treasureQuantity-${uuid}`).value = treasure.treasureQuantity;
      document.getElementById(`treasureValue-${uuid}`).value = treasure.treasureValue;
      document.getElementById(`treasureOrigin-${uuid}`).value = treasure.treasureOrigin;
    }

    function generateAllTreasureSections(treasureInfo) {
      Object.keys(treasureInfo).forEach((uuid) => {
        generateTreasureSection(uuid);
      });
    }

    function loadAllTreasureInfo(treasureInfo) {
      Object.keys(treasureInfo).forEach((uuid) => {
        const treasure = treasureInfo[uuid];
        loadTreasureInfo(treasure, uuid);
      });
    }

    removeAllTreasures();
    generateAllTreasureSections(treasureInfo);
    loadAllTreasureInfo(treasureInfo);

    // Load language info
    function loadLanguageInfo(language, uuid) {
      document.getElementById(`languageName-${uuid}`).value = language.languageName;
      document.getElementById(`languageSpoken-${uuid}`).checked = language.languageSpoken;
      document.getElementById(`languageWritten-${uuid}`).checked = language.languageWritten;
    }

    function generateAllLanguageSections(languageInfo) {
      Object.keys(languageInfo).forEach((uuid) => {
        generateLanguageSection(uuid);
      });
    }

    function loadAllLanguageInfo(languageInfo) {
      Object.keys(languageInfo).forEach((uuid) => {
        const language = languageInfo[uuid];
        loadLanguageInfo(language, uuid);
      });
    }

    removeAllLanguages();
    generateAllLanguageSections(languageInfo);
    loadAllLanguageInfo(languageInfo);

    // Load miscellaneous info
    function loadMiscellaneousInfo(miscellaneous, uuid) {
      document.getElementById(`miscellaneousDescription-${uuid}`).value = miscellaneous.miscellaneousDescription;
      document.getElementById(`miscellaneousName-${uuid}`).value = miscellaneous.miscellaneousName;
    }

    function generateAllMiscellaneousSections(miscellaneousInfo) {
      Object.keys(miscellaneousInfo).forEach((uuid) => {
        generateMiscellaneousSection(uuid);
      });
    }

    function loadAllMiscellaneousInfo(miscellaneousInfo) {
      Object.keys(miscellaneousInfo).forEach((uuid) => {
        const miscellaneous = miscellaneousInfo[uuid];
        loadMiscellaneousInfo(miscellaneous, uuid);
      });
    }

    removeAllMiscellaneous();
    generateAllMiscellaneousSections(miscellaneousInfo);
    loadAllMiscellaneousInfo(miscellaneousInfo);

    // Load feat info
    function loadFeatInfo(feat, uuid) {
      document.getElementById(`featName-${uuid}`).value = feat.featName;
      if (feat.featName.trim !== "") {
        loadFeatData(uuid);
      }
    }
    function generateAllFeatSections(featsInfo) {
      Object.keys(featsInfo).forEach((uuid) => {
        generateFeatSection(uuid);
      });
    }
    function loadAllFeatInfo(featsInfo) {
      Object.keys(featsInfo).forEach((uuid) => {
        const feat = featsInfo[uuid];
        loadFeatInfo(feat, uuid);

      });
    }
    removeAllFeats();
    generateAllFeatSections(featInfo);
    loadAllFeatInfo(featInfo);


    // Load money values
    for (const currencyKey of Object.keys(fondorCurrencies)) {
      const input = document.getElementById(`money-${currencyKey}`);
      input.value = moneyInfo[currencyKey] || 0;
    }

    // Load spellAttack values

    document.getElementById("spellCastingAbilitySelect").value = spellAttackInfo.spellCastingAbilitySelect;
    document.getElementById("otherDcSpellBonus").value = spellAttackInfo.otherDcSpellBonus;
    document.getElementById("otherSpellAttackBonus").value = spellAttackInfo.otherSpellAttackBonus;

    // load spell info

    function loadSpellLevelInfo(level, spellLevel) {
      document.getElementById(`spellMax-${level}`).value = spellLevel.maximum;
      document.getElementById(`spellActual-${level}`).value = spellLevel.actual;
    }

    function loadAllSpellLevelInfo(spellLevelInfo) {
      Object.keys(spellLevelInfo).forEach(level => {
        loadSpellLevelInfo(level, spellLevelInfo[level]);
      });
    }

    function generateAllSpellSections(spellBookInfo) {
      Object.entries(spellBookInfo).forEach(([level, spells]) => {
        Object.keys(spells).forEach((spellUUID) => {
          generateSpellSection(level, spellUUID);
        });
      });
    }

    function loadAllSpellBookInfo(spellBookInfo) {
      Object.entries(spellBookInfo).forEach(([level, spells]) => {
        Object.keys(spells).forEach((spellUUID) => {
          const spell = spells[spellUUID];

          document.getElementById(`spellName-${spellUUID}`).value = spell.name;
          document.getElementById(`spellNameVO-${spellUUID}`).value = spell.nameVO;
          document.getElementById(`spellEcole-${spellUUID}`).value = spell.school;
          document.getElementById(`spellIncantation-${spellUUID}`).value = spell.castTime;
          document.getElementById(`spellConcentration-${spellUUID}`).checked = spell.concentration;
          document.getElementById(`spellRituel-${spellUUID}`).checked = spell.ritual;
          document.getElementById(`spellDescription-${spellUUID}`).value = spell.description;
          document.getElementById(`spellSource-${spellUUID}`).value = spell.source;
          document.getElementById(`spellURL-${spellUUID}`).value = spell.URL;
          document.getElementById(`spellReady-${spellUUID}`).checked = spell.ready;
          document.getElementById(`spellComposantesVerbales-${spellUUID}`).checked = spell.components.verbal;
          document.getElementById(`spellComposantesSomatiques-${spellUUID}`).checked = spell.components.somatic;
          document.getElementById(`spellComposantesMaterielles-${spellUUID}`).checked = spell.components.material;
          document.getElementById(`spellDuree-${spellUUID}`).value = spell.duration;
          document.getElementById(`spellPortee-${spellUUID}`).value = spell.range;
          document.getElementById(`spellZoneEffet-${spellUUID}`).value = spell.areaOfEffect;
          document.getElementById(`spellCible-${spellUUID}`).value = spell.target;

        });
      });
    }


    resetMaxAndActual(); //ok tested
    removeAllSpells(); //ok tested
    loadAllSpellLevelInfo(characterData.spellLevelInfo); //ok tested
    generateAllSpellSections(characterData.spellBookInfo); //ok tested
    loadAllSpellBookInfo(characterData.spellBookInfo);



    // update and ajust all dependent fields
    updateDependentElements();
  }

  // load data from disk or localstorage 
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
    if (inputElement === characterNameInput) {
      inputElement.value = '<nom>';
    } else {
      inputElement.value = ' ';
    }
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
    if (inputId === "inspirationValue") {
      inputElement.checked = false;
    } else {
      inputElement.value = 0;
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

  document.getElementById("abilityAdjustment1").value = " ",
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

  ///reset  all Info

  removeAllAttacks();
  removeAllResources();
  removeAllFeatures();
  removeAllEquipments();
  removeAllTreasures();
  removeAllLanguages();
  removeAllMiscellaneous();
  removeAllFeats();

  // Reset money values

  for (const currencyKey of Object.keys(fondorCurrencies)) {
    const input = document.getElementById(`money-${currencyKey}`);
    input.value = 0;
  }

  // Reset spellAttack values

  document.getElementById("spellCastingAbilitySelect").value = " ";
  document.getElementById("otherDcSpellBonus").value = "0";
  document.getElementById("otherSpellAttackBonus").value = "0";


  // reset spellbook info
  resetMaxAndActual();
  removeAllSpells();


  updateDependentElements();

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
  calculateTotal();
  updateDcForSpell();
  updateSpellAttackBonus();
  updateTotalWeight();

  const characterNameInput = document.getElementById('characterName');
  characterTitle.textContent = characterNameInput.value;

}

//---------------------- informations----------------------//
//------------------hitdice ------------------

function populateHitDiceSelect() {
  const select = document.getElementById('hitDiceType');

  hitDiceTypes.forEach((hitDiceType) => {
    const option = document.createElement('option');
    option.value = hitDiceType.value;
    option.textContent = hitDiceType.text;

    if (hitDiceType.selected) {
      option.selected = true;
      option.className = 'input-hitDiceType';
    }

    select.appendChild(option);
  });
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', populateHitDiceSelect);

function populateAbilityAdjustmentSelect(abilityAdjustment) {
  const selectElement = document.getElementById(abilityAdjustment);
  const chooseOption = document.createElement('option');
  chooseOption.value = ' ';
  chooseOption.textContent = 'Choisir';
  selectElement.appendChild(chooseOption);

  abilityOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    selectElement.appendChild(optionElement);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  populateAbilityAdjustmentSelect('abilityAdjustment1');
  populateAbilityAdjustmentSelect('abilityAdjustment2');
});

function populateClassSelect() {
  const selectElement = document.getElementById('className');

  const chooseOption = document.createElement('option');
  chooseOption.value = ' ';
  chooseOption.textContent = 'Choisir';
  selectElement.appendChild(chooseOption);

  classOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    selectElement.appendChild(optionElement);
  });

  // Add custom option directly in the function
  const customOption = document.createElement('option');
  customOption.value = 'custom';
  customOption.textContent = 'Classe personnalisée';
  selectElement.appendChild(customOption);
}

window.addEventListener('DOMContentLoaded', populateClassSelect);

// Function to populate the religion select element
function populateReligionSelect() {
  const selectElement = document.getElementById('religion');

  const chooseOption = document.createElement('option');
  chooseOption.value = ' ';
  chooseOption.textContent = 'Choisir';
  selectElement.appendChild(chooseOption);

  religionOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    selectElement.appendChild(optionElement);
  });

  // Add custom option directly in the function
  const customOption = document.createElement('option');
  customOption.value = 'custom';
  customOption.textContent = 'Autre religion';
  selectElement.appendChild(customOption);
}

// Event listener to run the function on page load
window.addEventListener('DOMContentLoaded', populateReligionSelect);

// Function to populate the background select element
function populateBackgroundSelect() {
  const selectElement = document.getElementById('historique');

  const chooseOption = document.createElement('option');
  chooseOption.value = ' ';
  chooseOption.textContent = 'Choisir';
  selectElement.appendChild(chooseOption);

  backgroundOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    selectElement.appendChild(optionElement);
  });

  // Add custom option directly in the function
  const customOption = document.createElement('option');
  customOption.value = 'custom';
  customOption.textContent = 'Autre historique';
  selectElement.appendChild(customOption);
}

// Event listener to run the function on page load
window.addEventListener('DOMContentLoaded', populateBackgroundSelect);

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

function getAdvantage() {
  const advantageButtons = ['disadvantage', 'normal', 'advantage'];
  let activeButtonId = 'normal';

  for (const btnId of advantageButtons) {
    const button = document.getElementById(btnId);
    if (button.classList.contains('activated-button')) {
      activeButtonId = btnId;
      break;
    }
  }

  return activeButtonId;
}

//----------- FONCTIONS COMMUNES AUX SELECT -----------//

function selectChanged(selectElement, textboxID) {
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

//------------  DESCRIPTIONS --------------//
function populateRaceDropdown() {
  const raceSelect = document.getElementById("race");

  // Add "Choisir une race" at the beginning
  const firstOption = document.createElement("option");
  firstOption.value = " ";
  firstOption.text = "Choisir";
  raceSelect.add(firstOption);

  // Add other race options from the constant array
  raceOptions.forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.text = optionValue;
    raceSelect.add(option);
  });

  // Add "Autre race" at the end
  const lastOption = document.createElement("option");
  lastOption.value = "custom";
  lastOption.text = "Autre race";
  raceSelect.add(lastOption);
}

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
  const advantageState = getAdvantage();
  let commandBonus = '';
  let toastBonus = '';

  // Get the value of generalBonusValue
  const generalBonusValue = parseInt(document.getElementById("generalBonusValue").value) || 0;

  // Update initiativeBonus
  initiativeBonus = parseInt(initiativeBonus) + generalBonusValue;

  if (initiativeBonus !== 0) {
    commandBonus = initiativeBonus >= 0 ? `+${initiativeBonus}` : initiativeBonus;
    toastBonus = ` et un bonus de ${commandBonus}`;
  }

  let diceCount = 'd20';
  if (advantageState !== 'normal') {
    initiativeName = initiativeName + " " + (advantageState === 'advantage' ? 'avantage' : 'désavantage');
    diceCount = `d20${commandBonus}/d20${commandBonus}`;
  } else {
    diceCount = `d20${commandBonus}`;
  }

  const command = `${encodeURI(removeAccents(initiativeName))}:${diceCount}`;
  const toastMessage = `Ça roule ${initiativeName} avec ${diceCount}${toastBonus}`;

  // Send command to Talespire
  window.location.href = `talespire://dice/${command}`;

  // Show the toast
  showToast(toastMessage);
}

//----------- PERCEPTION PASSIVE -----------//

function updatePassivePerception() {
  const baseValue = 10;
  const perceptionBonusValue = parseInt(document.getElementById("perceptionBonusValue").textContent, 10);
  const passivePerceptionValue = baseValue + perceptionBonusValue;
  document.getElementById("passivePerceptionValue").textContent = passivePerceptionValue;
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
  if (characterNameInput.value === "" || characterNameInput.value === " " || characterNameInput.value === null) {
    characterTitle.textContent = "Val de Fondor";
  } else {
    characterTitle.textContent = characterNameInput.value;
  }
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

function rollAbility(abilityName, abilityBonus) {
  const advantageState = getAdvantage();
  let command = '';
  let advantageText = '';

  // Get the value of generalBonusValue
  const generalBonusValue = parseInt(document.getElementById("generalBonusValue").value) || 0;

  // Update abilityBonus
  abilityBonus = parseInt(abilityBonus) + generalBonusValue;

  if (abilityBonus >= 0) {
    abilityBonus = `+${abilityBonus}`;
  }

  if (advantageState === 'normal') {
    command = `${encodeURI(removeAccents(abilityName))}:d20${abilityBonus}`;
  } else {
    advantageText = advantageState === 'advantage' ? 'avantage' : 'désavantage';
    command = `${encodeURI(removeAccents(abilityName + " " + advantageText))}:d20${abilityBonus}/d20${abilityBonus}`;
  }

  const toastMessage = advantageState === 'normal'
    ? `Ça roule ${abilityName} avec d20 et un bonus ${abilityBonus}`
    : `Ça roule ${abilityName} (${advantageText}) avec d20 et un bonus ${abilityBonus}`;

  // Send command to Talespire
  window.location.href = `talespire://dice/${command}`;

  // Show the toast
  showToast(toastMessage);
  //showToast(`talespire://dice/${command}`);
}

window.addEventListener('load', function () {
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
  const advantageState = getAdvantage();
  let command = '';
  let advantageText = '';

  // Get the value of generalBonusValue
  const generalBonusValue = parseInt(document.getElementById("generalBonusValue").value) || 0;

  // Update saveBonus
  saveBonus = parseInt(saveBonus) + generalBonusValue;

  if (saveBonus >= 0) {
    saveBonus = `+${saveBonus}`;
  }

  if (advantageState === 'normal') {
    command = `${encodeURI(removeAccents("Sauvegarde " + saveName))}:d20${saveBonus}`;
  } else {
    advantageText = advantageState === 'advantage' ? 'avantage' : 'désavantage';
    command = `${encodeURI(removeAccents("Sauvegarde " + saveName + " " + advantageText))}:d20${saveBonus}/d20${saveBonus}`;
  }

  const toastMessage = advantageState === 'normal'
    ? `Ça roule Sauvegarde ${saveName} avec d20 et un bonus de ${saveBonus}`
    : `Ça roule Sauvegarde ${saveName} (${advantageText}) avec d20 et un bonus de ${saveBonus}`;

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
  // Add event listeners for Perception checkboxes

  document.getElementById("perceptionProficientBonus").addEventListener("change", updatePassivePerception);
  document.getElementById("perceptionExpertBonus").addEventListener("change", updatePassivePerception);
  document.getElementById("wisdomScore").addEventListener("change", updatePassivePerception);
  document.getElementById("levelName").addEventListener("change", updatePassivePerception);

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
  const advantageState = getAdvantage();
  let command = '';
  let advantageText = '';

  // Get the value of generalBonusValue
  const generalBonusValue = parseInt(document.getElementById("generalBonusValue").value) || 0;

  // Update skillBonus
  skillBonus = parseInt(skillBonus) + generalBonusValue;

  if (skillBonus >= 0) {
    skillBonus = `+${skillBonus}`;
  }

  if (advantageState === 'normal') {
    command = `${encodeURI(removeAccents(skillName))}:d20${skillBonus}`;
  } else {
    advantageText = advantageState === 'advantage' ? 'avantage' : 'désavantage';
    command = `${encodeURI(removeAccents(skillName + " " + advantageText))}:d20${skillBonus}/d20${skillBonus}`;
  }

  const toastMessage = advantageState === 'normal'
    ? `Ça roule Compétence ${skillName} avec d20 et un bonus de ${skillBonus}`
    : `Ça roule Compétence ${skillName} (${advantageText}) avec d20 et un bonus de ${skillBonus}`;

  // Send command to Talespire
  window.location.href = `talespire://dice/${command}`;

  // Show the toast
  showToast(toastMessage);
  //showToast(`talespire://dice/${command}`);
}

//----------- INSPIRATION -----------//

function toggleInspiration() {
  const button = document.getElementById('inspirationValue');

  if (inspirationValue.checked) {
    button.value = 'oui';
  } else {
    button.value = 'non';
  }
}

//----------- Déplacement speed vitesse -----------//

document.getElementById("speedValue").addEventListener("input", function () {
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

let featUUIDs = [];

function generateFeatSection(optionalUUID) {
  const featUUID = optionalUUID || generateUUID();
  featUUIDs.push(featUUID);

  const featSection = document.createElement('div');
  featSection.innerHTML = getFeatSectionHTML(featUUID);
  const featContainer = document.getElementById('featContainer');
  featContainer.appendChild(featSection);
};

function getFeatSectionHTML(featUUID) {
  const featOptions = feats.map(feat => `<option value="${feat.nameFeats}">${feat.nameFeats}</option>`).join('');
  const featSection = `
<div id="featSubsection-${featUUID}" class="subsection6">
  <button id="removeFeat" class="remove-button" onclick="removeFeat('${featUUID}')"><span class="iconify" data-icon="mdi:trash-can-outline"></span></button>
    
  <div class="wrapper">
    <div class="container">
      <div class="input-group">
        <label for="featName-${featUUID}">Nom</label>
        <select id="featName-${featUUID}" class="input-text" onchange="loadFeatData('${featUUID}')">
          <option value="">Choisir</option>
          ${featOptions}
        </select>
      </div>
    </div>
    <div class="container">
      <div class="input-group">
        <label for="featNameVO-${featUUID}">Nom anglais</label>
        <input type="text" id="featNameVO-${featUUID}" class="input-text" value=" " readonly>
      </div>
    </div>
    <div class="container">
      <div class="input-group">
        <label for="featSource-${featUUID}">Source</label>
        <input type="text" id="featSource-${featUUID}" class="input-text" value=" " readonly>
      </div>
    </div>
    <div class="container">
      <div class="input-group">
        <label for="featPrerequisite-${featUUID}">Prérequis</label>
        <input type="text" id="featPrerequisite-${featUUID}" class="input-text" value=" " readonly>
      </div>
    </div>
    <div class="container3">
      <div class="input-group">
        <div class="textarea-container">
          <textarea id="featDescription-${featUUID}" class="input-textarea2" rows=" " readonly></textarea>
        </div>
      </div>
    </div>
  </div>
</div>
`;

  return featSection;
};

function loadFeatData(featUUID) {
  const featNameSelect = document.getElementById(`featName-${featUUID}`);
  const selectedFeat = feats.find(feat => feat.nameFeats === featNameSelect.value);

  if (selectedFeat) {
    document.getElementById(`featNameVO-${featUUID}`).value = selectedFeat.nameVoFeats;
    document.getElementById(`featPrerequisite-${featUUID}`).value = selectedFeat.prerequisiteFeats;
    document.getElementById(`featDescription-${featUUID}`).value = selectedFeat.descriptionFeats;
    document.getElementById(`featSource-${featUUID}`).value = selectedFeat.sourceFeats;
  } else {
    document.getElementById(`featNameVO-${featUUID}`).value = " ";
    document.getElementById(`featPrerequisite-${featUUID}`).value = " ";
    document.getElementById(`featDescription-${featUUID}`).value = " ";
    document.getElementById(`featSource-${featUUID}`).value = " ";
  }
}

function removeFeat(featUUID) {
  const featSection = document.getElementById(`featSubsection-${featUUID}`);
  featSection.remove();

  featUUIDs = featUUIDs.filter(uuid => uuid !== featUUID);
};

function removeAllFeats() {
  const featUUIDsCopy = [...featUUIDs];
  featUUIDsCopy.forEach(uuid => {
    removeFeat(uuid);
  });
};

//----------- SORTS spells -----------//

//------ populate les listes  ------//

function populateSpellCastingAbilities() {
  const spellCastingAbilitySelect = document.getElementById('spellCastingAbilitySelect');
  abilityOptions.forEach((option) => {
    const opt = document.createElement('option');
    opt.value = option.value;
    opt.innerHTML = option.text;
    spellCastingAbilitySelect.appendChild(opt);
  });
}

window.addEventListener('load', () => {
  populateSpellCastingAbilities();
});

function populateSpellCasters() {
  const spellCasterSelect = document.getElementById('spellCasterSelect');

  // Add "Choisir" option
  const defaultOption = document.createElement('option');
  defaultOption.value = " ";
  defaultOption.textContent = 'Choisir';
  spellCasterSelect.appendChild(defaultOption);

  // Add spellCasters options
  spellCasters.forEach(spellCaster => {
    const option = document.createElement('option');
    option.value = spellCaster.name;
    option.textContent = spellCaster.name;
    spellCasterSelect.appendChild(option);
  });

}

function populateSpellSchools() {
  const selectElement = document.getElementById("spellSchool");

  // Add the "Choisir" option as the first option
  const firstOptionElement = document.createElement("option");
  firstOptionElement.value = "";
  firstOptionElement.textContent = "Choisir";
  selectElement.appendChild(firstOptionElement);

  for (const school in SCHOOLS_OF_MAGIC) {
    const optionElement = document.createElement("option");
    optionElement.value = SCHOOLS_OF_MAGIC[school];
    optionElement.textContent = SCHOOLS_OF_MAGIC[school];
    selectElement.appendChild(optionElement);
  }

}

function populateSpellSources() {
  const selectElement = document.getElementById("spellSource");

  // Add the "Choisir" option as the first option
  const firstOptionElement = document.createElement("option");
  firstOptionElement.value = "";
  firstOptionElement.textContent = "Choisir";
  selectElement.appendChild(firstOptionElement);

  SPELL_SOURCES.forEach(source => {
    const optionElement = document.createElement("option");
    optionElement.value = source.name;
    optionElement.textContent = source.name;
    selectElement.appendChild(optionElement);
  });


}

// Call the functions to populate the select elements when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  populateSpellCasters();
  populateSpellSchools();
  populateSpellSources();
});

//------ update les valeurs  ------//

function getAbilityScoreBonus(ability) {
  if (ability === "" || ability === " " || ability === null) {
    return 0;
  }

  const abilityScoreElement = document.getElementById(ability + 'Score');
  if (!abilityScoreElement) {
    return 0;
  }
  const abilityScore = parseInt(abilityScoreElement.value, 10);
  const abilityBonus = Math.floor((abilityScore - 10) / 2);
  return abilityBonus;
}

function getProficiencyBonus() {
  const proficiencyBonusElement = document.getElementById("proficiencyBonusValue");
  const proficiencyBonusValue = parseInt(proficiencyBonusElement.textContent, 10);

  return proficiencyBonusValue;
}

function updateDcForSpell() {
  const ability = document.getElementById('spellCastingAbilitySelect').value;
  const abilityBonus = getAbilityScoreBonus(ability);
  const proficiencyBonus = getProficiencyBonus();
  const otherDcSpellBonus = parseInt(document.getElementById('otherDcSpellBonus').value);

  const dcForSpellValue = 8 + abilityBonus + proficiencyBonus + otherDcSpellBonus;
  document.getElementById('dcForSpell').innerHTML = dcForSpellValue;
}

function updateSpellAttackBonus() {
  const ability = document.getElementById('spellCastingAbilitySelect').value;
  const abilityBonus = getAbilityScoreBonus(ability);
  const proficiencyBonus = getProficiencyBonus();
  const otherSpellAttackBonus = parseInt(document.getElementById('otherSpellAttackBonus').value);

  const spellAttackBonusValue = abilityBonus + proficiencyBonus + otherSpellAttackBonus;

  let displayValue = spellAttackBonusValue;
  if (spellAttackBonusValue > 0) {
    displayValue = "+" + spellAttackBonusValue;
  }

  document.getElementById('spellAttackBonus').innerHTML = displayValue;
}

document.getElementById('spellCastingAbilitySelect').addEventListener('change', () => {
  updateDcForSpell();
  updateSpellAttackBonus();
});
document.getElementById('otherDcSpellBonus').addEventListener('change', updateDcForSpell);
document.getElementById('otherSpellAttackBonus').addEventListener('change', updateSpellAttackBonus);

document.getElementById('levelName').addEventListener('change', () => {
  updateDcForSpell();
  updateSpellAttackBonus();
});

abilityOptions.forEach((abilityOption) => {
  document.getElementById(`${abilityOption.value}Score`).addEventListener('change', () => {
    updateDcForSpell();
    updateSpellAttackBonus();
  });
});

function rollSpellAttack(attackBonus) {
  const advantageState = getAdvantage();
  let command = '';
  let advantageText = '';

  // Get the value of generalBonusValue
  const generalBonusValue = parseInt(document.getElementById("generalBonusValue").value) || 0;

  // Update attackBonus
  attackBonus = parseInt(attackBonus) + generalBonusValue;

  if (attackBonus >= 0) {
    attackBonus = `+${attackBonus}`;
  }

  if (advantageState === 'normal') {
    command = `${encodeURI(removeAccents('Attaque sort '))}:d20${attackBonus}`;
  } else {
    advantageText = advantageState === 'advantage' ? 'avantage' : 'désavantage';
    command = `${encodeURI(removeAccents('Attaque sort ' + advantageText))}:d20${attackBonus}/d20${attackBonus}`;
  }

  const toastMessage = advantageState === 'normal'
    ? `Ça roule Attaque de sort avec d20 et un bonus de ${attackBonus}`
    : `Ça roule Attaque de sort (${advantageText}) avec d20 et un bonus de ${attackBonus}`;

  // Send command to Talespire
  window.location.href = `talespire://dice/${command}`;

  // Show the toast
  showToast(toastMessage);
  //showToast(`talespire://dice/${command}`);
};

//------ générer les sorts custom-list  SPELLBOOK------//

const spellBook = document.getElementById('spellBook');

for (let i = 0; i <= 9; i++) {
  const levelDiv = document.createElement('div');
  levelDiv.id = `level_${i}`;
  levelDiv.className = 'level_';

  levelDiv.innerHTML = `
  <h2>Niveau ${i}</h2>
  <div class="wrapper"> 
    <div class="level-controls"> 
      <button id="addSpell${i}" class="add-button" onclick="getSpellId(${i})"><span class="iconify" data-icon="material-symbols:add"></span></button>
      <div class="input-group">
        <label for="spellMax-${i}">Maximum</label>
        <input type="number" id="spellMax-${i}" class="input-text" value="0" min="0">
      </div>
      <div class="input-group">
        <label for="spellActual-${i}">Actuel</label>
        <input type="number" id="spellActual-${i}" class="input-text" value="0" min="0">
      </div>
    </div>
  </div>
  <div id="spellContainer${i}" class="spell-container"></div>
  `;

  spellBook.appendChild(levelDiv);
}

let spellUUIDs = [];

function generateSpellSection(level, optionalUUID, selectedSpell) {
  const spellUUID = optionalUUID ? optionalUUID : generateUUID();
  const spellURL = selectedSpell ? selectedSpell.URL : 'https://aidedd.org';
  spellUUIDs.push({ uuid: spellUUID, level: level });
  console.log(spellUUIDs);
  const spellSection = document.createElement('div');
  spellSection.innerHTML = getSpellSectionHTML(spellUUID, spellURL);
  const spellContainer = document.getElementById(`spellContainer${level}`);
  spellContainer.appendChild(spellSection);

  return spellUUID; // Return the spellUUID
}



function addSpellFromPopup(level) {
  const spellSelect = document.getElementById('spellSelect');
  const selectedSpellId = spellSelect.value;

  let selectedSpell;

  if (selectedSpellId) {
    selectedSpell = spells.find(spell => spell.id === selectedSpellId);
    selectedSpell.uuid = generateUUID(); // Add a uuid property to the selected spell
  } else {
    selectedSpell = { uuid: generateUUID() }; // Create an empty spell with only a uuid property
  }

  const newSpellUUID = generateSpellSection(level, selectedSpell.uuid, selectedSpell);

  // Use setTimeout to allow the DOM to be updated
  setTimeout(() => {
    if (selectedSpellId) {
      loadSpellData(newSpellUUID, selectedSpell);
    }
  }, 0);

  closeSpellPopup();
}

function isCasterValid(spell, caster) {
  if (caster.trim() === "") {
    return true;
  }

  const casterKey = spellCasters.find(c => c.name.toLowerCase() === caster.toLowerCase());

  return casterKey && spell[casterKey.name] === true;
}

function getSpellId(level) {
  const popup = document.createElement('div');
  popup.id = 'spell-popup';
  popup.className = 'fullscreen-popup';

  // Get the values of caster, school, and source from the DOM elements
  const caster = document.getElementById("spellCasterSelect").value;
  const school = document.getElementById("spellSchool").value;
  const source = document.getElementById("spellSource").value;

  const filteredSpells = spells.filter(spell => {
    return (
      spell.Niv === level &&
      isCasterValid(spell, caster) &&
      (school.trim() === "" || spell.Ecole === school) &&
      (source.trim() === "" || spell.Source === source)
    );
  });
  const spellOptions = filteredSpells.map(spell => `<option value="${spell.id}">${spell.Sort}</option>`).join('');

  popup.innerHTML = `
    <div class="fullscreen-popup-content">
      <h3>Choisir un sort</h3>
      <select id="spellSelect" class="input-select" style="width: 50%;">
        <option value="">Saisie manuelle</option>
        ${spellOptions}
      </select>
      <div class="button-container">
        <button class="button" onclick="closeSpellPopup()">Annuler</button>
        <button class="button" onclick="addSpellFromPopup(${level})">Ajouter</button>
      </div>
    </div>
  `;

  document.body.appendChild(popup);
}

function closeSpellPopup() {
  const popup = document.getElementById('spell-popup');
  if (popup) {
    document.body.removeChild(popup);
  }
}

function getSpellSectionHTML(spellUUID, spellURL) {

  const spellSection = `
<div id="spellSubsection-${spellUUID}" class="subsection3">
  <button id="removeSpell" class="remove-button" onclick="removeSpell('${spellUUID}')"><span class="iconify" data-icon="mdi:trash-can-outline"></span></button>

  <div class="wrapper">
    <div class="container">
      <div class="input-group">
        <label for="spellName-${spellUUID}">Sort</label>
          <input type="text" id="spellName-${spellUUID}" class="input-text" value=" ">
      </div>
      <div class="wrapper">
        <label>Prêt</label>
        <label class="toggle">
          <input type="checkbox" id="spellReady-${spellUUID}" class="toggle-checkbox">
            <span class="toggle-switch"></span>
        </label>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="input-group">
        <label>Détails</label>
        <label class="toggle">
          <input type="checkbox" id="spellDetails-${spellUUID}" class="toggle-checkbox" onchange="toggleSpellDetails('${spellUUID}')">
            <span class="toggle-switch"></span>
        </label>
      </div>
    </div>
    <div id="spellDetail-${spellUUID}" class="hidden">
      <div class="container">
        <label>Composantes</label>
        <div class="input-group">
          <label for="spellComposantesVerbales-${spellUUID}">Verbales</label>
          <label class="toggle">
            <input type="checkbox" id="spellComposantesVerbales-${spellUUID}" class="toggle-checkbox">
              <span class="toggle-switch"></span>
          </label>
        </div>
        <div class="input-group">
          <label for="spellComposantesSomatiques-${spellUUID}">Somatiques</label>
          <label class="toggle">
            <input type="checkbox" id="spellComposantesSomatiques-${spellUUID}" class="toggle-checkbox">
              <span class="toggle-switch"></span>
          </label>
        </div>
        <div class="input-group">
          <label for="spellComposantesMaterielles-${spellUUID}">Matérielles</label>
          <label class="toggle">
            <input type="checkbox" id="spellComposantesMaterielles-${spellUUID}" class="toggle-checkbox">
              <span class="toggle-switch"></span>
          </label>
        </div>
      </div>
      <div class="container">
        <div class="input-group">
          <label for="spellDuree-${spellUUID}">Durée</label>
          <input type="text" id="spellDuree-${spellUUID}" class="input-text" value=" ">
        </div>
        <div class="input-group">
          <label for="spellPortee-${spellUUID}">Portée</label>
          <input type="text" id="spellPortee-${spellUUID}" class="input-text" value=" ">
        </div>
      </div>
      <div class="container">
        <div class="input-group">
          <label for="spellZoneEffet-${spellUUID}">Zone d'effet</label>
          <input type="text" id="spellZoneEffet-${spellUUID}" class="input-text" value=" ">
        </div>
        <div class="input-group">
          <label for="spellCible-${spellUUID}">Cible</label>
          <input type="text" id="spellCible-${spellUUID}" class="input-text" value=" ">
        </div>
      </div>
      <div class="container">
        <div class="input-group">
          <div class="wrapper">
            <label for="spellConcentration-${spellUUID}">Concentration</label>
            <label class="toggle">
              <input type="checkbox" id="spellConcentration-${spellUUID}" class="toggle-checkbox">
                <span class="toggle-switch"></span>
            </label>
          </div>
        </div>
        <div class="input-group">
          <div class="wrapper">
            <label for="spellRituel-${spellUUID}">Rituel</label>
            <label class="toggle">
              <input type="checkbox" id="spellRituel-${spellUUID}" class="toggle-checkbox">
                <span class="toggle-switch"></span>
            </label>
          </div>
        </div>
        <div class="input-group">
          <label for="spellURL-${spellUUID}">Lien</label>
          <button id="spellURL-${spellUUID}" class="url-button" onclick="openSpellURL('${spellURL}')">
            <span class="iconify" data-icon="mdi:link-box-variant-outline"></span>
          </button>
        </div>

      </div>
      <div class="container">
        <div class="input-group">
          <label for="spellEcole-${spellUUID}">École de magie</label>
          <input type="text" id="spellEcole-${spellUUID}" class="input-text" value=" ">
        </div>
        <div class="input-group">
          <label for="spellIncantation-${spellUUID}">Temps d'incantation</label>
          <input type="text" id="spellIncantation-${spellUUID}" class="input-text" value=" ">
        </div>
      </div>
      <div class="container3">
        <div class="input-group">
          <div class="textarea-container">
            <textarea id="spellDescription-${spellUUID}" class="input-textarea2 input-text" rows=" "></textarea>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="input-group">
          <label for="spellNameVO-${spellUUID}">Nom anglais</label>
          <input type="text" id="spellNameVO-${spellUUID}" class="input-text" value=" ">
        </div>
      </div>
      <div class="container3">
        <div class="input-group">
          <label for="spellSource-${spellUUID}">Source</label>
          <input type="text" id="spellSource-${spellUUID}" class="input-text" value=" ">
        </div>
      </div>
    </div>
  </div> 

</div>
      `;
  return spellSection;
};

function openSpellURL(url) {
  if (url && url !== 'undefined') {
    window.open(url, '_blank');
  } else {
    window.open("https://aidedd.org", '_blank');
  }
}

function toggleSpellDetails(spellUUID) {
  const spellDetail = document.getElementById(`spellDetail-${spellUUID}`);
  const spellDetailsCheckbox = document.getElementById(`spellDetails-${spellUUID}`);

  if (spellDetailsCheckbox.checked) {
    spellDetail.style.display = 'block';
  } else {
    spellDetail.style.display = 'none';
  }
}

function loadSpellData(spellUUID, selectedSpell) {
  if (!selectedSpell) {
    const spellNameSelect = document.getElementById(`spellName-${spellUUID}`);
    selectedSpell = spells.find(spell => spell.Sort === spellNameSelect.value);
  }

  if (selectedSpell) {
    document.getElementById(`spellName-${spellUUID}`).value = selectedSpell.Sort;
    document.getElementById(`spellNameVO-${spellUUID}`).value = selectedSpell.VO;
    document.getElementById(`spellEcole-${spellUUID}`).value = selectedSpell.Ecole;
    document.getElementById(`spellIncantation-${spellUUID}`).value = selectedSpell.Incantation;
    document.getElementById(`spellConcentration-${spellUUID}`).checked = selectedSpell.Concentration;
    document.getElementById(`spellRituel-${spellUUID}`).checked = selectedSpell.Rituel;
    document.getElementById(`spellDescription-${spellUUID}`).value = selectedSpell.Description;
    document.getElementById(`spellSource-${spellUUID}`).value = selectedSpell.Source;
    document.getElementById(`spellURL-${spellUUID}`).value = selectedSpell.URL;
  } else {
    document.getElementById(`spellNameVO-${spellUUID}`).value = " ";
    document.getElementById(`spellEcole-${spellUUID}`).value = " ";
    document.getElementById(`spellIncantation-${spellUUID}`).value = " ";
    document.getElementById(`spellConcentration-${spellUUID}`).checked = false;
    document.getElementById(`spellRituel-${spellUUID}`).checked = false;
    document.getElementById(`spellDescription-${spellUUID}`).value = " ";
    document.getElementById(`spellSource-${spellUUID}`).value = " ";
    document.getElementById(`spellURL-${spellUUID}`).value = " ";
  }
}


function removeSpell(spellUUID) {
  const spellSection = document.getElementById(`spellSubsection-${spellUUID}`);
  if (spellSection) {
    spellSection.remove();
    spellUUIDs = spellUUIDs.filter(spell => spell.uuid !== spellUUID);
    console.log(spellUUIDs);
  } else {
    console.warn(`Element with id 'spellSubsection-${spellUUID}' not found`);
  }
}


function removeAllSpells() {
  const spellUUIDsCopy = [...spellUUIDs];
  spellUUIDsCopy.forEach(spell => {
    removeSpell(spell.uuid);
  });
}



function resetMaxAndActual() {
  for (let i = 0; i <= 9; i++) {
    document.getElementById(`spellMax-${i}`).value = "0";
    document.getElementById(`spellActual-${i}`).value = "0";
  }
}

function updateSpellCasterSelect() {
  const classNameSelect = document.getElementById("className");
  const spellCasterSelect = document.getElementById("spellCasterSelect");

  classNameSelect.addEventListener("change", () => {
    const selectedClass = classNameSelect.value;
    const spellCasterOptions = spellCasterSelect.options;

    for (let i = 0; i < spellCasterOptions.length; i++) {
      if (spellCasterOptions[i].value.toLowerCase() === selectedClass.toLowerCase()) {
        spellCasterSelect.value = spellCasterOptions[i].value;
        break;
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateSpellCasterSelect();
});



//----------- STATUS ÉTATS -----------//

function generateStatusCheckboxes() {
  const statusContainer = document.getElementById("status");

  const statusBar = document.getElementById("statusBar"); // get status bar element

  const statusRow = document.createElement("div");
  statusRow.className = "status-row";

  for (const [statusKey, statusValue] of Object.entries(characterStatus)) {
    const subsection = document.createElement("div");
    subsection.className = "subsection";
    subsection.style.display = "flex";
    subsection.style.flexDirection = "column";

    const label = document.createElement("label");
    label.title = statusValue.description_fr;
    label.style.display = "flex";
    label.style.flexDirection = "column";
    label.style.alignItems = "center"; // Align icon and text vertically

    const iconToggleWrapper = document.createElement("div");
    iconToggleWrapper.style.display = "flex";
    iconToggleWrapper.style.alignItems = "center";

    const icon = document.createElement("span");
    icon.className = `iconify`;
    icon.setAttribute("data-icon", statusIcons[statusKey]);
    icon.setAttribute("data-inline", "false");
    icon.style.marginRight = "4px"; // Add some space between the icon and the text

    iconToggleWrapper.appendChild(icon);

    createToggleSwitch(iconToggleWrapper, statusKey, null, function (isChecked) {
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

    label.appendChild(iconToggleWrapper);
    label.appendChild(document.createTextNode(statusValue.name_fr));
    subsection.appendChild(label);
    statusRow.appendChild(subsection);
  }

  statusContainer.appendChild(statusRow);
  return statusContainer;
}

function createToggleSwitch(parent, id, labelText, onChange) {
  const toggleContainer = document.createElement('div');
  toggleContainer.classList.add('toggle-container');

  const toggleCheckbox = document.createElement('input');
  toggleCheckbox.type = 'checkbox';
  toggleCheckbox.id = id;
  toggleCheckbox.className = 'toggle-checkbox';
  toggleContainer.appendChild(toggleCheckbox);

  const toggleSwitch = document.createElement('label');
  toggleSwitch.className = 'toggle-switch';
  toggleSwitch.htmlFor = id;
  toggleContainer.appendChild(toggleSwitch);

  if (labelText) {
    const toggleLabel = document.createElement('label');
    toggleLabel.className = 'toggle-label';
    toggleLabel.htmlFor = id;
    toggleLabel.textContent = labelText;
    toggleContainer.appendChild(toggleLabel);
  }

  toggleCheckbox.addEventListener('change', function () {
    const isChecked = this.checked;
    onChange(isChecked);
  });

  parent.appendChild(toggleContainer);
}

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
      icon.title = characterStatus[statusKey].name_fr; // Set the French name as a tooltip on hover

      statusBar.appendChild(icon);
      icon.appendChild(document.createTextNode(statusValue.name_fr));

    }
  }
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

function selectChangedContainer(selectElement, containerID) {
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

document.addEventListener("DOMContentLoaded", function () {
  populateArmorOptions();
  populateShieldAndAccessoriesOptions();
  populateShieldAndAccessoriesOptions2();

});

function adjustArmorClassValue() {
  const abilityBonusScoreMapping = {
    'strength': parseInt(document.getElementById('strengthBonusScore').textContent, 10),
    'dexterity': parseInt(document.getElementById('dexterityBonusScore').textContent, 10),
    'constitution': parseInt(document.getElementById('constitutionBonusScore').textContent, 10),
    'intelligence': parseInt(document.getElementById('intelligenceBonusScore').textContent, 10),
    'wisdom': parseInt(document.getElementById('wisdomBonusScore').textContent, 10),
    'charisma': parseInt(document.getElementById('charismaBonusScore').textContent, 10)
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

  armorClassValue.value = totalArmorClass;
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

function toggleArmorClassDetails() {
  const armorClassDetail = document.getElementById('armorClassDetail');
  const armorClassShowDetails = document.getElementById('armorClassShowDetails');

  if (armorClassShowDetails.checked) {
    armorClassDetail.style.display = 'block';
  } else {
    armorClassDetail.style.display = 'none';
  }
}

//----------- ATTAQUES-----------//

function generateUUID() {
  const cryptoAvailable = typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function';
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (cryptoAvailable ? crypto.getRandomValues(new Uint8Array(1))[0] : Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

let attackUUIDs = [];

function generateAttackSection(optionalUUID) {
  const attackUUID = optionalUUID || generateUUID(); // Use the optionalUUID if provided, otherwise generate a new UUID
  attackUUIDs.push(attackUUID); // Add the new UUID to the attackUUIDs array

  const attackSection = document.createElement('div');
  attackSection.innerHTML = getAttackSectionHTML(attackUUID);
  const attackContainer = document.getElementById('attacksContainer'); // Replace 'attacksContainer' with the ID of your container
  attackContainer.appendChild(attackSection);

  createAttackSubsection(attackUUID);
};

function getAttackSectionHTML(attackUUID) {
  const attackAndDamageSection = `
  <div id="attackAndDamageValuesSubsection-${attackUUID}" class="subsection">
  <div id="attackAndDamage"class="container4">
      <div class="wrapper attack-name-wrapper">
          <label for="attackName-${attackUUID}" id="attackNameLabel">Nom</label>
            <input type="text" id="attackName-${attackUUID}" name="attackName-${attackUUID}" value=" " class="input-text attack-name-input">
        </div>
        <div class="wrapper ">
          <label for="attackValue-${attackUUID}" id="attackValueLabel">Attaque</label>
          <input type="text" id="attackValue-${attackUUID}" name="attackValue-${attackUUID}" class="roundButton" value="+0" readonly onclick="callRollAttack('${attackUUID}')"> 
        </div>
        <div class="wrapper ">
          <label for="damage-${attackUUID}" id="damageLabel">Dégâts</label>
          <input type="text" id="damage-${attackUUID}" name="damage-${attackUUID}" class="rectangleButton" value=" " readonly onclick="callRollDamage('${attackUUID}')">
        </div>
    </div>
    <span class="arrow-icon arrow-icon-${attackUUID}">
      <span id="arrowIconify-${attackUUID}" class="iconify arrow-icon-${attackUUID}" data-icon="mdi:chevron-down" data-inline="false"></span>
    </span>
    <button id="removeAttack" class="remove-button" onclick="removeAttack('${attackUUID}')"><span class="iconify" data-icon="mdi:trash-can-outline"></span></button>

    <div id="attackAndDamageBonusSubsection-${attackUUID}" class="attack-subsection subsection container5 hidden">
    <h4>Information supplémentaire</h4>
    <div id="damageSupplementContainer"class="container5">
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
        <div id="attackContainer" class="container3">
        <div class="input-group resource-input-group">
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
        <div class="input-group resource-input-group">
          <label for="otherAttackAdjustmentValue-${attackUUID}" id="otherAttackAdjustmentValueLabel">Bonus</label>
          <input type="number" id="otherAttackAdjustmentValue-${attackUUID}" name="otherAttackAdjustmentValue-${attackUUID}" class="input-text" min="-10" max="10" value="0">
        </div>
        <div class="input-group resource-input-group">
          <label for="attackProficientCheckBox-${attackUUID}">Maîtrise</label>
          <input type="checkbox" id="attackProficientCheckBox-${attackUUID}" name="attackProficientCheckBox-${attackUUID}">
        </div>
      </div>
        <h4>Dégâts</h4>
        <div id="damageContainer" class="container3">
            <div class="input-group resource-input-group">
              <label for="damageDiceQuantity-${attackUUID}" id="damageDiceQuantityLabel">Quantité</label>
              <input type="number" id="damageDiceQuantity-${attackUUID}" name="damageDiceQuantity-${attackUUID}" class="input-text" min="1" max="10" value="1">
            </div>
            <div class="input-group resource-input-group">
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
        <div id="damageAdjustmentContainer"class="container3">
            <div class="input-group resource-input-group">
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
            <div class="input-group resource-input-group">
              <label for="otherDamageAdjustmentValue-${attackUUID}" id="otherDamageAdjustmentValueLabel">Bonus</label>
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
  const otherAttackAdjustmentValue = parseInt(otherAttackAdjustmentValueElement.value, 10) || 0;
  const attackProficientCheckBoxElement = document.getElementById(`attackProficientCheckBox-${uuid}`);
  const attackProficientCheckBox = attackProficientCheckBoxElement ? attackProficientCheckBoxElement.checked : false;
  const damageDiceQuantityElement = document.getElementById(`damageDiceQuantity-${uuid}`);
  const damageDiceQuantity = parseInt(damageDiceQuantityElement.value, 10) || 1;
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
  damageElement.value = damageDice + (damageAdjustment > 0 ? '+' + damageAdjustment : (damageAdjustment < 0 ? '' + damageAdjustment : ''));
};

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

function rollAttack(attackName, attackBonus) {
  const advantageState = getAdvantage();
  let command = '';
  let advantageText = '';

  // Get the value of generalBonusValue
  const generalBonusValue = parseInt(document.getElementById("generalBonusValue").value) || 0;

  // Update attackBonus
  attackBonus = parseInt(attackBonus) + generalBonusValue;

  if (attackBonus >= 0) {
    attackBonus = `+${attackBonus}`;
  }

  if (advantageState === 'normal') {
    command = `${encodeURI(removeAccents('Attaque ' + attackName))}:d20${attackBonus}`;
  } else {
    advantageText = advantageState === 'advantage' ? 'avantage' : 'désavantage';
    command = `${encodeURI(removeAccents('Attaque ' + attackName + " " + advantageText))}:d20${attackBonus}/d20${attackBonus}`;
  }

  const toastMessage = advantageState === 'normal'
    ? `Ça roule Attaque ${attackName} avec d20 et un bonus de ${attackBonus}`
    : `Ça roule Attaque ${attackName} (${advantageText}) avec d20 et un bonus de ${attackBonus}`;

  // Send command to Talespire
  window.location.href = `talespire://dice/${command}`;

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
    command = `${encodeURI(removeAccents('Degats ' + attackName))}:${commandBonus}`;
    toastMessage = `Ça roule dégâts pour ${attackName} de ${toastBonus}`;
  } else {
    command = `${encodeURI(removeAccents(' ' + damageType))}:${commandBonus}`;
    toastMessage = `Ça roule dégâts de type ${damageType} pour ${attackName} de ${toastBonus}`;
  }

  // Send command to Talespire
  window.location.href = `talespire://dice/${attackName}${command}`;

  // Show the toast
  showToast(toastMessage);
  //showToast(`talespire://dice/${command}`);
  //console.log(`talespire://dice/${command}`)
};

function removeAttack(attackUUID) {
  const attackSection = document.getElementById(`attackAndDamageValuesSubsection-${attackUUID}`);
  attackSection.remove();

  // Remove the attackUUID from the attackUUIDs array
  attackUUIDs = attackUUIDs.filter(uuid => uuid !== attackUUID);
};

function removeAllAttacks() {
  // Make a copy of the attackUUIDs array to avoid modifying it while looping
  const attackUUIDsCopy = [...attackUUIDs];

  // Call removeAttack for each UUID in the copied array
  attackUUIDsCopy.forEach(uuid => {
    removeAttack(uuid);
  });
}

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

function generateResourceSection(optionalUUID) {
  const resourceUUID = optionalUUID || generateUUID(); // Use the optionalUUID if provided, otherwise generate a new UUID
  resourceUUIDs.push(resourceUUID);
  const resourceSection = document.createElement('div');
  resourceSection.innerHTML = getResourceSectionHTML(resourceUUID);
  const resourceContainer = document.getElementById('resourceContainer');
  resourceContainer.appendChild(resourceSection);

};

function getResourceSectionHTML(resourceUUID) {
  const resourceSection = `
<div id="resourceSubsection-${resourceUUID}" class="subsection">
  <button id="removeResource" class="remove-button" onclick="removeResource('${resourceUUID}')"><span class="iconify" data-icon="mdi:trash-can-outline"></span></button>
  
  <div class="container4">
    <div class="input-group">
      <label for="resourceName-${resourceUUID}">Nom</label>
      <input type="text" id="resourceName-${resourceUUID}" class="input-text" value="">
    </div>
    
  </div>
  
  <div class="container4">
  <div class="input-group resource-input-group">
    <label for="resourceMax-${resourceUUID}">Maximum</label>
    <input type="number" id="resourceMax-${resourceUUID}" class="input-text" value="0" min="0">
  </div>
  <div class="input-group resource-input-group">
    <label for="resourceActual-${resourceUUID}">Actuel</label>
    <input type="number" id="resourceActual-${resourceUUID}" class="input-text" value="0" min="0">
  </div>
  <div class="toggle-group resource-toggle-group">
    <div class="toggle">
      <label class="toggle-label" for="longRestSwitch-${resourceUUID}">Long repos</label>
      <input type="checkbox" id="longRestSwitch-${resourceUUID}" class="toggle-checkbox">
      <label class="toggle-switch" for="longRestSwitch-${resourceUUID}"></label>
    </div>
    <div class="toggle">
      <label class="toggle-label" for="shortRestSwitch-${resourceUUID}">Court repos</label>
      <input type="checkbox" id="shortRestSwitch-${resourceUUID}" class="toggle-checkbox">
      <label class="toggle-switch" for="shortRestSwitch-${resourceUUID}"></label>
    </div>
  </div>
</div>
</div>
`;

  return resourceSection;
};

function removeResource(resourceUUID) {
  const resourceSection = document.getElementById(`resourceSubsection-${resourceUUID}`);
  resourceSection.remove();

  resourceUUIDs = resourceUUIDs.filter(uuid => uuid !== resourceUUID);

};

function removeAllResources() {
  // Make a copy of the resourceUUIDs array to avoid modifying it while looping
  const resourceUUIDsCopy = [...resourceUUIDs];

  // Call removeresource for each UUID in the copied array
  resourceUUIDsCopy.forEach(uuid => {
    removeResource(uuid);
  });
};

//----------- ATTRIBUTS (CAPACITÉs, features) -----------//

let featureUUIDs = [];

function generateFeatureSection(optionalUUID) {
  const featureUUID = optionalUUID || generateUUID(); // Use the optionalUUID if provided, otherwise generate a new UUID
  featureUUIDs.push(featureUUID);

  const featureSection = document.createElement('div');
  featureSection.innerHTML = getFeatureSectionHTML(featureUUID);
  const featureContainer = document.getElementById('featureContainer');
  featureContainer.appendChild(featureSection);

};

function getFeatureSectionHTML(featureUUID) {
  const featureSection = `
<div id="featureSubsection-${featureUUID}" class="subsection3">
  <button id="removeFeature" class="remove-button" onclick="removeFeature('${featureUUID}')"><span class="iconify" data-icon="mdi:trash-can-outline"></span></button>
  
  <div class="wrapper">
    <div class="container">
      <div class="input-group">
        <label for="featureName-${featureUUID}">Nom</label>
        <input type="text" id="featureName-${featureUUID}" class="input-text" value="">
      </div>
    </div>
    <div class="container">
      <div class="input-group">
        <label for="featureSource-${featureUUID}">Source</label>
        <input type="text" id="featureSource-${featureUUID}" class="input-text" value="">
      </div>
      <div class="input-group">
        <label for="featureType-${featureUUID}">Type</label>
        <input type="text" id="featureType-${featureUUID}" class="input-text" value="">
      </div>
      <div class="input-group">
        <label for="showDetails-${featureUUID}">Détails</label>
        <label class="toggle">
          <input type="checkbox" id="showDetails-${featureUUID}" class="toggle-checkbox" onchange="toggleFeatureDetails('${featureUUID}')">
          <span class="toggle-switch"></span>
        </label>
      </div>
    </div>
  </div>

  <div class="container3">
    <div class="input-group">
      <div class="textarea-container">
        <textarea id="featureDescription-${featureUUID}" class="input-textarea input-text" rows="6"></textarea>
      </div>
    </div>
  </div>
</div>
`;

  return featureSection;
};

function toggleFeatureDetails(featureUUID) {
  const showDetailsCheckbox = document.getElementById(`showDetails-${featureUUID}`);
  const featureDescriptionTextarea = document.getElementById(`featureDescription-${featureUUID}`);

  if (showDetailsCheckbox.checked) {
    featureDescriptionTextarea.style.display = 'block';
  } else {
    featureDescriptionTextarea.style.display = 'none';
  }
}

function removeFeature(featureUUID) {
  const featureSection = document.getElementById(`featureSubsection-${featureUUID}`);
  featureSection.remove();

  featureUUIDs = featureUUIDs.filter(uuid => uuid !== featureUUID);
};

function removeAllFeatures() {
  const featureUUIDsCopy = [...featureUUIDs];
  featureUUIDsCopy.forEach(uuid => {
    removeFeature(uuid);
  });
};

//-----------EQUIPEMENT -----------//

let equipmentUUIDs = [];

function generateEquipmentSection(optionalUUID) {
  const equipmentUUID = optionalUUID || generateUUID(); // Use the optionalUUID if provided, otherwise generate a new UUID
  equipmentUUIDs.push(equipmentUUID);
  const equipmentSection = document.createElement('div');
  equipmentSection.innerHTML = getEquipmentSectionHTML(equipmentUUID);
  const equipmentContainer = document.getElementById('equipmentContainer');
  equipmentContainer.appendChild(equipmentSection);

  updateTotalWeight();

  // Add event listeners for quantity and weight changes
  const quantityElement = document.getElementById(`equipmentQuantity-${equipmentUUID}`);
  const weightElement = document.getElementById(`equipmentWeight-${equipmentUUID}`);
  quantityElement.addEventListener('change', updateTotalWeight);
  weightElement.addEventListener('change', updateTotalWeight);




};

function getEquipmentSectionHTML(equipmentUUID) {
  const equipmentSection = `
<div id="equipmentSubsection-${equipmentUUID}" class="subsection">
  <button id="removeEquipment" class="remove-button" onclick="removeEquipment('${equipmentUUID}')"><span class="iconify" data-icon="mdi:trash-can-outline"></span></button>
  
  <div class="container4">
    <div class="input-group">
      <label for="equipmentName-${equipmentUUID}">Nom</label>
      <input type="text" id="equipmentName-${equipmentUUID}" class="input-text" value="">
    </div>
  </div>

  <div class="container6">
    <div class="input-group">
      <label for="equipmentOrigin-${equipmentUUID}">Origine</label>
      <input type="text" id="equipmentOrigin-${equipmentUUID}" class="input-text" value="">
    </div>
    <div class="input-group">
      <label for="equipmentQuantity-${equipmentUUID}">Quantité</label>
      <input type="number" id="equipmentQuantity-${equipmentUUID}" class="input-text" value="0" min="0">
    </div>
    <div class="input-group">
      <label for="equipmentWeight-${equipmentUUID}">Poids</label>
      <input type="number" id="equipmentWeight-${equipmentUUID}" class="input-text" value="0" min="0">
    </div>
    <div class="toggle">
      <label class="toggle-label" for="equipmentActive-${equipmentUUID}">Actif</label>
      <input type="checkbox" id="equipmentActive-${equipmentUUID}" class="toggle-checkbox">
      <label class="toggle-switch" for="equipmentActive-${equipmentUUID}"></label>
      
    </div>
  </div>
</div>
`;

  return equipmentSection;
};

function removeEquipment(equipmentUUID) {
  const equipmentSection = document.getElementById(`equipmentSubsection-${equipmentUUID}`);
  equipmentSection.remove();

  equipmentUUIDs = equipmentUUIDs.filter(uuid => uuid !== equipmentUUID);
  updateTotalWeight();

};

function removeAllEquipments() {
  const equipmentUUIDsCopy = [...equipmentUUIDs];
  equipmentUUIDsCopy.forEach(uuid => {
    removeEquipment(uuid);
  });
};

function updateTotalWeight() {
  let totalWeight = 0;

  equipmentUUIDs.forEach((equipmentUUID) => {
    const quantityElement = document.getElementById(`equipmentQuantity-${equipmentUUID}`);
    const weightElement = document.getElementById(`equipmentWeight-${equipmentUUID}`);

    const quantity = parseInt(quantityElement.value, 10) || 0;
    const weight = parseFloat(weightElement.value) || 0;

    totalWeight += quantity * weight;
  });

  const totalWeightElement = document.getElementById('totalWeightValue');
  totalWeightElement.value = totalWeight;
}

//----------- TRESORS -----------//

let treasureUUIDs = [];

function generateTreasureSection(optionalUUID) {
  const treasureUUID = optionalUUID || generateUUID(); // Use the optionalUUID if provided, otherwise generate a new UUID
  treasureUUIDs.push(treasureUUID);

  const treasureSection = document.createElement('div');
  treasureSection.innerHTML = getTreasureSectionHTML(treasureUUID);
  const treasureContainer = document.getElementById('treasureContainer');
  treasureContainer.appendChild(treasureSection);

  // Add event listeners for quantity and value inputs
  const quantityInput = document.getElementById(`treasureQuantity-${treasureUUID}`);
  const valueInput = document.getElementById(`treasureValue-${treasureUUID}`);

  quantityInput.addEventListener("input", updateTreasureTotal);
  valueInput.addEventListener("input", updateTreasureTotal);

  quantityInput.addEventListener("change", updateTreasureTotal);
  valueInput.addEventListener("change", updateTreasureTotal);

};

function getTreasureSectionHTML(treasureUUID) {
  const treasureSection = `
<div id="treasureSubsection-${treasureUUID}" class="subsection">
  <button id="removeTreasure" class="remove-button" onclick="removeTreasure('${treasureUUID}')"><span class="iconify" data-icon="mdi:trash-can-outline"></span></button>
  
  <div class="container4">
    <div class="input-group">
      <label for="treasureName-${treasureUUID}">Nom</label>
      <input type="text" id="treasureName-${treasureUUID}" class="input-text" value="">
    </div>
  </div>

  <div class="container6">
    <div class="input-group">
      <label for="treasureOrigin-${treasureUUID}">Origine</label>
      <input type="text" id="treasureOrigin-${treasureUUID}" class="input-text" value="">
    </div>
    <div class="input-group ">
      <label for="treasureQuantity-${treasureUUID}">Quantité</label>
      <input type="number" id="treasureQuantity-${treasureUUID}" class="input-text" value="0" min="0">
    </div>
    <div class="input-group ">
      <label for="treasureValue-${treasureUUID}">Valeur</label>
      <input type="number" id="treasureValue-${treasureUUID}" class="input-text" value="0" min="0">
    </div>

  </div>
</div>
`;

  return treasureSection;
};

function removeTreasure(treasureUUID) {
  const treasureSection = document.getElementById(`treasureSubsection-${treasureUUID}`);
  treasureSection.remove();

  treasureUUIDs = treasureUUIDs.filter(uuid => uuid !== treasureUUID);
};

function removeAllTreasures() {
  const treasureUUIDsCopy = [...treasureUUIDs];
  treasureUUIDsCopy.forEach(uuid => {
    removeTreasure(uuid);
  });
};

//----------- PIECE, CURRENCY ARGENT -----------//
function generateMoneyInputs() {
  const moneyContainer = document.getElementById("moneyPieces");

  const row = document.createElement("div");
  row.className = "row";

  const moneyInputsContainer = document.createElement("div");
  moneyInputsContainer.className = "container money-inputs-container";

  for (const [currencyKey, currency] of Object.entries(fondorCurrencies)) {
    const moneyInputWrapper = document.createElement("div");
    moneyInputWrapper.className = "wrapper  money-input-wrapper";

    const label = document.createElement("label");
    label.htmlFor = `money-${currencyKey}`;
    label.textContent = currency.name_fr;

    const input = document.createElement("input");
    input.type = "number";
    input.id = `money-${currencyKey}`;
    input.className = "input-money input-text  token-input";
    input.min = 0;
    input.value = 0;
    input.style.width = "50px"; // Adjust the width
    input.style.height = "50px"; // Set the height
    input.style.borderRadius = "50%"; // Set border-radius to 50%
    input.style.textAlign = "center";
    input.style.backgroundColor = currency.color;
    input.style.opacity = 0.7;
    input.style.boxShadow = "4px 4px 4px rgba(0, 0, 0, 0.4)"; // Add drop shadow effect
    input.addEventListener("input", calculateTotal);

    moneyInputWrapper.appendChild(label);
    moneyInputWrapper.appendChild(input);
    moneyInputsContainer.appendChild(moneyInputWrapper);
  }

  row.appendChild(moneyInputsContainer);

  const totalWrapper = document.createElement("div");
  totalWrapper.className = "wrapper money-input-wrapper";

  const treasureTotalLabel = document.createElement("label");
  treasureTotalLabel.textContent = "Total trésor";

  const treasureTotalInput = document.createElement("input");
  treasureTotalInput.type = "number";
  treasureTotalInput.id = "TreasureTotal";
  treasureTotalInput.className = "input-text";
  treasureTotalInput.readOnly = true;
  treasureTotalInput.value = 0;
  treasureTotalInput.style.fontWeight = "bold";
  treasureTotalInput.style.width = "120px";
  treasureTotalInput.style.textAlign = "right";

  const totalLabel = document.createElement("label");
  totalLabel.textContent = "Grand Total";

  const totalInput = document.createElement("input");
  totalInput.type = "number";
  totalInput.id = "money-total";
  totalInput.className = "input-text total";
  totalInput.readOnly = true;
  totalInput.value = 0;
  totalInput.style.fontWeight = "bold";
  totalInput.style.width = "120px";
  totalInput.style.textAlign = "right";

  totalWrapper.appendChild(treasureTotalLabel);
  totalWrapper.appendChild(treasureTotalInput);
  totalWrapper.appendChild(totalLabel);
  totalWrapper.appendChild(totalInput);
  totalWrapper.style.justifyContent = "flex-end";

  row.appendChild(totalWrapper);

  moneyContainer.appendChild(row);
}

function updateTreasureTotal() {
  const treasureTotalInput = document.getElementById("TreasureTotal");
  let treasureTotal = 0;

  for (const treasureUUID of treasureUUIDs) {
    const quantityInput = document.getElementById(`treasureQuantity-${treasureUUID}`);
    const valueInput = document.getElementById(`treasureValue-${treasureUUID}`);

    const quantity = parseInt(quantityInput.value) || 0;
    const value = parseInt(valueInput.value) || 0;

    treasureTotal += quantity * value;
  }

  treasureTotalInput.value = treasureTotal;
  calculateTotal();
}

// Call updateTreasureTotal() when the qty or value inputs change
for (const treasureUUID of treasureUUIDs) {
  const quantityInput = document.getElementById(`treasureQuantity-${treasureUUID}`);
  const valueInput = document.getElementById(`treasureValue-${treasureUUID}`);

  quantityInput.addEventListener("input", updateTreasureTotal);
  valueInput.addEventListener("input", updateTreasureTotal);
}

for (const treasureUUID of treasureUUIDs) {
  const quantityInput = document.getElementById(`treasureQuantity-${treasureUUID}`);
  const valueInput = document.getElementById(`treasureValue-${treasureUUID}`);

  quantityInput.addEventListener("change", updateTreasureTotal);
  valueInput.addEventListener("change", updateTreasureTotal);
}

// Calculate the total amount in gold pieces
function calculateTotal() {
  const totalInput = document.getElementById("money-total");
  const treasureTotalInput = document.getElementById("TreasureTotal");
  let total = 0;

  for (const [currencyKey, currency] of Object.entries(fondorCurrencies)) {
    const input = document.getElementById(`money-${currencyKey}`);
    const value = parseInt(input.value) || 0;
    total += value * currency.conversion_rate;
  }

  total += parseInt(treasureTotalInput.value) || 0;
  totalInput.value = total.toFixed(2);
}

// Generate the money inputs on load
document.addEventListener('DOMContentLoaded', function () {
  generateMoneyInputs();
});

//----------- LANGUE -----------//

let languageUUIDs = [];

function generateLanguageSection(optionalUUID) {
  const languageUUID = optionalUUID || generateUUID(); // Use the optionalUUID if provided, otherwise generate a new UUID
  languageUUIDs.push(languageUUID);

  const languageSection = document.createElement('div');
  languageSection.innerHTML = getLanguageSectionHTML(languageUUID);
  const languageContainer = document.getElementById('languageContainer');
  languageContainer.appendChild(languageSection);

};

function getLanguageSectionHTML(languageUUID) {
  const languageSection = `
<div id="languageSubsection-${languageUUID}" class="subsection3">
  <button id="removeLanguage" class="remove-button" onclick="removeLanguage('${languageUUID}')"><span class="iconify" data-icon="mdi:trash-can-outline"></span></button>
  
  <div class="container container3">
    <div class="input-group">
      <label for="languageName-${languageUUID}">Nom</label>
      <select id="languageName-${languageUUID}" class="input-text">
        <option value="">Choisir</option>
        <option value="elanais">Élanais</option>
        <option value="arcane">Arcane</option>
        <option value="sylvestre">Sylvestre</option>
        <option value="montagnais">Montagnais</option>
        <option value="thorois">Thorois</option>
        <option value="anaureen">Anauréen</option>
        <option value="orque">Orque</option>
        <option value="geant">Géant</option>
        <option value="faune">Faune</option>
        <option value="languemere">Languemère</option>
        <option value="element">Élément</option>
      </select>
    </div>

    <div class="toggle-group">
      <div class="toggle">
        <div class="wrapper">
          <label class="toggle-label" for="languageSpoken-${languageUUID}">Parlé</label>
          <input type="checkbox" id="languageSpoken-${languageUUID}" class="toggle-checkbox">
          <label class="toggle-switch" for="languageSpoken-${languageUUID}"></label>
        </div>
      </div>
      <div class="toggle">
        <div class="wrapper">
          <label class="toggle-label" for="languageWritten-${languageUUID}">Écrit</label>
          <input type="checkbox" id="languageWritten-${languageUUID}" class="toggle-checkbox">
          <label class="toggle-switch" for="languageWritten-${languageUUID}"></label>
        </div>
      </div>
    </div>
  </div>
</div>
`;

  return languageSection;
};

function removeLanguage(languageUUID) {
  const languageSection = document.getElementById(`languageSubsection-${languageUUID}`);
  languageSection.remove();

  languageUUIDs = languageUUIDs.filter(uuid => uuid !== languageUUID);
};

function removeAllLanguages() {
  const languageUUIDsCopy = [...languageUUIDs];
  languageUUIDsCopy.forEach(uuid => {
    removeLanguage(uuid);
  });
};

//----------- NOTES DIVERSES -----------//

let miscellaneousUUIDs = [];

function generateMiscellaneousSection(optionalUUID) {
  const miscellaneousUUID = optionalUUID || generateUUID(); // Use the optionalUUID if provided, otherwise generate a new UUID
  miscellaneousUUIDs.push(miscellaneousUUID);

  const miscellaneousSection = document.createElement('div');
  miscellaneousSection.innerHTML = getMiscellaneousSectionHTML(miscellaneousUUID);
  const miscellaneousContainer = document.getElementById('miscellaneousContainer');
  miscellaneousContainer.appendChild(miscellaneousSection);

};

function getMiscellaneousSectionHTML(miscellaneousUUID) {
  const miscellaneousSection = `
<div id="miscellaneousSubsection-${miscellaneousUUID}" class="subsection3">
  <button id="removeMiscellaneous" class="remove-button" onclick="removeMiscellaneous('${miscellaneousUUID}')"><span class="iconify" data-icon="mdi:trash-can-outline"></span></button>
  <div class="container container4">
    <div class="input-group">
      <label for="miscellaneousName-${miscellaneousUUID}">Nom</label>
      <input type="text" id="miscellaneousName-${miscellaneousUUID}" class="input-text" value="">
    </div>
    <div class="input-group">
      <label for="showDetails-${miscellaneousUUID}">Détails</label>
      <label class="toggle">
        <input type="checkbox" id="showDetails-${miscellaneousUUID}" class="toggle-checkbox" onchange="toggleMiscellaneousDetails('${miscellaneousUUID}')">
        <span class="toggle-switch"></span>
      </label>
    </div>
  </div>
  <div class="container3">
    <div class="input-group">
      <div class="textarea-container">
        <textarea id="miscellaneousDescription-${miscellaneousUUID}" class="input-textarea" rows="4"></textarea>
      </div>
    </div>
  </div>
</div>
`;

  return miscellaneousSection;
};

function toggleMiscellaneousDetails(miscellaneousUUID) {
  const showDetailsCheckbox = document.getElementById(`showDetails-${miscellaneousUUID}`);
  const miscellaneousDescriptionTextarea = document.getElementById(`miscellaneousDescription-${miscellaneousUUID}`);

  if (showDetailsCheckbox.checked) {
    miscellaneousDescriptionTextarea.style.display = 'block';
  } else {
    miscellaneousDescriptionTextarea.style.display = 'none';
  }
}

function removeMiscellaneous(miscellaneousUUID) {
  const miscellaneousSection = document.getElementById(`miscellaneousSubsection-${miscellaneousUUID}`);
  miscellaneousSection.remove();

  miscellaneousUUIDs = miscellaneousUUIDs.filter(uuid => uuid !== miscellaneousUUID);
};

function removeAllMiscellaneous() {
  const miscellaneousUUIDsCopy = [...miscellaneousUUIDs];
  miscellaneousUUIDsCopy.forEach(uuid => {
    removeMiscellaneous(uuid);
  });
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

function removeAccents(str) {
  return str
    .normalize('NFD') // Normalize the string to decompose accentuated characters
    .replace(/[\u0300-\u036f]/g, ''); // Remove decomposed accentuated characters
}
