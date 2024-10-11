"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface Odds {
  value: string;
  odd: string;
  minimum_ev_odd: string;
  best_bookmaker: string;
  user_best_bookmaker: string;
}

interface Market {
  name: string;
  values: Odds[];
}

interface FixtureData {
  fixture_id: string;
  league: string;
  team_home: string;
  team_away: string;
  fixture_url: string;
  odds?: Market[];
}

interface UserBookmaker {
  name: string;
  signedUp: boolean;
}

const fetchFixture = async (
  fixtureId: string
): Promise<FixtureData | undefined> => {
  const response = await fetch(`/json/fixtures.json`);
  const data: FixtureData[] = await response.json();
  return data.find((fixture: FixtureData) => fixture.fixture_id === fixtureId);
};

const fetchOdds = async (fixtureId: string): Promise<Market[] | undefined> => {
  const response = await fetch(`/json/odds.json`);
  const data = await response.json();

  if (data.fixture.fixture_id === fixtureId) {
    return data.odds;
  }

  return undefined;
};

const fetchUserBookmakers = async (): Promise<UserBookmaker[]> => {
  return [
    { name: "SkyBet", signedUp: true },
    { name: "Bet365", signedUp: false },
    { name: "Betfair", signedUp: false },
  ];
};

// Fixture Detail Page Component
const FixtureDetailPage = () => {
  const params = useParams(); // Get dynamic route params
  const fixtureId = params.id; // Extract the id parameter

  const [fixtureData, setFixtureData] = useState<FixtureData | null>(null);
  const [odds, setOdds] = useState<Market[] | null>(null);
  const [userBookmakers, setUserBookmakers] = useState<UserBookmaker[]>([]);
  const [collapsedMarkets, setCollapsedMarkets] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (!fixtureId) return;

    // Fetch fixture and odds data
    fetchFixture(fixtureId).then(setFixtureData);
    fetchOdds(fixtureId).then(setOdds);
    fetchUserBookmakers().then(setUserBookmakers);
  }, [fixtureId]);

  const calculateEV = (
    odd: string | number,
    minimumEvOdd: string | number
  ): boolean => {
    let oddValue: number;
    let minEvOddValue: number;

    const oddString = String(odd);
    const minEvOddString = String(minimumEvOdd);

    // Convert fractional odds to decimal
    if (oddString.includes("/")) {
      const [numerator, denominator] = oddString.split("/").map(Number);
      oddValue = numerator / denominator + 1; // Convert to decimal
    } else {
      oddValue = parseFloat(oddString); // If decimal odds, parse directly
    }

    // Same conversion for minimum EV odd
    if (minEvOddString.includes("/")) {
      const [numerator, denominator] = minEvOddString.split("/").map(Number);
      minEvOddValue = numerator / denominator + 1;
    } else {
      minEvOddValue = parseFloat(minEvOddString);
    }

    // Compare odds to minimum EV odd to determine if it's a positive EV bet
    return oddValue >= minEvOddValue;
  };

  // Toggle the collapse/expand of markets
  const toggleMarketCollapse = (marketName: string) => {
    setCollapsedMarkets((prev) => ({
      ...prev,
      [marketName]: !prev[marketName],
    }));
  };

  if (!fixtureData || !odds) return <div>Loading...</div>;

  return (
    <div className="text-gray-600 p-10">
      <div className="header-wrapper mb-10">
        <h1 className="text-2xl text-center">
          {fixtureData.team_home} vs {fixtureData.team_away}
        </h1>
        <h2 className="text-xl text-center">{fixtureData.league}</h2>
      </div>

      {odds.map((market) => (
        <table className="w-full mb-8" key={market.name}>
          <thead>
            <tr className="w-full">
              <th
                className="bg-gray-700 rounded-lg m-w-full items-center p-4"
                colSpan={7}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-left text-white">{market.name}</h4>
                  <FontAwesomeIcon
                    icon={
                      collapsedMarkets[market.name]
                        ? faChevronUp
                        : faChevronDown
                    }
                    className="text-white cursor-pointer"
                    onClick={() => toggleMarketCollapse(market.name)}
                  />
                </div>
              </th>
            </tr>
            {!collapsedMarkets[market.name] && (
              <tr>
                <th className="text-left px-4">Bet</th>
                <th className="text-left px-4">Odd</th>
                <th className="text-left px-4">Minimum EV Odd</th>
                <th className="text-left px-4">Positive EV</th>
                <th className="text-left px-4">Your Best Bookmaker</th>
                <th className="text-left px-4">Best Bookmaker</th>
                <th className="text-left px-4">Action</th>
              </tr>
            )}
          </thead>

          {!collapsedMarkets[market.name] && (
            <tbody>
              {market.values.map((bet, index) => {
                const positiveEV = calculateEV(bet.odd, bet.minimum_ev_odd);
                const signedUpBookmaker =
                  userBookmakers.find((b) => b.signedUp)?.name || "None";

                return (
                  <tr key={index} className="px-4">
                    <td className="py-2 px-4">{bet.value}</td>
                    <td className="py-2 px-4">{bet.odd}</td>
                    <td className="py-2 px-4">{bet.minimum_ev_odd}</td>
                    <td className="py-2 px-4">
                      <p
                        className={`text-sm rounded-full px-3 py-1 w-fit ${
                          positiveEV
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {positiveEV ? "Yes" : "No"}
                      </p>
                    </td>
                    <td className="py-2 px-4">{bet.user_best_bookmaker}</td>
                    <td className="py-2 px-4">{bet.best_bookmaker}</td>
                    <td className="py-2 px-4">
                      <a
                        className="rounded-full border border-gray-700 px-4 py-2 hover:bg-gray-700 hover:text-white"
                        type="button"
                        href={fixtureData.fixture_url}
                        target="_blank"
                      >
                        Place Bet
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      ))}
    </div>
  );
};

export default FixtureDetailPage;
