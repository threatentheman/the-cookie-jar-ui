"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import BettingSlipModal from "@/components/modals/bettingSlipModal";
import { Button, Badge } from "@nextui-org/react";
import Script from "next/script";

interface Bookmaker {
  name: string;
  odd: string;
  positive_ev: boolean;
  url: string; // Add URL field for bookmaker link
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

  // **Add user's subscribed bookmakers**
  const userBookmakers = ["Bookmaker A", "Bookmaker B"]; // Replace with actual user data

  useEffect(() => {
    if (!fixtureId) return;

    fetchFixture(fixtureId).then(setFixtureData);
    fetchOdds(fixtureId).then(setOdds);
  }, [fixtureId]);

  useEffect(() => {
    if (window.initializeWidget) {
      window.initializeWidget();
    }
  }, []);

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
    <div className="p-8 text-default-700">
      <div className="">
        <div className="header-wrapper mb-10 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {fixtureData.team_home} vs {fixtureData.team_away}
            </h1>
            <h2 className="font-bold">{fixtureData.league}</h2>
          </div>
          <div>
            <Button
              className="rounded-full"
              color="primary"
              onClick={() => setIsModalOpen(true)} // Open modal when clicked
            >
              Betting Slip
            </Button>
          </div>
        </div>

        <div
          id="wg-api-football-game"
          data-host="v3.football.api-sports.io"
          data-key="your_api_key_here"
          data-id={fixtureId}
          data-theme=""
          data-refresh="15"
          data-show-errors="false"
          data-show-logos="true"
        ></div>

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
        <div className="p-4">
          {filteredMarkets?.map((market) => (
            <table className="w-full mb-8 text-default-500" key={market.name}>
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
                    <th className="text-left px-4 py-2 font-normal border">
                      Bet
                    </th>
                    <th className="text-left px-4 py-2 font-normal border">
                      Minimum EV Odd
                    </th>
                    <th className="text-left px-4 py-2 font-normal border">
                      Best Bookmaker/Odds
                    </th>
                    <th className="text-left px-4 py-2 font-normal border">
                      Place Bet
                    </th>
                  </tr>
                )}
              </thead>

              {!collapsedMarkets[market.name] && (
                <tbody>
                  {market.values.map((bet, betIndex) => {
                    // **Find the best overall bookmaker**
                    const bestBookmaker = bet.bookmakers.reduce(
                      (best, current) =>
                        parseFloat(current.odd) > parseFloat(best.odd)
                          ? current
                          : best,
                      bet.bookmakers[0]
                    );

                    // **Find the user's best bookmaker**
                    const userBestBookmaker = bet.bookmakers
                      .filter((bookmaker) =>
                        userBookmakers.includes(bookmaker.name)
                      )
                      .reduce(
                        (best, current) =>
                          parseFloat(current.odd) > parseFloat(best.odd)
                            ? current
                            : best,
                        bet.bookmakers[0]
                      );

                    const isPositiveEV = bet.bookmakers.some(
                      (bookmaker) => bookmaker.positive_ev
                    );

                    const BetButton = ({
                      bookmaker,
                    }: {
                      bookmaker: Bookmaker;
                    }) => (
                      <Button
                        as="a"
                        href={bookmaker.url}
                        target="_blank"
                        className="w-full"
                        color={bookmaker.positive_ev ? "success" : "default"}
                        auto
                      >
                        {bookmaker.name} ({bookmaker.odd})
                      </Button>
                    );

                    return (
                      <tr key={betIndex}>
                        <td className="py-2 px-4 border">{bet.value}</td>
                        <td className="py-2 px-4 border">
                          {bet.minimum_ev_odd}
                        </td>
                        <td className="py-2 px-4 border">
                          <p>
                            {`${userBestBookmaker.name} (${userBestBookmaker.odd})`}
                          </p>
                          <p>
                            {`${bestBookmaker.name} (${bestBookmaker.odd})`}
                          </p>
                        </td>
                        <td className="py-2 px-4 border">
                          <div className="flex flex-col gap-2">
                            <BetButton bookmaker={userBestBookmaker} />
                            <BetButton bookmaker={bestBookmaker} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          ))}

          <BettingSlipModal
            fixtureId={fixtureId}
            fixtureName={`${fixtureData.team_home} vs ${fixtureData.team_away}`}
            lowRiskBets={[
              { name: "Bet 1: Home Win", odd: "1.50", unitSize: "2 units" },
              {
                name: "Bet 2: Over 1.5 Goals",
                odd: "1.40",
                unitSize: "3 units",
              },
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
            userRiskChoice={userRiskChoice}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default FixtureDetailPage;
