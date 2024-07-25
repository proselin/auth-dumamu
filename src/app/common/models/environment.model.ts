import { IsNotEmpty, IsString } from 'class-validator';
import { EnvironmentName } from '@common/constant';
import { IEnvironment } from '../interfaces';

export class Environment implements Partial<IEnvironment> {
  @IsString()
  @IsNotEmpty()
  [EnvironmentName.NODE_ENV]: string;

  @IsString()
  @IsNotEmpty()
  [EnvironmentName.SERVER_PORT]: string;

  @IsString()
  @IsNotEmpty()
  [EnvironmentName.SERVER_HOST]: string;

  @IsString()
  @IsNotEmpty()
  [EnvironmentName.SERVER_PREFIX]: string;

  @IsString()
  @IsNotEmpty()
  [EnvironmentName.POSTGRES_USER]: string;

  @IsString()
  @IsNotEmpty()
  [EnvironmentName.POSTGRES_HOST]: string;

  @IsString()
  @IsNotEmpty()
  [EnvironmentName.POSTGRES_PASSWORD]: string;

  @IsString()
  @IsNotEmpty()
  [EnvironmentName.POSTGRES_DATABASE]: string;

  @IsString()
  @IsNotEmpty()
  [EnvironmentName.POSTGRES_PORT]: string;

}
