class AccountDto {
  readonly id!: string;

  readonly firstName!: string;

  readonly lastName!: string;

  readonly email!: string;

  readonly phone!: string;

  readonly rpps: string;

  readonly birthdate: Date;

  readonly nurse?: boolean;

  readonly updatedAt?: Date;

  readonly createdAt?: Date;

  readonly password: string;

  readonly pharmaciesId: string[];

  readonly profilesId: string[];

  readonly myPharmacyId?: string;

  readonly permissions: string[];
}
