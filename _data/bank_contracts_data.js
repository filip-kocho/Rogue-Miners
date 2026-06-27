(() => {
    const GEMS = ["Yellow", "Green", "Red", "Blue", "Violet"];
    const choose = (items, count, start = 0, prefix = [], result = []) => {
        if (prefix.length === count) {
            result.push([...prefix]);
            return result;
        }
        for (let i = start; i <= items.length - (count - prefix.length); i++) {
            prefix.push(items[i]);
            choose(items, count, i + 1, prefix, result);
            prefix.pop();
        }
        return result;
    };

    const makeContract = (tier, gems, gold, prestige) => ({
        kind: "contract",
        tier,
        gems,
        gold,
        prestige
    });

    const makeTool = (tier, prestige, goldCost, effect, count = 1) =>
        Array.from({ length: count }, () => ({
            kind: "tool",
            tier,
            prestige,
            goldCost,
            effect
        }));

    window.BANK_CONTRACT_POOLS_DATA = {
        bronze: [
            ...GEMS.map(g => makeContract("bronze", [g, g, "Any"], 5, 1)),
            ...GEMS.map(g => makeContract("bronze", [g, g, g], 6, 1)),
            ...choose(GEMS, 3).map(set => makeContract("bronze", set, 4, 1)),
            makeContract("bronze", ["Any", "Any", "Any"], 2, 1),
            ...makeTool("bronze", 1, 5, { target: "Mine", text: "+1 any gem" }, 5),
            ...makeTool("bronze", 1, 5, { target: "Steal", text: "+1 any gem" }, 5),
            ...makeTool("bronze", 1, 5, { target: "Bank", text: "+1 gold" }),
            ...makeTool("bronze", 1, 5, { target: "Bandit", text: "-1 any gem" }),
            ...makeTool("bronze", 1, 5, { target: "Thief", text: "-1 any gem" }),
            ...makeTool("bronze", 1, 5, { target: "Market", text: "-1 gold" }),
            ...makeTool("bronze", 1, 5, { target: "Tavern", text: "Miners 2 gold / Neutrals 0 gold" })
        ],
        silver: [
            ...choose(GEMS, 2).map(([a, b]) => makeContract("silver", [a, a, b, b], 7, 2)),
            ...GEMS.map(g => makeContract("silver", [g, g, g, "Any"], 6, 2)),
            ...GEMS.map(g => makeContract("silver", [g, g, g, g], 8, 2)),
            ...choose(GEMS, 4).map(set => makeContract("silver", set, 5, 2)),
            makeContract("silver", ["Any", "Any", "Any", "Any"], 4, 2),
            ...makeTool("silver", 3, 6, { target: "Mine", text: "+2 any gem" }, 3),
            ...makeTool("silver", 3, 6, { target: "Steal", text: "+2 any gem" }, 3),
            ...makeTool("silver", 3, 6, { target: "Bank", text: "+2 gold" }),
            ...makeTool("silver", 3, 6, { target: "Bandit", text: "-2 any gem" }),
            ...makeTool("silver", 3, 6, { target: "Thief", text: "-1 any gem -1 gold" }),
            ...makeTool("silver", 3, 6, { target: "Market", text: "-2 gold" }),
            ...makeTool("silver", 3, 6, { target: "Tavern", text: "Miners 1 gold / Neutrals 0 gold / draw 2 pick 1" })
        ],
        gold: [
            ...GEMS.map(g => makeContract("gold", [g, g, g, g, g], 10, 3)),
            ...GEMS.flatMap(a => GEMS.filter(b => b !== a).map(b => makeContract("gold", [a, a, a, b, b], 9, 3))),
            ...GEMS.map(g => makeContract("gold", [g, g, "Any", "Any", "Any"], 7, 3)),
            makeContract("gold", [...GEMS], 6, 3),
            ...makeTool("gold", 5, 7, { target: "Bank", text: "+3 gold shuffle" }),
            ...makeTool("gold", 5, 7, { target: "Bandit | Thief", text: "-3 any gem | -3 gold" }),
            ...makeTool("gold", 5, 7, { target: "Market", text: "-3 gold shuffle" }),
            ...makeTool("gold", 5, 7, { target: "Tavern", text: "Miners 0 gold / Neutrals 0 gold / draw 3 pick 1" }),
            ...makeTool("gold", 5, 7, { target: "Mine | Steal", text: "+3 any gem" })
        ]
    };
})();
