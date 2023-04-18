import { Logger } from '@nestjs/common';
import {
  EventStoreDBClient,
  ChannelCredentialOptions,
  DNSClusterOptions,
  GossipClusterOptions,
  SingleNodeOptions,
  Credentials,
} from '@eventstore/db-client';
import { ConnectionEndpoint } from './event-store.module';

export class EventStore {
  connection: any;

  client: any;

  isConnected: boolean = false;

  retryAttempts: number;

  private logger: Logger = new Logger(this.constructor.name);

  constructor(
    private settings: ChannelCredentialOptions,
    private endpoint: ConnectionEndpoint,
    private credentials?: Credentials,
  ) {
    this.retryAttempts = 0;
    this.connect();
  }

  connect() {
    return this.endpoint.hasOwnProperty('discover')
      ? this.connectDNSCluster()
      : this.endpoint.hasOwnProperty('endpoints')
        ? this.connectGossip()
        : this.connectSingleNode();
  }

  async connectGossip() {
    this.logger.log('Connecting as Gossip');
    this.connection = new EventStoreDBClient(
      this.endpoint as GossipClusterOptions,
      this.settings,
      this.credentials,
    );
  }

  async connectDNSCluster() {
    this.logger.log('Connecting as DNSCluster');
    this.connection = new EventStoreDBClient(
      this.endpoint as DNSClusterOptions,
      this.settings,
      this.credentials,
    );
  }

  async connectSingleNode() {
    this.logger.log('Connecting as SingleNode');
    this.connection = new EventStoreDBClient(
      this.endpoint as SingleNodeOptions,
      this.settings,
      this.credentials,
    );
  }

  getConnection() {
    return this.connection;
  }

  close() {
    this.connection.close();
  }
}
