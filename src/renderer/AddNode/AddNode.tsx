import { BsPlusSquareDotted } from 'react-icons/bs';
import { useEffect, useState } from 'react';

import Node, { DockerOptions, NodeId, NodeOptions } from '../../main/node';
import electron from '../electronGlobal';
import IconButton from '../IconButton';
import { Modal } from '../Modal';
import NodeCard from './NodeCard';
import ConfirmAddNode from './ConfirmAddNode';

const AddNode = () => {
  const [sIsModalOpenAddNode, setIsModalOpenAddNode] = useState<boolean>(false);
  const [sIsModalOpenConfirmAddNode, setIsModalOpenConfirmAddNode] =
    useState<boolean>(false);
  const [sSelectedNodeOptions, setSelectedNodeOptions] =
    useState<NodeOptions>();

  const onNodeSelected = (nodeOptions: NodeOptions) => {
    // set selected node
    setSelectedNodeOptions(nodeOptions);
    // open confirm add modal
    setIsModalOpenConfirmAddNode(true);
  };

  const onConfirmAddNode = () => {
    // close both modals
    setIsModalOpenConfirmAddNode(false);
    setIsModalOpenAddNode(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sExecutionClientLibrary] = useState<any>([
    {
      displayName: 'Nethermind',
      imageName: 'nethermind/nethermind',
      category: 'L1/ExecutionClient',
      executionType: 'docker',
      iconUrl:
        'https://clientdiversity.org/assets/img/execution-clients/nethermind-logo.png',
    },
    {
      displayName: 'Erigon',
      imageName: 'thorax/erigon:latest',
      category: 'L1/ExecutionClient',
      executionType: 'docker',
      iconUrl:
        'https://clientdiversity.org/assets/img/execution-clients/erigon-text-logo.png',
    },
    {
      displayName: 'Besu',
      imageName: 'nethermind/nethermind',
      category: 'L1/ExecutionClient',
      executionType: 'docker',
      iconUrl:
        'https://clientdiversity.org/assets/img/execution-clients/besu-text-logo.png',
    },
    {
      displayName: 'Geth',
      imageName: 'ethereum/client-go:stable',
      category: 'L1/ExecutionClient',
      executionType: 'docker',
      iconUrl:
        'https://clientdiversity.org/assets/img/execution-clients/geth-logo.png',
    },
  ]);
  const [sBeaconNodeLibrary] = useState<any>([
    {
      displayName: 'Lodestar',
      imageName: 'gcr.io/prysmaticlabs/prysm/beacon-chain:stable',
      category: 'L1/ConsensusClient/BeaconNode',
      executionType: 'docker',
      iconUrl:
        'https://clientdiversity.org/assets/img/consensus-clients/lodestar-logo-text.png',
    },
    {
      displayName: 'Teku',
      imageName: 'sigp/lighthouse',
      category: 'L1/ConsensusClient/BeaconNode',
      executionType: 'docker',
      iconUrl:
        'https://clientdiversity.org/assets/img/consensus-clients/teku-logo.png',
    },
    {
      displayName: 'Nimbus',
      imageName: 'sigp/lighthouse',
      category: 'L1/ConsensusClient/BeaconNode',
      executionType: 'docker',
      iconUrl:
        'https://clientdiversity.org/assets/img/consensus-clients/nimbus-logo-text.png',
    },
    {
      displayName: 'Lighthouse',
      imageName: 'sigp/lighthouse',
      category: 'L1/ConsensusClient/BeaconNode',
      executionType: 'docker',
      iconUrl:
        'https://clientdiversity.org/assets/img/consensus-clients/lighthouse-logo.png',
    },
    {
      displayName: 'Prysm',
      imageName: 'gcr.io/prysmaticlabs/prysm/beacon-chain:stable',
      category: 'L1/ConsensusClient/BeaconNode',
      executionType: 'docker',
      iconUrl:
        'https://clientdiversity.org/assets/img/consensus-clients/prysm-logo.png',
    },
  ]);
  const [sLayer2ClientLibrary] = useState<any>([
    {
      displayName: 'Optimism Replica',
      imageName: 'eqlabs/pathfinder:latest',
      category: 'L2/StarkNet',
      executionType: 'docker',
      iconUrl:
        'https://github.com/ethereum-optimism/brand-kit/blob/main/assets/images/Profile-Logo.png?raw=true',
    },
    {
      displayName: 'StarkNet, Pathfinder',
      imageName: 'eqlabs/pathfinder:latest',
      category: 'L2/StarkNet',
      executionType: 'docker',
      iconUrl:
        'https://equilibrium.co/_next/image?url=%2Fimages%2Fcasestudies%2Fsquare-pathfinder.png&w=640&q=75',
    },
  ]);
  const onClickAddNodeButton = async () => {
    setIsModalOpenAddNode(true);
  };

  return (
    <div>
      <span>Add node</span>
      <IconButton type="button" onClick={onClickAddNodeButton}>
        <BsPlusSquareDotted />
      </IconButton>

      <Modal
        isOpen={sIsModalOpenAddNode}
        title="Add Node"
        onClickCloseButton={() => setIsModalOpenAddNode(false)}
      >
        <div>
          <h2>Ethereum Node (Execution client)</h2>
          {sExecutionClientLibrary ? (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {sExecutionClientLibrary.map((nodeOptions: NodeOptions) => {
                return (
                  <NodeCard
                    nodeOptions={nodeOptions}
                    onSelected={() => onNodeSelected(nodeOptions)}
                  />
                );
              })}
            </div>
          ) : (
            <span>Unable to load node library</span>
          )}
        </div>
        <div>
          <h2>Ethereum Beacon Node (Consensus client)</h2>
          {sBeaconNodeLibrary ? (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {sBeaconNodeLibrary.map((nodeOptions: NodeOptions) => {
                return (
                  <NodeCard
                    nodeOptions={nodeOptions}
                    onSelected={() => onNodeSelected(nodeOptions)}
                  />
                );
              })}
            </div>
          ) : (
            <span>Unable to load beacon node library</span>
          )}
        </div>
        <div>
          <h2>Ethereum Layer 2</h2>
          {sLayer2ClientLibrary ? (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {sLayer2ClientLibrary.map((nodeOptions: NodeOptions) => {
                return (
                  <NodeCard
                    nodeOptions={nodeOptions}
                    onSelected={() => onNodeSelected(nodeOptions)}
                  />
                );
              })}
            </div>
          ) : (
            <span>Unable to load layer 2 node library</span>
          )}
        </div>
      </Modal>

      <ConfirmAddNode
        isOpen={sIsModalOpenConfirmAddNode}
        onConfirm={onConfirmAddNode}
        onCancel={() => setIsModalOpenConfirmAddNode(false)}
        nodeOptions={sSelectedNodeOptions}
      />
    </div>
  );
};
export default AddNode;
