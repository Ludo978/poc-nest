import { RemoteGraphQLDataSource, IntrospectAndCompose } from '@apollo/gateway';
import {
  Module,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';

const getToken = (authToken: string): string => {
  const match = authToken.match(/^Bearer (.*)$/);
  if (!match || match.length < 2) {
    throw new HttpException({ message: 'INVALID_BEARER_TOKEN' }, HttpStatus.UNAUTHORIZED);
  }
  return match[1];
};

const decodeToken = (tokenString: string) => {
  const decoded = verify(tokenString, process.env.SECRET_KEY);
  if (!decoded) {
    throw new HttpException({ message: 'INVALID_AUTH_TOKEN' }, HttpStatus.UNAUTHORIZED);
  }
  return decoded;
};
const handleAuth = ({ req }) => {
  try {
    if (req.headers.authorization) {
      const token = getToken(req.headers.authorization);
      const decoded: any = decodeToken(token);
      return {
        userId: decoded.id,
        authorization: `${req.headers.authorization}`,
      };
    }
    return {};
  } catch (err) {
    throw new UnauthorizedException('User unauthorized with invalid authorization Headers');
  }
};
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>(
      {
        server: {
          context: handleAuth,
        },
        driver: ApolloGatewayDriver,
        gateway: {
          buildService: ({ url }) => new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }: any) {
              request.http.headers.set('userId', context.userId);
            },
          }),
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              { name: 'Account', url: 'http://account-service:3000/graphql' },
              { name: 'Order', url: 'http://order-service:3000/graphql' },
              { name: 'Product', url: 'http://product-service:3000/graphql' },
            ],
          }),
        },
      },
    ),
  ],
})
export class AppModule {}
