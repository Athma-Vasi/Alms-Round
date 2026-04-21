import { type JSX, useEffect, useState } from "react";

type FoodKind = "carbs" | "fats" | "proteins" | "sides" | "yoghurt";
type HouseDonation =
    & {
        [K in FoodKind as `${K}Amount`]: number;
    }
    & {
        visited: boolean;
    };

type HouseNumber = number;

const foodKind_primes_map: Record<FoodKind, number[]> = {
    "carbs": [23, 29, 31, 37, 43, 47, 53, 59, 61, 67, 71, 73],
    "fats": [7, 11, 13, 17, 19, 23],
    "proteins": [11, 13, 17, 19, 23],
    "sides": [13, 17, 19, 23, 29, 31, 37, 43],
    "yoghurt": [37, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97],
};

function hasDonation() {
    const rand1 = Math.random();
    const rand2 = Math.random();
    const rand3 = Math.random();
    const rand4 = Math.random();
    return rand1 < rand2 ? rand3 < rand4 : rand3 > rand4;
}

function receiveDonation(foodKind: FoodKind): number {
    const PRIMES = foodKind_primes_map[foodKind];
    const amount = PRIMES[Math.floor(Math.random() * PRIMES.length)];
    const anotherChance = Math.random() < 0.5 ? 0 : amount;
    const anotherChance1 = Math.random() < 0.5 ? 0 : amount;

    return hasDonation()
        ? amount
        : anotherChance === 0
        ? anotherChance1
        : anotherChance;
}

function setNeighbourhoodDonationsCB(
    housesLimit: number,
): Map<HouseNumber, HouseDonation> {
    const rand = Math.floor(Math.random() * 10);
    const length = rand < housesLimit ? housesLimit : rand;

    return Array.from({ length })
        .reduce<Map<HouseNumber, HouseDonation>>((acc, _curr, index) => {
            const state: HouseDonation = {
                carbsAmount: receiveDonation("carbs"),
                fatsAmount: receiveDonation("fats"),
                proteinsAmount: receiveDonation("proteins"),
                sidesAmount: receiveDonation("sides"),
                yoghurtAmount: receiveDonation("yoghurt"),
                visited: false,
            };
            acc.set(index, state);

            return acc;
        }, new Map());
}

function Neighbourhood(): JSX.Element {
    const HOUSES_LIMIT = 4;
    const [neighbourhoodDonations, setNeighbourhoodDonations] = useState(() =>
        setNeighbourhoodDonationsCB(HOUSES_LIMIT)
    );
    const [housesRevealed, setHousesRevealed] = useState(1);

    useEffect(() => {
        setNeighbourhoodDonations(setNeighbourhoodDonationsCB(HOUSES_LIMIT));
    }, []);

    function handleKnock(houseNumber: HouseNumber): void {
        setNeighbourhoodDonations((prev) => {
            const neighbourhoodDonations = new Map(prev);
            const houseDonation = neighbourhoodDonations.get(houseNumber);
            if (houseDonation) {
                neighbourhoodDonations.set(houseNumber, {
                    ...houseDonation,
                    visited: true,
                });
            }
            return neighbourhoodDonations;
        });

        setHousesRevealed((prev) => prev + 1);
    }

    const houses = Array.from(neighbourhoodDonations.values()).map(
        (houseDonation, index) => {
            const {
                carbsAmount,
                fatsAmount,
                proteinsAmount,
                sidesAmount,
                yoghurtAmount,
                visited,
            } = houseDonation;

            return visited
                ? (
                    <div key={String(index)} className="house visited">
                        <h3>House {index + 1}</h3>
                        <p>
                            {`Please have some carbs: ${carbsAmount}`}
                        </p>
                        <p>
                            {`Please have some fat: ${fatsAmount}`}
                        </p>
                        <p>
                            {`Please have some protein: ${proteinsAmount}`}
                        </p>
                        <p>
                            {`Please have some sides: ${sidesAmount}`}
                        </p>
                        <p>
                            {`Please have some yoghurt: ${yoghurtAmount}`}
                        </p>
                    </div>
                )
                : (
                    <div key={String(index)} className="house">
                        <h3>House {index + 1}</h3>
                        <button
                            onClick={() => handleKnock(index)}
                        >
                            Knock
                        </button>
                    </div>
                );
        },
    );

    return (
        <div className="neighbourhood">
            <div className="houses">{houses.slice(0, housesRevealed)}</div>
        </div>
    );
}

export default Neighbourhood;

/**
 * function returnHasAndAmounts(): number {
    const rand1 = Math.random();
    const rand2 = Math.random();
    const rand3 = Math.random();
    const rand4 = Math.random();
    const hasItem = rand1 < rand2 ? rand3 < rand4 : rand3 > rand4;
    const PRIMES = [
        2,
        3,
        5,
        7,
        11,
        13,
        17,
        19,
        23,
        29,
        31,
        37,
        43,
        47,
        53,
        59,
        61,
        67,
        71,
        73,
        79,
        83,
        89,
        97,
    ];
    const amount = PRIMES[Math.floor(Math.random() * PRIMES.length)];
    const anotherChance = Math.random() < 0.5 ? 0 : amount;
    const anotherChance1 = Math.random() < 0.5 ? 0 : amount;

    return hasItem
        ? amount
        : anotherChance === 0
        ? anotherChance1
        : anotherChance;
}
 */
