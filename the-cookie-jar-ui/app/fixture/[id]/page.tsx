'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';  // Import useParams

// Type definitions for the fixture data
interface Odds {
  value: string;
  odd: string;
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
  odds?: Market[]; // Added odds as optional
}

interface UserBookmaker {
  name: string;
  signedUp: boolean;
}

// Fetch fixture data based on fixtureId
const fetchFixture = async (fixtureId: string): Promise<FixtureData | undefined> => {
  const response = await fetch(`/json/fixtures.json`);
  const data: FixtureData[] = await response.json(); // Data is an array
  return data.find((fixture: FixtureData) => fixture.fixture_id === fixtureId);
};

const fetchOdds = async (fixtureId: string): Promise<Market[] | undefined> => {
    const response = await fetch(`/json/odds.json`);
    const data = await response.json();
  
    // Check if the fixture_id matches the one in odds.json
    if (data.fixture.fixture_id === fixtureId) {
      return data.odds; // Return the odds array directly
    }
  
    // If the fixture_id doesn't match, return undefined
    return undefined;
  };
  
// Fetch user bookmakers (mocked data for now)
const fetchUserBookmakers = async (): Promise<UserBookmaker[]> => {
  return [
    { name: 'SkyBet', signedUp: true },
    { name: 'Bet365', signedUp: false },
  ];
};

// Fixture Detail Page Component
const FixtureDetailPage = () => {
  const params = useParams();  // Get dynamic route params
  const fixtureId = params.id; // Extract the id parameter

  const [fixtureData, setFixtureData] = useState<FixtureData | null>(null);
  const [odds, setOdds] = useState<Market[] | null>(null);
  const [userBookmakers, setUserBookmakers] = useState<UserBookmaker[]>([]);

  useEffect(() => {
    if (!fixtureId) return;

    // Fetch fixture and odds data
    fetchFixture(fixtureId).then(setFixtureData);
    fetchOdds(fixtureId).then(setOdds);
    fetchUserBookmakers().then(setUserBookmakers);
  }, [fixtureId]);

  const calculateEV = (odd: string): boolean => {
    let oddValue: number;
  
    // Check if it's a fractional odd (contains a "/")
    if (odd?.includes('/')) {
      // Split the fractional odds and calculate decimal odds
      const [numerator, denominator] = odd.split('/').map(Number);
      oddValue = (numerator / denominator) + 1; // Convert to decimal
    } else {
      // If it's already decimal, parse it directly
      oddValue = parseFloat(odd);
    }
  
    // Assuming odds greater than 2.0 is a positive EV bet
    return oddValue > 2;
  };

  if (!fixtureData || !odds) return <div>Loading...</div>;

  return (
    <div>
      <h1>{fixtureData.team_home} vs {fixtureData.team_away}</h1>
      <h2>{fixtureData.league}</h2>

      <h3>Betting Markets</h3>
      {odds.map((market) => (
        <div key={market.name}>
          <h4>{market.name}</h4>
          {market.values.map((bet, index) => {
            const positiveEV = calculateEV(bet.odd);
            const signedUpBookmaker = userBookmakers.find(b => b.signedUp)?.name || 'None';

            return (
              <div key={index}>
                <p>
                  Bet: {bet.value}, Odd: {bet.odd}, Positive EV: {positiveEV ? 'Yes' : 'No'}
                </p>
                <p>Best Bookmaker: {signedUpBookmaker}</p>
                <a href={fixtureData.fixture_url} target="_blank">Place Bet</a>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FixtureDetailPage;
