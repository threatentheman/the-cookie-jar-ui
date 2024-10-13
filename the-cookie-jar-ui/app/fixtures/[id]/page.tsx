// app/fixtures/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface Bookmaker {
  name: string;
  odd: string;
  positive_ev: boolean;
}

interface OddsValue {
  value: string;
  minimum_ev_odd: string;
  bookmakers: Bookmaker[];
}

interface Market {
  name: string;
  values: OddsValue[];
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
    { name: "Bet365", signedUp: true },
    { name: "Betfair", signedUp: false },
  ];
};

const getBestBookmaker = (bookmakers: Bookmaker[]): Bookmaker => {
  return bookmakers.reduce((best, current) =>
    parseFloat(current.odd) > parseFloat(best.odd) ? current : best
  );
};

const getUserBestBookmaker = (
  bookmakers: Bookmaker[],
  userBookmakers: UserBookmaker[]
): Bookmaker | null => {
  const signedUpBookmakers = bookmakers.filter((b) =>
    userBookmakers.some((ub) => ub.name === b.name && ub.signedUp)
  );
  return signedUpBookmakers.length > 0 ? getBestBookmaker(signedUpBookmakers) : null;
};

// Fixture Detail Page Component
const FixtureDetailPage = () => {
  const params = useParams();
  const fixtureId = params.id;

  const [fixtureData, setFixtureData] = useState<FixtureData | null>(null);
  const [odds, setOdds] = useState<Market[] | null>(null);
  const [userBookmakers, setUserBookmakers] = useState<UserBookmaker[]>([]);
  const [collapsedMarkets, setCollapsedMarkets] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState(""); // New search state

  useEffect(() => {
    if (!fixtureId) return;

    fetchFixture(fixtureId).then(setFixtureData);
    fetchOdds(fixtureId).then(setOdds);
    fetchUserBookmakers().then(setUserBookmakers);
  }, [fixtureId]);

  const toggleMarketCollapse = (marketName: string) => {
    setCollapsedMarkets((prev) => ({
      ...prev,
      [marketName]: !prev[marketName],
    }));
  };

  // Filter markets based on search term
  const filteredMarkets = odds?.filter(
    (market) =>
      market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      market.values.some((bet) =>
        bet.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (!fixtureData || !odds) return <div>Loading...</div>;

  return (
    <div className="p-10">
      <div className="header-wrapper mb-10">
        <h1 className="text-2xl text-center">
          {fixtureData.team_home} vs {fixtureData.team_away}
        </h1>
        <h2 className="text-xl text-center">{fixtureData.league}</h2>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search markets or bets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {filteredMarkets?.map((market) => (
        <table className="w-full mb-8" key={market.name}>
          <thead>
            <tr className="w-full">
              <th
                className={`${
                  collapsedMarkets[market.name]
                    ? "bg-default-300 text-default-800 rounded-md"
                    : "bg-default-600 text-white rounded-tl-md rounded-tr-md"
                } items-center px-4 py-2 hover:bg-default-200 hover:cursor-pointer hover:text-default-800`}
                colSpan={5}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-left font-normal">{market.name}</h4>
                  <FontAwesomeIcon
                    icon={
                      collapsedMarkets[market.name] ? faChevronUp : faChevronDown
                    }
                    className="cursor-pointer"
                    onClick={() => toggleMarketCollapse(market.name)}
                  />
                </div>
              </th>
            </tr>
            {!collapsedMarkets[market.name] && (
              <tr className="">
                <th className="text-left px-4 py-2 font-normal border">Bet</th>
                <th className="text-left px-4 py-2 font-normal border">
                  Minimum EV Odd
                </th>
                <th className="text-left px-4 py-2 font-normal border">
                  Your Best Bookmaker/Odds
                </th>
                <th className="text-left px-4 py-2 font-normal border">
                  Best Bookmaker/Odds
                </th>
                <th className="text-left px-4 py-2 font-normal border">
                  Place bet
                </th>
              </tr>
            )}
          </thead>

          {!collapsedMarkets[market.name] && (
            <tbody>
              {market.values.map((bet, betIndex) => {
                const userBestBookmaker = getUserBestBookmaker(
                  bet.bookmakers,
                  userBookmakers
                );
                const bestBookmaker = getBestBookmaker(bet.bookmakers);

                return (
                  <tr key={betIndex}>
                    <td className="py-2 px-4 border">{bet.value}</td>
                    <td className="py-2 px-4 border">{bet.minimum_ev_odd}</td>
                    <td className="py-2 px-4 border">
                      {userBestBookmaker ? (
                        <span
                          className={`text-sm rounded-full px-3 py-1 w-fit ${
                            userBestBookmaker.positive_ev
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {userBestBookmaker.name} ({userBestBookmaker.odd})
                        </span>
                      ) : (
                        "None"
                      )}
                    </td>
                    <td className="py-2 px-4 border">
                      <span
                        className={`text-sm rounded-full px-3 py-1 w-fit ${
                          bestBookmaker.positive_ev
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {bestBookmaker.name} ({bestBookmaker.odd})
                      </span>
                    </td>
                    <td className="py-2 px-4 border">
                      <a
                        className="rounded-full border border-gray-700 px-4 py-2 hover:bg-gray-700 hover:text-white text-xs"
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
