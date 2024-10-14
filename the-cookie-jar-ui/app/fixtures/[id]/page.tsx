// app/fixtures/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import BettingSlipModal from "@/components/modals/bettingSlipModal";
import { Button } from "@nextui-org/react";

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
  return data.fixture.fixture_id === fixtureId ? data.odds : undefined;
};

// Main Fixture Detail Page Component
const FixtureDetailPage = () => {
  const params = useParams();
  const fixtureId = params.id;

  const [fixtureData, setFixtureData] = useState<FixtureData | null>(null);
  const [odds, setOdds] = useState<Market[] | null>(null);
  const [collapsedMarkets, setCollapsedMarkets] = useState<
    Record<string, boolean>
  >({});
  const [searchTerm, setSearchTerm] = useState(""); // For searching markets
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [userRiskChoice, setUserRiskChoice] = useState<
    "low" | "medium" | "high"
  >("low"); // User risk choice

  useEffect(() => {
    if (!fixtureId) return;

    fetchFixture(fixtureId).then(setFixtureData);
    fetchOdds(fixtureId).then(setOdds);
  }, [fixtureId]);

  const toggleMarketCollapse = (marketName: string) => {
    setCollapsedMarkets((prev) => ({
      ...prev,
      [marketName]: !prev[marketName],
    }));
  };

  const filteredMarkets = odds?.filter(
    (market) =>
      market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      market.values.some((bet) =>
        bet.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (!fixtureData || !odds) return <div>Loading...</div>;

  return (
    <div className="p-10 overflow-scroll">
      <div className="header-wrapper mb-10">
        <h1 className="text-2xl text-center">
          {fixtureData.team_home} vs {fixtureData.team_away}
        </h1>
        <h2 className="text-xl text-center">{fixtureData.league}</h2>
      </div>

      {/* Search Input */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search markets or bets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 px-6 border rounded-full"
        />
      </div>

      {/* Market List */}
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
                      collapsedMarkets[market.name]
                        ? faChevronUp
                        : faChevronDown
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
              {market.values.map((bet, betIndex) => (
                <tr key={betIndex}>
                  <td className="py-2 px-4 border">{bet.value}</td>
                  <td className="py-2 px-4 border">{bet.minimum_ev_odd}</td>
                  <td className="py-2 px-4 border">
                    {bet.bookmakers[0].name} ({bet.bookmakers[0].odd})
                  </td>
                  <td className="py-2 px-4 border">
                    <a
                      className="rounded-full border border-gray-700 px-4 py-2 hover:bg-gray-700 hover:text-white text-xs"
                      href={fixtureData.fixture_url}
                      target="_blank"
                    >
                      Place Bet
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      ))}

      <Button
        className="fixed bottom-4 right-4 rounded-full"
        color="primary"
        onClick={() => setIsModalOpen(true)} // Open modal when clicked
      >
        View Betting Slip
      </Button>
 
        <BettingSlipModal
          fixtureId={fixtureId}
          fixtureName={`${fixtureData.team_home} vs ${fixtureData.team_away}`}
          lowRiskBets={[
            { name: "Bet 1: Home Win", odd: "1.50", unitSize: "2 units" },
            { name: "Bet 2: Over 1.5 Goals", odd: "1.40", unitSize: "3 units" },
          ]}
          mediumRiskBets={[
            {
              name: "Bet 1: Both Teams to Score",
              odd: "2.00",
              unitSize: "1 unit",
            },
          ]}
          highRiskBets={[
            {
              name: "Bet 1: Correct Score 2-1",
              odd: "10.00",
              unitSize: "0.5 units",
            },
          ]}
          userRiskChoice={userRiskChoice} // Pass user's risk choice as default tab
          isOpen={isModalOpen} // Pass modal open state
          onClose={() => setIsModalOpen(false)} // Pass close function
        />
    </div>
  );
};

export default FixtureDetailPage;
