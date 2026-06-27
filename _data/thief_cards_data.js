window.THIEF_CARD_TYPES = [
    "SHADOW",
    "ROGUE",
    "TRICKSTER",
    "GUARDIAN",
    "SMUGGLER",
    "PHANTOM"
];

window.THIEF_PASSIVE_CODES = {
    "SHADOW": "SUSPICION_ON_ROBBERS",
    "ROGUE": "GAIN_GOLD_ON_CONTRACTS",
    "TRICKSTER": "TRADE_GEM_FOR_2_DIFF_EON",
    "GUARDIAN": "TRAP_BUY_ADD_1",
    "SMUGGLER": "KEEP_2_GEMS_START_OF_NIGHT",
    "PHANTOM": "MINUS1_SUSPICION_EON"
};

window.THIEF_CARDS_BY_TYPE = {
    "SHADOW": [
        "T01",
        "T02",
        "T03",
        "T04",
        "T05",
        "T06"
    ],
    "ROGUE": [
        "T07",
        "T08",
        "T09",
        "T10",
        "T11",
        "T12"
    ],
    "TRICKSTER": [
        "T13",
        "T14",
        "T15",
        "T16",
        "T17",
        "T18"
    ],
    "GUARDIAN": [
        "T19",
        "T20",
        "T21",
        "T22",
        "T23",
        "T24"
    ],
    "SMUGGLER": [
        "T25",
        "T26",
        "T27",
        "T28",
        "T29",
        "T30"
    ],
    "PHANTOM": [
        "T31",
        "T32",
        "T33",
        "T34",
        "T35",
        "T36"
    ]
};

