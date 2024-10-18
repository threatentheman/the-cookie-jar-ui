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
import classNames from "classnames";

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
  const [sortKey, setSortKey] = useState<keyof FixtureData>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
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

  // Generate a sorted list of unique leagues
  const leagues = useMemo(() => {
    const uniqueLeagues = [...new Set(data.map((item) => item.league))];
    return uniqueLeagues.sort((a, b) => a.localeCompare(b)); // Sort leagues alphabetically
  }, [data]);

  // Generate a sorted list of unique teams
  const teams = useMemo(() => {
    const allTeams = data.flatMap((item) => [item.team_home, item.team_away]);
    const uniqueTeams = [...new Set(allTeams)];
    return uniqueTeams.sort((a, b) => a.localeCompare(b)); // Sort teams alphabetically
  }, [data]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Apply filters and sorting to the data
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

  // Apply sorting to the filtered items
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (sortKey === "date") {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });
  }, [filteredItems, sortKey, sortOrder]);

  // Handle sorting when a column header is clicked
  const handleSort = (key: keyof FixtureData) => {
    if (key === sortKey) {
      // Toggle the sort order if the same column is clicked
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set a new column to sort by, default to ascending order
      setSortKey(key);
      setSortOrder("asc");
    }
  };

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

  // Determine if any filters are active
  const areFiltersActive = useMemo(() => {
    return (
      selectedLeagues.length > 0 ||
      selectedTeams.length > 0 ||
      (dateRange[0] !== null && dateRange[1] !== null)
    );
  }, [selectedLeagues, selectedTeams, dateRange]);

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
    <div className="flex flex-col p-8 text-default-700">
      <h1 className="text-2xl font-bold mb-6">Upcoming fixtures</h1>

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
        <div className="col-span-4">
          <DateRangePicker
            label="Date range"
            value={dateRange}
            onChange={handleDateChange}
            defaultValue={{
              end: parseDate(new Date().toISOString().split("T")[0]),
            }}
          />
        </div>
      </div>

      {/** Animated clear filters button, shown only if filters are active **/}
      <div className={classNames("transition-opacity duration-500", {
        "opacity-100": areFiltersActive,
        "opacity-0": !areFiltersActive,
        "h-0 overflow-hidden": !areFiltersActive,
      })}>
        {areFiltersActive && (
          <div className="mb-4 col-span-12">
            <Button
              className="w-full transition-transform transform hover:scale-105 duration-300"
              onClick={clearFilters}
              color="default"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <Table aria-label="Fixtures" bordered>
          <TableHeader>
            <TableColumn onClick={() => handleSort("league")}>
              League {sortKey === "league" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableColumn>
            <TableColumn onClick={() => handleSort("team_home")}>
              Fixture {sortKey === "team_home" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableColumn>
            <TableColumn onClick={() => handleSort("date")}>
              Date {sortKey === "date" && (sortOrder === "asc" ? "↑" : "↓")}
            </TableColumn>
          </TableHeader>
          <TableBody>
            {sortedItems.map((item) => (
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
