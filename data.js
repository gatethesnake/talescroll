  // Predefined texture index mapping for d20
const d20Mapping = [ 1, 19, 13, 7, 18, 4, 3, 9, 10, 6, 20, 12, 11, 5, 14, 8, 15, 17, 2, 16];
//const d20Mapping = [  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const ABILITY_NAMES = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma'
  ];

  const DESCRIPTION_INPUTS = [
    "player",
    "characterName",
    "className",
    "customClass",
    "levelName",
    "race",
    "customRace",
    "religion",
    "customReligion",
    "historique",
    "customHistorique"
  ];

const APPARENCE_INPUTS = [
  'age',
  'taille',
  'poids',
  'yeux',
  'peau',
  'cheveux'
];

const abilitiesSkills = [
  { nom: "Acrobatie", caracteristique: "Dextérité" },
  { nom: "Dressage", caracteristique: "Sagesse" },
  { nom: "Arcane", caracteristique: "Intelligence" },
  { nom: "Athlétisme", caracteristique: "Force" },
  { nom: "Tromperie", caracteristique: "Charisme" },
  { nom: "Histoire", caracteristique: "Intelligence" },
  { nom: "Perspicacité", caracteristique: "Sagesse" },
  { nom: "Intimidation", caracteristique: "Charisme" },
  { nom: "Investigation", caracteristique: "Intelligence" },
  { nom: "Médecine", caracteristique: "Sagesse" },
  { nom: "Nature", caracteristique: "Intelligence" },
  { nom: "Perception", caracteristique: "Sagesse" },
  { nom: "Performance", caracteristique: "Charisme" },
  { nom: "Persuasion", caracteristique: "Charisme" },
  { nom: "Religion", caracteristique: "Intelligence" },
  { nom: "Prestidigitation", caracteristique: "Dextérité" },
  { nom: "Discrétion", caracteristique: "Dextérité" },
  { nom: "Survie", caracteristique: "Sagesse" }
];

const INFORMATION_INPUTS = [
  'otherInitiativeBonus',
  'actualHitPoints',
  'maxHitPoints',
  'tempHitPoints',
  'inspirationValue',
  'speedValue'
];

const DEATHSAVE_INPUTS = [
  "success1", "success2", "success3",
  "failed1", "failed2", "failed3"
];

const classSavingThrows = [
  { className: 'Barbare', proficientSaves: ['Force', 'Constitution'] },
  { className: 'Barde', proficientSaves: ['Dextérité', 'Charisme'] },
  { className: 'Clerc', proficientSaves: ['Sagesse', 'Charisme'] },
  { className: 'Druide', proficientSaves: ['Intelligence', 'Sagesse'] },
  { className: 'Ensorceleur', proficientSaves: ['Constitution', 'Charisme'] },
  { className: 'Guerrier', proficientSaves: ['Force', 'Constitution'] },
  { className: 'Mage', proficientSaves: ['Intelligence', 'Sagesse'] },
  { className: 'Moine', proficientSaves: ['Force', 'Dextérité'] },
  { className: 'Occultiste', proficientSaves: ['Sagesse', 'Charisme'] },
  { className: 'Paladin', proficientSaves: ['Sagesse', 'Charisme'] },
  { className: 'Rôdeur', proficientSaves: ['Force', 'Dextérité'] },
  { className: 'Roublard', proficientSaves: ['Dextérité', 'Intelligence'] },
];

const classesHitDice = [
  { name: 'Barbare', hitDice: 'd12' },
  { name: 'Barde', hitDice: 'd8' },
  { name: 'Clerc', hitDice: 'd8' },
  { name: 'Druide', hitDice: 'd8' },
  { name: 'Ensorceleur', hitDice: 'd6' },
  { name: 'Guerrier', hitDice: 'd10' },
  { name: 'Mage', hitDice: 'd6' },
  { name: 'Moine', hitDice: 'd8' },
  { name: 'Occultiste', hitDice: 'd8' },
  { name: 'Paladin', hitDice: 'd10' },
  { name: 'Rôdeur', hitDice: 'd10' },
  { name: 'Roublard', hitDice: 'd8' },
];


