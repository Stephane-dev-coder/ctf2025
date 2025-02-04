import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(0, 20, 0, 0.8);
  border: 1px solid #00ff00;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #00ff00;
  color: #00ff00;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 255, 0, 0.3);
  color: #00ff00;
`;

const Tr = styled.tr`
  &:hover {
    background: rgba(0, 255, 0, 0.1);
  }
`;

const RankCell = styled(Td)`
  font-weight: bold;
  color: ${props => {
    if (props.rank === 1) return '#ffd700';
    if (props.rank === 2) return '#c0c0c0';
    if (props.rank === 3) return '#cd7f32';
    return '#00ff00';
  }};
`;

export const LeaderboardTable = ({ players }) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Rang</Th>
          <Th>Joueur</Th>
          <Th>Score</Th>
          <Th>Défis Complétés</Th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <Tr key={player.id}>
            <RankCell rank={index + 1}>{index + 1}</RankCell>
            <Td>{player.username}</Td>
            <Td>{player.score}</Td>
            <Td>{player.completedChallenges.length}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}; 