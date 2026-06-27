window.STARTING_DECK_TEMPLATE = [
    {
        "id": "RP01",
        "shift": "Sunrise",
        "gems": "Yellow",
        "hasWild": false,
        "color": "#ffd700",
        "d1": "[<i class=\"gi y\"></i>]",
        "d2": "[<i class=\"gi y\"></i><i class=\"gi y\"></i>]",
        "d3_text": "Bank",
        "isSus": true,
        "rep": [
            "<i class='sq g'></i>:+1💰",
            "<i class='sq o'></i>:-1💰",
            "<i class='sq r'></i>:-2💰"
        ],
        "extra": "<i class='gi any'></i><i class='gi any'></i><i class='gi any'></i>➜<i class='gi any'></i><i class='gi any'></i>"
    },
    {
        "id": "RP06",
        "shift": "Sunrise",
        "gems": "Yellow",
        "hasWild": true,
        "color": "#ffd700",
        "d1": "[<i class=\"gi y\"></i>]",
        "d2": "[<i class=\"gi y\"></i><i class=\"gi any\"></i>]",
        "d3_text": "Bank",
        "linkedOp": true,
        "linkedBonus": {
            "gold": 1
        },
        "linkedDisplay": "+1💰 ⛓ Bank",
        "isSus": true,
        "rep": [
            "<i class='sq g'></i>:+1💰",
            "<i class='sq o'></i>:-1💰",
            "<i class='sq r'></i>:-2💰"
        ],
        "extra": "<i class='gi any'></i><i class='gi any'></i><i class='gi any'></i>&rarr;<i class='gi any'></i><i class='gi any'></i>"
    },
    {
        "id": "RP02",
        "shift": "Morning",
        "gems": "Green",
        "hasWild": false,
        "color": "#2ecc71",
        "d1": "[<i class=\"gi g\"></i>]",
        "d2": "[<i class=\"gi g\"></i><i class=\"gi g\"></i>]",
        "d3_text": "Bandit",
        "isSus": false,
        "rep": [
            "<i class='sq g'></i>:+1<i class='gi any'></i>",
            "<i class='sq o'></i>:-1<i class='gi any'></i>",
            "<i class='sq r'></i>:-2<i class='gi any'></i>"
        ],
        "extra": "-🔍:1💰"
    },
    {
        "id": "RP07",
        "shift": "Morning",
        "gems": "Green",
        "hasWild": true,
        "color": "#2ecc71",
        "d1": "[<i class=\"gi g\"></i>]",
        "d2": "[<i class=\"gi g\"></i><i class=\"gi any\"></i>]",
        "d3_text": "Bandit",
        "linkedOp": true,
        "linkedBonus": {
            "pres": 1
        },
        "linkedDisplay": "+1⭐ ⛓ Bandit",
        "isSus": false,
        "rep": [
            "<i class='sq g'></i>:+1<i class='gi any'></i>",
            "<i class='sq o'></i>:-1<i class='gi any'></i>",
            "<i class='sq r'></i>:-2<i class='gi any'></i>"
        ],
        "extra": "-🔍:1💰"
    },
    {
        "id": "RP03",
        "shift": "Noon",
        "gems": "Red",
        "hasWild": false,
        "color": "#e74c3c",
        "d1": "[<i class=\"gi r\"></i>]",
        "d2": "[<i class=\"gi r\"></i><i class=\"gi r\"></i>]",
        "d3_text": "Market",
        "isSus": false,
        "rep": [
            "<i class='sq g'></i>:-2💰",
            "<i class='sq o'></i>:-1💰",
            "<i class='sq r'></i>:+1💰"
        ],
        "extra": "🎴:3💰"
    },
    {
        "id": "RP08",
        "shift": "Noon",
        "gems": "Red",
        "hasWild": true,
        "color": "#e74c3c",
        "d1": "[<i class=\"gi r\"></i>]",
        "d2": "[<i class=\"gi r\"></i><i class=\"gi any\"></i>]",
        "d3_text": "Market",
        "linkedOp": true,
        "linkedBonus": {
            "gold": -1
        },
        "linkedDisplay": "-1💰 ⛓ Market",
        "isSus": false,
        "rep": [
            "<i class='sq g'></i>:-2💰",
            "<i class='sq o'></i>:-1💰",
            "<i class='sq r'></i>:+1💰"
        ],
        "extra": "🎴:3💰"
    },
    {
        "id": "RP04",
        "shift": "Afternoon",
        "gems": "Blue",
        "hasWild": false,
        "color": "#3498db",
        "d1": "[<i class=\"gi b\"></i>]",
        "d2": "[<i class=\"gi b\"></i><i class=\"gi b\"></i>]",
        "d3_text": "Thief",
        "isSus": false,
        "rep": [
            "<i class='sq g'></i>:+1💰",
            "<i class='sq o'></i>:-1💰",
            "<i class='sq r'></i>:-1💰&-1<i class='gi any'></i>"
        ],
        "extra": "🪤:1💰"
    },
    {
        "id": "RP09",
        "shift": "Afternoon",
        "gems": "Blue",
        "hasWild": true,
        "color": "#3498db",
        "d1": "[<i class=\"gi b\"></i>]",
        "d2": "[<i class=\"gi b\"></i><i class=\"gi any\"></i>]",
        "d3_text": "Thief",
        "linkedOp": true,
        "linkedBonus": {
            "pres": 1
        },
        "linkedDisplay": "+1⭐ ⛓ Thief",
        "isSus": false,
        "rep": [
            "<i class='sq g'></i>:+1💰",
            "<i class='sq o'></i>:-1💰",
            "<i class='sq r'></i>:-1💰&-1<i class='gi any'></i>"
        ],
        "extra": "🪤:1💰"
    },
    {
        "id": "RP05",
        "shift": "Sunset",
        "gems": "Violet",
        "hasWild": false,
        "color": "#9b59b6",
        "d1": "[<i class=\"gi v\"></i>]",
        "d2": "[<i class=\"gi v\"></i><i class=\"gi v\"></i>]",
        "d3_text": "Tavern",
        "isSus": true,
        "rep": [
            "<i class='sq g'></i>:+3/1🎴",
            "<i class='sq o'></i>:+2/1🎴",
            "<i class='sq r'></i>:+1🎴"
        ],
        "extra": "&#9935;&#65039;:3💰/&#11036;&#65039;:1💰"
    },
    {
        "id": "RP10",
        "shift": "Sunset",
        "gems": "Violet",
        "hasWild": true,
        "color": "#9b59b6",
        "d1": "[<i class=\"gi v\"></i>]",
        "d2": "[<i class=\"gi v\"></i><i class=\"gi any\"></i>]",
        "d3_text": "Tavern",
        "linkedOp": true,
        "linkedBonus": {
            "pres": 1
        },
        "linkedDisplay": "+1⭐ ⛓ Tavern",
        "isSus": true,
        "rep": [
            "<i class='sq g'></i>:+3/1🎴",
            "<i class='sq o'></i>:+2/1🎴",
            "<i class='sq r'></i>:+1🎴"
        ],
        "extra": "&#9935;&#65039;:3💰/&#11036;&#65039;:1💰"
    }
];