const skillsName = [
  { id: 'acrobatics', name: 'Acrobatie' },
  { id: 'animalHandling', name: 'Dressage' },
  { id: 'arcana', name: 'Arcane' },
  { id: 'athletics', name: 'Athlétisme' },
  { id: 'deception', name: 'Tromperie' },
  { id: 'history', name: 'Histoire' },
  { id: 'insight', name: 'Perspicacité' },
  { id: 'intimidation', name: 'Intimidation' },
  { id: 'investigation', name: 'Investigation' },
  { id: 'medicine', name: 'Médecine' },
  { id: 'nature', name: 'Nature' },
  { id: 'perception', name: 'Perception' },
  { id: 'performance', name: 'Performance' },
  { id: 'persuasion', name: 'Persuasion' },
  { id: 'religion', name: 'Religion' },
  { id: 'sleightOfHand', name: 'Prestidigitation' },
  { id: 'stealth', name: 'Discrétion' },
  { id: 'survival', name: 'Survie' }
];

 
const classesSkills = [
  { id: 'acrobatics', nom: "Acrobaties", maitrise: ["Barde", "Moine", "Roublard"] },
  { id: 'animalHandling', nom: "Dressage", maitrise: ["Barbare", "Druide", "Rôdeur"] },
  { id: 'arcana', nom: "Arcanes", maitrise: ["Barde", "Ensorceleur", "Mage", "Occultiste"] },
  { id: 'athletics', nom: "Athlétisme", maitrise: ["Barbare", "Guerrier", "Moine", "Paladin"] },
  { id: 'deception', nom: "Tromperie", maitrise: ["Barde", "Roublard"] },
  { id: 'history', nom: "Histoire", maitrise: ["Barde", "Ensorceleur", "Mage", "Moine"] },
  { id: 'insight', nom: "Perspicacité", maitrise: ["Barde", "Druide", "Moine", "Occultiste", "Rôdeur"] },
  { id: 'intimidation', nom: "Intimidation", maitrise: ["Barbare", "Guerrier", "Paladin"] },
  { id: 'investigation', nom: "Investigation", maitrise: ["Barde", "Mage", "Occultiste", "Roublard"] },
  { id: 'medicine', nom: "Médecine", maitrise: ["Barde", "Clerc", "Druide"] },
  { id: 'nature', nom: "Nature", maitrise: ["Barde", "Druide", "Occultiste", "Rôdeur"] },
  { id: 'perception', nom: "Perception", maitrise: ["Barbare", "Druide", "Moine", "Occultiste", "Rôdeur"] },
  { id: 'performance', nom: "Performance", maitrise: ["Barde"] },
  { id: 'persuasion', nom: "Persuasion", maitrise: ["Barde", "Guerrier", "Paladin"] },
  { id: 'religion', nom: "Religion", maitrise: ["Clerc", "Moine", "Paladin"] },
  { id: 'sleightOfHand', nom: "Prestidigitation", maitrise: ["Barde", "Ensorceleur", "Mage", "Occultiste", "Rôdeur"] },
  { id: 'stealth', nom: "Discrétion", maitrise: ["Roublard"] },
  { id: 'survival', nom: "Survie", maitrise: ["Barbare", "Druide", "Moine", "Occultiste", "Rôdeur"] }
];





