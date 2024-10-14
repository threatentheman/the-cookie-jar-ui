"use client";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Tabs,
  Tab,
  Button,
  TableRow,
  TableColumn,
  Table,
  TableHeader,
  TableCell,
  TableBody,
} from "@nextui-org/react";

interface Bet {
  name: string;
  odd: string;
  unitSize: string;
}

interface BetSlipProps {
  fixtureId: string;
  fixtureName: string;
  lowRiskBets: Bet[];
  mediumRiskBets: Bet[];
  highRiskBets: Bet[];
  userRiskChoice: "low" | "medium" | "high"; // Defaulted based on user risk choice
  isOpen: boolean; // Modal open state
  onClose: () => void; // Function to handle modal close
}

// Reusable function to render the bet table for each risk level
const BetTable = ({ bets, title }: { bets: Bet[]; title: string }) => (
  <div>
    <h5 className="mb-4">{title}</h5>
    <Table>
      <TableHeader>
        <TableColumn className="py-2 px-4">Bet Name</TableColumn>
        <TableColumn className="py-2 px-4">Minimum odds</TableColumn>
        <TableColumn className="py-2 px-4">Units</TableColumn>
      </TableHeader>
      <TableBody>
        {bets.map((bet, index) => (
          <TableRow key={index}>
            <TableCell className="">{bet.name}</TableCell>
            <TableCell className="">{bet.odd}</TableCell>
            <TableCell className="">{bet.unitSize}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const BettingSlipModal = ({
  fixtureName,
  lowRiskBets,
  mediumRiskBets,
  highRiskBets,
  userRiskChoice,
  isOpen,
  onClose,
}: BetSlipProps) => {
  const defaultActiveKey = {
    low: "1",
    medium: "2",
    high: "3",
  }[userRiskChoice];

  // Array to hold the bets and their corresponding titles
  const tabsData = [
    { key: "1", title: "Low Risk", bets: lowRiskBets },
    { key: "2", title: "Medium Risk", bets: mediumRiskBets },
    { key: "3", title: "High Risk", bets: highRiskBets },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {/* <ModalHeader>
          <h4>Betting slip for {fixtureName}</h4>
        </ModalHeader> */}
        <ModalBody className="p-6">
          {/* Tabs for Low, Medium, and High Risk */}
          <Tabs
            defaultValue={defaultActiveKey}
            aria-label="Betting Risk Levels"
          >
            {tabsData.map((tab) => (
              <Tab key={tab.key} title={tab.title}>
                <BetTable bets={tab.bets} title={"Recommend betting slip"} />
              </Tab>
            ))}
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <p className="text-sm">All betting is done at the bettors risk.</p>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BettingSlipModal;
