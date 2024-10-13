// app/fixtures/page.tsx
"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Select,
  SelectItem,
  Table,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  TableBody,
  DateRangePicker,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { parseDate } from "@internationalized/date";

interface FixtureData {
  fixture_id: string;
  league: string;
  team_home: string;
  team_away: string;
  date: string;
}

export default function Fixtures() {
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [data, setData] = useState<FixtureData[]>([]);
  const router = useRouter(); // Initialize router for navigation

  // Fetch the data from the JSON file
  const fetchData = useCallback(async () => {
    const response = await fetch("/json/fixtures.json");
    const result = await response.json();
    setData(result);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const leagues = useMemo(
    () => [...new Set(data.map((item) => item.league))],
    [data]
  );

  const teams = useMemo(() => {
    const allTeams = data.flatMap((item) => [item.team_home, item.team_away]);
    return [...new Set(allTeams)];
  }, [data]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filteredItems = useMemo(() => {
    let filteredData = data;

    if (selectedLeagues.length > 0) {
      filteredData = filteredData.filter((item) =>
        selectedLeagues.includes(item.league)
      );
    }

    if (selectedTeams.length > 0) {
      filteredData = filteredData.filter((item) =>
        selectedTeams.some(
          (team) =>
            item.team_home.toLowerCase() === team.toLowerCase() ||
            item.team_away.toLowerCase() === team.toLowerCase()
        )
      );
    }

    if (dateRange[0] && dateRange[1]) {
      const [startDate, endDate] = dateRange;
      filteredData = filteredData.filter((item) => {
        const fixtureDate = new Date(item.date);
        return fixtureDate >= startDate! && fixtureDate <= endDate!;
      });
    }

    return filteredData;
  }, [data, selectedLeagues, selectedTeams, dateRange]);

  const handleLeagueChange = useCallback((keys: Set<string>) => {
    setSelectedLeagues(Array.from(keys));
  }, []);

  const handleTeamChange = useCallback((keys: Set<string>) => {
    setSelectedTeams(Array.from(keys));
  }, []);

  const handleDateChange = useCallback((range: [Date | null, Date | null]) => {
    setDateRange(range);
  }, []);

  const clearFilters = () => {
    setSelectedLeagues([]);
    setSelectedTeams([]);
    setDateRange([null, null]);
  };

  const handleRowClick = (fixtureId: string) => {
    // Navigate to the detailed fixture page
    router.push(`/fixtures/${fixtureId}`);
  };

  const renderClearableSelect = (
    selected: string[],
    placeholder: string,
    options: string[],
    onClear: () => void,
    onChange: (keys: Set<string>) => void
  ) => (
    <div className="relative w-full">
      <Select
        aria-label={`Select ${placeholder}`}
        selectionMode="multiple"
        onSelectionChange={onChange}
        className="w-full text-default-600"
        label={placeholder}
        selectedKeys={new Set(selected)}
        closeOnSelect={false}
      >
        {options.map((option) => (
          <SelectItem key={option} value={option} className="text-default-500">
            {option}
          </SelectItem>
        ))}
      </Select>
      {selected.length > 0 && (
        <button
          onClick={onClear}
          className="absolute top-1/2 right-4 transform -translate-y-1/2"
          aria-label={`Clear ${placeholder}`}
        >
          X
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen max-h-screen flex flex-col p-8 text-default-600">
      <h1 className="text-2xl font-bold mb-6">Fixtures</h1>

      <div className="filters-wrapper grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-4">
          {renderClearableSelect(
            selectedLeagues,
            "Leagues",
            leagues,
            () => setSelectedLeagues([]),
            handleLeagueChange
          )}
        </div>

        <div className="col-span-4">
          {renderClearableSelect(
            selectedTeams,
            "Teams",
            teams,
            () => setSelectedTeams([]),
            handleTeamChange
          )}
        </div>
        <DateRangePicker
          className="col-span-4"
          value={dateRange}
          onChange={handleDateChange}
          defaultValue={{
            end: parseDate(new Date().toISOString().split("T")[0]),
          }}
        />
      </div>

      <div className="mb-4">
        <Button onClick={clearFilters} color="error" auto>
          Clear All Filters
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Table aria-label="Fixtures" bordered>
          <TableHeader>
            <TableColumn>League</TableColumn>
            <TableColumn>Fixture</TableColumn>
            <TableColumn>Date</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow
                key={item.fixture_id}
                className="cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleRowClick(item.fixture_id)}
              >
                <TableCell>{item.league}</TableCell>
                <TableCell>
                  {item.team_home} vs {item.team_away}
                </TableCell>
                <TableCell>{formatDate(item.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