const feats = [
  {
    "nameFeats": "Adepte de métamagie",
    "nameVoFeats": "Metamagic Adept",
    "prerequisiteFeats": "Capacité Incantation ou Magie de pacte",
    "descriptionFeats": "Vous apprenez deux options de métamagie et gagnez 2 points de sorcellerie.",
    "sourceFeats:": "Tasha´s Cauldron of Everything"
  },
  {
    "nameFeats": "Adepte élémentaire",
    "nameVoFeats": "Elemental Adept",
    "prerequisiteFeats": "Capacité de lancer au moins un sort",
    "descriptionFeats": "Vos sorts ignorent la résistance aux dégâts d'un type (acide, froid, feu, foudre ou tonnerre) et aux dégâts les 1 sont des 2.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Adepte martial",
    "nameVoFeats": "Martial Adept",
    "prerequisiteFeats": "",
    "descriptionFeats": "Vous apprenez deux manœuvres du maître de bataille et gagnez un dé de supériorité (d6).",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Adepte occulte",
    "nameVoFeats": "Eldritch Adept",
    "prerequisiteFeats": "Capacité Incantation ou Magie de pacte",
    "descriptionFeats": "Vous apprenez une manifestation occulte.",
    "sourceFeats:": "Tasha´s Cauldron of Everything"
  },
  {
    "nameFeats": "Agilité des courts-sur-pattes",
    "nameVoFeats": "Squat Nimbleness",
    "prerequisiteFeats": "Nain ou race de taille P",
    "descriptionFeats": "+1 en For. ou Dex., votre vitesse augmente de 1,50 m, et maîtrise et avantage pour s'échapper en Acrobaties ou Athlétisme.",
    "sourceFeats:": "Xanathar´s Guide to Everything"
  },
  {
    "nameFeats": "Amateur d'armes à feu",
    "nameVoFeats": "Gunner",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en Dex., maîtrise des armes à feu, ignore la propriété rechargement de ces armes et aucun désavantage à l'attaque au contact.",
    "sourceFeats:": "Tasha´s Cauldron of Everything"
  },
  {
    "nameFeats": "Artificier en herbe",
    "nameVoFeats": "Artificer Initiate",
    "prerequisiteFeats": "",
    "descriptionFeats": "Vous apprenez 1 sort mineur et 1 sort de niv 1 d'artificier (à lancer sans emplacement), maîtrise d'un type d'outils d'artisan.",
    "sourceFeats:": "Tasha´s Cauldron of Everything"
  },
  {
    "nameFeats": "Athlète",
    "nameVoFeats": "Athlete",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en For. ou Dex., vous vous relevez et escaladez rapidement, et pouvez sauter avec seulement 1,50 mètre d'élan.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Attaquant sauvage",
    "nameVoFeats": "Savage Attacker",
    "prerequisiteFeats": "",
    "descriptionFeats": "Vous pouvez relancer les dégâts d'une attaque au corps à corps avec une arme une fois par tour.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Bagarreur de tavernes",
    "nameVoFeats": "Tavern Brawler",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en For. ou Con., maîtrise des armes improvisées, d4 à mains nues et engager une lutte par une action bonus.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Broyeur",
    "nameVoFeats": "Crusher",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en For. ou Con., mouvement extra de 1,50 m en cas d'attaque réussie et attaques avec avantage après un coup critique.",
    "sourceFeats:": "Tasha´s Cauldron of Everything"
  },
  {
    "nameFeats": "Chance abondante",
    "nameVoFeats": "Bountiful Luck",
    "prerequisiteFeats": "Halfelin",
    "descriptionFeats": "Vous pouvez faire relancer à un allié à 9 m ou moins de vous un 1 sur un d20.",
    "sourceFeats:": "Xanathar´s Guide to Everything"
  },
  {
    "nameFeats": "Chanceux",
    "nameVoFeats": "Lucky",
    "prerequisiteFeats": "",
    "descriptionFeats": "Vous pouvez relancer un d20 ou faire relancer un jet d'attaque contre vous (3/repos long).",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Chef cuisinier",
    "nameVoFeats": "Chef",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en Con. ou Sag., maîtrise des ustensiles de cuisinier et cuisine des plats qui redonnent des pv.",
    "sourceFeats:": "Tasha´s Cauldron of Everything"
  },
  {
    "nameFeats": "Combattant à deux armes",
    "nameVoFeats": "Dual Wielder",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 à la CA si vous avez une arme de CàC dans chaque main, combat à deux armes avec des armes non légères, dégainer deux armes.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Combattant monté",
    "nameVoFeats": "Mounted Combatant",
    "prerequisiteFeats": "",
    "descriptionFeats": "Avantage à l'attaque au CàC contre une créature non montée et forcer une attaque à vous cibler au lieu de cibler votre monture.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Comédien",
    "nameVoFeats": "Actor",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en Cha., avantage aux jets de Tromperie et Représentation, imiter le discours d'une personne ou les sons d'une créature.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Constitution infernale",
    "nameVoFeats": "Infernal Constitution",
    "prerequisiteFeats": "Tieffelin",
    "descriptionFeats": "+1 en Con., résistance aux dégâts de froid et de poison, et avantage à vos JdS pour ne pas être empoisonné.",
    "sourceFeats:": "Xanathar´s Guide to Everything"
  },
  {
    "nameFeats": "Cuir de dragon",
    "nameVoFeats": "Dragon Hide",
    "prerequisiteFeats": "Drakéide",
    "descriptionFeats": "+1 en For., Con. ou Cha., votre CA est de 13+Mod.Dex. et vos griffes rétractables infligent 1d4+Mod.For. dégâts tranchants.",
    "sourceFeats:": "Xanathar´s Guide to Everything"
  },
  {
    "nameFeats": "Deuxième chance",
    "nameVoFeats": "Second Chance",
    "prerequisiteFeats": "Halfelin",
    "descriptionFeats": "+1 en Dex., Con. ou Cha. et vous pouvez faire relancer le d20 d'attaque lorsqu'une créature vous touche.",
    "sourceFeats:": "Xanathar´s Guide to Everything"
  },
  {
    "nameFeats": "Discret",
    "nameVoFeats": "Skulker",
    "prerequisiteFeats": "13 ou plus en Dextérité",
    "descriptionFeats": "Attaquer à distance avec une arme ne révèle pas votre position et possiblité de se cacher dans une zone à visibilité réduite.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Doué",
    "nameVoFeats": "Skilled",
    "prerequisiteFeats": "",
    "descriptionFeats": "Vous gagnez la maîtrise de trois compétences ou outils.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Duelliste défensif",
    "nameVoFeats": "Defensive Duelist",
    "prerequisiteFeats": "13 ou plus en Dextérité",
    "descriptionFeats": "Vous pouvez ajouter votre bonus de maîtrise à votre CA si vous tenez une arme de finesse, en réaction à une attaque au CàC.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Effacement",
    "nameVoFeats": "Fade away",
    "prerequisiteFeats": "Gnome",
    "descriptionFeats": "+1 en Dex. ou Int. et vous pouvez utiliser votre réaction pour devenir invisible si vous subissez des dégâts.",
    "sourceFeats:": "Xanathar´s Guide to Everything"
  },
  {
    "nameFeats": "Empaleur",
    "nameVoFeats": "Piercer",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en For. ou Dex., relance un dé de dégâts en cas d'attaque réussie et un dé de dégâts supplémentaire en cas de coup critique.",
    "sourceFeats:": "Tasha´s Cauldron of Everything"
  },
  {
    "nameFeats": "Empoisonneur",
    "nameVoFeats": "Poisoner",
    "prerequisiteFeats": "",
    "descriptionFeats": "Maîtrise du kit d'empoisonneur, application par une action bonus et vos attaques ignorent la résistance aux dégâts de poison.",
    "sourceFeats:": "Tasha´s Cauldron of Everything"
  },
  {
    "nameFeats": "Endurant",
    "nameVoFeats": "Durable",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en Con. et pour chaque Dé de Vie vous regagnez un minimum de pv égal à 2 x votre modificateur de Constitution.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Esprit affûté",
    "nameVoFeats": "Keen Mind",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en Int., vous savez où est le nord, quand va se lever/se coucher le soleil et avez la mémoire des événements du mois passé.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Expert",
    "nameVoFeats": "Skill Expert",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 dans une caractéristique, maîtrise d'une compétence et expertise dans une autre que vous maîtrisez.",
    "sourceFeats:": "Tasha´s Cauldron of Everything"
  },
  {
    "nameFeats": "Expert de la charge",
    "nameVoFeats": "Charger",
    "prerequisiteFeats": "",
    "descriptionFeats": "Vous pouvez lors de l'action Foncer faire une attaque au CàC avec un bonus de +5 si vous avez au moins 3 m d'élan.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Explorateur de donjons",
    "nameVoFeats": "Dungeon Delver",
    "prerequisiteFeats": "",
    "descriptionFeats": "Avantage aux jets de Perception et Investigation, aux JdS contre les pièges, et recherche de pièges à vitesse normale.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Faveur des fées",
    "nameVoFeats": "Fey Touched",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en Int., Sag. ou Cha., et vous apprenez foulée brumeuse et un sort de divination ou d'enchantement de niveau 1.",
    "sourceFeats:": "Tasha´s Cauldron of Everything"
  },
  {
    "nameFeats": "Faveur des ombres",
    "nameVoFeats": "Shadow Touched",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en Int., Sag. ou Cha., et vous apprenez invisibilité et un sort d'illusion ou de nécromancie de niveau 1.",
    "sourceFeats:": "Tasha´s Cauldron of Everything"
  },
  {
    "nameFeats": "Flammes de Phlégéthos",
    "nameVoFeats": "Flames of Phlegethos",
    "prerequisiteFeats": "Tieffelin",
    "descriptionFeats": "+1 en Int. ou Cha., relancer les 1 pour des dégâts de feu, et vous entourer de flammes lorsque vous lancez un sort de feu.",
    "sourceFeats:": "Xanathar´s Guide to Everything"
  },
  {
    "nameFeats": "Fureur orc",
    "nameVoFeats": "Orcish Fury",
    "prerequisiteFeats": "Demi-orc",
    "descriptionFeats": "+1 en For. ou Con., relancer un nouveau dé de dégâts avec une arme, et attaquer après avoir utilisé Endurance implacable.",
    "sourceFeats:": "Xanathar´s Guide to Everything"
  },
  {
    "nameFeats": "Haute magie drow",
    "nameVoFeats": "Drow High Magic",
    "prerequisiteFeats": "Elfe (drow)",
    "descriptionFeats": "Vous pouvez lancer détection de la magie (à volonté), lévitation et dissipation de la magie (1/repos long).",
    "sourceFeats:": "Xanathar´s Guide to Everything"
  },
  {
    "nameFeats": "Initié à la magie",
    "nameVoFeats": "Magic Initiate",
    "prerequisiteFeats": "",
    "descriptionFeats": "Vous apprenez deux sorts mineurs et un sort de niv 1 d'une classe.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Initié au combat",
    "nameVoFeats": "Fighting Initiate",
    "prerequisiteFeats": "Maîtrise d'une arme de guerre",
    "descriptionFeats": "Vous apprenez une option de Style de combat de la classe de guerrier.",
    "sourceFeats:": "Tasha´s Cauldron of Everything"
  },
  {
    "nameFeats": "Linguiste",
    "nameVoFeats": "Linguist",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en Int, vous apprenez trois langues, et vous pouvez coder des messages efficacement.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Lutteur",
    "nameVoFeats": "Grappler",
    "prerequisiteFeats": "13 ou plus en Force",
    "descriptionFeats": "Vous avez un avantage aux jets d'attaque lorsque vous luttez et pouvez tenter d'entraver une créature avec qui vous luttez.",
    "sourceFeats:": "Player´s Handbook (SRD)"
  },
  {
    "nameFeats": "Mage de guerre",
    "nameVoFeats": "War Caster",
    "prerequisiteFeats": "Capacité de lancer au moins un sort",
    "descriptionFeats": "Vous avez un avantage aux JdS pour maintenir la concentration et pouvez lancer certains sorts en réaction au cours d'une AO.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Mage offensif",
    "nameVoFeats": "Spell Sniper",
    "prerequisiteFeats": "Capacité de lancer au moins un sort",
    "descriptionFeats": "Portée des sorts d'attaque doublée, ces sorts ignorent certains abris, et vous apprenez un sort mineur d'attaque.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Magie des elfes des bois",
    "nameVoFeats": "Wood Elf Magic",
    "prerequisiteFeats": "Elfe (bois)",
    "descriptionFeats": "Vous apprenez un sort mineur de druide et pouvez lancer grande foulée et passage sans trace (1/repos long).",
    "sourceFeats:": "Xanathar´s Guide to Everything"
  },
  {
    "nameFeats": "Magie rituelle",
    "nameVoFeats": "Ritual Caster",
    "prerequisiteFeats": "13 ou plus en Intelligence ou Sagesse",
    "descriptionFeats": "Vous possédez un grimoire avec deux sorts rituel de niv 1 d'une classe et pouvez ensuite ajouter d'autres sorts rituel trouvés.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Maître d'armes",
    "nameVoFeats": "Weapon Master",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en For. ou Dex. et vous gagnez la maîtrise de quatre armes.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Maître d'hast",
    "nameVoFeats": "Polearm Master",
    "prerequisiteFeats": "",
    "descriptionFeats": "Vous pouvez réaliser une deuxième attaque avec une arme d'hast, et effectuer une AO si une créature entre dans votre allonge.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Maître des armes à deux mains",
    "nameVoFeats": "Great Weapon Master",
    "prerequisiteFeats": "",
    "descriptionFeats": "Attaque bonus après un critique au corps à corps et possible -5 à l'attaque pour +10 aux dégâts avec une arme lourde.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Maître des armures intermédiaires",
    "nameVoFeats": "Medium Armor Master",
    "prerequisiteFeats": "Maîtrise des armures intermédiaires",
    "descriptionFeats": "Pas de désavantage aux jets de Discrétion en armure intermédiaire et bonus max de Dextérité à +3 au lieu de +2.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Maître des armures lourdes",
    "nameVoFeats": "Heavy Armor Master",
    "prerequisiteFeats": "Maîtrise des armures lourdes",
    "descriptionFeats": "+1 en For. et les dégâts contondants, perforants et tranchants sont réduits de 3 si vous portez une armure lourde.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Maître des boucliers",
    "nameVoFeats": "Shield Master",
    "prerequisiteFeats": "",
    "descriptionFeats": "Attaquer permet aussi de bousculer, bonus du bouclier aux JdS de Dex. contre les sorts, et annule les 1/2 dégâts si JdS réussi.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Maître-arbalétrier",
    "nameVoFeats": "Crossbow Expert",
    "prerequisiteFeats": "",
    "descriptionFeats": "Vous ignorez la propriété chargement des arbalètes et n'avez pas de désavantage pour tirer en étant au contact d'une créature.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Meneur exaltant",
    "nameVoFeats": "Inspiring Leader",
    "prerequisiteFeats": "13 ou plus en Charisme",
    "descriptionFeats": "Jusqu'à 6 créatures autour de vous peuvent gagner un nombre de pv temporaires égal à votre niveau + votre modificateur de Cha.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Mobile",
    "nameVoFeats": "Mobile",
    "prerequisiteFeats": "",
    "descriptionFeats": "Votre vitesse augmente de 3 m, vous pouvez Foncer en terrain difficile sans malus, et vous ne provoquez pas d'AO au CàC.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Observateur",
    "nameVoFeats": "Observant",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en Int. ou Sag., vous pouvez lire sur les lèvres, et bonus de +5 en Perception passive et Investigation passive.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Peur du dragon",
    "nameVoFeats": "Dragon Fear",
    "prerequisiteFeats": "Drakéide",
    "descriptionFeats": "+1 en For., Con. ou Cha. et votre Arme de souffle peut effrayer au lieu d'infliger des dégâts.",
    "sourceFeats:": "Xanathar´s Guide to Everything"
  },
  {
    "nameFeats": "Pourfendeur",
    "nameVoFeats": "Slasher",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en For. ou Dex., réduit la vitesse de 3 m en cas d'attaque réussie et désavantage aux jets d'attaque après un coup critique.",
    "sourceFeats:": "Tasha´s Cauldron of Everything"
  },
  {
    "nameFeats": "Précision elfique",
    "nameVoFeats": "Elven Accuracy",
    "prerequisiteFeats": "Elfe ou demi-elfe",
    "descriptionFeats": "+1 en Dex., Int., Sag. ou Cha., et vous pouvez relancer un dé d'attaque si vous avez un avantage.",
    "sourceFeats:": "Xanathar´s Guide to Everything"
  },
  {
    "nameFeats": "Prodige",
    "nameVoFeats": "Prodigy",
    "prerequisiteFeats": "Demi-elfe, demi-orc ou humain",
    "descriptionFeats": "Vous gagnez la maîtrise d'une compétence, d'un outil et d'une langue, et gagnez l'expertise dans une compétence.",
    "sourceFeats:": "Xanathar´s Guide to Everything"
  },
  {
    "nameFeats": "Protection intermédiaire",
    "nameVoFeats": "Moderately Armored",
    "prerequisiteFeats": "Maîtrise des armures légères",
    "descriptionFeats": "+1 en For. ou Dex. et vous gagnez la maîtrise des armures intermédiaires et des boucliers.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Protection légère",
    "nameVoFeats": "Lightly Armored",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en For. ou Dex. et vous gagnez la maîtrise des armures légères.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Protection lourde",
    "nameVoFeats": "Heavily Armored",
    "prerequisiteFeats": "Maîtrise des armures intermédiaires",
    "descriptionFeats": "+1 en For. et vous gagnez la maîtrise des armures lourdes.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Résilient",
    "nameVoFeats": "Resilient",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 dans une caractéristique et vous gagnez la maîtrise des JdS qui utilisent cette caractéristique.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Robuste",
    "nameVoFeats": "Tough",
    "prerequisiteFeats": "",
    "descriptionFeats": "Vos points de vie max augmentent d'un montant égal au double de votre niveau puis de +2 à chaque niveau.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Sentinelle",
    "nameVoFeats": "Sentinel",
    "prerequisiteFeats": "",
    "descriptionFeats": "Une AO réussi empêche l'ennemi de bouger pour le tour et possibilité de faire une AO même si l'ennemi Se désengage.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Soigneur",
    "nameVoFeats": "Healer",
    "prerequisiteFeats": "",
    "descriptionFeats": "Vous pouvez stabiliser une créature et lui redonner 1 pv, ou la soigner et lui redonner [1d6+4+son nombre de dés de vie] pv.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Télékinésiste",
    "nameVoFeats": "Telekinetic",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en Int., Sag. ou Cha., vous apprenez main de mage et pouvez tenter de pousser mentalement une créature (1,50 m).",
    "sourceFeats:": "Tasha´s Cauldron of Everything"
  },
  {
    "nameFeats": "Télépathe",
    "nameVoFeats": "Telepathic",
    "prerequisiteFeats": "",
    "descriptionFeats": "+1 en Int., Sag. ou Cha., vous pouvez lancer détection des pensées et parler télépathiquement à une créature à 18 m.",
    "sourceFeats:": "Tasha´s Cauldron of Everything"
  },
  {
    "nameFeats": "Téléportation féerique",
    "nameVoFeats": "Fey Teleportation",
    "prerequisiteFeats": "Elfe (haut)",
    "descriptionFeats": "+1 en Int. ou Cha., vous parlez le sylvestre, et vous pouvez lancer le sort foulée brumeuse (1/repos court).",
    "sourceFeats:": "Xanathar´s Guide to Everything"
  },
  {
    "nameFeats": "Tireur d'élite",
    "nameVoFeats": "Sharpshooter",
    "prerequisiteFeats": "",
    "descriptionFeats": "Vos tirs ignorent certains abris, pas de désavantage à longue portée, et possible -5 à l'attaque pour +10 aux dégâts à distance.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Tueur de mages",
    "nameVoFeats": "Mage Slayer",
    "prerequisiteFeats": "",
    "descriptionFeats": "Vous pouvez par une réaction attaquer au CàC une créature qui lance un sort et avantage aux JdS contre les sorts au contact.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Vigilant",
    "nameVoFeats": "Alert",
    "prerequisiteFeats": "",
    "descriptionFeats": "+5 à l'initiative, vous ne pouvez pas être surpris, et les créatures que vous ne voyez pas n'ont pas d'avantage contre vous.",
    "sourceFeats:": "Player´s Handbook"
  },
  {
    "nameFeats": "Vigueur naine",
    "nameVoFeats": "Dwarf Fortitude",
    "prerequisiteFeats": "Nain",
    "descriptionFeats": "+1 en Con. et vous pouvez dépenser un dé de vie pour vous soigner en utilisant l'action Esquiver.",
    "sourceFeats:": "Xanathar´s Guide to Everything"
  }
 ]
 
 const characterStatus = {
  UNCONSCIOUS: {
    name_en: "Unconscious",
    name_fr: "Inconscient",
    description_fr: "Le personnage est incapable d'agir ou de réagir et est considéré comme étant à terre. Il échoue automatiquement tous les tests de compétence et les attaques contre lui à distance bénéficient d'un avantage. Un personnage peut sortir de cet état en regagnant des points de vie ou en étant soigné par un allié.",
    source: "Player's Handbook"
  },
  STUNNED: {
    name_en: "Stunned",
    name_fr: "Étourdi",
    description_fr: "Le personnage est incapable d'agir ou de réagir, perd son avantage sur les jets d'attaque et subit des attaques contre lui avec avantage. Cet état peut être causé par des sorts, des capacités spéciales ou des attaques spéciales.",
    source: "Player's Handbook"
  },
  POISONED: {
    name_en: "Poisoned",
    name_fr: "Empoisonné",
    description_fr: "Le personnage a un désavantage sur tous les tests de compétence et les jets d'attaque. Cet état peut être causé par du poison ou des sorts.",
    source: "Player's Handbook"
  },
  CHARMED: {
    name_en: "Charmed",
    name_fr: "Charmé",
    description_fr: "Le personnage considère le charmeur comme un ami proche et obéira à ses ordres. Cet état peut être causé par des sorts ou des capacités spéciales.",
    source: "Player's Handbook"
  },
  FRIGHTENED: {
    name_en: "Frightened",
    name_fr: "Effrayé",
    description_fr: "Le personnage a un désavantage sur tous les tests de compétence et les jets d'attaque tant que la source de sa peur est visible. Cet état peut être causé par des sorts ou des capacités spéciales.",
    source: "Player's Handbook"
  },
  PARALYZED: {
    name_en: "Paralyzed",
    name_fr: "Paralysé",
    description_fr: "Le personnage est incapable d'agir ou de réagir, perd son avantage sur les jets d'attaque et subit des attaques contre lui avec avantage. Cet état peut être causé par des sorts, des capacités spéciales ou des attaques spéciales.",
    source: "Player's Handbook"
  },
  PETRIFIED: {
    name_en: "Petrified",
    name_fr: "Pétrifié",
    description_fr: "Le personnage est transformé en pierre et est considéré comme étant inconscient et paralysé. Cet état peut être causé par des sorts ou des capacités spéciales.",
    source: "Player's Handbook"
  },
  EXHAUSTED: {
    name_en: "Exhausted",
    name_fr: "Épuisé",
    description_fr: "Le personnage a un désavantage sur tous les tests de compétence et les jets d'attaque, ainsi que sur sa vitesse. Cet état peut être causé par divers facteurs, tels que la privation de sommeil, la maladie ou la magie.",
    source: "Player's Handbook"
    },
    BLINDED: {
    name_en: "Blinded",
    name_fr: "Aveuglé",
    description_fr: "Le personnage a un désavantage sur tous les jets d'attaque et de compétence qui reposent sur la vue. Il ne peut pas voir sa cible, ce qui signifie qu'il ne peut pas cibler une créature avec un sort nécessitant une attaque, ni bénéficier d'un quelconque avantage qu'il pourrait avoir pour attaquer une créature qu'il peut voir. Cet état peut être causé par des sorts, des pièges ou des capacités spéciales de certaines créatures.",
    source: "Player's Handbook"
    },
    INVISIBLE: {
    name_en: "Invisible",
    name_fr: "Invisible",
    description_fr: "Le personnage est invisible sans l'aide de sorts ou de capacités spéciales, ce qui lui donne un avantage sur les jets d'attaque et de compétence basés sur la vue. Cet état peut être causé par des sorts, des capacités spéciales ou des objets magiques.",
    source: "Player's Handbook"
    },
    ENVELOPED_IN_MAGICAL_DARKNESS: {
    name_en: "Enveloped in magical darkness",
    name_fr: "Enveloppé dans une obscurité magique",
    description_fr: "Le personnage se trouve dans une zone d'obscurité magique, ce qui le rend difficile à cibler ou à voir. Il a un désavantage sur les jets d'attaque et de compétence qui reposent sur la vue. Cet état peut être causé par des sorts, des capacités spéciales ou des objets magiques.",
    source: "Player's Handbook"
    },
    DEAFENED: {
    name_en: "Deafened",
    name_fr: "Assourdi",
    description_fr: "Le personnage a un désavantage sur tous les jets de compétence qui reposent sur l'ouïe. Cet état peut être causé par des sorts ou des capacités spéciales.",
    source: "Player's Handbook"
    },
    RESTRAINED: {
    name_en: "Restrained",
    name_fr: "Entravé",
    description_fr: "Le personnage est immobilisé, incapable de se déplacer ou d'agir. Il a un désavantage sur les jets d'attaque et de compétence, et peut être ciblé par des attaques de froid. Cet état peut être causé par des sorts ou des capacités spéciales.",
    source: "Player's Handbook"
    },
    ELECTRIFIED: {
    name_en: "Electrified",
    name_fr: "Électrifié",
    description_fr: "Le personnage est frappé par l'électricité, subissant des dégâts et ayant un désavantage sur les jets d'attaque et de compétence. Cet état peut être causé par des sorts ou des capacités spéciales.",
    source: "Xanathar's Guide to Everything"
    },
    DROWNING: {
    name_en: "Drowning",
    name_fr: "Noyé",
    description_fr: "Le personnage est en train de se noyer, subissant des dégâts et étant incapable de respirer. Il a un désavantage sur les jets d'attaque et de compétence, et peut être considéré comme vulnérable aux attaques de froid. Cet état peut être causé par l'immersion dans l'eau ou d'autres liquides, ainsi que par des sorts ou des capacités spéciales.",
    source: "Xanathar's Guide to Everything"
    },
    GRAPPLED: {
    name_en: "Grappled",
    name_fr: "Agrippé",
    description_fr: "Le personnage est retenu par un ennemi, perdant la capacité de se déplacer librement. Il a un désavantage sur les jets d'attaque et de compétence et peut être considéré comme vulnérable aux attaques de froid. Cet état peut être causé par des sorts ou des capacités spéciales.",
    source: "Player's Handbook"
    },
    INCAPACITATED: {
    name_en: "Incapacitated",
    name_fr: "Incapable d'agir",
    description_fr: "Le personnage est incapable d'agir ou de réagir. Il ne peut pas effectuer d'actions, d'attaques ni de réactions. Cet état peut être causé par des sorts ou des capacités spéciales.",
    source: "Player's Handbook"
    },
    PRONE: {
    name_en: "Prone",
    name_fr: "À terre",
    description_fr: "Le personnage est allongé sur le sol. Il a un désavantage sur les jets d'attaque à distance et un avantage sur les jets d'attaque au corps à corps. Il a également un désavantage sur tous les tests de compétence effectués lorsqu'il est à terre. Se relever nécessite la moitié de son mouvement. Cet état peut être causé par des sorts ou des capacités spéciales.",
    source: "Player's Handbook"
    },
    RESTING: {
    name_en: "Resting",
    name_fr: "En train de se reposer",
    description_fr: "Le personnage est en train de se reposer, ce qui lui permet de récupérer des points de vie et de regagner des charges de certaines capacités spéciales. Cet état peut être causé par le repos normal ou par des sorts.",
    source: "Player's Handbook"
    },
    SHOCKED: {
    name_en: "Shocked",
    name_fr: "Choqué",
    description_fr: "Le personnage est choqué, subissant des dégâts et ayant un désavantage sur les jets d'attaque et de compétence. Cet état peut être causé par des sorts ou des capacités spéciales.",
    source: "Xanathar's Guide to Everything"
    },
    SILENCED: {
    name_en: "Silenced",
    name_fr: "Réduit au silence",
    description_fr: "Le personnage ne peut pas parler ni lancer de sorts nécessitant une parole verbale. Cet état peut être causé par des sorts ou des capacités spéciales.",
    source: "Player's Handbook"
    },
    UNABLE_TO_BREATHE: {
    name_en: "Unable to breathe",
    name_fr: "Incapable de respirer",
    description_fr: "Le personnage est incapable de respirer, subissant des dégâts et étant incapable d'effectuer des actions, d'attaques ni de réactions. Cet état peut être causé par des sorts, des capacités spéciales ou l'immersion dans des substances nocives.",
    source: "Xanathar's Guide to Everything"
    },
    UNABLE_TO_SEE: {
    name_en: "Unable to see",
    name_fr: "Incapable de voir",
    description_fr: "Le personnage est incapable de voir, perdant l'accès à tous les avantages que confère la vue, y compris la capacité de cibler les ennemis avec des sorts nécessitant une attaque. Cet état peut être causé par des sorts, des capacités spéciales ou des conditions environnementales.",
    source: "Xanathar's Guide to Everything"
    },
    UNABLE_TO_HEAR: {
    name_en: "Unable to hear",
    name_fr: "Incapable d'entendre",
    description_fr: "Le personnage est incapable d'entendre, perdant l'accès à tous les avantages que confère l'ouïe. Cet état peut être causé par des sorts, des capacités spéciales ou des conditions environnementales.",
    source: "Xanathar's Guide to Everything"
    },
    UNABLE_TO_SMELL: {
    name_en: "Unable to smell",
    name_fr: "Incapable de sentir",
    description_fr: "Le personnage est incapable de sentir, perdant l'accès à tous les avantages que confère l'odorat. Cet état peut être causé par des sorts, des capacités spéciales ou des conditions environnementales.",
    source: "Xanathar's Guide to Everything"
    },
    UNABLE_TO_TASTE: {
    name_en: "Unable to taste",
    name_fr: "Incapable de goûter",
    description_fr: "Le personnage est incapable de goûter, perdant l'accès à tous les avantages que confère le goût. Cet état peut être causé par des sorts, des capacités spéciales ou des conditions environnementales.",
    source: "Xanathar's Guide to Everything"
    },
    UNABLE_TO_TOUCH: {
    name_en: "Unable to touch",
    name_fr: "Incapable de toucher",
    description_fr: "Le personnage est incapable de toucher, perdant l'accès à tous les avantages que confère le toucher. Cet état peut être causé par des sorts, des capacités spéciales ou des conditions environnementales.",
    source: "Xanathar's Guide to Everything"
    },
    BLOODIED: {
    name_en: "Bloodied",
    name_fr: "Blessé",
    description_fr: "Le personnage a subi des dégâts, réduisant ses points de vie à moins de la moitié de sa valeur maximale. Cet état peut être causé par les attaques ennemies ou par d'autres sources de dégâts.",
    source: "Player's Handbook"
    }
    };
    
    
