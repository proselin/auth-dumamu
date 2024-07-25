export enum JWTPayloadType {
  AccessToken = 0,
  RefreshToken = 1,
}

export type JwtPayloadCore = {
  type?: JWTPayloadType;
} & JWTPayload;

export type JWTRefreshPayload = {
  type: JwtPayloadCore['type'];
};

export type JWTPayload = {
  userId: string;
  sub: string;
  deviceId: string;
  fromSystem: string;
};