window.THIEF_CARD_POOL_DATA = [
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal +1 Gem",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal +2 Gems",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal +3 Gems",
                "endGamePrestige": 3
            }
        ],
        "id": "T01",
        "name": "Silent Infiltrator",
        "thiefType": "SHADOW",
        "instantPrestige": 2,
        "stealAction": "Steal Bonus: Steal +1 Gem.",
        "active": "No Suspicion",
        "passive": "Trigger +1 Suspicion on robbers",
        "cost": {
            "raw": "[Any Any 3 Gold]",
            "any": 2,
            "gold": 3
        },
        "passiveCode": "SUSPICION_ON_ROBBERS"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal +1 Gem",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal +2 Gems",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal +3 Gems",
                "endGamePrestige": 3
            }
        ],
        "id": "T02",
        "name": "Veil Walker",
        "thiefType": "SHADOW",
        "instantPrestige": 2,
        "stealAction": "Steal Bonus: Ignore one Guard, but steal 1 Gem less.",
        "active": "No Suspicion",
        "passive": "Trigger +1 Suspicion on robbers",
        "cost": {
            "raw": "[Any Any 3 Gold]",
            "any": 2,
            "gold": 3
        },
        "passiveCode": "SUSPICION_ON_ROBBERS"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal +1 Gem",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal +2 Gems",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal +3 Gems",
                "endGamePrestige": 3
            }
        ],
        "id": "T03",
        "name": "Night Whisper",
        "thiefType": "SHADOW",
        "instantPrestige": 2,
        "stealAction": "Steal Bonus: If the target has no Guard, steal +2 Gems.",
        "active": "No Suspicion",
        "passive": "Trigger +1 Suspicion on robbers",
        "cost": {
            "raw": "[Any Any Any 3 Gold]",
            "any": 3,
            "gold": 3
        },
        "passiveCode": "SUSPICION_ON_ROBBERS"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal +1 Gem",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal +2 Gems",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal +3 Gems",
                "endGamePrestige": 3
            }
        ],
        "id": "T04",
        "name": "Hidden Blade",
        "thiefType": "SHADOW",
        "instantPrestige": 3,
        "stealAction": "Steal Bonus: If you steal 2+ Gems, steal +1 Gem.",
        "active": "No Suspicion",
        "passive": "Trigger +1 Suspicion on robbers",
        "cost": {
            "raw": "[Any Any Any 3 Gold]",
            "any": 3,
            "gold": 3
        },
        "passiveCode": "SUSPICION_ON_ROBBERS"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal +1 Gem",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal +2 Gems",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal +3 Gems",
                "endGamePrestige": 3
            }
        ],
        "id": "T05",
        "name": "Mist Lurker",
        "thiefType": "SHADOW",
        "instantPrestige": 3,
        "stealAction": "Steal Bonus: If you would steal only 1 Gem, steal 3 Gems instead.",
        "active": "No Suspicion",
        "passive": "Trigger +1 Suspicion on robbers",
        "cost": {
            "raw": "[Any Any Any 3 Gold]",
            "any": 3,
            "gold": 3
        },
        "passiveCode": "SUSPICION_ON_ROBBERS"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal +1 Gem",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal +2 Gems",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal +3 Gems",
                "endGamePrestige": 3
            }
        ],
        "id": "T06",
        "name": "Shadow Master",
        "thiefType": "SHADOW",
        "instantPrestige": 4,
        "stealAction": "Steal Bonus: Ignore one Guard and steal +1 Gem.",
        "active": "No Suspicion",
        "passive": "Trigger +1 Suspicion on robbers",
        "cost": {
            "raw": "[Any Any Any 4 Gold]",
            "any": 3,
            "gold": 4
        },
        "passiveCode": "SUSPICION_ON_ROBBERS"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal 1 Gold",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal 2 Golds",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal 3 Golds",
                "endGamePrestige": 3
            }
        ],
        "id": "T07",
        "name": "Tunnel Raider",
        "thiefType": "ROGUE",
        "instantPrestige": 2,
        "stealAction": "Steal Bonus: Also steal 1 Gold.",
        "active": "No Suspicion",
        "passive": "Trigger Gain 1 Gold on any contracts",
        "cost": {
            "raw": "[Any Any Any 2 Gold]",
            "any": 3,
            "gold": 2
        },
        "passiveCode": "GAIN_GOLD_ON_CONTRACTS"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal 1 Gold",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal 2 Golds",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal 3 Golds",
                "endGamePrestige": 3
            }
        ],
        "id": "T08",
        "name": "Brutal Looter",
        "thiefType": "ROGUE",
        "instantPrestige": 3,
        "stealAction": "Steal Bonus: Also steal 1 Gold and 1 Prestige.",
        "active": "No Suspicion",
        "passive": "Trigger Gain 1 Gold on any contracts",
        "cost": {
            "raw": "[Any Any Any 3 Gold]",
            "any": 3,
            "gold": 3
        },
        "passiveCode": "GAIN_GOLD_ON_CONTRACTS"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal 1 Gold",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal 2 Golds",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal 3 Golds",
                "endGamePrestige": 3
            }
        ],
        "id": "T09",
        "name": "Aggressive Scout",
        "thiefType": "ROGUE",
        "instantPrestige": 3,
        "stealAction": "Steal Bonus: If the target has a Guard, ignore it and steal 1 Gold.",
        "active": "No Suspicion",
        "passive": "Trigger Gain 1 Gold on any contracts",
        "cost": {
            "raw": "[Any Any Any 3 Gold]",
            "any": 3,
            "gold": 3
        },
        "passiveCode": "GAIN_GOLD_ON_CONTRACTS"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal 1 Gold",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal 2 Golds",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal 3 Golds",
                "endGamePrestige": 3
            }
        ],
        "id": "T10",
        "name": "Relentless Thief",
        "thiefType": "ROGUE",
        "instantPrestige": 3,
        "stealAction": "Steal Bonus: If this is a linked steal action, also steal 2 Gold.",
        "active": "No Suspicion",
        "passive": "Trigger Gain 1 Gold on any contracts",
        "cost": {
            "raw": "[Any Any Any Any 2 Gold]",
            "any": 4,
            "gold": 2
        },
        "passiveCode": "GAIN_GOLD_ON_CONTRACTS"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal 1 Gold",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal 2 Golds",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal 3 Golds",
                "endGamePrestige": 3
            }
        ],
        "id": "T11",
        "name": "Gold Crusher",
        "thiefType": "ROGUE",
        "instantPrestige": 4,
        "stealAction": "Steal Bonus: Also steal Gold equal to the number of Gems stolen.",
        "active": "No Suspicion",
        "passive": "Trigger Gain 1 Gold on any contracts",
        "cost": {
            "raw": "[Any Any Any 4 Gold]",
            "any": 3,
            "gold": 4
        },
        "passiveCode": "GAIN_GOLD_ON_CONTRACTS"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal 1 Gold",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal 2 Golds",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal 3 Golds",
                "endGamePrestige": 3
            }
        ],
        "id": "T12",
        "name": "Rogue Champion",
        "thiefType": "ROGUE",
        "instantPrestige": 4,
        "stealAction": "Steal Bonus: Also steal 2 Gold and 2 Prestige.",
        "active": "No Suspicion",
        "passive": "Trigger Gain 1 Gold on any contracts",
        "cost": {
            "raw": "[Any Any Any Any 4 Gold]",
            "any": 4,
            "gold": 4
        },
        "passiveCode": "GAIN_GOLD_ON_CONTRACTS"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Gain -1 Suspicion",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Gain -2 Suspicion",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Gain -3 Suspicion",
                "endGamePrestige": 3
            }
        ],
        "id": "T13",
        "name": "Switchblade",
        "thiefType": "TRICKSTER",
        "instantPrestige": 2,
        "stealAction": "Sabotage Bonus: Move one of your miners in the sabotaged section to any empty spot in that section.",
        "active": "No Suspicion",
        "passive": "Trade 1 Gem for 2 different End of Night",
        "cost": {
            "raw": "[Any Any Any 2 Gold]",
            "any": 3,
            "gold": 2
        },
        "passiveCode": "TRADE_GEM_FOR_2_DIFF_EON"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Gain -1 Suspicion",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Gain -2 Suspicion",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Gain -3 Suspicion",
                "endGamePrestige": 3
            }
        ],
        "id": "T14",
        "name": "Mind Bender",
        "thiefType": "TRICKSTER",
        "instantPrestige": 3,
        "stealAction": "Sabotage Bonus: Move one target miner in the sabotaged section to another empty spot in that section.",
        "active": "No Suspicion",
        "passive": "Trade 1 Gem for 2 different End of Night",
        "cost": {
            "raw": "[Any Any Any 3 Gold]",
            "any": 3,
            "gold": 3
        },
        "passiveCode": "TRADE_GEM_FOR_2_DIFF_EON"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Gain -1 Suspicion",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Gain -2 Suspicion",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Gain -3 Suspicion",
                "endGamePrestige": 3
            }
        ],
        "id": "T15",
        "name": "Decoy Player",
        "thiefType": "TRICKSTER",
        "instantPrestige": 3,
        "stealAction": "Sabotage Bonus: Place one miner of your color in the sabotaged section. Counts only for presence scoring.",
        "active": "No Suspicion",
        "passive": "Trade 1 Gem for 2 different End of Night",
        "cost": {
            "raw": "[Any Any Any 3 Gold]",
            "any": 3,
            "gold": 3
        },
        "passiveCode": "TRADE_GEM_FOR_2_DIFF_EON"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Gain -1 Suspicion",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Gain -2 Suspicion",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Gain -3 Suspicion",
                "endGamePrestige": 3
            }
        ],
        "id": "T16",
        "name": "Illusionist",
        "thiefType": "TRICKSTER",
        "instantPrestige": 3,
        "stealAction": "Sabotage Bonus: Swap one of your miners in the sabotaged section with one target miner there.",
        "active": "No Suspicion",
        "passive": "Trade 1 Gem for 2 different End of Night",
        "cost": {
            "raw": "[Any Any Any 3 Gold]",
            "any": 3,
            "gold": 3
        },
        "passiveCode": "TRADE_GEM_FOR_2_DIFF_EON"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Gain -1 Suspicion",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Gain -2 Suspicion",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Gain -3 Suspicion",
                "endGamePrestige": 3
            }
        ],
        "id": "T17",
        "name": "Chaos Dealer",
        "thiefType": "TRICKSTER",
        "instantPrestige": 3,
        "stealAction": "Sabotage Bonus: Swap one target miner in the sabotaged section with another player's miner anywhere on the board.",
        "active": "No Suspicion",
        "passive": "Trade 1 Gem for 2 different End of Night",
        "cost": {
            "raw": "[Any Any Any 3 Gold]",
            "any": 3,
            "gold": 3
        },
        "passiveCode": "TRADE_GEM_FOR_2_DIFF_EON"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Gain -1 Suspicion",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Gain -2 Suspicion",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Gain -3 Suspicion",
                "endGamePrestige": 3
            }
        ],
        "id": "T18",
        "name": "Grand Trickster",
        "thiefType": "TRICKSTER",
        "instantPrestige": 4,
        "stealAction": "Sabotage Bonus: Replace the sabotaged miner with your miner.",
        "active": "No Suspicion",
        "passive": "Trade 1 Gem for 2 different End of Night",
        "cost": {
            "raw": "[Any Any Any Any 3 Gold]",
            "any": 4,
            "gold": 3
        },
        "passiveCode": "TRADE_GEM_FOR_2_DIFF_EON"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Keep 2 Gems",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Keep 4 Gems",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Keep 6 Gems",
                "endGamePrestige": 3
            }
        ],
        "id": "T19",
        "name": "Iron Watch",
        "thiefType": "GUARDIAN",
        "instantPrestige": 2,
        "stealAction": "Guard Bonus: Blocks two steal attempts before disabling.",
        "active": "No Suspicion",
        "passive": "Trigger When buy a Trap add 1 more",
        "cost": {
            "raw": "[Any Any Any 2 Gold]",
            "any": 3,
            "gold": 2
        },
        "passiveCode": "TRAP_BUY_ADD_1"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Keep 2 Gems",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Keep 4 Gems",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Keep 6 Gems",
                "endGamePrestige": 3
            }
        ],
        "id": "T20",
        "name": "Trap Setter",
        "thiefType": "GUARDIAN",
        "instantPrestige": 3,
        "stealAction": "Guard Bonus: When this Guard blocks, the attacker gains +1 Suspicion.",
        "active": "No Suspicion",
        "passive": "Trigger When buy a Trap add 1 more",
        "cost": {
            "raw": "[Any Any Any 2 Gold]",
            "any": 3,
            "gold": 2
        },
        "passiveCode": "TRAP_BUY_ADD_1"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Keep 2 Gems",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Keep 4 Gems",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Keep 6 Gems",
                "endGamePrestige": 3
            }
        ],
        "id": "T21",
        "name": "Fort Keeper",
        "thiefType": "GUARDIAN",
        "instantPrestige": 3,
        "stealAction": "Guard Bonus: When this Guard blocks, gain +2 Prestige.",
        "active": "No Suspicion",
        "passive": "Trigger When buy a Trap add 1 more",
        "cost": {
            "raw": "[Any Any Any Any 2 Gold]",
            "any": 4,
            "gold": 2
        },
        "passiveCode": "TRAP_BUY_ADD_1"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Keep 2 Gems",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Keep 4 Gems",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Keep 6 Gems",
                "endGamePrestige": 3
            }
        ],
        "id": "T22",
        "name": "Shield Bearer",
        "thiefType": "GUARDIAN",
        "instantPrestige": 2,
        "stealAction": "Guard Bonus: When this Guard blocks, gain +2 Gold.",
        "active": "No Suspicion",
        "passive": "Trigger When buy a Trap add 1 more",
        "cost": {
            "raw": "[Any Any Any 2 Gold]",
            "any": 3,
            "gold": 2
        },
        "passiveCode": "TRAP_BUY_ADD_1"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Keep 2 Gems",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Keep 4 Gems",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Keep 6 Gems",
                "endGamePrestige": 3
            }
        ],
        "id": "T23",
        "name": "Ambush Guard",
        "thiefType": "GUARDIAN",
        "instantPrestige": 3,
        "stealAction": "Guard Bonus: When this Guard blocks, steal 1 Gold from the attacker.",
        "active": "No Suspicion",
        "passive": "Trigger When buy a Trap add 1 more",
        "cost": {
            "raw": "[Any Any Any Any 2 Gold]",
            "any": 4,
            "gold": 2
        },
        "passiveCode": "TRAP_BUY_ADD_1"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Keep 2 Gems",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Keep 4 Gems",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Keep 6 Gems",
                "endGamePrestige": 3
            }
        ],
        "id": "T24",
        "name": "Guardian Captain",
        "thiefType": "GUARDIAN",
        "instantPrestige": 4,
        "stealAction": "Guard Bonus: This Guard stays active for the whole Night.",
        "active": "No Suspicion",
        "passive": "Trigger When buy a Trap add 1 more",
        "cost": {
            "raw": "[Any Any Any Any 4 Gold]",
            "any": 4,
            "gold": 4
        },
        "passiveCode": "TRAP_BUY_ADD_1"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Gain 1 Gem",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Gain 2 Gems/1 Gold",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Gain 3 Gems/2 Golds",
                "endGamePrestige": 3
            }
        ],
        "id": "T25",
        "name": "Black Market Dealer",
        "thiefType": "SMUGGLER",
        "instantPrestige": 2,
        "stealAction": "Steal Bonus: Convert 1 stolen Gem into 3 Gold.",
        "active": "No Suspicion",
        "passive": "Keep 2 Gems Start of Night",
        "cost": {
            "raw": "[Any Any 2 Gold]",
            "any": 2,
            "gold": 2
        },
        "passiveCode": "KEEP_2_GEMS_START_OF_NIGHT"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Gain 1 Gem",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Gain 2 Gems/1 Gold",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Gain 3 Gems/2 Golds",
                "endGamePrestige": 3
            }
        ],
        "id": "T26",
        "name": "Tunnel Trader",
        "thiefType": "SMUGGLER",
        "instantPrestige": 3,
        "stealAction": "Steal Bonus: Gain 1 Gold for each Gem stolen.",
        "active": "No Suspicion",
        "passive": "Keep 2 Gems Start of Night",
        "cost": {
            "raw": "[Any Any 4 Gold]",
            "any": 2,
            "gold": 4
        },
        "passiveCode": "KEEP_2_GEMS_START_OF_NIGHT"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Gain 1 Gem",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Gain 2 Gems/1 Gold",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Gain 3 Gems/2 Golds",
                "endGamePrestige": 3
            }
        ],
        "id": "T27",
        "name": "Hidden Merchant",
        "thiefType": "SMUGGLER",
        "instantPrestige": 2,
        "stealAction": "Steal Bonus: Convert 1 stolen Gem into 2 Prestige.",
        "active": "No Suspicion",
        "passive": "Keep 2 Gems Start of Night",
        "cost": {
            "raw": "[Any Any 2 Gold]",
            "any": 2,
            "gold": 2
        },
        "passiveCode": "KEEP_2_GEMS_START_OF_NIGHT"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Gain 1 Gem",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Gain 2 Gems/1 Gold",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Gain 3 Gems/2 Golds",
                "endGamePrestige": 3
            }
        ],
        "id": "T28",
        "name": "Gold Runner",
        "thiefType": "SMUGGLER",
        "instantPrestige": 3,
        "stealAction": "Steal Bonus: Convert up to 2 stolen Gems into 3 Gold each.",
        "active": "No Suspicion",
        "passive": "Keep 2 Gems Start of Night",
        "cost": {
            "raw": "[Any Any 4 Gold]",
            "any": 2,
            "gold": 4
        },
        "passiveCode": "KEEP_2_GEMS_START_OF_NIGHT"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Gain 1 Gem",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Gain 2 Gems/1 Gold",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Gain 3 Gems/2 Golds",
                "endGamePrestige": 3
            }
        ],
        "id": "T29",
        "name": "Resource Broker",
        "thiefType": "SMUGGLER",
        "instantPrestige": 3,
        "stealAction": "Steal Bonus: Convert 1 stolen Gem into 1 Gold and 1 Prestige.",
        "active": "No Suspicion",
        "passive": "Keep 2 Gems Start of Night",
        "cost": {
            "raw": "[Any Any 4 Gold]",
            "any": 2,
            "gold": 4
        },
        "passiveCode": "KEEP_2_GEMS_START_OF_NIGHT"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Gain 1 Gem",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Gain 2 Gems/1 Gold",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Gain 3 Gems/2 Golds",
                "endGamePrestige": 3
            }
        ],
        "id": "T30",
        "name": "Smuggler King",
        "thiefType": "SMUGGLER",
        "instantPrestige": 4,
        "stealAction": "Steal Bonus: Convert up to 3 stolen Gems into 2 Gold and 1 Prestige each.",
        "active": "No Suspicion",
        "passive": "Keep 2 Gems Start of Night",
        "cost": {
            "raw": "[Any Any Any 5 Gold]",
            "any": 3,
            "gold": 5
        },
        "passiveCode": "KEEP_2_GEMS_START_OF_NIGHT"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal 1 Prestige",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal 2 Prestige",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal 3 Prestige",
                "endGamePrestige": 3
            }
        ],
        "id": "T31",
        "name": "Ghost Hand",
        "thiefType": "PHANTOM",
        "instantPrestige": 3,
        "stealAction": "Sabotage Bonus: Steal 1 Prestige from the target.",
        "active": "No Suspicion",
        "passive": "-1 Suspicion if above Safe End of Night",
        "cost": {
            "raw": "[Any 5 Gold]",
            "any": 1,
            "gold": 5
        },
        "passiveCode": "MINUS1_SUSPICION_EON"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal 1 Prestige",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal 2 Prestige",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal 3 Prestige",
                "endGamePrestige": 3
            }
        ],
        "id": "T32",
        "name": "Phase Walker",
        "thiefType": "PHANTOM",
        "instantPrestige": 3,
        "stealAction": "Sabotage Bonus: The target gains +1 Suspicion.",
        "active": "No Suspicion",
        "passive": "-1 Suspicion if above Safe End of Night",
        "cost": {
            "raw": "[Any 5 Gold]",
            "any": 1,
            "gold": 5
        },
        "passiveCode": "MINUS1_SUSPICION_EON"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal 1 Prestige",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal 2 Prestige",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal 3 Prestige",
                "endGamePrestige": 3
            }
        ],
        "id": "T33",
        "name": "Void Thief",
        "thiefType": "PHANTOM",
        "instantPrestige": 3,
        "stealAction": "Sabotage Bonus: The target loses 2 Prestige.",
        "active": "No Suspicion",
        "passive": "-1 Suspicion if above Safe End of Night",
        "cost": {
            "raw": "[Any 5 Gold]",
            "any": 1,
            "gold": 5
        },
        "passiveCode": "MINUS1_SUSPICION_EON"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal 1 Prestige",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal 2 Prestige",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal 3 Prestige",
                "endGamePrestige": 3
            }
        ],
        "id": "T34",
        "name": "Chaos Phantom",
        "thiefType": "PHANTOM",
        "instantPrestige": 3,
        "stealAction": "Sabotage Bonus: Remove one additional target miner from the sabotaged section.",
        "active": "No Suspicion",
        "passive": "-1 Suspicion if above Safe End of Night",
        "cost": {
            "raw": "[Any 5 Gold]",
            "any": 1,
            "gold": 5
        },
        "passiveCode": "MINUS1_SUSPICION_EON"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal 1 Prestige",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal 2 Prestige",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal 3 Prestige",
                "endGamePrestige": 3
            }
        ],
        "id": "T35",
        "name": "Ethereal Agent",
        "thiefType": "PHANTOM",
        "instantPrestige": 4,
        "stealAction": "Sabotage Bonus: Add one miner of your color to any section. Counts only for presence scoring.",
        "active": "No Suspicion",
        "passive": "-1 Suspicion if above Safe End of Night",
        "cost": {
            "raw": "[Any Any 5 Gold]",
            "any": 2,
            "gold": 5
        },
        "passiveCode": "MINUS1_SUSPICION_EON"
    },
    {
        "type": "thief",
        "legacy": [
            {
                "cards": "2-3",
                "ability": "Steal 1 Prestige",
                "endGamePrestige": 1
            },
            {
                "cards": "4-5",
                "ability": "Steal 2 Prestige",
                "endGamePrestige": 2
            },
            {
                "cards": "6",
                "ability": "Steal 3 Prestige",
                "endGamePrestige": 3
            }
        ],
        "id": "T36",
        "name": "Phantom Lord",
        "thiefType": "PHANTOM",
        "instantPrestige": 5,
        "stealAction": "Sabotage Bonus: The target loses 2 Prestige and gains +1 Suspicion.",
        "active": "No Suspicion",
        "passive": "-1 Suspicion if above Safe End of Night",
        "cost": {
            "raw": "[Any Any 6 Gold]",
            "any": 2,
            "gold": 6
        },
        "passiveCode": "MINUS1_SUSPICION_EON"
    }
];
