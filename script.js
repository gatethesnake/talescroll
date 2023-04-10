//------------------------- OUVERTURE -------------------------//
// Prévenir la cache du css
    document.addEventListener("DOMContentLoaded", function() {
      var version = Math.floor(Math.random() * 1000000);
      document.querySelectorAll('link[rel="stylesheet"]').forEach(function(link) {
          link.href += "?v=" + version;
      });
  });

// Ouvre le premier tab

//document.getElementById("dice-generator-tab").click();
document.getElementById("character-sheet-tab").click();

document.getElementById("sheetTabName").click();

// Affiche l'année courante dans le footer
window.onload = function() {
  // get current year
  const currentYear = new Date().getFullYear();

  // update footer content with current year
  const footerContent = document.getElementById('footerContent');
  footerContent.innerHTML = `<p>© ${currentYear}, Gaétan Lanthier. Utiliser à vos risques.</p>`;
}

//----------- ONGLETS -----------//
                     
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function openTabCS(evt, tabName) {
  var i, tabcontentCS, tablinksCS;
  tabcontentCS = document.getElementsByClassName("tabcontentCS");
  for (i = 0; i < tabcontentCS.length; i++) {
    tabcontentCS[i].style.display = "none";
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

document.getElementById('dice-generator-tab').addEventListener('click', setSidebarHeight);

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

function saveCharacter() {
  const characterData = {
    abilities: {},
    description: {},
    apparence: {},
    skills: {},
    information: {},
    deathSaves: {
      success: [],
      failed: []
    }
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

  const jsonCharacterData = JSON.stringify(characterData, null, 2);

  // Save JSON data to a file
  const file = new Blob([jsonCharacterData], { type: "application/json" });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(file);
  downloadLink.download = "character.json";
  downloadLink.click();
}

function openCharacter() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";

  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const characterData = JSON.parse(e.target.result);
        const abilities = characterData["abilities"];
        const description = characterData["description"];
        const apparence = characterData["apparence"];

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

      
        updateDependentElements();
      } catch (error) {
        console.log(error);
        alert("uh-oh, J'ai un mauvais pressentiment");
      }
    };

    reader.readAsText(file);
  });

  input.click();
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

  //reset deathSaves here
  const deathSaveInputIds = [
    "success1", "success2", "success3",
    "failed1", "failed2", "failed3"
  ];

  deathSaveInputIds.forEach(inputId => {
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
  // alert(textboxID);
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

function animateD20(roll) {
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

  const d20FaceRotationsRadians = faceNormals.map((normal) => {
    const quaternion = new THREE.Quaternion().setFromUnitVectors(normal, new THREE.Vector3(0, 1, 0));
    const euler = new THREE.Euler().setFromQuaternion(quaternion);
    return { x: euler.x, y: euler.y };
  });

  const mappedD20FaceRotationsRadians = d20Mapping.map((faceNumber) => {
    return d20FaceRotationsRadians[faceNumber - 1];
  });

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
    animateD20(roll);
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
      alert('Votre état est stabilisé');
    } else if (failedCheckboxes[2].checked) {
      alert('Vous êtes mort');
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

// Update ability modifiers when score dropdowns are changed
for (let i = 0; i < ABILITY_NAMES.length; i++) {
  const score_selector = document.getElementById(`${ABILITY_NAMES[i]}Score`);
  score_selector.addEventListener('change', () => {
    updateAbilityModifier(ABILITY_NAMES[i]);
    adjustAllSkillBonuses();
  });
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
  const savingThrowElems = document.querySelectorAll('#saving-throws .subsection');

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


// get all the .roundButton elements within the #saving-throws element
const saveButtons = document.querySelectorAll('#saving-throws .roundButton');


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

const abilityScoreElements = document.querySelectorAll('.input-text');
abilityScoreElements.forEach((element) => {
  element.addEventListener('change', () => {
    adjustSavingThrows();
    adjustAllSkillBonuses();
  });
});


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







//----------- DONS -----------//

// Sélectionner l'élément HTML où afficher le menu déroulant
const select = document.querySelector('#feats-select');

// Ajouter chaque don au menu déroulant
for (let i = 0; i < feats.length; i++) {
  const option = document.createElement('option');
  option.value = feats[i].nameFeats;
  option.text = feats[i].nameFeats;
  select.appendChild(option);
}

//----------- Status -----------//

function generateStatusCheckboxes() {
  const statusContainer = document.createElement("div");
  statusContainer.id = "status";
  statusContainer.className = "section";
  
  const header = document.createElement("h2");
  header.textContent = "États";
  statusContainer.appendChild(header);
  
  const statusList = document.createElement("ul");
  statusList.style.columns = "3";
  statusList.style.listStyleType = "none";
  statusList.style.margin = "0";
  statusList.style.padding = "0";
  
  for (const [statusKey, statusValue] of Object.entries(characterStatus)) {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = statusKey;
    checkbox.name = "status";
    const label = document.createElement("label");
    label.htmlFor = statusKey;
    label.title = statusValue.description_fr;
    label.textContent = statusValue.name_fr;
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    statusList.appendChild(listItem);
  }
  
  statusContainer.appendChild(statusList);
  
  return statusContainer;
}

document.addEventListener("DOMContentLoaded", () => {
  const statusContainer = generateStatusCheckboxes();
  const targetElement = document.getElementById("status");
  targetElement.parentNode.insertBefore(statusContainer, targetElement.nextSibling);
});

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

