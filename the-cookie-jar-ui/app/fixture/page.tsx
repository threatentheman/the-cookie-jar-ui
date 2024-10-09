"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";

// Define the fixture data type
interface FixtureData {
  fixture_id: string;
  league: string;
  team_home: string;
  team_away: string;
}

export default function Fixtures() {
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<FixtureData[]>([]); // Fixtures data from the JSON

  useEffect(() => {
    fetch("/json/fixtures.json")
      .then((response) => response.json())
      .then((data) => setData(data)); // Set the fixture data from JSON
  }, []);

  const leagues = [...new Set(data.map((item) => item.league))];

  const filteredItems = useMemo(() => {
    let filteredData = data;

    if (filterValue) {
      filteredData = filteredData.filter(
        (item) =>
          item.team_home.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.team_away.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filteredData = filteredData.filter(
        (item) => item.league === statusFilter
      );
    }

    return filteredData;
  }, [data, filterValue, statusFilter]);

  const paginatedItems = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  }, [page, rowsPerPage, filteredItems]);

  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterValue(e.target.value);
      setPage(1); // reset to page 1 when searching
    },
    []
  );

  const handleLeagueChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setStatusFilter(e.target.value);
      setPage(1); // reset to page 1 when filtering
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1); // reset to page 1 when rows per page change
    },
    []
  );

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 text-gray-600">
      <h1>Fixtures</h1>
      <div className="filters-wrapper grid grid-cols-12 gap-4">
        <input
          type="text"
          placeholder="Search by team..."
          value={filterValue}
          onChange={handleSearchChange}
          className="border p-2 rounded col-span-6"
        />

        <select
          value={statusFilter}
          onChange={handleLeagueChange}
          className="border p-2 rounded col-span-3"
        >
          <option value="all">All Leagues</option>
          {leagues.map((league, index) => (
            <option key={index} value={league}>
              {league}
            </option>
          ))}
        </select>

        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="border p-2 rounded col-span-3"
        >
          <option value="5">5 Rows</option>
          <option value="15">15 Rows</option>
          <option value="30">30 Rows</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>League</th>
              <th>Fixture</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => (
              <tr key={item.fixture_id}>
                <td className="text-gray-700">{item.league}</td>
                <td className="text-gray-700">
                  <a href={`/fixture/${item.fixture_id}`}>
                    {item.team_home} vs {item.team_away}
                  </a>
                </td>
                <td className="text-gray-700">24th September 13:00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-wrapper flex justify-between w-full">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded bg-gray-200"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}
