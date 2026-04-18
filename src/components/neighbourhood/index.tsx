import { type JSX, useEffect, useState } from "react";

type HouseDonation = {
    carbAmount: number;
    fatAmount: number;
    proteinAmount: number;
    sidesAmount: number;
    sugarAmount: number;
    yoghurtAmount: number;
    visited: boolean;
};
type HouseNumber = number;

function createCarbAmount(): number {
    const PRIMES = [
        11,
        13,
        17,
        19,
        23,
        29,
        31,
    ];
    return PRIMES[Math.floor(Math.random() * PRIMES.length)];
}

function createFatAmount(): number {
    const PRIMES = [
        7,
        11,
        13,
        17,
    ];
    return PRIMES[Math.floor(Math.random() * PRIMES.length)];
}

function createProteinAmount(): number {
    const PRIMES = [
        7,
        11,
        13,
        17,
    ];
    return PRIMES[Math.floor(Math.random() * PRIMES.length)];
}

function createSidesAmount(): number {
    const PRIMES = [
        5,
        7,
        11,
        13,
    ];
    return PRIMES[Math.floor(Math.random() * PRIMES.length)];
}

function createSugarAmount(): number {
    function hasItem(): boolean {
        const rand1 = Math.random();
        const rand2 = Math.random();
        const rand3 = Math.random();
        const rand4 = Math.random();
        return rand1 < rand2 ? rand3 < rand4 : rand3 > rand4;
    }

    const PRIMES = [
        3,
        5,
        7,
        11,
    ];
    return hasItem() ? PRIMES[Math.floor(Math.random() * PRIMES.length)] : 0;
}

function createYoghurtAmount(): number {
    const PRIMES = [
        3,
        5,
        7,
        11,
    ];
    return PRIMES[Math.floor(Math.random() * PRIMES.length)];
}

function returnHasAndAmounts(isSugar: boolean = false): number {
    const rand1 = Math.random();
    const rand2 = Math.random();
    const rand3 = Math.random();
    const rand4 = Math.random();
    const hasItem = rand1 < rand2 ? rand3 < rand4 : rand3 > rand4;
    const PRIMES = [
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
    ];
    const randPrime = PRIMES[Math.floor(Math.random() * PRIMES.length)];
    const dayAmount = Math.floor(Math.random() * randPrime);

    if (isSugar) {
        return hasItem ? dayAmount : 0;
    }

    const anotherChance = Math.random() < 0.5 ? 0 : dayAmount;
    const anotherChance1 = Math.random() < 0.5 ? 0 : dayAmount;

    return hasItem
        ? dayAmount === 0 ? 1 : dayAmount
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
                carbAmount: returnHasAndAmounts(),
                fatAmount: returnHasAndAmounts(),
                proteinAmount: returnHasAndAmounts(),
                sidesAmount: returnHasAndAmounts(),
                sugarAmount: returnHasAndAmounts(true),
                yoghurtAmount: returnHasAndAmounts(),
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
                carbAmount,
                fatAmount,
                proteinAmount,
                sidesAmount,
                sugarAmount,
                yoghurtAmount,
                visited,
            } = houseDonation;

            return visited
                ? (
                    <div key={String(index)} className="house visited">
                        <h3>House {index + 1}</h3>
                        <p>
                            {`Please have some carbohydrates: ${carbAmount}`}
                        </p>
                        <p>
                            {`Please have some fat: ${fatAmount}`}
                        </p>
                        <p>
                            {`Please have some protein: ${proteinAmount}`}
                        </p>
                        <p>
                            {`Please have some sides: ${sidesAmount}`}
                        </p>
                        <p>
                            {`Please have some sugar: ${sugarAmount}`}
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
